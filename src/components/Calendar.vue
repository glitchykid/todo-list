<script setup lang="ts">
import Dropdown from "@/components/Dropdown.vue";
import RegularButton from "@/components/buttons/RegularButton.vue";
import { locales, currentLocale } from "@/locales/locales";
import { ref, computed, watch } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";

const tasksStore = useTasksStore();
const { selectedDateAsDate, calendarCursorDate } = storeToRefs(tasksStore);

const viewDate = ref(new Date(calendarCursorDate.value));

const formatYearLabel = (year: number) =>
  new Intl.DateTimeFormat(currentLocale, { year: "numeric" }).format(
    new Date(year, 0, 1),
  );

const createYearNumbers = (centerYear: number) => {
  const start = centerYear - 10;
  const numbers: number[] = [];
  for (let year = start; year <= centerYear + 10; year++) {
    numbers.push(year);
  }
  return numbers;
};

const yearNumbers = ref<number[]>(createYearNumbers(viewDate.value.getFullYear()));
const yearLabels = computed(() =>
  yearNumbers.value.map((year) => formatYearLabel(year)),
);

const ensureYearInList = (year: number) => {
  const numbers = yearNumbers.value;
  if (numbers.includes(year)) return;

  if (numbers.length === 0) {
    yearNumbers.value = [year];
    return;
  }

  let first = numbers[0];
  while (first !== undefined && year < first) {
    numbers.unshift(first - 1);
    first = numbers[0];
  }

  let last = numbers[numbers.length - 1];
  while (last !== undefined && year > last) {
    numbers.push(last + 1);
    last = numbers[numbers.length - 1];
  }
};

watch(calendarCursorDate, (newCursor) => {
  if (viewDate.value.getTime() !== newCursor.getTime()) {
    viewDate.value = new Date(newCursor);
    ensureYearInList(viewDate.value.getFullYear());
  }
});

watch(
  viewDate,
  (newDate) => {
    ensureYearInList(newDate.getFullYear());
    if (calendarCursorDate.value.getTime() !== newDate.getTime()) {
      tasksStore.setCalendarMonth(newDate);
    }
  },
  { deep: false },
);

const currentMonth = computed(() =>
  new Intl.DateTimeFormat(currentLocale, {
    month: "long",
  }).format(viewDate.value),
);
const currentYear = computed(() =>
  new Intl.DateTimeFormat(currentLocale, {
    year: "numeric",
  }).format(viewDate.value),
);

const weekdays = computed(() => {
  const startOffset = locales[currentLocale] ?? 0;
  const d = new Date(viewDate.value);
  d.setDate(d.getDate() - ((d.getDay() - startOffset + 7) % 7));
  const arr: string[] = [];
  for (let i = 0; i < 7; i++) {
    arr.push(
      new Intl.DateTimeFormat(currentLocale, { weekday: "short" }).format(
        new Date(d),
      ),
    );
    d.setDate(d.getDate() + 1);
  }
  return arr;
});

const monthNames = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(viewDate.value);
    d.setDate(1);
    d.setMonth(i);
    arr.push(
      new Intl.DateTimeFormat(currentLocale, { month: "long" }).format(d),
    );
  }
  return arr;
});

const monthDays = computed(() => {
  const currentYear = viewDate.value.getFullYear();
  const currentMonth = viewDate.value.getMonth();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const arr: number[] = [];
  for (let i = 1; i <= lastDay; i++) arr.push(i);
  return arr;
});

const setMonthByName = (monthName: string) => {
  const index = monthNames.value.indexOf(monthName);
  if (index >= 0) {
    const d = new Date(viewDate.value);
    d.setDate(1);
    d.setMonth(index);
    viewDate.value = d;
  }
};

const setYearByLabel = (yearLabel: string) => {
  const labelIndex = yearLabels.value.indexOf(yearLabel);
  let yearNumber: number | undefined;
  if (labelIndex >= 0) {
    yearNumber = yearNumbers.value[labelIndex];
  } else {
    const parsed = parseInt(yearLabel, 10);
    if (!Number.isNaN(parsed)) yearNumber = parsed;
  }

  if (yearNumber === undefined) return;

  ensureYearInList(yearNumber);

  const d = new Date(viewDate.value);
  d.setDate(1);
  d.setFullYear(yearNumber);
  viewDate.value = d;
};

const leadingBlanks = computed(() => {
  const startOffset = locales[currentLocale] ?? 0;
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const blanks = (firstWeekday - startOffset + 7) % 7;
  return Array.from({ length: blanks }, (_, i) => i);
});

const isActiveDay = (day: number): boolean => {
  const selected = selectedDateAsDate.value;
  return (
    selected.getFullYear() === viewDate.value.getFullYear() &&
    selected.getMonth() === viewDate.value.getMonth() &&
    selected.getDate() === day
  );
};

const selectDay = (day: number) => {
  const nextDate = new Date(viewDate.value);
  nextDate.setDate(day);
  tasksStore.setSelectedDate(nextDate);
};
</script>

<template>
  <div
    class="bg-white border-1 border-[#C9D7ED] flex flex-col absolute -left-30 top-full mt-4 text-[#8276FF] rounded-[8px] p-4 gap-4 z-40"
  >
    <div class="flex flex-row gap-8 justify-between">
      <Dropdown
        :values="monthNames"
        :default="currentMonth"
        @update:default="setMonthByName"
      />
      <Dropdown
        :values="yearLabels"
        :default="currentYear"
        @update:default="setYearByLabel"
      />
    </div>
    <div class="grid grid-cols-7 justify-items-center font-bold">
      <span v-for="weekday of weekdays" :key="weekday" class="w-8">{{
        weekday
      }}</span>
    </div>
    <div class="grid grid-cols-7 justify-items-center gap-y-3">
      <span v-for="i in leadingBlanks" :key="'blank-' + i" class="w-9 h-9" />
      <RegularButton
        v-for="numberOfTheMonth of monthDays"
        :key="numberOfTheMonth"
        :border="false"
        :active="isActiveDay(numberOfTheMonth)"
        :label="numberOfTheMonth"
        :name="numberOfTheMonth"
        class="w-9 h-9"
        @click="selectDay(numberOfTheMonth)"
      />
    </div>
  </div>
</template>
