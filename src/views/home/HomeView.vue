<script setup lang="ts">
import { computed } from "vue";
import RegularButton from "@/components/buttons/RegularButton.vue";
import Calendar from "@/components/Calendar.vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";

const tasksStore = useTasksStore();
const { activeFilter, formattedSelectedDate, isCalendarOpen } =
  storeToRefs(tasksStore);

const quickButtons = [
  { name: "today", label: "Today" },
  { name: "tomorrow", label: "Tomorrow" },
] as const;

const isSelectActive = computed(
  () => activeFilter.value === "select" || isCalendarOpen.value,
);

const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
  if (name === "today") {
    tasksStore.selectToday();
  } else {
    tasksStore.selectTomorrow();
  }
};

const toggleCalendar = () => {
  tasksStore.toggleCalendar();
};
</script>

<template>
  <main
    class="bg-white w-full h-full gap-8 px-9 py-8 border-1 border-[#C9D7ED] rounded-[16px]"
  >
    <div class="flex flex-col w-full gap-8">
      <h6 class="text-[#D0CCFF] text-center">All tasks</h6>
      <div class="flex flex-row items-center justify-between gap-8">
        <div class="flex flex-row gap-8">
          <RegularButton
            v-for="button in quickButtons"
            :key="button.name"
            :name="button.name"
            :label="button.label"
            :active="activeFilter === button.name"
            :border="true"
            @click="handleQuickFilter(button.name)"
            class="px-4 py-2"
          />
          <div class="relative">
            <RegularButton
              name="select"
              label="Select a date..."
              :active="isSelectActive"
              :border="true"
              class="px-4 py-2"
              @click="toggleCalendar"
            />
            <Calendar v-if="isCalendarOpen" />
          </div>
        </div>
        <span class="text-[#D0CCFF] font-bold text-right text-nowrap">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
  </main>
  <aside
    class="bg-white min-w-50 w-50 h-full py-8 flex flex-col gap-8 border-1 border-[#C9D7ED] rounded-[16px]"
  >
    <div>
      <h6 class="text-[#D0CCFF] text-center">Spaces</h6>
    </div>
  </aside>
</template>
