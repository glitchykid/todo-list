<template>
  <!-- Fixed header container -->
  <div class="sticky top-0 z-30 w-full bg-transparent backdrop-blur-[2px]">
    <div class="flex w-full flex-col gap-2 md:gap-8">
      <div class="flex w-full flex-row items-center justify-between">
        <ActionButton
          class="md:hidden"
          :icon="Bars3Icon"
          aria-label="Open spaces panel"
          @click="toggleAside = true"
        />
        <h6
          class="w-full min-w-0 truncate text-right !text-[1.65rem] !leading-8 !font-semibold !text-[var(--color-text-muted)] md:text-center"
        >
          {{ currentWorkspaceName }}
        </h6>
      </div>

      <!-- Mobile Layout -->
      <div class="flex flex-col gap-4 md:hidden">
        <hr />
        <!-- Collapsible date controls (mobile only) -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-[var(--color-text-muted)]">
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
            <!-- Today & Tomorrow buttons -->
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

            <!-- Select date button and formatted date in same-width grid -->
            <div class="grid grid-cols-2 items-center gap-4">
              <!-- Left column: Select date button -->
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

              <!-- Right column: Date aligned to the right of its cell -->
              <div class="flex justify-center">
                <span
                  class="text-lg font-semibold text-nowrap text-[var(--color-text-muted)]"
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
      <div class="hidden md:flex md:items-center md:justify-between md:gap-16">
        <div class="flex items-center gap-8">
          <!-- All buttons together -->
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
          class="text-right text-lg font-semibold text-nowrap text-[var(--color-text-muted)]"
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
