<script setup lang="ts">
  import type { Component } from "vue";

  const props = defineProps<{
    label?: string | number;
    icon?: Component;
    active?: boolean;
    border?: boolean;
    customIconSize?: number;
    withoutPaddingsForIcon?: boolean;
  }>();
</script>

<template>
  <button
    v-if="props.label"
    class="relative z-10 flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-2 text-center leading-6 text-nowrap transition-all duration-300"
    :class="[
      props.border && 'border border-[#8276FF]',
      props.active
        ? 'bg-[#8276FF] text-[#EAEDF2] shadow-lg shadow-[#8276FF]/50'
        : 'text-[#8276FF] hover:bg-[#D0CCFF]',
    ]"
  >
    <component v-if="props.icon" :is="props.icon" class="size-5" />
    <slot>{{ props.label }}</slot>
  </button>
  <button
    v-else-if="props.icon && !props.label"
    class="relative z-10 flex flex-row p- items-center justify-center leading-6 transition-all duration-300"
    :class="withoutPaddingsForIcon ? 'p-0' : 'px-4 py-2'"
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      class="text-[#8276FF] transition-all duration-300 hover:scale-125"
      :class="
        customIconSize && typeof customIconSize === 'number'
          ? 'size-' + customIconSize
          : 'size-8'
      "
    />
  </button>
</template>
