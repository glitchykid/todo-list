<script lang="ts" setup>
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";

  const props = defineProps<{
    values: string[];
  }>();

  const defaultValue = defineModel<string, "trim">("defaultValue", {
    required: true,
  });

  const isOpen = ref<boolean>(false);
  const selected = ref<string>(defaultValue.value ?? props.values[0] ?? "");

  const toogleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const changeValue = (value: string): void => {
    selected.value = value;
    defaultValue.value = value;
    isOpen.value = false;
  };
</script>

<template>
  <div class="relative z-50">
    <div
      :class="
        isOpen
          ? 'bg-[#8276FF] text-[#EAEDF2]'
          : 'text-[#8276FF] hover:bg-[#D0CCFF]'
      "
      class="flex min-w-38 flex-row items-center justify-between gap-4 rounded-lg border border-[#C9D7ED] p-4 transition-all duration-300"
      @click="toogleDropdown"
    >
      <span class="select-none">{{ selected }}</span>
      <ChevronDownIcon class="size-5" />
    </div>
    <div
      v-if="isOpen"
      class="absolute top-full flex max-h-60 w-full flex-col overflow-auto rounded-lg border border-[#C9D7ED] bg-white"
    >
      <span
        v-for="value of values"
        :key="value"
        :class="
          selected === value
            ? 'bg-[#8276FF] text-[#EAEDF2]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        class="w-full gap-y-4 py-2 text-center transition-all duration-300"
        @click="changeValue(value)"
        >{{ value }}</span
      >
    </div>
  </div>
</template>
