<template>
  <slot
    name="header"
    :type="props.type"
    :filters="filters"
    :which-type="activeTaskTypeFilter"
  >
    <h6 class="app-title-muted text-center !text-[var(--color-text-muted)]">
      {{ title }}
    </h6>
    <ArchiveFiltersPanel
      v-model:task-filter="filters.task"
      v-model:space-filter="filters.space"
      v-model:picked="activeTaskTypeFilter"
    />
  </slot>

  <slot
    name="actions"
    :checked-tasks="checkedTaskIds"
    :filtered-tasks="filteredTasks"
    :toggle-select-all="toggleSelectAll"
    :all-selected="allTasksChecked"
    :purge="purgeCheckedTasks"
    :recover="recoverCheckedTasks"
  >
    <section class="flex flex-row place-content-end gap-2 text-center">
      <button
        type="button"
        class="min-h-11 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-3 text-[var(--color-text-muted)] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        :class="
          checkedTaskIds.length > 0 &&
          'text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
        "
        :disabled="checkedTaskIds.length === 0"
        @click="purgeCheckedTasks"
      >
        Purge
      </button>
      <button
        type="button"
        class="min-h-11 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-3 text-[var(--color-text-muted)] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        :class="
          checkedTaskIds.length > 0 &&
          'text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
        "
        :disabled="checkedTaskIds.length === 0"
        @click="recoverCheckedTasks"
      >
        Recovery
      </button>
    </section>
  </slot>

  <slot
    name="body"
    :filtered-tasks="filteredTasks"
    :checked-tasks="checkedTaskIds"
    :active-sorting-option="activeSortingOption"
    :sorting-options="sortingOptions"
    :toggle-select-all="toggleSelectAll"
    :all-selected="allTasksChecked"
  >
    <div
      v-if="filteredTasks.length === 0"
      class="flex h-full w-full items-center justify-center px-6"
    >
      <div
        class="w-full max-w-md rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-raised)] px-6 py-10 text-center"
      >
        <p class="app-title-muted text-2xl leading-8 font-bold">
          {{ emptyMessage }}
        </p>
        <p class="mt-2 text-base text-[var(--color-text-muted)]">
          Try updating filters or complete more tasks.
        </p>
      </div>
    </div>
    <ArchiveTaskTable
      v-else
      v-model:checked-tasks="checkedTaskIds"
      v-model:active-sorting-option="activeSortingOption"
      :filtered-tasks="filteredTasks"
      :sorting-options="sortingOptions"
      :toggle-select-all="toggleSelectAll"
      :all-selected="allTasksChecked"
      class="overflow-y-auto"
    />
  </slot>
</template>

<script setup lang="ts">
  import { useArchiveManagementView } from "@/application/archive/useArchiveManagementView";
  import ArchiveFiltersPanel from "@/components/composites/ArchiveFiltersPanel.vue";
  import ArchiveTaskTable from "@/components/composites/ArchiveTaskTable.vue";
  import type { TaskArchiveScope } from "@/domain/tasks/archive-scope";
  import { computed } from "vue";

  const props = defineProps<{
    type: TaskArchiveScope;
  }>();
  const {
    title,
    emptyMessage,
    filters,
    checkedTaskIds,
    activeTaskTypeFilter,
    sortingOptions,
    activeSortingOption,
    filteredTasks,
    toggleSelectAll,
    purgeCheckedTasks,
    recoverCheckedTasks,
  } = useArchiveManagementView(props.type);

  const allTasksChecked = computed(
    () =>
      filteredTasks.value.length > 0 &&
      checkedTaskIds.value.length === filteredTasks.value.length,
  );
</script>
