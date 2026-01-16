<script setup lang="ts">
  import { ref } from "vue";
  import AtomSimpleRadioInput from "../atoms/AtomSimpleRadioInput.vue";
  import AtomSimpleTextInput from "../atoms/AtomSimpleTextInput.vue";

  type RadioInput = {
    id: string;
    value: string;
  };

  export type ForFiltering = {
    space: string;
    task: string;
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
  const picked = ref<string>("Show all");

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

  const forFiltering = ref<ForFiltering>({
    space: "",
    task: "",
  });
  const emit = defineEmits<{
    update: [filtering: ForFiltering];
  }>();
</script>

<template>
  <div
    class="flex h-fit flex-row items-center justify-between gap-10 border-t border-b border-[#C9D7ED] py-4 text-[#3E3D4D]"
  >
    <div class="flex h-fit flex-col items-end gap-2">
      <AtomSimpleTextInput
        class="flex flex-row items-center gap-2 text-nowrap"
        :placehodler="textInputs[0]!.placeholder"
        @update="forFiltering.space = $event"
      >
        <label>
          {{ textInputs[0]!.description }}
        </label>
      </AtomSimpleTextInput>
      <AtomSimpleTextInput
        class="flex flex-row items-center gap-2 text-nowrap"
        :placehodler="textInputs[1]!.placeholder"
        @update="forFiltering.task = $event"
      >
        <label>
          {{ textInputs[1]!.description }}
        </label>
      </AtomSimpleTextInput>
    </div>
    <div class="flex h-fit flex-row items-center gap-4">
      <AtomSimpleRadioInput
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
