<script setup lang="ts">
  import { useTaskComposerSection } from "@/application/tasks/useTaskComposerSection";
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import TaskComposer from "@/components/sections/TaskComposer.vue";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";

  const { composerResetToken, updateTaskDraft, submitTask, canSubmitTask } =
    useTaskComposerSection();
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
    <TaskComposer
      class="w-full"
      @update:task="updateTaskDraft"
      @submit="submitTask"
      :reset-token="composerResetToken"
    />
    <ActionButton
      class="md:hidden"
      label="Add task"
      :icon="PlusCircleIcon"
      aria-label="Add task"
      @click="submitTask"
      :active="canSubmitTask"
      :disabled="!canSubmitTask"
      :border="true"
    />
    <ActionButton
      class="hidden h-11 w-11 rounded-xl border border-[var(--color-border)] md:inline-flex"
      :icon="PlusCircleIcon"
      aria-label="Add task"
      @click="submitTask"
      :without-paddings-for-icon="true"
      :active="canSubmitTask"
      :disabled="!canSubmitTask"
    />
  </div>
</template>
