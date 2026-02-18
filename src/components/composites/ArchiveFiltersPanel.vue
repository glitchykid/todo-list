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

  // Mobile-only UI: start collapsed to save vertical space.
  const isMobileOpen = ref<boolean>(false);
</script>

<template>
  <div class="w-full text-[var(--color-text)]">
    <!-- Mobile-only collapse header -->
    <div
      class="flex items-center justify-between border-t border-b border-[var(--color-border)] py-3 md:hidden"
    >
      <span class="text-sm font-semibold text-[var(--color-text-muted)]">
        Filters
      </span>
      <ActionButton
        :icon="isMobileOpen ? ChevronUpIcon : ChevronDownIcon"
        aria-label="Toggle filters"
        :without-paddings-for-icon="true"
        @click="isMobileOpen = !isMobileOpen"
      />
    </div>

    <!-- Mobile: collapsible body -->
    <div
      v-show="isMobileOpen"
      class="flex h-fit w-full flex-col gap-4 border-b border-[var(--color-border)] py-4 md:hidden"
    >
      <div class="flex h-fit w-full flex-col gap-2">
        <TextField
          class="grid w-full grid-cols-1 gap-2 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
          :placeholder="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        >
          <label
            class="hidden text-sm text-[var(--color-text-muted)] md:inline-block"
          >
            {{ textInputs[0]!.description }}
          </label>
        </TextField>
        <TextField
          class="grid w-full grid-cols-1 gap-2 md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-center"
          :placeholder="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        >
          <label
            class="hidden text-sm text-[var(--color-text-muted)] md:inline-block"
          >
            {{ textInputs[1]!.description }}
          </label>
        </TextField>
      </div>
      <div class="flex h-fit flex-col items-start gap-2">
        <RadioField
          v-for="radioInput in radioInputs"
          :key="radioInput.id"
          :id="radioInput.id"
          :value="radioInput.value"
          :picked="picked"
          @pick="picked = $event"
        />
      </div>
    </div>

    <!-- Desktop-only: always visible -->
    <div
      class="hidden h-fit w-full flex-col gap-4 border-t border-b border-[var(--color-border)] py-4 md:flex md:flex-row md:items-center md:justify-between"
    >
      <div
        class="flex h-fit w-full flex-col gap-2 md:w-[30rem] md:min-w-[30rem]"
      >
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2"
          :placeholder="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        >
          <label
            class="hidden text-sm text-[var(--color-text-muted)] md:inline-block"
          >
            {{ textInputs[0]!.description }}
          </label>
        </TextField>
        <TextField
          class="grid w-full grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2"
          :placeholder="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        >
          <label
            class="hidden text-sm text-[var(--color-text-muted)] md:inline-block"
          >
            {{ textInputs[1]!.description }}
          </label>
        </TextField>
      </div>
      <div
        class="flex h-fit flex-col items-start gap-2 md:flex-row md:items-center md:gap-4"
      >
        <RadioField
          v-for="radioInput in radioInputs"
          :key="radioInput.id"
          :id="radioInput.id"
          :value="radioInput.value"
          :picked="picked"
          @pick="picked = $event"
        />
      </div>
    </div>
  </div>
</template>
