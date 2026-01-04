<script setup lang="ts">
  import ChatInput from "@/components/organisms/OrganismChatInput.vue";
  import type { AddTask } from "@/composables/useAddTask";
  import { useAddTask } from "@/composables/useAddTask";
  import type { Task } from "@/stores/tasks";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import AtomRegularButton from "../atoms/AtomRegularButton.vue";

  const valuesForAddTask: AddTask = {
    id: ref<number>(0),
    task: ref<Task | null>(null),
  };

  useAddTask(valuesForAddTask);
</script>

<template>
  <div class="flex flex-row place-items-end-safe gap-10">
    <ChatInput
      class="w-full"
      :id="valuesForAddTask.id.value"
      @update:task="valuesForAddTask.task.value = $event"
      :valuesForAddTask="valuesForAddTask"
    />
    <AtomRegularButton
      :icon="PlusCircleIcon"
      @click="useAddTask(valuesForAddTask)"
      :without-paddings-for-icon="true"
    />
  </div>
</template>
