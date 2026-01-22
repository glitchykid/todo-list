<script setup lang="ts">
  import type { Task } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { toLocaleDate } from "@/utils/isodateconverter";
  import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
  import SimpleCheckbox from "../atoms/SimpleCheckbox.vue";
  import type { SortingOption } from "../templates/MainWindowForHistoryAndBin.vue";

  export type Type = "history" | "bin";

  const props = defineProps<{
    filteredTasks: Task[];
    sortingOptions: SortingOption[];
  }>();

  const activeSortingOption = defineModel<SortingOption>();
  const workspacesStore = useWorkspacesStore();
  const checkedTasks = defineModel<string[]>("checkedTasks", {
    required: true,
  });
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
          <SimpleCheckbox
            :id="String(filteredTask.id)"
            class="ml-auto flex accent-[#8276FF]"
            v-model:checked-tasks="checkedTasks"
          />
        </div>
      </div>
    </div>
  </div>
</template>
