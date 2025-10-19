<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import RegularButton from "./buttons/RegularButton.vue";
import { locales, currentLocale } from "@/locales/locales";

const date: Date = new Date();
const currentMonth: string = new Intl.DateTimeFormat(currentLocale, {
  month: "long",
}).format(date);
const currentYear: string = new Intl.DateTimeFormat(currentLocale, {
  year: "numeric",
}).format(date);

date.setMonth(0);
date.setDate(
  date.getDate() - ((date.getDay() - (locales[currentLocale] ?? 0) + 7) % 7),
);
date.setFullYear(date.getFullYear() - 11);

const monthNames: string[] = new Array();
const yearList: string[] = new Array();
const weekdays: string[] = new Array();

for (let i = 0; i < 7; i++) {
  weekdays.push(
    new Intl.DateTimeFormat(currentLocale, { weekday: "short" }).format(date),
  );
  date.setDate(date.getDate() + 1);
}

for (let i = 0; i < 12; i++) {
  monthNames.push(
    new Intl.DateTimeFormat(currentLocale, { month: "long" }).format(date),
  );
  date.setMonth(date.getMonth() + 1);
}

for (let i = 0; i < 21; i++) {
  yearList.push(
    new Intl.DateTimeFormat(currentLocale, { year: "numeric" }).format(date),
  );
  date.setFullYear(date.getFullYear() + 1);
}
</script>

<template>
  <div
    class="border-1 border-[#C9D7ED] flex flex-col absolute -right-1/2 mt-4 text-[#8276FF] rounded-[8px] p-4 gap-4"
  >
    <div class="flex flex-row gap-8">
      <Dropdown :values="monthNames" :default="currentMonth" />
      <Dropdown :values="yearList" :default="currentYear" />
    </div>
    <div class="flex flex-row justify-between px-2">
      <span v-for="weekday of weekdays" :key="weekday">{{ weekday }}</span>
    </div>
    <div class="flex flex-row justify-between">
      <RegularButton
        :border="false"
        :active="false"
        :label="'23'"
        :name="'23'"
      />
    </div>
  </div>
</template>
