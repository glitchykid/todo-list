<script setup lang="ts">
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
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

  // Mobile-only UI: start collapsed to save vertical space.
  const isMobileOpen = ref<boolean>(false);
</script>

<template>
  <div class="w-full text-[#3E3D4D]">
    <!-- Mobile-only collapse header -->
    <div
      class="flex items-center justify-between border-t border-b border-[#C9D7ED] py-3 md:hidden"
    >
      <span class="text-sm font-semibold text-[#8276FF]">Filters</span>
      <RegularButton
        :icon="isMobileOpen ? ChevronUpIcon : ChevronDownIcon"
        :without-paddings-for-icon="true"
        @click="isMobileOpen = !isMobileOpen"
      />
    </div>

    <!-- Mobile: collapsible body -->
    <div
      v-show="isMobileOpen"
      class="flex h-fit w-full flex-row items-center justify-between gap-10 border-b border-[#C9D7ED] py-4 md:hidden"
    >
      <div class="flex h-fit w-fit flex-col items-end gap-2">
        <SimpleTextInput
          class="flex w-full flex-row items-center gap-2 text-nowrap md:w-auto"
          :placehodler="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        >
          <label class="hidden md:inline-block">
            {{ textInputs[0]!.description }}
          </label>
        </SimpleTextInput>
        <SimpleTextInput
          class="flex w-full flex-row items-center gap-2 text-nowrap md:w-auto"
          :placehodler="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        >
          <label class="hidden md:inline-block">
            {{ textInputs[1]!.description }}
          </label>
        </SimpleTextInput>
      </div>
      <div
        class="flex h-fit flex-col items-end gap-2 md:flex-row md:items-center md:gap-4"
      >
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

    <!-- Desktop-only: always visible -->
    <div
      class="hidden h-fit w-full flex-row items-center justify-between gap-10 border-t border-b border-[#C9D7ED] py-4 md:flex"
    >
      <div class="flex h-fit w-fit flex-col items-end gap-2">
        <SimpleTextInput
          class="flex w-full flex-row items-center gap-2 text-nowrap md:w-auto"
          :placehodler="textInputs[0]!.placeholder"
          v-model:filter="taskFilter"
        >
          <label class="hidden md:inline-block">
            {{ textInputs[0]!.description }}
          </label>
        </SimpleTextInput>
        <SimpleTextInput
          class="flex w-full flex-row items-center gap-2 text-nowrap md:w-auto"
          :placehodler="textInputs[1]!.placeholder"
          v-model:filter="spaceFilter"
        >
          <label class="hidden md:inline-block">
            {{ textInputs[1]!.description }}
          </label>
        </SimpleTextInput>
      </div>
      <div
        class="flex h-fit flex-col items-end gap-2 md:flex-row md:items-center md:gap-4"
      >
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
  </div>
</template>
