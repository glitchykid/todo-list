<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";

  type Type = "history" | "bin";

  const props = defineProps<{
    type: Type;
  }>();

  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();
</script>

<template>
  <section
    class="flex w-auto flex-row place-content-stretch border-l-2 border-l-[#8276FF]"
  >
    <span
      v-if="props.type === 'history'"
      v-for="completeTask in tasksStore.completedTasks"
      :key="completeTask.id"
      class="flex flex-row gap-2"
    >
      <span v-for="(value, key) in completeTask" :key="key"></span>
    </span>
    <input type="checkbox" class="accent-[#8276FF]" />
  </section>
</template>
