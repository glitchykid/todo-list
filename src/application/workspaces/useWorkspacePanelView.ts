import { useTasksStore } from "@/stores/tasks";
import { useWorkspacesStore, type WorkspaceId } from "@/stores/workspaces";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export function useWorkspacePanelView() {
  const tasksStore = useTasksStore();
  const workspacesStore = useWorkspacesStore();
  const { currentWorkspaceId } = storeToRefs(workspacesStore);

  const showActions = ref<boolean>(false);
  const showInputForWorkspaceRename = ref<boolean>(false);
  const chosenWorkspaceForRename = ref<WorkspaceId>(0);
  const workspaceNameDraft = ref<string>("");

  const toggleTaskActions = (): void => {
    showActions.value = !showActions.value;
    if (!showActions.value) {
      showInputForWorkspaceRename.value = false;
    }
  };

  const startWorkspaceRename = (
    workspaceId: WorkspaceId,
    currentName: string,
  ): void => {
    chosenWorkspaceForRename.value = workspaceId;
    workspaceNameDraft.value = currentName;
    showInputForWorkspaceRename.value = true;
  };

  const commitWorkspaceRename = async (): Promise<void> => {
    if (!showInputForWorkspaceRename.value) return;

    await workspacesStore.updateWorkspaceName(
      chosenWorkspaceForRename.value,
      workspaceNameDraft.value,
    );
    showInputForWorkspaceRename.value = false;
  };

  const removeWorkspaceWithTasks = async (
    workspaceId: WorkspaceId,
    workspaceName: string,
  ): Promise<void> => {
    await tasksStore.archiveWorkspaceTasks(workspaceId, workspaceName);
    await workspacesStore.removeWorkspace(workspaceId);
  };

  return {
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
  };
}

