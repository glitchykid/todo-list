<template>
  <div class="w-full overflow-hidden border-l border-l-[#8276FF]">
    <div class="flex items-start justify-between rounded-2xl bg-white px-4">
      <!-- Task info -->
      <div class="flex-1">
        <h3 class="mb-2.5 text-[16px] font-bold text-[#3E3D4D]">
          {{ task.title }}
        </h3>
        <div class="flex items-center gap-1.5">
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] md:px-3 md:py-1.5 md:text-[12px]"
            style="background-color: #f0eeff; color: #8276ff"
          >
            <ClockIcon class="size-3 md:size-4" />
            {{ task.dueTime }}
          </span>
          <span
            v-if="task.repeatable"
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] md:px-3 md:py-1.5 md:text-[12px]"
            style="background-color: #fff9e6; color: #b68b00"
          >
            <ArrowPathIcon class="size-3 md:size-4" />
            {{ task.repeatable }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1.5">
        <button
          v-if="task.repeatable"
          @click="skipTask"
          class="rounded-full bg-[#92D6F3] p-1.5 text-[#314D59] transition-colors duration-200 hover:bg-[#92D6F3]/50 md:p-2.5"
        >
          <ArrowLongRightIcon class="size-3 md:size-4" />
        </button>
        <button
          @click="completeTask"
          class="rounded-full bg-[#8CE98C] p-1.5 text-[#274F27] transition-colors duration-200 hover:bg-[#8CE98C]/50 md:p-2.5"
        >
          <CheckIcon class="size-3 md:size-4" />
        </button>
        <button
          @click="removeTask"
          class="rounded-full bg-[#E27575] p-1.5 text-[#4F2929] transition-colors duration-200 hover:bg-[#E27575]/50 md:p-2.5"
        >
          <TrashIcon class="size-3 md:size-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCalendarStore } from "@/stores/calendar";
  import { useTasksStore, type Task } from "@/stores/tasks";
  import {
    ArrowLongRightIcon,
    ArrowPathIcon,
    CheckIcon,
    ClockIcon,
    TrashIcon,
  } from "@heroicons/vue/20/solid";

  const tasksStore = useTasksStore();
  const calendarStore = useCalendarStore();

  const props = defineProps<{
    task: Task;
  }>();

  const skipTask = () => {
    tasksStore.skipTask(props.task.id, calendarStore.selectedDateAsDate);
  };

  const completeTask = () => {
    tasksStore.completeTask(props.task.id);
  };

  const removeTask = () => {
    tasksStore.removeTask(props.task.id);
  };
</script>
