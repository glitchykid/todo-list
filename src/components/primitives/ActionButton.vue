<script setup lang="ts">
  import { computed, type Component } from "vue";

  const props = defineProps<{
    label?: string | number;
    icon?: Component;
    active?: boolean;
    border?: boolean;
    customIconSize?: number;
    withoutPaddingsForIcon?: boolean;
    noTruncate?: boolean;
    ariaLabel?: string;
  }>();

  const computedAriaLabel = computed(
    () =>
      props.ariaLabel ??
      (typeof props.label === "string" ? props.label : "Action"),
  );

  const computedIconSize = computed(() =>
    typeof props.customIconSize === "number"
      ? `${props.customIconSize * 0.25}rem`
      : "1.5rem",
  );
</script>

<template>
  <button
    v-if="props.label"
    type="button"
    :aria-label="computedAriaLabel"
    :title="computedAriaLabel"
    class="relative z-10 flex min-h-11 min-w-0 cursor-pointer flex-row items-center justify-center gap-2 rounded-xl px-4 py-2 text-center leading-6 text-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-40"
    :class="[
      props.border && 'border border-[var(--color-border)]',
      props.active
        ? 'border border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-button-hover-text)]',
    ]"
  >
    <component v-if="props.icon" :is="props.icon" class="size-5" />
    <span :class="!props.noTruncate && 'truncate'">{{ props.label }}</span>
  </button>
  <button
    v-else-if="props.icon && !props.label"
    type="button"
    :aria-label="computedAriaLabel"
    :title="computedAriaLabel"
    class="relative z-10 flex min-h-11 min-w-11 cursor-pointer flex-row items-center justify-center rounded-xl leading-6 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
    :class="[
      props.withoutPaddingsForIcon ? 'p-0' : 'px-4 py-2',
      props.active
        ? 'border border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-button-hover-text)]',
    ]"
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      class="transition-transform hover:scale-105"
      :style="{ width: computedIconSize, height: computedIconSize }"
    />
  </button>
</template>
