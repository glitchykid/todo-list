<script setup lang="ts">
  import { filteringTasks } from "@/composables/useFilteringTasks";
  import type { Task } from "@/stores/tasks";
  import { useTasksStore } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { toLocaleDate } from "@/utils/isodateconverter";
  import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, ref, watch } from "vue";
  import AtomSimpleCheckbox from "../atoms/AtomSimpleCheckbox.vue";

  export type Type = "history" | "bin";

  const props = defineProps<{
    type: Type;
    whichTypeOfRadioButtonWasPicked: string;
    forFiltering: {
      space: string;
      task: string;
    };
  }>();

  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();
  const { completedTasks, removedTasks } = storeToRefs(tasksStore);
  const filteredTasks = computed(() => {
    let result: Task[] = [];
    switch (props.type) {
      case "history":
        result = filteringTasks(props.forFiltering, completedTasks.value);
        break;
      case "bin":
        result = filteringTasks(props.forFiltering, removedTasks.value);
        break;
      default:
        result = tasksStore.tasks;
    }
    if (props.whichTypeOfRadioButtonWasPicked === "Repeatable tasks")
      result = result.filter((task) => task.repeatable);
    else if (props.whichTypeOfRadioButtonWasPicked === "Regular tasks")
      result = result.filter((task) => !task.repeatable);
    if (activeSortingOption.value === "Task")
      result.sort((a, b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        return 0;
      });
    else if (activeSortingOption.value === "Space")
      result.sort((a, b) => {
        const aName = workspacesStore.getWorkspaceById(a.workspace);
        const bName = workspacesStore.getWorkspaceById(b.workspace);
        if (aName!.name < bName!.name) return -1;
        else if (aName!.name > bName!.name) return 1;
        return 0;
      });
    else if (activeSortingOption.value === "Due date")
      result.sort((a, b) => {
        if (a.dueDate < b.dueDate) return -1;
        else if (a.dueDate > b.dueDate) return 1;
        return 0;
      });
    else if (activeSortingOption.value === "Completed on")
      result.sort((a, b) => {
        if (a.completedOn < b.completedOn) return -1;
        else if (a.completedOn > b.completedOn) return 1;
        return 0;
      });
    return result;
  });

  const selectAll = defineModel<boolean>("selectAll", { required: true });
  const checkedTasks = defineModel<string[]>("checkedTasks", {
    required: true,
  });

  watch(selectAll, () => {
    switch (props.type) {
      case "history":
        if (checkedTasks.value.length >= completedTasks.value.length) {
          checkedTasks.value = [];
        } else {
          completedTasks.value.forEach((el) => {
            const isThereNoTheSameTask: boolean = checkedTasks.value.every(
              (el2) => el2 !== String(el.id),
            );
            if (isThereNoTheSameTask) {
              checkedTasks.value.push(String(el.id));
            }
          });
        }
        break;
      case "bin":
        if (checkedTasks.value.length >= removedTasks.value.length) {
          checkedTasks.value = [];
        } else {
          removedTasks.value.forEach((el) => {
            const isThereNoTheSameTask: boolean = checkedTasks.value.every(
              (el2) => el2 !== String(el.id),
            );
            if (isThereNoTheSameTask) {
              checkedTasks.value.push(String(el.id));
            }
          });
        }
        break;
    }
  });

  type SortingOption = "Task" | "Space" | "Due date" | "Completed on";

  const sortingOptions: SortingOption[] = [
    "Task",
    "Space",
    "Due date",
    "Completed on",
  ];

  const activeSortingOption = ref<SortingOption>("Task");
</script>

<template>
  <div class="flex w-auto flex-row items-center">
    <div class="flex w-full flex-col gap-2">
      <div
        class="flex w-full flex-row items-center text-center text-[#3E3D4D]/50"
      >
        <div v-for="option of sortingOptions" class="w-full">
          <div class="flex w-full flex-row justify-center gap-1 text-center">
            <span
              class="cursor-pointer"
              @click="activeSortingOption = option"
              >{{ option }}</span
            >
            <ChevronDownIcon
              v-show="activeSortingOption === option"
              class="size-5"
            />
          </div>
        </div>
      </div>
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="relative flex h-10 flex-row items-center border-l-2 border-l-[#8276FF] text-center"
      >
        <div class="flex w-full flex-row justify-center gap-2.5">
          <span class="font-bold">{{ filteredTask.title }}</span>
          <ArrowPathIcon
            v-if="filteredTask.repeatable"
            class="size-5 text-[#D0CCFF]"
          />
        </div>
        <span class="w-full">{{
          workspacesStore.workspaces[filteredTask.workspace]!.name
        }}</span>
        <span class="w-full">{{
          toLocaleDate(filteredTask.dueDate, filteredTask.dueTime)
        }}</span>
        <span class="w-full">{{ filteredTask.completedOn }}</span>
        <div class="absolute h-fit w-full">
          <AtomSimpleCheckbox
            :id="String(filteredTask.id)"
            class="ml-auto flex accent-[#8276FF]"
            v-model:checked-tasks="checkedTasks"
          />
        </div>
      </div>
    </div>
  </div>
</template>
