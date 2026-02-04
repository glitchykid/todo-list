<script setup lang="ts">
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import ChatInput from "@/components/organisms/ChatInput.vue";
  import { useAddTask } from "@/composables/useAddTask";
  import { type Task } from "@/stores/tasks";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";

  // The ChatInput emits a fully built Task draft; we keep it here until user hits "+".
  const newTask = ref<Task>();

  const updateTask = (task: Task) => {
    newTask.value = task;
  };
  const handleAddTask = () => {
    if (newTask.value) useAddTask(newTask.value);
  };
</script>

<template>
  <div class="flex items-center gap-3 md:gap-6">
    <ChatInput class="w-full" @update:task="updateTask" :newTask="newTask" />
    <RegularButton
      :icon="PlusCircleIcon"
      @click="handleAddTask"
      :without-paddings-for-icon="true"
    />
  </div>
</template>
