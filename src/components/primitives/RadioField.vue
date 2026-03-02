<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      id: string;
      value: string;
      picked: string;
    }>(),
    {
      id: "default",
      value: "default",
      picked: "default",
    },
  );

  const emit = defineEmits<{
    (e: "pick", value: string): void;
  }>();
</script>

<template>
  <div
    class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors"
    :class="
      props.picked === props.value
        ? 'border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
        : 'border-[var(--color-border)] bg-[var(--color-control-surface)] hover:bg-[var(--color-control-hover)]'
    "
  >
    <input
      type="radio"
      :id="props.id"
      :value="props.value"
      :checked="props.picked === props.value"
      @change="emit('pick', props.value)"
      class="h-4 w-4 cursor-pointer accent-[var(--color-primary)]"
    />
    <label
      :for="props.id"
      class="cursor-pointer text-sm leading-5 text-[var(--color-text-muted)]"
    >
      {{ props.value }}
    </label>
  </div>
</template>
