<template>
  <div class="flex h-full min-h-0 flex-col gap-4">
    <slot
      name="header"
      :type="props.type"
      :filters="filters"
      :which-type="activeTaskTypeFilter"
    >
      <h6 class="app-section-title text-center">
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
      <section class="flex flex-row flex-wrap place-content-end gap-2 text-center">
        <button
          type="button"
          class="min-h-11 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-4 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-control-hover)] disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            checkedTaskIds.length > 0 && 'text-[var(--color-danger)]'
          "
          :disabled="checkedTaskIds.length === 0"
          @click="purgeCheckedTasks"
        >
          Purge
        </button>
        <button
          type="button"
          class="min-h-11 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-4 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-control-hover)] disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            checkedTaskIds.length > 0 && 'text-[var(--color-success)]'
          "
          :disabled="checkedTaskIds.length === 0"
          @click="recoverCheckedTasks"
        >
          Recover
        </button>
      </section>
    </slot>

    <section class="flex min-h-0 flex-1 flex-col overflow-hidden">
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
          class="flex h-full w-full items-center justify-center px-2 py-2 sm:px-6"
        >
          <div
            class="app-card w-full max-w-md border-dashed px-5 py-8 text-center sm:px-6 sm:py-10"
          >
            <p class="app-title-muted text-xl leading-7 font-semibold sm:text-2xl sm:leading-8">
              {{ emptyMessage }}
            </p>
            <p class="mt-2 text-sm text-[var(--color-text-muted)] sm:text-base">
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
          class="min-h-0 flex-1 overflow-y-auto"
        />
      </slot>
    </section>
  </div>
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
