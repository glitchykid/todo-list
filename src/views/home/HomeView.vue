<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import Calendar from "@/components/Calendar.vue";
  import ChatInput from "@/components/ChatInput.vue";
  import Messages from "@/components/Messages.vue";
  import AppIcon from "@/components/AppIcon.vue";
  import { useCalendarStore } from "@/stores/calendar";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const calendarStore = useCalendarStore();
  const { activeFilter, formattedSelectedDate, isCalendarOpen } =
    storeToRefs(calendarStore);

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;

  const isSelectActive = computed(
    () => activeFilter.value === "select" || isCalendarOpen.value,
  );

  const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
    if (name === "today") {
      calendarStore.selectToday();
    } else {
      calendarStore.selectTomorrow();
    }
  };

  const toggleCalendar = () => {
    calendarStore.toggleCalendar();
  };

  const closeCalendar = () => {
    calendarStore.toggleCalendar(false);
  };
</script>

<template>
  <main
    class="flex h-full w-full flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white px-9 py-8"
  >
    <div class="flex w-full flex-col gap-8">
      <h6 class="text-center text-[#D0CCFF]">All tasks</h6>
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
            <Calendar v-if="isCalendarOpen" />
          </div>
        </div>
        <span class="text-right font-bold text-nowrap text-[#D0CCFF]">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <Messages title="Приготовить ооочень вкусный ужин" due-date="18:00" />
      <Messages title="Помыться" due-date="18:30" />
      <Messages
        title="Разработать план по захвату Польши"
        due-date="16:00"
        repeatable="everyday"
      />
      <Messages title="Изобрести добро" due-date="16:00" />
    </div>
    <form class="flex flex-row items-end gap-10">
      <ChatInput class="w-full" />
      <button>
        <AppIcon name="plusCircle" class="size-8 text-[#8276FF]" />
      </button>
    </form>
  </main>
  <aside
    class="flex h-full w-50 min-w-50 flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <div>
      <h6 class="text-center text-[#D0CCFF]">Spaces</h6>
    </div>
  </aside>
  <div
    v-if="isCalendarOpen"
    class="fixed inset-0 z-30 bg-black/20"
    @click="closeCalendar"
  />
</template>
