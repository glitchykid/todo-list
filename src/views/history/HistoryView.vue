<script setup lang="ts">
  import MoleculeHistoryHeader from "@/components/molecules/MoleculeFilter.vue";
  import MoleculeTaskInfo from "@/components/molecules/MoleculeTaskInfo.vue";
  import MainWindow from "@/components/templates/MainWindow.vue";
  import { useTasksStore } from "@/stores/tasks";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  const tasksStore = useTasksStore();
  const { completedTasks } = storeToRefs(tasksStore);
  const isThereTasks = ref<boolean>(
    completedTasks.value.length > 0 ? true : false,
  );
  const isThereCheckedTask = ref<boolean>(false);
  const isSelectAll = ref<boolean>(false);
</script>

<template>
  <MainWindow>
    <h6 class="text-center text-[#D0CCFF]">History</h6>
    <MoleculeHistoryHeader />
    <section class="flex flex-row place-content-end gap-2 text-center">
      <span
        class="text-[#3E3D4D]/50"
        :class="isThereCheckedTask && 'cursor-pointer text-[#8276FF]'"
      >
        Remove
      </span>
      <span
        class="text-[#3E3D4D]/50"
        :class="isThereCheckedTask && 'cursor-pointer text-[#8276FF]'"
      >
        Recovery
      </span>
      <span
        class="text-[#3E3D4D]/50"
        :class="isThereTasks && 'cursor-pointer text-[#8276FF]'"
        @click="if (isThereTasks) isSelectAll = !isSelectAll;"
      >
        Select all
      </span>
    </section>
    <div
      v-if="!isThereTasks"
      class="flex h-full w-full items-center text-5xl font-extrabold text-[#D0CCFF]"
    >
      <p class="w-full text-center">There are no history yet</p>
    </div>
    <MoleculeTaskInfo
      v-else
      type="history"
      v-model="isThereCheckedTask"
      v-model:select-all="isSelectAll"
    />
  </MainWindow>
</template>
