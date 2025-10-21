<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";

const props = defineProps<{
  name: string | number;
  label: string | number;
  active?: boolean;
  border?: boolean;
}>();
</script>

<template>
  <button
    class="relative z-10 text-nowrap transition-all rounded-[8px] duration-300"
    :class="[
      props.border && 'border-1 border-[#8276FF]',
      props.active
        ? 'bg-[#8276FF] text-[#EAEDF2]'
        : 'text-[#8276FF] hover:bg-[#D0CCFF]',
    ]"
  >
    <slot>{{ props.label }}</slot>
    <Calendar v-if="props.name === 'select' && props.active" />
  </button>
</template>
