<script setup lang="ts">
  import { useTaskComposerSection } from "@/application/tasks/useTaskComposerSection";
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import TaskComposer from "@/components/sections/TaskComposer.vue";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";

  const { composerResetToken, updateTaskDraft, submitTask, canSubmitTask } =
    useTaskComposerSection();
</script>

<template>
  <div class="flex items-center gap-3 md:gap-4">
    <TaskComposer
      class="w-full"
      @update:task="updateTaskDraft"
      @submit="submitTask"
      :reset-token="composerResetToken"
    />
    <ActionButton
      :icon="PlusCircleIcon"
      aria-label="Add task"
      @click="submitTask"
      :without-paddings-for-icon="true"
      :active="canSubmitTask"
      :disabled="!canSubmitTask"
      class="h-11 w-11 rounded-xl border border-[var(--color-border)]"
    />
  </div>
</template>
