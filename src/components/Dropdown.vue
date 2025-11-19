<script lang="ts" setup>
  import AppIcon from "@/components/AppIcon.vue";
  import { ref, watch } from "vue";

  const props = defineProps<{
    values: string[];
    default: string;
  }>();

  const emit = defineEmits<(e: "update:default", v: string) => void>();

  const isOpen = ref(false);
  const selected = ref(props.default ?? props.values[0] ?? "");

  watch(
    () => props.default,
    (v) => {
      if (v !== undefined && v !== selected.value) selected.value = v;
    },
  );

  const toogleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const changeValue = (value: string): void => {
    selected.value = value;
    emit("update:default", value);
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
      <AppIcon name="chevronDown" />
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
        class="w-full gap-y-4 py-2 text-center transition-all duration-300 select-none"
        @click.stop="changeValue(value)"
        >{{ value }}</span
      >
    </div>
  </div>
</template>
