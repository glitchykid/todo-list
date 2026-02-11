<script setup lang="ts">
  import type { Task } from "@/stores/tasks";
  import { toLocaleDate } from "@/utils/dateLogic";
  import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
  import SimpleCheckbox from "../atoms/SimpleCheckbox.vue";
  import type { SortingOption } from "../templates/MainWindowForHistoryAndBin.vue";

  export type Type = "history" | "bin";

  const props = defineProps<{
    filteredTasks: Task[];
    sortingOptions: SortingOption[];
  }>();

  const activeSortingOption = defineModel<SortingOption>("activeSortingOption");
  const checkedTasks = defineModel<number[]>("checkedTasks", {
    required: true,
  });
</script>

<template>
  <div class="w-full">
    <!-- Desktop Sorting Header -->
    <div
      class="hidden w-full flex-row items-center text-center text-[#3E3D4D]/50 md:flex"
    >
      <div v-for="option of sortingOptions" class="w-full">
        <div class="flex w-full flex-row justify-center gap-1 text-center">
          <span class="cursor-pointer" @click="activeSortingOption = option">{{
            option
          }}</span>
          <ChevronDownIcon
            v-show="activeSortingOption === option"
            class="size-5"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Card Layout -->
    <div class="flex flex-col gap-4 leading-3 text-[#3E3D4D] md:hidden">
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="py- relative border-l border-l-[#8276FF] bg-white px-4 py-1"
      >
        <!-- Main content -->
        <div class="flex flex-col gap-4">
          <!-- Title and Checkbox row -->
          <div class="flex items-center justify-between">
            <div>
              <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2">
                  <span class="font-bold">{{ filteredTask.title }}</span>
                  <ArrowPathIcon
                    v-if="filteredTask.repeatable"
                    class="size-4 text-[#D0CCFF]"
                  />
                </div>
                <div>
                  {{ filteredTask.workspaceSnapshot ?? "Deleted workspace" }}
                </div>
              </div>
            </div>
            <SimpleCheckbox
              :id="String(filteredTask.id)"
              class="accent-[#8276FF]"
              v-model:checked-tasks="checkedTasks"
            />
          </div>

          <!-- Date and time info -->
          <div class="flex flex-row justify-between text-[#000000]/50">
            <div class="flex flex-col gap-2">
              <div>Due date</div>
              <div>Completed on</div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div>
                {{ toLocaleDate(filteredTask.dueDate, filteredTask.dueTime) }}
              </div>
              <div>
                {{ filteredTask.completedOn }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Table Layout -->
    <div class="hidden w-full flex-col gap-2 text-[#3E3D4D] md:flex">
      <div
        v-for="filteredTask in filteredTasks"
        :key="filteredTask.id"
        class="relative flex flex-row items-center border-l border-l-[#8276FF] text-center"
      >
        <div class="flex w-full flex-row items-center justify-center">
          <span class="px-4 font-bold break-all">{{ filteredTask.title }}</span>
          <ArrowPathIcon
            v-if="filteredTask.repeatable"
            class="size-5 w-fit shrink-0 text-[#D0CCFF]"
          />
        </div>
        <span class="w-full">{{
          filteredTask.workspaceSnapshot ?? "Deleted workspace"
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
