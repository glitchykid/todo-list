<script setup lang="ts">
  import { useTasksStore } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import {
    FolderPlusIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
  } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import AtomRegularButton from "../atoms/AtomRegularButton.vue";

  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();

  const { currentWorkspace } = storeToRefs(workspacesStore);

  const showActions = ref<boolean>(false);
  const toggleTaskActions = (): boolean =>
    (showActions.value = !showActions.value);

  interface RenameWorkspace {
    newName: string;
    isActive: boolean;
  }

  const renameWorkspace: RenameWorkspace = {
    newName: "",
    isActive: false,
  };

  const showInputForChangeWorkspaceTitle = ref<boolean>(false);
  const choosenWorkspaceForRename = ref<string>("");
</script>

<template>
  <div class="flex flex-col gap-8">
    <h6 class="text-center text-[#D0CCFF]">Spaces</h6>
    <div class="flex flex-col">
      <TransitionGroup name="workspaces">
        <div
          v-for="workspace of workspacesStore.getWorkspaces"
          :key="workspace"
          class="flex flex-row overflow-hidden"
        >
          <AtomRegularButton
            v-if="
              choosenWorkspaceForRename !== workspace ||
              !showInputForChangeWorkspaceTitle
            "
            :active="workspace === currentWorkspace"
            class="z-10 w-full rounded-none px-4 py-2 shadow-none"
            :label="workspace"
            @click="currentWorkspace = workspace"
          />
          <input
            v-else-if="
              showInputForChangeWorkspaceTitle &&
              choosenWorkspaceForRename === workspace
            "
            class="w-full border"
          />
          <div
            v-if="workspace !== 'All tasks'"
            class="z-20 flex cursor-pointer flex-row place-items-center transition-all duration-300 ease-out"
            :class="showActions ? 'max-w-1/2' : 'max-w-0'"
          >
            <div
              class="flex shrink-0 items-center bg-[#E27575] p-2.5 text-[#4F2929] transition-colors duration-300 hover:bg-[#ffa3a3]"
              @click="
                () => {
                  tasksStore.tasks.forEach((task) => {
                    task.workspace === workspace &&
                      tasksStore.removeTask(task.id);
                  });
                  currentWorkspace = 'All tasks';
                  workspacesStore.removeWorkspace(workspace);
                }
              "
            >
              <TrashIcon class="size-5" />
            </div>
            <div
              class="flex shrink-0 items-center bg-[#92D6F3] p-2.5 text-[#314D59] transition-colors duration-300 hover:bg-[#a8e5ff]"
              @click="
                ((showInputForChangeWorkspaceTitle =
                  !showInputForChangeWorkspaceTitle),
                (choosenWorkspaceForRename = workspace))
              "
              :class="choosenWorkspaceForRename === workspace"
            >
              <PencilIcon class="size-5" />
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div class="flex flex-row justify-center gap-4 py-2">
        <AtomRegularButton
          :icon="FolderPlusIcon"
          :customIconSize="5"
          :without-paddings-for-icon="true"
        />
        <AtomRegularButton
          :icon="PencilSquareIcon"
          :custom-icon-size="5"
          @click="toggleTaskActions"
          :without-paddings-for-icon="true"
        />
      </div>
    </div>
  </div>
</template>
