<script setup lang="ts">
import Dropdown from "@/components/Dropdown.vue";
import RegularButton from "@/components/buttons/RegularButton.vue";
import { locales, currentLocale } from "@/locales/locales";
import { ref, computed } from "vue";

import type { Ref } from "vue";

const date: Ref<Date> = ref(new Date());

const currentMonth = computed(() =>
  new Intl.DateTimeFormat(currentLocale, {
    month: "long",
  }).format(date.value)
);
const currentYear = computed(() =>
  new Intl.DateTimeFormat(currentLocale, {
    year: "numeric",
  }).format(date.value)
);

const weekdays = computed(() => {
  const startOffset = locales[currentLocale] ?? 0;
  const d = new Date(date.value);
  d.setDate(d.getDate() - ((d.getDay() - startOffset + 7) % 7));
  const arr: string[] = [];
  for (let i = 0; i < 7; i++) {
    arr.push(
      new Intl.DateTimeFormat(currentLocale, { weekday: "short" }).format(
        new Date(d)
      )
    );
    d.setDate(d.getDate() + 1);
  }
  return arr;
});

const monthNames = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(date.value);
    d.setMonth(i);
    arr.push(
      new Intl.DateTimeFormat(currentLocale, { month: "long" }).format(d)
    );
  }
  return arr;
});

const y = date.value.getFullYear();
const yearList: string[] = [];
for (let i = y - 10; i <= y + 10; i++) {
  yearList.push(
    new Intl.DateTimeFormat(currentLocale, { year: "numeric" }).format(
      new Date(i, 0, 1)
    )
  );
}

const monthDays = computed(() => {
  const currentYear = date.value.getFullYear();
  const currentMonth = date.value.getMonth();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const arr: number[] = [];
  for (let i = 1; i <= lastDay; i++) arr.push(i);
  return arr;
});

const setMonthByName = (monthName: string) => {
  const index = monthNames.value.indexOf(monthName);
  if (index >= 0) {
    const d = new Date(date.value);
    d.setMonth(index);
    date.value = d;
  }
};

const setYearByLabel = (yearLabel: string) => {
  const yearNumber = parseInt(yearLabel, 10);
  if (!Number.isNaN(yearNumber)) {
    const d = new Date(date.value);
    d.setFullYear(yearNumber);
    date.value = d;
  }
};

const leadingBlanks = computed(() => {
  const startOffset = locales[currentLocale] ?? 0;
  const year = date.value.getFullYear();
  const month = date.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const blanks = (firstWeekday - startOffset + 7) % 7;
  return Array.from({ length: blanks }, (_, i) => i);
});
</script>

<template>
  <div
    class="bg-white border-1 border-[#C9D7ED] flex flex-col absolute -left-30 top-full mt-4 text-[#8276FF] rounded-[8px] p-4 gap-4"
  >
    <div class="flex flex-row gap-8 justify-between">
      <Dropdown
        :values="monthNames"
        :default="currentMonth"
        @update:default="setMonthByName"
      />
      <Dropdown
        :values="yearList"
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
        :active="false"
        :label="numberOfTheMonth"
        :name="numberOfTheMonth"
        class="w-9 h-9"
      />
    </div>
  </div>
</template>
