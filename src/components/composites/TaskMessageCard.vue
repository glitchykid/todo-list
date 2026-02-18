<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="flex w-full items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3"
    >
      <!-- Task info -->
      <div class="w-full flex-1">
        <h3
          class="mb-2.5 text-[16px] font-bold break-all text-[var(--color-text)]"
        >
          {{ task.title }}
        </h3>
        <div class="flex items-center gap-1.5">
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] md:px-3 md:py-1.5 md:text-[12px]"
            style="
              background-color: color-mix(
                in srgb,
                var(--color-primary) 20%,
                transparent
              );
              color: var(--color-primary);
            "
          >
            <ClockIcon class="size-3 md:size-4" />
            {{ task.dueTime }}
          </span>
          <span
            v-if="task.repeatable"
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] md:px-3 md:py-1.5 md:text-[12px]"
            style="
              background-color: color-mix(
                in srgb,
                var(--color-warning) 28%,
                transparent
              );
              color: var(--color-warning);
            "
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
          type="button"
          aria-label="Skip repeated task for selected date"
          @click="skipTask"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-primary-hover)] text-[var(--color-info)] transition-colors duration-200 hover:brightness-95"
        >
          <ArrowLongRightIcon class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Complete task"
          @click="completeTask"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-primary-hover)] text-[var(--color-success)] transition-colors duration-200 hover:brightness-95"
        >
          <CheckIcon class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Remove task"
          @click="removeTask"
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-primary-hover)] text-[var(--color-danger)] transition-colors duration-200 hover:brightness-95"
        >
          <TrashIcon class="size-4" />
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

  const skipTask = async () => {
    await tasksStore.skipTask(props.task.id, calendarStore.selectedDateAsDate);
  };

  const completeTask = async () => {
    await tasksStore.completeTask(props.task.id);
  };

  const removeTask = async () => {
    await tasksStore.removeTask(props.task.id);
  };
</script>
