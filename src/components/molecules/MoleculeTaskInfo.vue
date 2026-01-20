<script setup lang="ts">
  import { filteringTasks } from "@/composables/useFilteringTasks";
  import type { Task } from "@/stores/tasks";
  import { useTasksStore } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { toLocaleDate } from "@/utils/isodateconverter";
  import { ArrowPathIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, watch } from "vue";
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
        if (props.whichTypeOfRadioButtonWasPicked === "Repeatable tasks")
          result = result.filter((task) => task.repeatable);
        else if (props.whichTypeOfRadioButtonWasPicked === "Regular tasks")
          result = result.filter((task) => !task.repeatable);
        break;
      case "bin":
        result = filteringTasks(props.forFiltering, removedTasks.value);
        break;
      default:
        result = tasksStore.tasks;
    }
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
</script>

<template>
  <div class="flex w-auto flex-row items-center">
    <div class="flex w-full flex-col gap-2">
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="flex h-10 flex-row items-center border-l-2 border-l-[#8276FF]"
      >
        <div class="flex w-full flex-row justify-center gap-2.5">
          <span class="font-bold">{{ filteredTask.title }}</span>
          <ArrowPathIcon
            v-if="filteredTask.repeatable"
            class="size-5 text-[#D0CCFF]"
          />
        </div>
        <span class="w-full text-center">{{
          workspacesStore.workspaces[filteredTask.workspace]!.name
        }}</span>
        <span class="w-full text-center">{{
          toLocaleDate(filteredTask.dueDate, filteredTask.dueTime)
        }}</span>
        <span class="w-full text-center">{{ filteredTask.completedOn }}</span>
        <AtomSimpleCheckbox
          :id="String(filteredTask.id)"
          class="ml-auto w-fit accent-[#8276FF]"
          v-model:checked-tasks="checkedTasks"
        />
      </div>
    </div>
  </div>
</template>
