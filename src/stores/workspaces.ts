import { defineStore } from "pinia";

export type WorkspaceId = number;

export type Workspace = {
  id: WorkspaceId;
  name: string;
};

export const useWorkspacesStore = defineStore("workspaces", {
  state: () => {
    let id: WorkspaceId = 0;
    const defaultWorkspace: Workspace = { id: id++, name: "All tasks" };
    const defaultWorkspaces: Workspace[] = [
      defaultWorkspace,
      { id: id++, name: "Personal" },
      { id: id++, name: "Work" },
    ];

    return {
      workspaces: defaultWorkspaces as Workspace[],
      currentWorkspace: defaultWorkspace as Workspace,
      id: id as WorkspaceId,
    };
  },

  getters: {
    getWorkspaceById(state) {
      return (workspaceId: number) =>
        state.workspaces.find((el) => el.id === workspaceId);
    },

    getWorkspaceByName(state) {
      return (workspaceName: string) =>
        state.workspaces.find((el) => el.name === workspaceName);
    },
  },

  actions: {
    addWorkspace(newWorkspace: string): void {
      newWorkspace = newWorkspace.trim();
      this.workspaces.push({ id: this.id++, name: newWorkspace });
    },

    updateWorkspaceName(
      newWorkspaceName: InputEvent,
      workspaceId: WorkspaceId,
    ) {
      let cleaned: string = (newWorkspaceName.target as HTMLInputElement).value;
      cleaned = cleaned.trim();
      const workspaceToChange: Workspace | undefined = this.workspaces.find(
        (el) => el.id === workspaceId,
      );
      if (workspaceToChange) workspaceToChange.name = cleaned;
    },

    removeWorkspace(id: WorkspaceId) {
      this.workspaces = this.workspaces.filter(
        (currentWorkspace: Workspace) => id !== currentWorkspace.id,
      );
    },
  },
});
