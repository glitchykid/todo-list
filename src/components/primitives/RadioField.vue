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
  <div class="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-3 py-2 text-sm transition-colors hover:bg-[var(--color-control-hover)]">
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
      class="cursor-pointer text-sm leading-5 text-nowrap text-[var(--color-text-muted)]"
    >
      {{ props.value }}
    </label>
  </div>
</template>
