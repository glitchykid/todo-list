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
  <div class="flex flex-row gap-2">
    <label
      :for="props.id"
      class="text-xs text-nowrap text-[var(--color-text-muted)]/85"
    >
      {{ props.value }}
    </label>
    <input
      type="radio"
      :id="props.id"
      :value="props.value"
      :checked="props.picked === props.value"
      @change="emit('pick', props.value)"
      class="h-5 w-5 rounded-lg accent-[var(--color-primary)]"
    />
  </div>
</template>
