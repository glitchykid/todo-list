<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import Calendar from "@/components/Calendar.vue";
  import ChatInput from "@/components/ChatInput.vue";
  import Messages from "@/components/Messages.vue";
  import { useSelectCalendarStore } from "@/stores/calendar";
  import { PlusCircleIcon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";

  const calendarStore = useSelectCalendarStore();
  const { activeFilter, formattedSelectedDate } = storeToRefs(calendarStore);

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;

  const showCalendar = ref<Boolean>(false);

  const isSelectActive = computed(
    () => activeFilter.value === "select" || showCalendar.value,
  );

  const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
    if (name === "today") {
      calendarStore.selectToday();
    } else {
      calendarStore.selectTomorrow();
    }
  };

  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
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
            <Calendar
              v-if="showCalendar"
              position="bottom"
              @toggle-calendar="toggleCalendar"
            />
          </div>
        </div>
        <span class="text-right font-bold text-nowrap text-[#D0CCFF]">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <!-- Переработать -->
      <Messages title="Приготовить ооочень вкусный ужин" due-date="18:00" />
      <Messages title="Помыться" due-date="18:30" />
      <Messages
        title="Разработать план по захвату Польши"
        due-date="16:00"
        repeatable="everyday"
      />
      <Messages title="Изобрести добро" due-date="16:00" />
      <!-- До сюда все сообщения должны быть из массива объектов -->
    </div>
    <div class="flex flex-row items-end gap-10">
      <ChatInput class="w-full" />
      <RegularButton :icon="PlusCircleIcon" />
    </div>
  </main>
  <aside
    class="flex h-full w-50 min-w-50 flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <div>
      <h6 class="text-center text-[#D0CCFF]">Spaces</h6>
    </div>
  </aside>
</template>
