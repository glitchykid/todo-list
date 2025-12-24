import { defineStore } from "pinia";

export type Workspace = string[];

export const useWorkspacesStore = defineStore("workspaces", {
  state: () => {
    const defaultWorkspace: string = "All tasks";
    const defaultWorkspaces: Workspace = [];
    defaultWorkspaces.push(defaultWorkspace);

    return {
      workspaces: defaultWorkspaces as Workspace,
      currentWorkspace: defaultWorkspace,
    };
  },

  getters: {
    getWorkspaces: (state): Workspace => {
      return state.workspaces;
    },
  },

  actions: {
    addWorkspace(newWorkspace: string) {
      this.workspaces.push(newWorkspace);
    },

    removeWorkspace(workspace: string) {
      this.workspaces = this.workspaces.filter(
        (currentWorkspace: string) => workspace !== currentWorkspace,
      );
    },
  },
});
