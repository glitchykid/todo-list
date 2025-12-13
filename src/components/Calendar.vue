<script lang="ts" setup>
  import Dropdown from "@/components/Dropdown.vue";
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import { currentLocale, locales } from "@/locales/locales";
  import { useCalendarStore } from "@/stores/calendar";
  import { storeToRefs } from "pinia";
  import { computed, ref, watch } from "vue";

  const props = defineProps<{
    position: string;
    isLocal?: boolean;
  }>();

  const calendarStore = useCalendarStore();
  const { selectedDateAsDate, calendarCursorDate } = storeToRefs(calendarStore);

  const emit = defineEmits<{
    "toogle-calendar": [value: boolean];
  }>();

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

  const yearNumbers = ref<number[]>(
    createYearNumbers(viewDate.value.getFullYear()),
  );

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
        calendarStore.setCalendarMonth(newDate);
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

  interface CalendarCell {
    key: number;
    displayDay: number;
    date: Date;
    isCurrentMonth: boolean;
  }

  const calendarCells = computed<CalendarCell[]>(() => {
    const startOffset = locales[currentLocale] ?? 0;
    const currentYear = viewDate.value.getFullYear();
    const currentMonth = viewDate.value.getMonth();
    const firstOfMonth = new Date(currentYear, currentMonth, 1);
    const firstWeekday = firstOfMonth.getDay();
    const leading = (firstWeekday - startOffset + 7) % 7;

    const daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();

    const totalCells = Math.ceil((leading + daysInCurrentMonth) / 7) * 7;

    const startDate = new Date(firstOfMonth);
    startDate.setDate(firstOfMonth.getDate() - leading);

    const cells: CalendarCell[] = [];

    for (let i = 0; i < totalCells; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      cells.push({
        key: cellDate.getTime(),
        displayDay: cellDate.getDate(),
        date: cellDate,
        isCurrentMonth: cellDate.getMonth() === currentMonth,
      });
    }

    return cells;
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

  const isActiveDay = (cellDate: Date): boolean => {
    const selected = selectedDateAsDate.value;
    return (
      selected.getFullYear() === cellDate.getFullYear() &&
      selected.getMonth() === cellDate.getMonth() &&
      selected.getDate() === cellDate.getDate()
    );
  };

  const selectDay = (cellDate: Date) => {
    calendarStore.setSelectedDate(new Date(cellDate));
  };
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-black/20"
      @click="emit('toggle-calendar', false)"
    />
    <div
      class="absolute shadow-lg shadow-[#8276FF]/50 left-1/2 -translate-x-1/2 z-40 flex flex-col gap-4 rounded-lg bg-white p-4 text-[#8276FF]"
      :class="[
        props.position === 'bottom' && 'top-full mt-2',
        props.position === 'top' && 'bottom-full mb-2',
      ]"
    >
      <div class="flex flex-row justify-between gap-8">
        <Dropdown
          :default="currentMonth"
          :values="monthNames"
          @update:default="setMonthByName"
        />
        <Dropdown
          :default="currentYear"
          :values="yearLabels"
          @update:default="setYearByLabel"
        />
      </div>
      <div class="grid grid-cols-7 justify-items-center font-bold">
        <span
          v-for="weekday of weekdays"
          :key="weekday"
          class="flex h-9 w-9 items-center justify-center font-bold"
          >{{ weekday }}</span
        >
      </div>
      <div class="grid grid-cols-7 justify-items-center gap-y-3">
        <template v-for="cell in calendarCells" :key="cell.key">
          <RegularButton
            v-if="cell.isCurrentMonth"
            :active="isActiveDay(cell.date)"
            :border="false"
            :label="cell.displayDay"
            :name="cell.displayDay"
            class="h-9 w-9"
            @click="selectDay(cell.date)"
          />
          <span
            v-else
            class="flex h-9 w-9 items-center justify-center text-[#B3BCCD]"
          >
            {{ cell.displayDay }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
