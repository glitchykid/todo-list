<script setup lang="ts">
  import TimePicker from "@/components/composites/TimePicker.vue";
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import RepeatRuleMenu from "@/components/primitives/RepeatRuleMenu.vue";
  import type { TaskRepeatRule } from "@/domain/tasks/repeat";
  import { useCalendarStore } from "@/stores/calendar";
  import { type TaskDraft } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { reactive, ref, watch, watchEffect } from "vue";

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
  <!-- Compact task creator: single-row input + controls -->
  <div
    class="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2 py-2"
  >
    <label for="task-title-input" class="sr-only">Task title</label>
    <input
      id="task-title-input"
      placeholder="Enter a task"
      class="h-11 w-full flex-1 rounded-xl border border-transparent bg-transparent px-2 text-[var(--color-text)] focus:border-transparent focus:outline-none focus-visible:border-transparent focus-visible:ring-0"
      v-model="taskTitle"
      @keyup.enter="emit('submit')"
    />

    <!-- Repeat control -->
    <div class="relative shrink-0">
      <!-- Mobile: icon-only -->
      <ActionButton
        class="h-11 w-11 md:hidden"
        :icon="ArrowPathIcon"
        aria-label="Change repeat rule"
        :active="showTypesOfRepeat"
        :without-paddings-for-icon="true"
        :customIconSize="4"
        @click="toggleTypesOfRepeat"
      />
      <!-- Desktop: icon + label -->
      <ActionButton
        class="hidden min-h-11 items-center md:flex"
        :label="defaultTypeOfRepeat"
        :icon="ArrowPathIcon"
        aria-label="Repeat rule"
        :active="showTypesOfRepeat"
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

    <!-- Time control -->
    <div class="relative shrink-0">
      <!-- Mobile: icon-only -->
      <ActionButton
        class="h-11 w-11 md:hidden"
        :icon="ClockIcon"
        aria-label="Set due time"
        :active="showTime"
        :without-paddings-for-icon="true"
        :customIconSize="4"
        @click="toggleTime"
      />
      <!-- Desktop: icon + label -->
      <ActionButton
        class="hidden min-h-11 items-center md:flex"
        :label="`${time.hours}:${time.minutes}`"
        :icon="ClockIcon"
        aria-label="Due time"
        :active="showTime"
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
