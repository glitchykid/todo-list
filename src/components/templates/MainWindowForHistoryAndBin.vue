-
<script setup lang="ts">
  import MoleculeFilter from "@/components/molecules/Filter.vue";
  import TaskInfo, { type Type } from "@/components/molecules/TaskInfo.vue";
  import { filteringTasks } from "@/composables/useFilteringTasks";
  import { useSelectAll } from "@/composables/useSelectAll";
  import { useTasksStore, type Task } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { sort } from "@/utils/sort";
  import { storeToRefs } from "pinia";
  import { computed, ref, watch } from "vue";

  const props = defineProps<{
    type: Type;
  }>();
  export type SortingOption = "Task" | "Space" | "Due date" | "Completed on";

  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();

  const { completedTasks, removedTasks } = storeToRefs(tasksStore);

  const forFiltering = ref<{ space: string; task: string }>({
    space: "",
    task: "",
  });
  const checkedTasks = ref<string[]>([]);
  const purgeCheckedTasks = () => {
    checkedTasks.value.forEach((id) => {
      tasksStore.purgeTask(props.type, id);
    });
    checkedTasks.value = [];
  };
  const whichTypeOfRadioButtonWasPicked = ref<string>("Show all");

  const sortingOptions: SortingOption[] = [
    "Task",
    "Space",
    "Due date",
    "Completed on",
  ];

  const activeSortingOption = ref<SortingOption>("Task");

  const filteredTasks = computed(() => {
    let result: Task[] = [];
    switch (props.type) {
      case "history":
        result = filteringTasks(forFiltering.value, completedTasks.value);
        break;
      case "bin":
        result = filteringTasks(forFiltering.value, removedTasks.value);
        break;
      default:
        result = tasksStore.tasks;
    }

    if (whichTypeOfRadioButtonWasPicked.value === "Repeatable tasks")
      result = result.filter((task) => task.repeatable);
    else if (whichTypeOfRadioButtonWasPicked.value === "Regular tasks")
      result = result.filter((task) => !task.repeatable);

    if (activeSortingOption.value === "Task")
      result.sort((a, b) => sort(a.title, b.title));
    else if (activeSortingOption.value === "Space")
      result.sort((a, b) => {
        const aName = workspacesStore.getWorkspaceById(a.workspace);
        const bName = workspacesStore.getWorkspaceById(b.workspace);
        return sort(aName?.name, bName?.name);
      });
    else if (activeSortingOption.value === "Due date")
      result.sort((a, b) => sort(a.dueDate, b.dueDate));
    else if (activeSortingOption.value === "Completed on")
      result.sort((a, b) => sort(a.completedOn, b.completedOn));
    return result;
  });

  const isSelectAll = ref<boolean>(false);

  watch(isSelectAll, () => {
    checkedTasks.value = useSelectAll(checkedTasks.value, filteredTasks.value);
  });
</script>

<template>
  <h6 class="text-center text-[#D0CCFF]">
    {{ props.type.charAt(0).toUpperCase() + props.type.slice(1) }}
  </h6>
  <MoleculeFilter
    v-model:task-filter="forFiltering.task"
    v-model:space-filter="forFiltering.space"
    v-model:picked="whichTypeOfRadioButtonWasPicked"
  />
  <section class="flex flex-row place-content-end gap-2 text-center">
    <span
      class="text-[#3E3D4D]/50"
      :class="checkedTasks.length > 0 && 'cursor-pointer text-[#8276FF]'"
      @click="checkedTasks.length > 0 && purgeCheckedTasks()"
    >
      Remove
    </span>
    <span
      class="text-[#3E3D4D]/50"
      :class="checkedTasks.length > 0 && 'cursor-pointer text-[#8276FF]'"
    >
      Recovery
    </span>
    <span
      class="text-[#3E3D4D]/50"
      :class="filteredTasks.length > 0 && 'cursor-pointer text-[#8276FF]'"
      @click="if (filteredTasks.length > 0) isSelectAll = !isSelectAll;"
    >
      Select all
    </span>
  </section>
  <div
    v-if="filteredTasks.length === 0"
    class="flex h-full w-full items-center text-5xl font-extrabold text-[#D0CCFF]"
  >
    <p class="w-full text-center">There are no {{ props.type }} yet</p>
  </div>
  <TaskInfo
    v-else
    :type="props.type"
    v-model:checked-tasks="checkedTasks"
    :sorting-options="sortingOptions"
    :active-sorting-option="activeSortingOption"
    :filtered-tasks="filteredTasks"
    :select-all="isSelectAll"
  />
</template>
