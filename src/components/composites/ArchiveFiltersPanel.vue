<script setup lang="ts">
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import RadioField from "../primitives/RadioField.vue";
  import TextField from "../primitives/TextField.vue";

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

  const textInputs = [
    {
      placeholder: "Enter a task name",
    },
    {
      placeholder: "Enter a space name",
    },
  ];

  const taskFilter = defineModel<string>("taskFilter");
  const spaceFilter = defineModel<string>("spaceFilter");

  // Mobile-only UI: start collapsed to save vertical space.
  const isMobileOpen = ref<boolean>(false);
</script>

<template>
  <div class="w-full text-[var(--color-text)]">
    <div
      class="flex items-center justify-between border-t border-b border-[var(--color-border)] py-3 md:hidden"
    >
      <span class="text-sm font-semibold tracking-wide text-[var(--color-text-muted)]">
        Filters
      </span>
      <ActionButton
        :icon="isMobileOpen ? ChevronUpIcon : ChevronDownIcon"
        aria-label="Toggle filters"
        :without-paddings-for-icon="true"
        @click="isMobileOpen = !isMobileOpen"
      />
    </div>

    <div
      v-show="isMobileOpen"
      class="flex h-fit w-full flex-col gap-4 border-b border-[var(--color-border)] py-4 md:hidden"
    >
      <div class="flex h-fit w-full flex-col gap-2">
        <TextField
          class="grid w-full grid-cols-1 gap-2 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
          label="Task name"
          :placeholder="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        />
        <TextField
          class="grid w-full grid-cols-1 gap-2 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
          label="Space name"
          :placeholder="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        />
      </div>
      <fieldset class="flex h-fit flex-col items-start gap-2">
        <legend class="sr-only">Task type</legend>
        <RadioField
          v-for="radioInput in radioInputs"
          :key="radioInput.id"
          :id="radioInput.id"
          :value="radioInput.value"
          :picked="picked"
          @pick="picked = $event"
        />
      </fieldset>
    </div>

    <div
      class="hidden h-fit w-full flex-col gap-4 border-t border-b border-[var(--color-border)] py-4 md:flex md:flex-row md:items-center md:justify-between"
    >
      <div
        class="flex h-fit w-full flex-col gap-2 md:w-[30rem] md:min-w-[30rem]"
      >
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2"
          label="Task name"
          :placeholder="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        />
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2"
          label="Space name"
          :placeholder="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        />
      </div>
      <fieldset
        class="flex h-fit flex-col items-start gap-2 md:flex-row md:items-center md:gap-4"
      >
        <legend class="sr-only">Task type</legend>
        <RadioField
          v-for="radioInput in radioInputs"
          :key="radioInput.id"
          :id="radioInput.id"
          :value="radioInput.value"
          :picked="picked"
          @pick="picked = $event"
        />
      </fieldset>
    </div>
  </div>
</template>
