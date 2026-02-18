<script setup lang="ts">
  import type { TaskRepeatRule } from "@/domain/tasks/repeat";

  const typesOfRepeat: TaskRepeatRule[] = [
    "none",
    "every day",
    "every week",
    "every month",
  ];

  const defaultValue = defineModel<TaskRepeatRule>("defaultValue");

  const emit = defineEmits<{
    (e: "toggle-types-of-repeat", v: boolean): void;
    (e: "handle-type", v: string): void;
    (e: "update:defaultValue", v: string): void;
  }>();

  const changeDefault = (newDefaultType: TaskRepeatRule) => {
    defaultValue.value = newDefaultType;
    emit("toggle-types-of-repeat", false);
  };
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        class="fixed inset-0 z-[90] bg-[var(--color-overlay)]"
        @click="emit('toggle-types-of-repeat', false)"
      />
    </Transition>

    <Transition name="popover" appear>
      <div
        class="fixed top-1/2 left-1/2 z-[100] flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-56 -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]"
      >
        <button
          v-for="type in typesOfRepeat"
          :key="type"
          type="button"
          class="min-h-11 w-full cursor-pointer py-2 text-center transition-colors select-none"
          :class="
            defaultValue === type
              ? 'bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)]'
              : 'text-[var(--color-text-muted)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-button-hover-text)]'
          "
          @click="changeDefault(type)"
        >
          {{ type }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
