<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import Calendar from "@/components/Calendar.vue";
  import ChatInput from "@/components/inputs/ChatInput.vue";
  import Messages from "@/components/Messages.vue";
  import { useCalendarStore } from "@/stores/calendar";
  import { useTasksStore, type Task } from "@/stores/tasks";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { addTask, type AddTask } from "@/utils/addtask";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, ref, TransitionGroup } from "vue";

  const calendarStore = useCalendarStore();
  const { activeFilter, formattedSelectedDate } = storeToRefs(calendarStore);

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;

  const showCalendar = ref<Boolean>(false);

  const isSelectActive = computed(() =>
    activeFilter.value === "select" || showCalendar.value ? true : false,
  );

  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
  };

  const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
    if (name === "today") {
      calendarStore.selectToday();
    } else {
      calendarStore.selectTomorrow();
    }
  };

  const tasksStore = useTasksStore();

  const valuesForAddTask: AddTask = {
    id: ref<number>(0),
    task: ref<Task | null>(null),
  };

  addTask(valuesForAddTask);

  const filteredTasks = computed(
    () =>
      tasksStore.tasksForSelectedDate || tasksStore.tasksForSelectedWorkspace,
  );

  const workspacesStore = useWorkspacesStore();
  const { currentWorkspace } = storeToRefs(workspacesStore);
</script>

<template>
  <main
    class="flex h-full w-full flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white px-9 py-8"
  >
    <div class="flex w-full flex-col gap-8">
      <h6 class="text-center text-[#D0CCFF]">
        {{ currentWorkspace }}
      </h6>
      <div class="flex flex-row items-center justify-between gap-8">
        <div class="flex flex-row gap-8">
          <RegularButton
            v-for="button in quickButtons"
            :key="button.name"
            :label="button.label"
            :active="activeFilter === button.name"
            :border="true"
            @click="handleQuickFilter(button.name)"
            class="px-4 py-2"
          />
          <div class="relative">
            <RegularButton
              label="Select a date..."
              :active="isSelectActive"
              :border="true"
              class="px-4 py-2"
              @click="toggleCalendar"
            />
            <Calendar
              v-if="showCalendar"
              position="bottom"
              @toggle-calendar="showCalendar = $event"
            />
          </div>
        </div>
        <span class="text-right font-bold text-nowrap text-[#D0CCFF]">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
    <TransitionGroup
      name="tasks"
      tag="div"
      class="h-full place-content-end-safe space-y-2 overflow-y-auto"
    >
      <Messages v-for="task of filteredTasks" :task="task" :key="task.id" />
    </TransitionGroup>
    <div class="flex flex-row items-end gap-10">
      <ChatInput
        class="w-full"
        :id="valuesForAddTask.id.value"
        @update:task="valuesForAddTask.task.value = $event"
        :valuesForAddTask="valuesForAddTask"
      />
      <RegularButton
        :icon="PlusCircleIcon"
        @click="addTask(valuesForAddTask)"
      />
    </div>
  </main>
  <aside
    class="flex h-full w-50 min-w-50 flex-col rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <div class="flex flex-col gap-8">
      <h6 class="text-center text-[#D0CCFF]">Spaces</h6>
      <RegularButton
        v-for="workspace of workspacesStore.getWorkspaces"
        :active="true"
        class="w-full rounded-none px-4 py-2"
        :label="workspace"
      />
    </div>
  </aside>
</template>
