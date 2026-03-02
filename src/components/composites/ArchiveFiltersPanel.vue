<script setup lang="ts">
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";
  import RadioField from "../primitives/RadioField.vue";
  import TextField from "../primitives/TextField.vue";

  type RadioInput = {
    key: string;
    mobileId: string;
    desktopId: string;
    value: string;
  };

  const radioGroupInstanceId = Math.random().toString(36).slice(2, 8);

  const radioInputs: RadioInput[] = [
    {
      key: "regularTasks",
      mobileId: `regularTasks-mobile-${radioGroupInstanceId}`,
      desktopId: `regularTasks-desktop-${radioGroupInstanceId}`,
      value: "Regular tasks",
    },
    {
      key: "repeatableTasks",
      mobileId: `repeatableTasks-mobile-${radioGroupInstanceId}`,
      desktopId: `repeatableTasks-desktop-${radioGroupInstanceId}`,
      value: "Repeatable tasks",
    },
    {
      key: "showAll",
      mobileId: `showAll-mobile-${radioGroupInstanceId}`,
      desktopId: `showAll-desktop-${radioGroupInstanceId}`,
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
    <div class="app-disclosure md:hidden">
      <div class="app-disclosure-header">
        <span class="app-disclosure-title">Filters</span>
        <ActionButton
          :icon="isMobileOpen ? ChevronUpIcon : ChevronDownIcon"
          aria-label="Toggle filters"
          class="h-11 w-11"
          :without-paddings-for-icon="true"
          @click="isMobileOpen = !isMobileOpen"
        />
      </div>

      <Transition name="expand">
        <div
          v-if="isMobileOpen"
          class="app-disclosure-body flex h-fit w-full flex-col gap-4"
        >
          <div class="flex h-fit w-full flex-col gap-3">
            <TextField
              class="grid w-full grid-cols-1 gap-3 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
              label="Task name"
              :placeholder="textInputs[0]!.placeholder"
              v-model:filter="taskFilter"
            />
            <TextField
              class="grid w-full grid-cols-1 gap-3 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
              label="Space name"
              :placeholder="textInputs[1]!.placeholder"
              v-model:filter="spaceFilter"
            />
          </div>
          <fieldset class="flex h-fit flex-wrap items-start gap-3">
            <legend class="sr-only">Task type</legend>
            <RadioField
              v-for="radioInput in radioInputs"
              :key="radioInput.key"
              :id="radioInput.mobileId"
              :value="radioInput.value"
              :picked="picked"
              @pick="picked = $event"
            />
          </fieldset>
        </div>
      </Transition>
    </div>

    <div
      class="hidden h-fit w-full flex-col gap-4 border-t border-b border-[var(--color-border)] py-4 md:flex md:flex-row md:items-center md:justify-between"
    >
      <div
        class="flex h-fit w-full flex-col gap-3 md:w-[30rem] md:min-w-[30rem]"
      >
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3"
          label="Task name"
          :placeholder="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        />
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3"
          label="Space name"
          :placeholder="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        />
      </div>
      <fieldset
        class="flex h-fit flex-col items-start gap-3 md:flex-row md:items-center md:gap-4"
      >
        <legend class="sr-only">Task type</legend>
        <RadioField
          v-for="radioInput in radioInputs"
          :key="`desktop-${radioInput.key}`"
          :id="radioInput.desktopId"
          :value="radioInput.value"
          :picked="picked"
          @pick="picked = $event"
        />
      </fieldset>
    </div>
  </div>
</template>
