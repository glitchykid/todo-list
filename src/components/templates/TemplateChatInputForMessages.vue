<script setup lang="ts">
  import ChatInput from "@/components/organisms/OrganismChatInput.vue";
  import { useAddTask, type AddTask } from "@/composables/useAddTask.ts";
  import type { Task } from "@/stores/tasks";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import AtomRegularButton from "../atoms/AtomRegularButton.vue";

  const valuesForAddTask = ref<AddTask>({
    id: 0,
    task: null,
  });

  const updateTask = (e: Task) => {
    if (!e) return;
    valuesForAddTask.value.task = e;
  };
  useAddTask(valuesForAddTask.value);
</script>

<template>
  <div class="flex flex-row place-items-end-safe gap-10">
    <ChatInput
      class="w-full"
      :id="valuesForAddTask?.id"
      @update:task="updateTask"
      :valuesForAddTask="valuesForAddTask"
    />
    <AtomRegularButton
      :icon="PlusCircleIcon"
      @click="useAddTask(valuesForAddTask)"
      :without-paddings-for-icon="true"
    />
  </div>
</template>
