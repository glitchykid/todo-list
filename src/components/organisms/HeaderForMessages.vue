<script setup lang="ts">
  import { useCalendarStore } from "@/stores/calendar";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";
  import RegularButton from "../atoms/RegularButton.vue";
  import Calendar from "../molecules/Calendar.vue";

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;
  const workspacesStore = useWorkspacesStore();
  const { currentWorkspace } = storeToRefs(workspacesStore);

  const calendarStore = useCalendarStore();
  const { activeFilter, formattedSelectedDate } = storeToRefs(calendarStore);
  const showCalendar = ref<Boolean>(false);
  const isSelectActive = computed(() =>
    activeFilter.value === "select" || showCalendar.value ? true : false,
  );
  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
  };

  const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
    if (name === "today") {
      calendarStore.selectToday();
    } else {
      calendarStore.selectTomorrow();
    }
  };
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <h6 class="text-center text-[#D0CCFF] truncate min-w-0">
      {{ currentWorkspace.name }}
    </h6>
    <div class="flex flex-row items-center justify-between gap-8">
      <div class="flex flex-row gap-8">
        <RegularButton
          v-for="button in quickButtons"
          :key="button.name"
          :label="button.label"
          :active="activeFilter === button.name"
          :border="true"
          @click="handleQuickFilter(button.name)"
          class="px-4 py-2"
        />
        <div class="relative">
          <RegularButton
            label="Select a date..."
            :active="isSelectActive"
            :border="true"
            class="px-4 py-2"
            @click="toggleCalendar"
          />
          <Calendar
            v-if="showCalendar"
            position="bottom"
            @toggle-calendar="showCalendar = $event"
          />
        </div>
      </div>
      <span class="text-right font-bold text-nowrap text-[#D0CCFF]">
        {{ formattedSelectedDate }}
      </span>
    </div>
  </div>
</template>
