<template>
  <!-- Fixed header container -->
  <div class="sticky top-0 z-30 w-full bg-white">
    <div class="flex w-full flex-col gap-2 md:gap-8">
      <div class="flex w-full flex-row items-center justify-between">
        <RegularButton
          class="md:hidden"
          :icon="Bars3Icon"
          @click="toggleAside = true"
        />
        <h6
          class="w-full min-w-0 truncate text-right text-[#D0CCFF] md:text-center"
        >
          {{ currentWorkspaceName }}
        </h6>
      </div>

      <!-- Mobile Layout -->
      <div class="flex flex-col gap-4 md:hidden">
        <hr />
        <!-- Today & Tomorrow buttons -->
        <div class="grid grid-cols-2 gap-4">
          <RegularButton
            v-for="button in quickButtons.slice(0, 2)"
            :key="button.name"
            :label="button.label"
            :active="activeFilter === button.name"
            :border="true"
            @click="handleQuickFilter(button.name)"
            class="px-4 py-2"
          />
        </div>

        <!-- Select date button and formatted date in same-width grid -->
        <div class="grid grid-cols-2 items-center gap-4">
          <!-- Left column: Select date button -->
          <div class="relative">
            <RegularButton
              label="Select a date..."
              :active="isSelectActive"
              :border="true"
              class="w-full px-4 py-2"
              @click="toggleCalendar"
            />
            <Calendar
              v-if="showCalendar"
              position="bottom"
              @toggle-calendar="showCalendar = $event"
            />
          </div>

          <!-- Right column: Date aligned to the right of its cell -->
          <div class="flex justify-center">
            <span class="font-bold text-nowrap text-[#D0CCFF]">
              {{ formattedSelectedDate }}
            </span>
          </div>
        </div>
        <hr />
      </div>

      <!-- Desktop Layout -->
      <div class="hidden md:flex md:items-center md:justify-between md:gap-16">
        <div class="flex items-center gap-8">
          <!-- All buttons together -->
          <RegularButton
            v-for="button in quickButtons.slice(0, 2)"
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

        <!-- Formatted date on the right -->
        <span class="text-right font-bold text-nowrap text-[#D0CCFF]">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import { useCalendarStore } from "@/stores/calendar";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import { Bars3Icon } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";
  import Calendar from "../molecules/Calendar.vue";

  const toggleAside = defineModel<boolean>("toggleAside");

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;
  const workspacesStore = useWorkspacesStore();
  const { currentWorkspaceName } = storeToRefs(workspacesStore);

  const calendarStore = useCalendarStore();
  const { activeFilter, formattedSelectedDate } = storeToRefs(calendarStore);
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
</script>
