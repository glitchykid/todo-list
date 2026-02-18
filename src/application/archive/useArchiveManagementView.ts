import type { ArchiveSortingOption } from "@/application/archive/types";
import { filteringTasks } from "@/composables/useFilteringTasks";
import { useSelectAll } from "@/composables/useSelectAll";
import type { TaskArchiveScope } from "@/domain/tasks/archive-scope";
import { useTasksStore, type Task } from "@/stores/tasks";
import { useWorkspacesStore } from "@/stores/workspaces";
import { sort } from "@/utils/sort";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

type ArchiveFilters = {
  space: string;
  task: string;
};

export function useArchiveManagementView(scope: TaskArchiveScope) {
  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();
  const { completedTasks, removedTasks } = storeToRefs(tasksStore);

  const filters = ref<ArchiveFilters>({
    space: "",
    task: "",
  });
  const checkedTaskIds = ref<number[]>([]);
  const activeTaskTypeFilter = ref<string>("Show all");
  const activeSortingOption = ref<ArchiveSortingOption>("Task");
  const isSelectAll = ref<boolean>(false);

  const sortingOptions: ArchiveSortingOption[] = [
    "Task",
    "Space",
    "Due date",
    "Completed on",
  ];

  const title = computed(
    () => scope.charAt(0).toUpperCase() + scope.slice(1),
  );

  const emptyMessage = computed(() =>
    scope === "history" ? "No completed tasks yet" : "Bin is empty",
  );

  const filteredTasks = computed(() => {
    const getWorkspaceName = (workspaceId: number) =>
      workspacesStore.getWorkspaceById(workspaceId)?.name;

    let result: Task[] =
      scope === "history"
        ? filteringTasks(filters.value, completedTasks.value, getWorkspaceName)
        : filteringTasks(filters.value, removedTasks.value, getWorkspaceName);

    if (activeTaskTypeFilter.value === "Repeatable tasks") {
      result = result.filter((task) => task.repeatable);
    } else if (activeTaskTypeFilter.value === "Regular tasks") {
      result = result.filter((task) => !task.repeatable);
    }

    switch (activeSortingOption.value) {
      case "Task":
        result.sort((a, b) => sort(a.title, b.title));
        break;
      case "Space":
        result.sort((a, b) => {
          const aName = workspacesStore.getWorkspaceById(a.workspace)?.name;
          const bName = workspacesStore.getWorkspaceById(b.workspace)?.name;
          return sort(aName, bName);
        });
        break;
      case "Due date":
        result.sort((a, b) => sort(a.dueDate, b.dueDate));
        break;
      case "Completed on":
        result.sort((a, b) => sort(a.completedOn, b.completedOn));
        break;
    }

    return result;
  });

  const toggleSelectAll = () => {
    if (filteredTasks.value.length > 0) {
      isSelectAll.value = !isSelectAll.value;
    }
  };

  const purgeCheckedTasks = async () => {
    await Promise.all(
      checkedTaskIds.value.map((id) => tasksStore.purgeTask(scope, Number(id))),
    );
    checkedTaskIds.value = [];
  };

  const recoverCheckedTasks = async () => {
    await Promise.all(
      checkedTaskIds.value.map((id) => tasksStore.recoverTask(scope, Number(id))),
    );
    checkedTaskIds.value = [];
  };

  watch(isSelectAll, () => {
    checkedTaskIds.value = useSelectAll(checkedTaskIds.value, filteredTasks.value);
  });

  return {
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
  };
}

