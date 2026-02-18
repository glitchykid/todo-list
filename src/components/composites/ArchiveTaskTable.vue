<script setup lang="ts">
  import type { ArchiveSortingOption } from "@/application/archive/types";
  import type { Task } from "@/stores/tasks";
  import { toLocaleDate } from "@/utils/dateLogic";
  import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
  import CheckboxField from "../primitives/CheckboxField.vue";

  const props = defineProps<{
    filteredTasks: Task[];
    sortingOptions: ArchiveSortingOption[];
    toggleSelectAll: () => void;
    allSelected: boolean;
  }>();

  const activeSortingOption = defineModel<ArchiveSortingOption>(
    "activeSortingOption",
  );
  const checkedTasks = defineModel<number[]>("checkedTasks", {
    required: true,
  });
</script>

<template>
  <div class="w-full">
    <!-- Desktop Sorting Header -->
    <div
      class="mb-3 hidden grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_3rem] items-center gap-3 px-3 text-center text-[var(--color-text-muted)] md:grid"
    >
      <div v-for="option of sortingOptions" :key="option" class="w-full">
        <button
          type="button"
          class="flex min-h-11 w-full cursor-pointer items-center justify-center gap-1 border px-3 transition-colors duration-200"
          :class="
            activeSortingOption === option
              ? 'border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] text-[var(--color-button-active-text)] shadow-[var(--shadow-soft)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-primary-active)] hover:text-[var(--color-button-hover-text)]'
          "
          @click="activeSortingOption = option"
        >
          <span>{{ option }}</span>
          <ChevronDownIcon
            v-show="activeSortingOption === option"
            class="size-5"
          />
        </button>
      </div>
      <label
        class="mx-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-200 hover:border-[var(--color-primary-active)]"
      >
        <input
          type="checkbox"
          :checked="props.allSelected"
          @change="props.toggleSelectAll()"
          aria-label="Select all filtered tasks"
          class="h-5 w-5 cursor-pointer accent-[var(--color-primary)]"
        />
      </label>
    </div>

    <!-- Mobile Card Layout -->
    <div
      class="flex flex-col gap-4 leading-3 text-[var(--color-text)] md:hidden"
    >
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 shadow-[var(--shadow-soft)]"
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-start gap-2">
                <span class="text-base leading-6 font-semibold break-words">
                  {{ filteredTask.title }}
                </span>
                <ArrowPathIcon
                  v-if="filteredTask.repeatable"
                  class="app-title-muted mt-1 size-4 shrink-0"
                />
              </div>
              <div
                class="mt-2 inline-flex min-h-8 items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-muted)]"
              >
                {{ filteredTask.workspaceSnapshot ?? "Deleted workspace" }}
              </div>
            </div>
            <CheckboxField
              :id="String(filteredTask.id)"
              class="accent-[var(--color-primary)]"
              v-model:checked-tasks="checkedTasks"
            />
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-xl bg-[var(--color-surface)] px-3 py-2">
              <p class="text-[var(--color-text-muted)]">Due date</p>
              <p class="mt-1 leading-5 text-[var(--color-text)]">
                {{ toLocaleDate(filteredTask.dueDate, filteredTask.dueTime) }}
              </p>
            </div>
            <div class="rounded-xl bg-[var(--color-surface)] px-3 py-2">
              <p class="text-[var(--color-text-muted)]">Completed on</p>
              <p class="mt-1 leading-5 text-[var(--color-text)]">
                {{ filteredTask.completedOn || "Not completed" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Table Layout -->
    <div class="hidden w-full flex-col gap-2 text-[var(--color-text)] md:flex">
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_3rem] items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-3 text-center"
      >
        <div class="flex min-w-0 flex-row items-center justify-start gap-2">
          <span class="font-semibold break-all">{{ filteredTask.title }}</span>
          <ArrowPathIcon
            v-if="filteredTask.repeatable"
            class="app-title-muted size-5 w-fit shrink-0"
          />
        </div>
        <div class="flex justify-center">
          <span
            class="inline-flex min-h-8 items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-muted)]"
          >
            {{ filteredTask.workspaceSnapshot ?? "Deleted workspace" }}
          </span>
        </div>
        <div class="px-2">
          <p class="text-xs text-[var(--color-text-muted)]">Due date</p>
          <p class="mt-1 truncate">
            {{ toLocaleDate(filteredTask.dueDate, filteredTask.dueTime) }}
          </p>
        </div>
        <div class="px-2">
          <p class="text-xs text-[var(--color-text-muted)]">Completed on</p>
          <p class="mt-1 truncate">
            {{ filteredTask.completedOn || "Not completed" }}
          </p>
        </div>
        <CheckboxField
          :id="String(filteredTask.id)"
          class="mx-auto flex accent-[var(--color-primary)]"
          v-model:checked-tasks="checkedTasks"
        />
      </div>
    </div>
  </div>
</template>
