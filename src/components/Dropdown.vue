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
      class="flex flex-row p-4 gap-4 border border-[#C9D7ED] rounded-lg min-w-38 justify-between items-center transition-all duration-300"
      @click="toogleDropdown"
    >
      <span class="select-none">{{ selected }}</span>
      <AppIcon name="chevronDown" />
    </div>
    <div
      v-if="isOpen"
      class="flex flex-col absolute border bg-white border-[#C9D7ED] w-full top-full rounded-lg max-h-60 overflow-auto"
    >
      <span
        v-for="value of values"
        :key="value"
        :class="
          selected === value
            ? 'bg-[#8276FF] text-[#EAEDF2]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        class="text-center gap-y-4 w-full py-2 transition-all duration-300 select-none"
        @click.stop="changeValue(value)"
        >{{ value }}</span
      >
    </div>
  </div>
</template>
