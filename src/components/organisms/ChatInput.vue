<script setup lang="ts">
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import Repeatable from "@/components/atoms/Repeatable.vue";
  import Time from "@/components/molecules/Time.vue";
  import { useAddTask, type AddTask } from "@/composables/useAddTask.ts";
  import { currentLocale } from "@/locales/locales";
  import { useCalendarStore } from "@/stores/calendar";
  import { type Task } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { reactive, ref, watchEffect } from "vue";

  const showTime = ref<boolean>(false);
  const showTypesOfRepeat = ref<boolean>(false);

  const defaultTypeOfRepeat = ref<string>("none");

  type Time = {
    hours: string;
    minutes: string;
  };

  const props = defineProps<{
    id: number;
    valuesForAddTask: AddTask;
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
  const { currentWorkspace } = storeToRefs(workspacesStore);

  watchEffect(() => {
    task.value = {
      id: props.id,
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
      workspace: currentWorkspace.value.id,
    };

    if (task.value !== null) emit("update:task", task.value);
  });
</script>

<template>
  <div class="rounded-lg border border-[#8276FF]">
    <input
      placeholder="Enter a task"
      class="h-9 w-full px-4 text-[#3E3D4D] outline-none"
      v-model="taskTitle"
      @keyup.enter="useAddTask(props.valuesForAddTask)"
    />
    <hr class="h-px border-none bg-[#8276FF]" />
    <div class="flex h-9 flex-row">
      <div class="relative w-full rounded-bl-lg">
        <RegularButton
          :label="defaultTypeOfRepeat"
          class="h-full w-full rounded-none rounded-bl-lg border-r"
          :icon="ArrowPathIcon"
          :active="showTypesOfRepeat"
          @click="toggleTypesOfRepeat"
        />
        <Repeatable
          v-if="showTypesOfRepeat"
          @toggle-types-of-repeat="showTypesOfRepeat = $event"
          v-model:defaultValue="defaultTypeOfRepeat"
        />
      </div>
      <div class="relative w-full rounded-br-lg">
        <RegularButton
          :label="`${time.hours}:${time.minutes}`"
          class="h-full w-full rounded-none rounded-br-lg"
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
  </div>
</template>
