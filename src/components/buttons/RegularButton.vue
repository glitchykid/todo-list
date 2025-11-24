<script setup lang="ts">
  import type { RegularIcon } from "@/components/AppIcon.vue";
  import AppIcon from "@/components/AppIcon.vue";

  const props = defineProps<{
    label: string | number;
    icon?: RegularIcon;
    active?: boolean;
    border?: boolean;
  }>();
</script>

<template>
  <button
    class="relative z-10 flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-2 text-center leading-none text-nowrap transition-all duration-300"
    :class="[
      props.border && 'border border-[#8276FF]',
      props.active
        ? 'bg-[#8276FF] text-[#EAEDF2]'
        : 'text-[#8276FF] hover:bg-[#D0CCFF]',
    ]"
  >
    <AppIcon v-if="props.icon" :name="props.icon" />
    <slot>{{ props.label }}</slot>
  </button>
</template>
