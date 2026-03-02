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
      : "1.25rem",
  );

  const isBordered = computed(() => props.border !== false);

  const stateClasses = computed(() =>
    props.active
      ? "bg-[var(--color-primary-hover)] text-[var(--color-heading)]"
      : isBordered.value
        ? "bg-[var(--color-control-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-button-hover-text)]"
        : "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-button-hover-text)]",
  );

  const borderClasses = computed(() =>
    isBordered.value
      ? props.active
        ? "border border-[var(--color-primary-active)]"
        : "border border-[var(--color-border)]"
      : "border border-transparent",
  );
</script>

<template>
  <button
    v-if="props.label"
    type="button"
    :aria-label="computedAriaLabel"
    :title="computedAriaLabel"
    class="relative z-10 inline-flex min-h-11 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-center text-sm leading-5 font-semibold whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45"
    :class="[borderClasses, stateClasses]"
  >
    <component v-if="props.icon" :is="props.icon" class="size-5 shrink-0" />
    <span :class="!props.noTruncate && 'truncate'">{{ props.label }}</span>
  </button>
  <button
    v-else-if="props.icon && !props.label"
    type="button"
    :aria-label="computedAriaLabel"
    :title="computedAriaLabel"
    class="relative z-10 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl leading-6 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45"
    :class="[
      props.withoutPaddingsForIcon ? 'p-0' : 'px-4 py-2',
      borderClasses,
      stateClasses,
    ]"
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      :style="{ width: computedIconSize, height: computedIconSize }"
    />
  </button>
</template>
