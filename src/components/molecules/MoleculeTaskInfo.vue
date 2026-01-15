<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { toLocaleDate } from "@/utils/isodateconverter";
  import { ArrowPathIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { ref, watch } from "vue";
  import AtomSimpleCheckbox from "../atoms/AtomSimpleCheckbox.vue";

  type Type = "history" | "bin";

  const props = defineProps<{
    type: Type;
  }>();

  const tasksStore = useTasksStore();
  const { completedTasks } = storeToRefs(tasksStore);
  const workspacesStore = useWorkspacesStore();
  const checkedTasks = ref<string[]>([]);
  const selectAll = defineModel<boolean>("selectAll", { required: true });
  const isThereCheckedTask = defineModel<boolean>();

  watch(checkedTasks, (newValue) => {
    if (newValue.length > 0) isThereCheckedTask.value = true;
    else isThereCheckedTask.value = false;
  });

  watch(selectAll, () => {
    if (checkedTasks.value.length >= completedTasks.value.length) {
      checkedTasks.value = [];
      isThereCheckedTask.value = false;
    } else {
      isThereCheckedTask.value = true;
      completedTasks.value.forEach((el) => {
        const isThereNoTheSameTask: boolean = checkedTasks.value.every(
          (el2) => el2 !== String(el.id),
        );
        if (isThereNoTheSameTask) {
          checkedTasks.value.push(String(el.id));
        }
      });
    }
  });
</script>

<template>
  <div class="flex w-auto flex-row items-center">
    <div v-if="props.type === 'history'" class="flex w-full flex-col gap-2">
      <div
        v-for="completeTask in completedTasks"
        :key="completeTask.id"
        class="flex h-10 flex-row items-center border-l-2 border-l-[#8276FF]"
      >
        <div class="flex w-full flex-row justify-center gap-2.5">
          <span class="font-bold">{{ completeTask.title }}</span>
          <ArrowPathIcon
            v-if="completeTask.repeatable"
            class="size-5 text-[#D0CCFF]"
          />
        </div>
        <span class="w-full text-center">{{
          workspacesStore.workspaces[completeTask.workspace]!.name
        }}</span>
        <span class="w-full text-center">{{
          toLocaleDate(completeTask.dueDate, completeTask.dueTime)
        }}</span>
        <span class="w-full text-center">{{ completeTask.completedOn }}</span>
        <AtomSimpleCheckbox
          :id="String(completeTask.id)"
          class="ml-auto w-fit accent-[#8276FF]"
          v-model:checked-tasks="checkedTasks"
        />
      </div>
    </div>
  </div>
</template>
