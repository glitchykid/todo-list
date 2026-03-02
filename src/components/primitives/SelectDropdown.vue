<script lang="ts" setup>
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { computed, onMounted, onUnmounted, ref, watch } from "vue";

  const props = defineProps<{
    values: string[];
  }>();

  const defaultValue = defineModel<string, "trim">("defaultValue", {
    required: true,
  });

  const isOpen = ref<boolean>(false);
  const selected = ref<string>("");
  const rootRef = ref<HTMLElement | null>(null);

  const normalizedValues = computed(() =>
    props.values.filter((value) => value.trim().length > 0),
  );

  const dropdownId = `select-dropdown-${Math.random().toString(36).slice(2, 10)}`;
  const triggerId = `${dropdownId}-trigger`;
  const listboxId = `${dropdownId}-listbox`;

  watch(
    [normalizedValues, () => defaultValue.value],
    ([values, modelValue]) => {
      const fallback = modelValue ?? values[0] ?? "";
      const nextSelected = values.includes(fallback) ? fallback : (values[0] ?? "");

      selected.value = nextSelected;
      if (defaultValue.value !== nextSelected) {
        defaultValue.value = nextSelected;
      }
    },
    { immediate: true },
  );

  const openDropdown = () => {
    if (normalizedValues.value.length === 0) return;
    isOpen.value = true;
  };

  const closeDropdown = () => {
    isOpen.value = false;
  };

  const toggleDropdown = () => {
    if (isOpen.value) {
      closeDropdown();
      return;
    }

    openDropdown();
  };

  const changeValue = (value: string): void => {
    selected.value = value;
    defaultValue.value = value;
    closeDropdown();
  };

  const handleRootKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeDropdown();
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!rootRef.value?.contains(target)) {
      closeDropdown();
    }
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
</script>

<template>
  <div
    ref="rootRef"
    class="relative z-50"
    @keydown="handleRootKeydown"
  >
    <button
      :id="triggerId"
      type="button"
      class="app-control flex min-h-11 min-w-38 cursor-pointer items-center justify-between gap-3 px-3 text-left text-sm font-semibold"
      :class="
        isOpen
          ? 'border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
          : 'text-[var(--color-text-muted)]'
      "
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      @click="toggleDropdown"
    >
      <span class="truncate">{{ selected }}</span>
      <ChevronDownIcon
        class="size-5 shrink-0 transition-transform"
        :class="isOpen && 'rotate-180'"
      />
    </button>

    <Transition name="popover">
      <div
        v-if="isOpen"
        :id="listboxId"
        class="app-card absolute top-full right-0 left-0 mt-2 flex max-h-60 flex-col overflow-auto p-1"
        role="listbox"
        :aria-labelledby="triggerId"
      >
        <button
          v-for="value of normalizedValues"
          :key="value"
          type="button"
          role="option"
          :aria-selected="selected === value"
          class="min-h-11 w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
          :class="
            selected === value
              ? 'bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
              : 'text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-button-hover-text)]'
          "
          @click="changeValue(value)"
        >
          {{ value }}
        </button>
      </div>
    </Transition>
  </div>
</template>
