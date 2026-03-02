<template>
  <section
    class="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden"
    aria-live="polite"
  >
    <!-- Empty state -->
    <div
      v-if="tasks.length === 0"
      class="flex flex-1 items-center justify-center px-2 sm:px-6"
    >
      <div class="app-card w-full max-w-md border-dashed px-5 py-8 text-center sm:px-6 sm:py-10">
        <p class="text-xl leading-7 font-semibold app-title-muted sm:text-2xl sm:leading-8">No tasks yet</p>
        <p class="mt-2 text-sm text-[var(--color-text-muted)] sm:text-base">
          Add your first task from the input below.
        </p>
      </div>
    </div>

    <!-- Messages container with chat-like behavior -->
    <div
      v-else
      ref="messagesContainer"
      class="min-h-0 flex-1 overflow-y-auto"
    >
      <TransitionGroup
        name="tasks"
        tag="div"
        class="relative flex min-h-full flex-col justify-end gap-4 pb-2 md:pb-1"
      >
        <TaskMessageCard v-for="task in tasks" :task="task" :key="task.id" />
      </TransitionGroup>
    </div>
  </section>
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
