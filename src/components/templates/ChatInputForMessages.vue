<script setup lang="ts">
  import ChatInput from "@/components/organisms/ChatInput.vue";
  import { useAddTask } from "@/composables/useAddTask.ts";
  import { type Task } from "@/stores/tasks";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import RegularButton from "../atoms/RegularButton.vue";

  let newTask = ref<Task>();

  const updateTask = (e: Task) => {
    if (!e) return;
    newTask.value = e;
  };
  const handleAddTask = () => {
    if (newTask.value) useAddTask(newTask.value);
  };
</script>

<template>
  <div class="flex flex-row place-items-end-safe gap-4 md:gap-10">
    <ChatInput class="w-full" @update:task="updateTask" :newTask="newTask" />
    <RegularButton
      :icon="PlusCircleIcon"
      @click="handleAddTask"
      :without-paddings-for-icon="true"
    />
  </div>
</template>
