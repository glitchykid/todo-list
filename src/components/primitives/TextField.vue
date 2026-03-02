<script setup lang="ts">
  import { computed, useAttrs } from "vue";

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      placeholder?: string;
    }>(),
    {
      placeholder: "",
    },
  );

  const attrs = useAttrs();
  const filter = defineModel<string, "trim">("filter");

  const wrapperClass = computed(() => attrs.class);

  const inputAttrs = computed(() => {
    const { class: _class, ...rest } = attrs;
    return rest;
  });
</script>

<template>
  <div :class="wrapperClass">
    <label
      v-if="props.label"
      :for="props.id"
      class="text-sm font-medium text-[var(--color-text-muted)]"
    >
      {{ props.label }}
    </label>
    <slot />
    <input
      :id="props.id"
      type="text"
      class="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-3.5 text-[var(--color-text)] transition-colors placeholder:text-[var(--color-text-muted)]/80 hover:bg-[var(--color-control-hover)]"
      :placeholder="props.placeholder"
      v-bind="inputAttrs"
      v-model="filter"
    />
  </div>
</template>
