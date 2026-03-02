<script setup lang="ts">
  import { useIsDesktop } from "@/composables/useIsDesktop";
  import { useTaskComposerSection } from "@/application/tasks/useTaskComposerSection";
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import TaskComposer from "@/components/sections/TaskComposer.vue";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { computed } from "vue";

  const { composerResetToken, updateTaskDraft, submitTask, canSubmitTask } =
    useTaskComposerSection();
  const { isDesktop } = useIsDesktop();
  const submitButtonLabel = computed(() =>
    isDesktop.value ? undefined : "Add task",
  );
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
    <TaskComposer
      class="w-full"
      @update:task="updateTaskDraft"
      @submit="submitTask"
      :reset-token="composerResetToken"
    />
    <ActionButton
      class="h-11 w-full rounded-xl border border-[var(--color-border)] md:w-11"
      :label="submitButtonLabel"
      :icon="PlusCircleIcon"
      aria-label="Add task"
      @click="submitTask"
      :without-paddings-for-icon="isDesktop"
      :active="canSubmitTask"
      :disabled="!canSubmitTask"
      :border="true"
    />
  </div>
</template>
