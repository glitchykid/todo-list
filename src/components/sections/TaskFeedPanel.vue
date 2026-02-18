<template>
  <div class="h-full w-full overflow-y-auto">
    <!-- Empty state -->
    <div
      v-if="tasks.length === 0"
      class="flex h-full items-center justify-center px-6"
    >
      <div class="w-full max-w-md rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-raised)] px-6 py-10 text-center">
        <p class="text-2xl leading-8 font-bold app-title-muted">No tasks yet</p>
        <p class="mt-2 text-base text-[var(--color-text-muted)]">
          Add your first task from the input below.
        </p>
      </div>
    </div>

    <!-- Messages container with chat-like behavior -->
    <div v-else ref="messagesContainer" class="h-full overflow-y-auto">
      <TransitionGroup
        name="tasks"
        tag="div"
        class="relative flex min-h-full flex-col justify-end space-y-2"
      >
        <TaskMessageCard v-for="task in tasks" :task="task" :key="task.id" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { computed, nextTick, onMounted, ref, watch } from "vue";
  import TaskMessageCard from "../composites/TaskMessageCard.vue";

  const tasksStore = useTasksStore();
  const tasks = computed(() => tasksStore.getTasks);
  const messagesContainer = ref<HTMLElement>();

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  };

  watch(tasks, scrollToBottom, { deep: true });

  onMounted(() => {
    if (tasks.value.length > 0) {
      scrollToBottom();
    }
  });
</script>
