<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import Calendar from "@/components/Calendar.vue";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";

  const calendar = ref(false);

  function toggleCalendar() {
    calendar.value = !calendar.value;
  }
</script>

<template>
  <div class="rounded-lg border border-[#8276FF]">
    <input
      placeholder="Enter a task"
      class="h-9 w-full px-4 text-[#808080] outline-none"
    />
    <hr class="h-px border-none bg-[#8276FF]" />
    <div class="flex h-9 flex-row">
      <RegularButton
        label="not repeatable"
        class="w-full rounded-none rounded-bl-lg border-r"
        :icon="ArrowPathIcon"
      />
      <div class="relative w-full rounded-br-lg">
        <RegularButton
          label="today"
          class="h-full w-full rounded-none rounded-br-lg"
          :icon="ClockIcon"
          :active="calendar"
          @click="toggleCalendar"
        />
        <Calendar
          v-if="calendar"
          position="top"
          @toggleCalendar="toggleCalendar"
        />
      </div>
    </div>
  </div>
</template>
