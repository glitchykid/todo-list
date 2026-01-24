<script setup lang="ts">
  import ChatInput from "@/components/organisms/ChatInput.vue";
  import { useAddTask, type AddTask } from "@/composables/useAddTask.ts";
  import type { Task } from "@/stores/tasks";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import RegularButton from "../atoms/RegularButton.vue";

  const valuesForAddTask = ref<AddTask>({
    id: 0,
    task: null,
  });

  const updateTask = (e: Task) => {
    if (!e) return;
    valuesForAddTask.value.task = e;
  };
  const handleAddTask = () => {
    useAddTask(valuesForAddTask.value);
    valuesForAddTask.value.id++;
  };
</script>

<template>
  <div class="flex flex-row place-items-end-safe gap-10">
    <ChatInput
      class="w-full"
      :id="valuesForAddTask?.id"
      @update:task="updateTask"
      :valuesForAddTask="valuesForAddTask"
    />
    <RegularButton
      :icon="PlusCircleIcon"
      @click="handleAddTask"
      :without-paddings-for-icon="true"
    />
  </div>
</template>
