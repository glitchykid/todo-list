<script setup lang="ts">
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import Repeatable, { type Repeat } from "@/components/atoms/Repeatable.vue";
  import Time from "@/components/molecules/Time.vue";
  import { useAddTask } from "@/composables/useAddTask.ts";
  import { currentLocale } from "@/locales/locales";
  import { useCalendarStore } from "@/stores/calendar";
  import { useTasksStore, type Task } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { reactive, ref, watchEffect } from "vue";

  const showTime = ref<boolean>(false);
  const showTypesOfRepeat = ref<boolean>(false);

  const defaultTypeOfRepeat = ref<Repeat>("none");

  type Time = {
    hours: string;
    minutes: string;
  };

  const props = defineProps<{
    newTask: Task | undefined;
  }>();

  const time = reactive<Time>({
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
    "update:task": [value: Task];
  }>();

  const task = ref<Task | null>(null);
  const calendarStore = useCalendarStore();
  const workspacesStore = useWorkspacesStore();
  const tasksStore = useTasksStore();
  const { currentWorkspaceId } = storeToRefs(workspacesStore);

  watchEffect(() => {
    task.value = {
      id: tasksStore.nextId,
      title: taskTitle.value,
      completed: false,
      completedOn: new Intl.DateTimeFormat(currentLocale, {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()),
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
</script>

<template>
  <!-- Compact task creator: single-row input + controls -->
  <div
    class="flex items-center gap-2 rounded-lg border border-[#8276FF] bg-white px-2 py-1"
  >
    <input
      placeholder="Enter a task"
      class="h-8 w-full flex-1 bg-transparent px-2 text-[#3E3D4D] outline-none"
      v-model="taskTitle"
      @keyup.enter="props.newTask && useAddTask(props.newTask)"
    />

    <!-- Repeat control -->
    <div class="relative shrink-0">
      <!-- Mobile: icon-only -->
      <RegularButton
        class="h-8 w-8 md:hidden"
        :icon="ArrowPathIcon"
        :active="showTypesOfRepeat"
        :without-paddings-for-icon="true"
        :customIconSize="4"
        @click="toggleTypesOfRepeat"
      />
      <!-- Desktop: icon + label -->
      <RegularButton
        class="hidden h-9 items-center md:flex"
        :label="defaultTypeOfRepeat"
        :icon="ArrowPathIcon"
        :active="showTypesOfRepeat"
        @click="toggleTypesOfRepeat"
      />
      <Repeatable
        v-if="showTypesOfRepeat"
        @toggle-types-of-repeat="showTypesOfRepeat = $event"
        v-model:default-value="defaultTypeOfRepeat"
      />
    </div>

    <!-- Time control -->
    <div class="relative shrink-0">
      <!-- Mobile: icon-only -->
      <RegularButton
        class="h-8 w-8 md:hidden"
        :icon="ClockIcon"
        :active="showTime"
        :without-paddings-for-icon="true"
        :customIconSize="4"
        @click="toggleTime"
      />
      <!-- Desktop: icon + label -->
      <RegularButton
        class="hidden h-9 items-center md:flex"
        :label="`${time.hours}:${time.minutes}`"
        :icon="ClockIcon"
        :active="showTime"
        @click="toggleTime"
      />
      <Time
        v-if="showTime"
        @toggle-time="showTime = $event"
        @take-hours-and-minutes="handleTime"
        @keyup.enter="showTime = false"
      />
    </div>
  </div>
</template>
