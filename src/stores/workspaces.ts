import { loadState, saveState } from "@/services/persistence";
import { defineStore } from "pinia";
import { toRaw } from "vue";

export type WorkspaceId = number;

export type Workspace = {
  id: WorkspaceId;
  name: string;
};

type WorkspaceState = {
  workspaces: Workspace[];
  currentWorkspaceId: WorkspaceId;
  nextId: WorkspaceId;
};

const createDefaultState = (): WorkspaceState => ({
  nextId: 3,
  workspaces: [
    {
      id: 0,
      name: "All tasks",
    },
    {
      id: 1,
      name: "Personal",
    },
    {
      id: 2,
      name: "Work",
    },
  ].map((workspace) => ({ ...workspace })),
  currentWorkspaceId: 0,
});

export const useWorkspacesStore = defineStore("workspaces", {
  state: (): WorkspaceState => createDefaultState(),

  getters: {
    getWorkspaceById(state) {
      return (workspaceId: number) =>
        state.workspaces.find((el) => el.id === workspaceId);
    },

    getWorkspaceByName(state) {
      return (workspaceName: string) =>
        state.workspaces.find((el) => el.name === workspaceName);
    },

    currentWorkspaceName(state): string {
      return (
        state.workspaces.find((w) => w.id === state.currentWorkspaceId)?.name ??
        "Deleted workspace"
      );
    },
  },

  actions: {
    async hydrate() {
      const stored = await loadState<WorkspaceState>("workspaces");
      if (stored) {
        this.$patch(stored);
      }
    },

    async persist() {
      await saveState("workspaces", {
        nextId: toRaw(this.nextId),
        workspaces: toRaw(this.workspaces),
        currentWorkspaceId: toRaw(this.currentWorkspaceId),
      });
    },

    async addWorkspace(newWorkspace: string): Promise<void> {
      newWorkspace = newWorkspace.trim();
      newWorkspace += ` ${this.nextId - 2}`;
      this.workspaces.push({ id: this.nextId++, name: newWorkspace });
      await this.persist();
    },

    async updateWorkspaceName(
      newWorkspaceName: InputEvent,
      workspaceId: WorkspaceId,
    ): Promise<void> {
      let cleaned: string = (newWorkspaceName.target as HTMLInputElement).value;
      cleaned = cleaned.trim();
      const workspaceToChange: Workspace | undefined = this.workspaces.find(
        (el) => el.id === workspaceId,
      );
      if (workspaceToChange) workspaceToChange.name = cleaned;
      await this.persist();
    },

    async removeWorkspace(id: WorkspaceId): Promise<void> {
      const next = this.workspaces
        .filter((ws) => ws.id !== id)
        .map((ws) => ({ ...ws }));

      this.workspaces = next;

      if (!this.workspaces[0]) return;

      this.currentWorkspaceId = this.workspaces[0].id;
      await this.persist();
    },
  },
});
