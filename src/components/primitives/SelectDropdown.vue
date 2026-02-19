<script lang="ts" setup>
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";

  const props = defineProps<{
    values: string[];
  }>();

  const defaultValue = defineModel<string, "trim">("defaultValue", {
    required: true,
  });

  const isOpen = ref<boolean>(false);
  const selected = ref<string>(defaultValue.value ?? props.values[0] ?? "");

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const changeValue = (value: string): void => {
    selected.value = value;
    defaultValue.value = value;
    isOpen.value = false;
  };
</script>

<template>
  <div class="relative z-50">
    <button
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :class="
        isOpen
          ? 'border border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
          : 'bg-[var(--color-control-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-button-hover-text)]'
      "
      class="flex min-h-11 min-w-38 cursor-pointer flex-row items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] px-3 py-2 text-left transition-colors"
      @click="toggleDropdown"
    >
      <span class="select-none">{{ selected }}</span>
      <ChevronDownIcon class="size-5" />
    </button>
    <Transition name="popover">
      <div
        v-if="isOpen"
        class="absolute top-full mt-2 flex max-h-60 w-full flex-col overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-soft)]"
        role="listbox"
      >
        <button
          v-for="value of values"
          :key="value"
          type="button"
          :class="
            selected === value
              ? 'bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
              : 'bg-[var(--color-control-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-button-hover-text)]'
          "
          class="min-h-11 w-full cursor-pointer py-2 text-center transition-colors"
          @click="changeValue(value)"
        >
          {{ value }}
        </button>
      </div>
    </Transition>
  </div>
</template>
