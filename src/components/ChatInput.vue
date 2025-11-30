<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import Calendar from "./Calendar.vue";
  import { useCalendarStore } from "@/stores/calendar";
  import { storeToRefs } from "pinia";

  const calendarStore = useCalendarStore();

  const { isCalendarOpen } = storeToRefs(calendarStore);

  const toogleCalendar = () => {
    calendarStore.toggleCalendar();
  };
</script>

<template>
  <div class="rounded-lg border border-[#8276FF]">
    <input
      placeholder="Enter a task"
      class="h-9 w-full px-4 text-[#808080] outline-none"
    />
    <hr class="h-px border-none bg-[#8276FF]" />
    <div class="flex flex-row h-9">
      <RegularButton
        label="not repeatable"
        class="w-full rounded-none border-r"
        :icon="ArrowPathIcon"
      />
      <div class="relative w-full">
        <RegularButton
          label="<time>"
          class="w-full rounded-none"
          :icon="ClockIcon"
          @click="toogleCalendar"
        />
        <Calendar v-if="isCalendarOpen" position="top" />
      </div>
    </div>
  </div>
</template>
