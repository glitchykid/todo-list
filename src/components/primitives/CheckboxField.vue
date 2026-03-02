<script setup lang="ts">
  const checkedTasks = defineModel<number[]>("checkedTasks");

  const props = defineProps<{
    id: string;
    ariaLabel?: string;
  }>();
</script>

<template>
  <input
    type="checkbox"
    :value="props.id"
    v-model="checkedTasks"
    :aria-label="props.ariaLabel ?? `Select task ${props.id}`"
    class="h-5 w-5 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-primary)]"
  />
</template>
