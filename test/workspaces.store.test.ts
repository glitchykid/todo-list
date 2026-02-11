import { loadState, saveState } from "@/services/persistence";
import { useWorkspacesStore, type Workspace } from "@/stores/workspaces";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/persistence", () => ({
  loadState: vi.fn().mockResolvedValue(undefined),
  saveState: vi.fn().mockResolvedValue(undefined),
}));

describe("Workspaces Store", () => {
  let pinia: Pinia;

  beforeEach(() => {
    vi.clearAllMocks();
    pinia = createPinia();
    setActivePinia(pinia);
    useWorkspacesStore(pinia).$reset();
  });

  it("adds workspaces with incremental ids and persists", async () => {
    const store = useWorkspacesStore(pinia);
    await store.addWorkspace("New workspace");

    const added = store.workspaces.find((w) => w.id === 3);
    expect(added?.name).toBe("New workspace 1");
    expect(store.nextId).toBe(4);
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("updates workspace name and persists changes", async () => {
    const store = useWorkspacesStore(pinia);
    const input = {
      target: { value: "Renamed" },
    } as unknown as InputEvent;

    await store.updateWorkspaceName(input, 1);

    expect(store.getWorkspaceById(1)?.name).toBe("Renamed");
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("removes a workspace and resets current workspace", async () => {
    const store = useWorkspacesStore(pinia);

    await store.removeWorkspace(1);

    expect(store.workspaces.some((w) => w.id === 1)).toBe(false);
    expect(store.currentWorkspaceId).toBe(store.workspaces[0]?.id);
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("returns workspaces by id or name", () => {
    const store = useWorkspacesStore(pinia);
    expect(store.getWorkspaceById(2)?.name).toBe("Work");
    expect(store.getWorkspaceByName("Personal")?.id).toBe(1);
    expect(store.currentWorkspaceName).toBe("All tasks");
  });

  it("hydrates stored state", async () => {
    const storedState = {
      workspaces: [
        { id: 10, name: "Hydrated A" },
        { id: 11, name: "Hydrated B" },
      ] as Workspace[],
      currentWorkspaceId: 11,
      nextId: 12,
    };
    vi.mocked(loadState).mockResolvedValueOnce(storedState);

    const store = useWorkspacesStore(pinia);
    await store.hydrate();

    expect(store.workspaces.map((w) => w.name)).toEqual([
      "Hydrated A",
      "Hydrated B",
    ]);
    expect(store.currentWorkspaceId).toBe(11);
    expect(loadState).toHaveBeenCalledWith("workspaces");
  });
});
