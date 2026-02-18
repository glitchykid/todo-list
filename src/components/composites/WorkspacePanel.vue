<script setup lang="ts">
  import { useWorkspacePanelView } from "@/application/workspaces/useWorkspacePanelView";
  import {
    CheckIcon,
    FolderPlusIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
  } from "@heroicons/vue/20/solid";
  import ActionButton from "../primitives/ActionButton.vue";

  const {
    workspacesStore,
    currentWorkspaceId,
    showActions,
    showInputForWorkspaceRename,
    chosenWorkspaceForRename,
    workspaceNameDraft,
    toggleTaskActions,
    startWorkspaceRename,
    commitWorkspaceRename,
    removeWorkspaceWithTasks,
  } = useWorkspacePanelView();
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-8">
    <h6
      class="text-center !text-[1.5rem] !leading-8 !font-semibold !text-[var(--color-text-muted)]"
    >
      Spaces
    </h6>

    <div
      class="flex min-h-0 flex-1 flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-raised)]"
    >
      <TransitionGroup
        name="workspaces"
        tag="div"
        class="flex min-h-0 flex-1 flex-col overflow-y-auto"
      >
        <div
          v-for="workspace of workspacesStore.workspaces"
          :key="workspace.id"
          class="relative"
        >
          <ActionButton
            v-if="
              chosenWorkspaceForRename !== workspace.id ||
              !showInputForWorkspaceRename
            "
            :active="workspace.id === currentWorkspaceId"
            :border="true"
            :aria-label="`Switch workspace to ${workspace.name}`"
            class="z-10 !w-full !max-w-none !justify-start !rounded-none !border-x-0 !border-t-0 !border-b !border-[var(--color-border)] !px-3 !py-2.5 text-left shadow-none select-none"
            :label="workspace.name"
            @click="currentWorkspaceId = workspace.id"
          />

          <input
            v-else
            v-model="workspaceNameDraft"
            type="text"
            @keyup.enter="commitWorkspaceRename"
            @blur="commitWorkspaceRename"
            class="h-11 w-full rounded-none border-x-0 border-t-0 border-b border-[var(--color-border)] bg-transparent px-3 text-left text-[var(--color-text)]"
            maxlength="30"
          />

          <Transition name="workspace-actions">
            <div
              v-if="showActions && workspace.id !== 0"
              class="grid grid-cols-2 border-t border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <button
                type="button"
                class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-none text-[var(--color-danger)] transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
                :aria-label="`Delete workspace ${workspace.name}`"
                @click="removeWorkspaceWithTasks(workspace.id, workspace.name)"
              >
                <TrashIcon class="size-5" />
              </button>

              <button
                v-if="
                  !showInputForWorkspaceRename ||
                  chosenWorkspaceForRename !== workspace.id
                "
                type="button"
                class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-none border-l border-[var(--color-border)] text-[var(--color-info)] transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
                :aria-label="`Rename workspace ${workspace.name}`"
                @click="startWorkspaceRename(workspace.id, workspace.name)"
              >
                <PencilIcon class="size-5" />
              </button>

              <button
                v-else
                type="button"
                class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-none border-l border-[var(--color-border)] text-[var(--color-success)] transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
                aria-label="Save workspace name"
                @click="commitWorkspaceRename"
              >
                <CheckIcon class="size-5" />
              </button>
            </div>
          </Transition>
        </div>
      </TransitionGroup>
    </div>

    <div class="shrink-0 py-2">
      <div class="flex flex-row justify-center gap-2">
        <ActionButton
          :icon="FolderPlusIcon"
          :custom-icon-size="4"
          aria-label="Add workspace"
          :without-paddings-for-icon="true"
          class="h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-soft)]"
          @click="workspacesStore.addWorkspace('New space')"
        />
        <ActionButton
          :icon="PencilSquareIcon"
          :custom-icon-size="4"
          :active="showActions"
          aria-label="Toggle workspace actions"
          :without-paddings-for-icon="true"
          class="h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-soft)]"
          @click="toggleTaskActions"
        />
      </div>
    </div>
  </div>
</template>
