import { idbGet, idbSet } from "@/db/indexedDb";

/**
 * Thin persistence helpers to keep stores free from IndexedDB details.
 */
export async function loadState<T>(store: "tasks" | "calendar" | "workspaces") {
  return idbGet<T>(store, "state");
}

export async function saveState<T>(
  store: "tasks" | "calendar" | "workspaces",
  payload: T,
): Promise<void> {
  return idbSet(store, "state", payload);
}
