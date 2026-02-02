<template>
  <div class="h-full w-full overflow-y-auto">
    <!-- Empty state -->
    <div
      v-if="tasks.length === 0"
      class="flex h-full items-center justify-center text-5xl font-extrabold text-[#D0CCFF]"
    >
      <p class="w-full text-center">Add a task</p>
    </div>

    <!-- Messages container with chat-like behavior -->
    <div v-else ref="messagesContainer" class="h-full overflow-y-auto">
      <TransitionGroup
        name="tasks"
        tag="div"
        class="flex min-h-full flex-col justify-end space-y-2"
      >
        <Message v-for="task in tasks" :task="task" :key="task.id" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { computed, nextTick, onMounted, ref, watch } from "vue";
  import Message from "../molecules/Message.vue";

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
