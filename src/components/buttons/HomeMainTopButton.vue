<script setup lang="ts">
const props = defineProps<{
  label: string;
  active: boolean;
}>();
</script>

<template>
  <button
    class="px-4 py-2 rounded-[8px] transition-all duration-300 border-1 border-[#8276FF]"
    :class="
      active
        ? 'bg-[#8276FF] text-[#EAEDF2]'
        : 'text-[#8276FF] hover:bg-[#D0CCFF]'
    "
  >
    <slot>{{ props.label }}</slot>
  </button>
</template>
