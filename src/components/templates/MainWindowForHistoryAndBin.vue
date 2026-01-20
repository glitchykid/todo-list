-
<script setup lang="ts">
  import MoleculeFilter from "@/components/molecules/MoleculeFilter.vue";
  import MoleculeTaskInfo, {
    type Type,
  } from "@/components/molecules/MoleculeTaskInfo.vue";
  import { useTasksStore } from "@/stores/tasks";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";

  const props = defineProps<{
    type: Type;
  }>();

  const tasksStore = useTasksStore();
  const { completedTasks, removedTasks } = storeToRefs(tasksStore);
  const isThereTasks = computed(() => {
    let result: boolean =
      props.type === "history" && completedTasks.value.length > 0
        ? true
        : props.type === "bin" && removedTasks.value.length > 0
          ? true
          : false;
    return result;
  });
  const isSelectAll = ref<boolean>(false);
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
    <p class="w-full text-center">There are no {{ props.type }} yet</p>
  </div>
  <MoleculeTaskInfo
    v-else
    :type="props.type"
    v-model:select-all="isSelectAll"
    v-model:checked-tasks="checkedTasks"
    :for-filtering="forFiltering"
    :which-type-of-radio-button-was-picked="whichTypeOfRadioButtonWasPicked"
  />
</template>
