<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { computed, TransitionGroup } from "vue";
  import Message from "../molecules/Message.vue";

  const tasksStore = useTasksStore();
  const filteredTasks = computed(() => tasksStore.filteredTasks);
</script>

<template>
  <div
    v-if="filteredTasks.length === 0"
    class="flex h-full w-full items-center text-5xl font-extrabold text-[#D0CCFF]"
  >
    <p class="w-full text-center">Add a task</p>
  </div>
  <TransitionGroup
    v-else
    name="tasks"
    tag="div"
    class="h-full place-content-end-safe space-y-2 overflow-y-auto"
  >
    <Message v-for="task of filteredTasks" :task="task" :key="task.id" />
  </TransitionGroup>
</template>
