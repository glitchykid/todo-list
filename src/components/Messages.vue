<script setup lang="ts">
  import { useTasksStore, type Task } from "@/stores/tasks";
  import {
    ArrowLongRightIcon,
    ArrowPathIcon,
    CheckIcon,
    ClockIcon,
    TrashIcon,
  } from "@heroicons/vue/20/solid";

  const tasksStore = useTasksStore();

  const props = defineProps<{
    task: Task;
  }>();

  const styles: { textAndIcon: string; onlyIcon: string } = {
    textAndIcon: "flex w-40 flex-row items-center justify-center gap-2",
    onlyIcon: "flex w-9 items-center justify-center",
  };
</script>

<template>
  <div
    class="flex flex-col ml-auto w-fit overflow-hidden rounded-t-2xl rounded-bl-2xl"
  >
    <div
      class="bg-[#D0CCFF] px-4 py-1.5 leading-6 text-pretty wrap-break-word break-all text-[#3E3D4D]"
      :class="props.task.repeatable ? 'w-107' : 'w-58'"
    >
      <span>{{ props.task.title }}</span>
    </div>
    <div class="flex h-9 flex-row">
      <div
        v-if="props.task.repeatable"
        class="bg-[#3E3D4D] px-5 text-[#ABA4FF]"
        :class="styles.textAndIcon"
      >
        <ArrowPathIcon class="size-5" />
        <span>{{ props.task.repeatable }}</span>
      </div>
      <div class="bg-[#ABA4FF] px-5 text-[#3E3D4D]" :class="styles.textAndIcon">
        <ClockIcon class="size-5" />
        <span>{{ props.task.dueTime }}</span>
      </div>
      <div
        class="bg-[#92D6F3] text-[#314D59]"
        :class="styles.onlyIcon"
        v-if="props.task.repeatable"
      >
        <ArrowLongRightIcon class="size-5" />
      </div>
      <div
        class="bg-[#8CE98C] text-[#274F27] transition-colors duration-300 hover:bg-[#aeffae]"
        :class="styles.onlyIcon"
      >
        <CheckIcon class="size-5" />
      </div>
      <div
        class="bg-[#E27575] text-[#4F2929] transition-color duration-300 hover:bg-[#ffa3a3]"
        :class="styles.onlyIcon"
        @click="tasksStore.removeTask(task.id)"
      >
        <TrashIcon class="size-5" />
      </div>
    </div>
  </div>
</template>
