import { useAddTask } from "@/composables/useAddTask";
import type { TaskDraft } from "@/stores/tasks";
import { computed, ref } from "vue";

export function useTaskComposerSection() {
  const taskDraft = ref<TaskDraft>();
  const composerResetToken = ref(0);

  const updateTaskDraft = (nextTask: TaskDraft) => {
    taskDraft.value = nextTask;
  };

  const submitTask = async () => {
    if (!taskDraft.value) return;
    const isCreated = await useAddTask(taskDraft.value);
    if (!isCreated) return;
    composerResetToken.value += 1;
  };

  const canSubmitTask = computed(() => Boolean(taskDraft.value?.title.trim()));

  return {
    taskDraft,
    composerResetToken,
    updateTaskDraft,
    submitTask,
    canSubmitTask,
  };
}
