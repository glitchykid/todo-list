<script setup lang="ts">
  import { useIsDesktop } from "@/composables/useIsDesktop";
  import TimePicker from "@/components/composites/TimePicker.vue";
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import RepeatRuleMenu from "@/components/primitives/RepeatRuleMenu.vue";
  import type { TaskRepeatRule } from "@/domain/tasks/repeat";
  import { useCalendarStore } from "@/stores/calendar";
  import { type TaskDraft } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, reactive, ref, watch, watchEffect } from "vue";

  const showTime = ref<boolean>(false);
  const showTypesOfRepeat = ref<boolean>(false);

  const defaultTypeOfRepeat = ref<TaskRepeatRule>("none");

  type TaskTime = {
    hours: string;
    minutes: string;
  };

  const props = defineProps<{
    resetToken: number;
  }>();

  const { isDesktop } = useIsDesktop();

  const time = reactive<TaskTime>({
    hours: "00",
    minutes: "00",
  });

  const toggleTime = () => {
    showTime.value = !showTime.value;
  };

  const toggleTypesOfRepeat = () => {
    showTypesOfRepeat.value = !showTypesOfRepeat.value;
  };

  const handleTime = ([hh, mm]: [string, string]) => {
    time.hours = hh;
    time.minutes = mm;
  };

  const taskTitle = ref<string>("");
  const taskTitleInputId = `task-title-input-${Math.random().toString(36).slice(2, 9)}`;

  const repeatButtonLabel = computed(() =>
    isDesktop.value ? defaultTypeOfRepeat.value : undefined,
  );

  const timeButtonLabel = computed(() =>
    isDesktop.value ? `${time.hours}:${time.minutes}` : undefined,
  );

  const emit = defineEmits<{
    "update:task": [value: TaskDraft];
    submit: [];
  }>();

  const task = ref<TaskDraft | null>(null);
  const calendarStore = useCalendarStore();
  const workspacesStore = useWorkspacesStore();
  const { currentWorkspaceId } = storeToRefs(workspacesStore);

  watchEffect(() => {
    task.value = {
      title: taskTitle.value,
      completed: false,
      completedOn: "",
      repeatable:
        defaultTypeOfRepeat.value === "none"
          ? false
          : defaultTypeOfRepeat.value,
      dueTime: `${time.hours}:${time.minutes}`,
      dueDate: calendarStore.selectedDate,
      workspace: currentWorkspaceId.value,
    };

    if (task.value !== null) emit("update:task", task.value);
  });

  watch(
    () => props.resetToken,
    () => {
      taskTitle.value = "";
      time.hours = "00";
      time.minutes = "00";
      defaultTypeOfRepeat.value = "none";
      showTime.value = false;
      showTypesOfRepeat.value = false;
    },
  );
</script>

<template>
  <div
    class="app-card flex items-center gap-3 px-3 py-2"
  >
    <label :for="taskTitleInputId" class="sr-only">Task title</label>
    <input
      :id="taskTitleInputId"
      placeholder="Enter a task"
      class="h-11 w-full flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-control-surface)] px-3 text-[var(--color-text)] transition-colors placeholder:text-[var(--color-text-muted)]/80 hover:bg-[var(--color-control-hover)]"
      v-model="taskTitle"
      @keyup.enter="emit('submit')"
    />

    <div class="relative shrink-0">
      <ActionButton
        class="h-11 w-11 md:w-auto md:min-w-32"
        :label="repeatButtonLabel"
        :icon="ArrowPathIcon"
        aria-label="Change repeat rule"
        :active="showTypesOfRepeat"
        :without-paddings-for-icon="!isDesktop"
        :customIconSize="4"
        @click="toggleTypesOfRepeat"
      />
      <Transition name="fade">
        <RepeatRuleMenu
          v-if="showTypesOfRepeat"
          @toggle-types-of-repeat="showTypesOfRepeat = $event"
          v-model:default-value="defaultTypeOfRepeat"
        />
      </Transition>
    </div>

    <div class="relative shrink-0">
      <ActionButton
        class="h-11 w-11 md:w-auto md:min-w-28"
        :label="timeButtonLabel"
        :icon="ClockIcon"
        aria-label="Set due time"
        :active="showTime"
        :without-paddings-for-icon="!isDesktop"
        :customIconSize="4"
        @click="toggleTime"
      />
      <Transition name="fade">
        <TimePicker
          v-if="showTime"
          @toggle-time="showTime = $event"
          @take-hours-and-minutes="handleTime"
          @keyup.enter="showTime = false"
        />
      </Transition>
    </div>
  </div>
</template>
