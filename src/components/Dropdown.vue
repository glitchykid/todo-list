<script setup lang="ts">
import AppIcon from "@/components/AppIcon.vue";
import { ref } from "vue";

const props = defineProps<{
  values: string[];
  default: string;
}>();

const defaultValue = ref(props.default);
const active = ref(false);
const toogleDropdown = () => {
  active.value = !active.value;
};

const activeValue = ref(false);
const changeValue = (value: string): void => {
  defaultValue.value = value;
  toogleDropdown();
};
</script>

<template>
  <div class="relative">
    <div
      class="flex flex-row p-4 gap-4 border-1 border-[#C9D7ED] rounded-[8px] min-w-46 justify-between transition-all duration-300"
      :class="
        active
          ? 'bg-[#8276FF] text-[#EAEDF2]'
          : 'text-[#8276FF] hover:bg-[#D0CCFF]'
      "
      @click="toogleDropdown"
    >
      <span>{{ defaultValue }}</span>
      <AppIcon name="chevronDown" />
    </div>
    <div
      v-if="active"
      class="flex flex-col absolute border-1 bg-white border-[#C9D7ED] min-w-46 top-full rounded-[8px] max-h-60 overflow-auto"
    >
      <span
        v-for="value of values"
        :key="value"
        class="text-center gap-y-4 w-full py-2 transition-all duration-300"
        :class="
          activeValue || defaultValue === value
            ? 'bg-[#8276FF] text-[#EAEDF2]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        @click="changeValue(value)"
        >{{ value }}</span
      >
    </div>
  </div>
</template>
