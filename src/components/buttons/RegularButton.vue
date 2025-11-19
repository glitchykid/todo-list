<script setup lang="ts">
  const props = defineProps<{
    name: string | number;
    label: string | number;
    active?: boolean;
    border?: boolean;
  }>();
</script>

<template>
  <button
    class="relative z-10 rounded-lg text-nowrap transition-all duration-300"
    :class="[
      props.border && 'border border-[#8276FF]',
      props.active
        ? 'bg-[#8276FF] text-[#EAEDF2]'
        : 'text-[#8276FF] hover:bg-[#D0CCFF]',
    ]"
  >
    <slot>{{ props.label }}</slot>
  </button>
</template>
