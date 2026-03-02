<template>
  <div class="sticky top-0 z-30 w-full bg-transparent">
    <div class="flex w-full flex-col gap-3 md:gap-6">
      <div class="flex w-full flex-row items-center justify-between">
        <ActionButton
          class="md:hidden"
          :icon="Bars3Icon"
          aria-label="Open spaces panel"
          @click="toggleAside = true"
        />
        <h6
          class="app-section-title w-full min-w-0 truncate text-right !text-[1.4rem] md:text-center"
        >
          {{ currentWorkspaceName }}
        </h6>
      </div>

      <!-- Mobile Layout -->
      <div class="app-card flex flex-col gap-3 p-3 md:hidden">
        <hr />
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold tracking-wide text-[var(--color-text-muted)]">
            Date
          </span>
          <ActionButton
            :icon="isMobileDatePanelOpen ? ChevronUpIcon : ChevronDownIcon"
            aria-label="Toggle date filters"
            :without-paddings-for-icon="true"
            @click="toggleMobileDatePanel"
          />
        </div>

        <Transition name="expand">
          <div v-if="isMobileDatePanelOpen" class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <ActionButton
                v-for="button in quickButtons.slice(0, 2)"
                :key="button.name"
                :label="button.label"
                :active="activeFilter === button.name"
                :border="true"
                @click="handleQuickFilter(button.name)"
                class="px-4 py-2"
              />
            </div>

            <div class="grid grid-cols-1 items-center gap-3 sm:grid-cols-2 sm:gap-4">
              <div class="relative">
                <ActionButton
                  label="Select a date..."
                  :active="isSelectActive"
                  :border="true"
                  aria-label="Select calendar date"
                  class="w-full px-4 py-2"
                  @click="toggleCalendar"
                />
                <Transition name="fade">
                  <DatePicker
                    v-if="showCalendar"
                    @toggle-calendar="showCalendar = $event"
                  />
                </Transition>
              </div>

              <div class="flex justify-center">
                <span
                  class="text-center text-sm font-semibold text-[var(--color-text-muted)] sm:text-nowrap"
                >
                  {{ formattedSelectedDate }}
                </span>
              </div>
            </div>
          </div>
        </Transition>
        <hr />
      </div>

      <!-- Desktop Layout -->
      <div class="app-card hidden p-4 md:flex md:items-center md:justify-between md:gap-6">
        <div class="flex items-center gap-3 lg:gap-4">
          <ActionButton
            v-for="button in quickButtons.slice(0, 2)"
            :key="button.name"
            :label="button.label"
            :active="activeFilter === button.name"
            :border="true"
            @click="handleQuickFilter(button.name)"
            class="px-4 py-2"
          />

          <div class="relative">
            <ActionButton
              label="Select a date..."
              :active="isSelectActive"
              :border="true"
              aria-label="Select calendar date"
              class="px-4 py-2"
              @click="toggleCalendar"
            />
            <Transition name="fade">
              <DatePicker
                v-if="showCalendar"
                @toggle-calendar="showCalendar = $event"
              />
            </Transition>
          </div>
        </div>

        <!-- Formatted date on the right -->
        <span
          class="text-right text-base font-semibold text-nowrap text-[var(--color-text-muted)]"
        >
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import { useCalendarStore } from "@/stores/calendar";
  import { useWorkspacesStore } from "@/stores/workspaces";
  import {
    Bars3Icon,
    ChevronDownIcon,
    ChevronUpIcon,
  } from "@heroicons/vue/20/solid";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";
  import DatePicker from "../composites/DatePicker.vue";

  const toggleAside = defineModel<boolean>("toggleAside");

  const quickButtons = [
    { name: "today", label: "Today" },
    { name: "tomorrow", label: "Tomorrow" },
  ] as const;
  const workspacesStore = useWorkspacesStore();
  const { currentWorkspaceName } = storeToRefs(workspacesStore);

  const calendarStore = useCalendarStore();
  const { activeFilter, formattedSelectedDate } = storeToRefs(calendarStore);
  const showCalendar = ref<boolean>(false);
  // Mobile UX: start collapsed to preserve vertical space.
  const isMobileDatePanelOpen = ref<boolean>(false);
  const isSelectActive = computed(() =>
    activeFilter.value === "select" || showCalendar.value ? true : false,
  );
  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
  };

  const toggleMobileDatePanel = () => {
    isMobileDatePanelOpen.value = !isMobileDatePanelOpen.value;
    if (!isMobileDatePanelOpen.value) {
      showCalendar.value = false;
    }
  };

  const handleQuickFilter = (name: (typeof quickButtons)[number]["name"]) => {
    if (name === "today") {
      calendarStore.selectToday();
    } else {
      calendarStore.selectTomorrow();
    }
  };
</script>
