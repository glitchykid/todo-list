<script setup lang="ts">
  import { ref } from "vue";
  import SimpleRadioInput from "../atoms/SimpleRadioInput.vue";
  import SimpleTextInput from "../atoms/SimpleTextInput.vue";

  type RadioInput = {
    id: string;
    value: string;
  };

  const radioInputs: RadioInput[] = [
    {
      id: "regularTasks",
      value: "Regular tasks",
    },
    {
      id: "repeatableTasks",
      value: "Repeatable tasks",
    },
    {
      id: "showAll",
      value: "Show all",
    },
  ] as const;

  const picked = defineModel<string>("picked", { required: true });

  const idTextInput = ref<number>(0);

  const textInputs = [
    {
      id: idTextInput.value++,
      description: "Task name:",
      placeholder: "Enter a task name",
    },
    {
      id: idTextInput.value++,
      description: "Space name:",
      placeholder: "Enter a space name",
    },
  ];

  const taskFilter = defineModel<string>("taskFilter");
  const spaceFilter = defineModel<string>("spaceFilter");
</script>

<template>
  <div
    class="flex h-fit flex-row items-center justify-between gap-10 border-t border-b border-[#C9D7ED] py-4 text-[#3E3D4D]"
  >
    <div class="flex h-fit flex-col items-end gap-2">
      <SimpleTextInput
        class="flex flex-row items-center gap-2 text-nowrap"
        :placehodler="textInputs[0]!.placeholder"
        v-model:filter="taskFilter"
      >
        <label>
          {{ textInputs[0]!.description }}
        </label>
      </SimpleTextInput>
      <SimpleTextInput
        class="flex flex-row items-center gap-2 text-nowrap"
        :placehodler="textInputs[1]!.placeholder"
        v-model:filter="spaceFilter"
      >
        <label>
          {{ textInputs[1]!.description }}
        </label>
      </SimpleTextInput>
    </div>
    <div class="flex h-fit flex-row items-center gap-4">
      <SimpleRadioInput
        v-for="radioInput in radioInputs"
        :key="radioInput.id"
        :id="radioInput.id"
        :value="radioInput.value"
        :picked="picked"
        @click="picked = radioInput.value"
      />
    </div>
  </div>
</template>
