<script lang="ts" setup>
  import Dropdown from "@/components/atoms/Dropdown.vue";
  import RegularButton from "@/components/atoms/RegularButton.vue";
  import { currentLocale, locales } from "@/locales/locales";
  import { useCalendarStore } from "@/stores/calendar";
  import { useTasksStore } from "@/stores/tasks";
  import { occursOnDate, toISODate } from "@/utils/dateLogic"; // Use your utility
  import { storeToRefs } from "pinia";
  import { computed, onMounted, onUnmounted, ref, watch } from "vue";

  const props = defineProps<{
    position: string;
    isLocal?: boolean;
  }>();

  const calendarStore = useCalendarStore();
  const tasksStore = useTasksStore();
  const { selectedDateAsDate, calendarCursorDate } = storeToRefs(calendarStore);

  const calendarRef = ref<HTMLElement>();

  // Handle responsive scaling
  const updateScale = () => {
    if (!calendarRef.value) return;

    const el = calendarRef.value;
    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      // Scale based on available space
      const scale = Math.min(window.innerWidth / 400, 1);
      el.style.setProperty("--mobile-scale", scale.toString());

      // Adjust positioning for landscape
      if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        el.style.maxHeight = `${window.innerHeight * 0.9}px`;
        el.style.width = `${Math.min(window.innerWidth * 0.8, 500)}px`;
      } else {
        // Portrait mode
        el.style.maxHeight = `${window.innerHeight * 0.8}px`;
        el.style.width = `${Math.min(window.innerWidth * 0.9, 400)}px`;
      }
    }
  };

  onMounted(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateScale);
    window.removeEventListener("orientationchange", updateScale);
  });

  const emit = defineEmits<{
    "toggle-calendar": [value: boolean];
  }>();

  const viewDate = ref(new Date(calendarCursorDate.value));

  const formatYearLabel = (year: number) =>
    new Intl.DateTimeFormat(currentLocale, { year: "numeric" }).format(
      new Date(year, 0, 1),
    );

  const createYearNumbers = (centerYear: number) => {
    const start = centerYear - 10;
    const numbers: number[] = [];
    for (let year = start; year <= centerYear + 10; year++) {
      numbers.push(year);
    }
    return numbers;
  };

  const yearNumbers = ref<number[]>(
    createYearNumbers(viewDate.value.getFullYear()),
  );

  const yearLabels = computed(() =>
    yearNumbers.value.map((year) => formatYearLabel(year)),
  );

  const ensureYearInList = (year: number) => {
    const numbers = yearNumbers.value;
    if (numbers.includes(year)) return;

    if (numbers.length === 0) {
      yearNumbers.value = [year];
      return;
    }

    let first = numbers[0];
    while (first !== undefined && year < first) {
      numbers.unshift(first - 1);
      first = numbers[0];
    }

    let last = numbers[numbers.length - 1];
    while (last !== undefined && year > last) {
      numbers.push(last + 1);
      last = numbers[numbers.length - 1];
    }
  };

  watch(calendarCursorDate, (newCursor) => {
    if (viewDate.value.getTime() !== newCursor.getTime()) {
      viewDate.value = new Date(newCursor);
      ensureYearInList(viewDate.value.getFullYear());
    }
  });

  watch(
    viewDate,
    (newDate) => {
      ensureYearInList(newDate.getFullYear());
      if (calendarCursorDate.value.getTime() !== newDate.getTime()) {
        calendarStore.setCalendarMonth(newDate);
      }
    },
    { deep: false },
  );

  const currentMonth = computed(() =>
    new Intl.DateTimeFormat(currentLocale, {
      month: "long",
    }).format(viewDate.value),
  );

  const currentYear = computed(() =>
    new Intl.DateTimeFormat(currentLocale, {
      year: "numeric",
    }).format(viewDate.value),
  );

  const weekdays = computed(() => {
    const startOffset = locales[currentLocale] ?? 0;
    const d = new Date(viewDate.value);
    d.setDate(d.getDate() - ((d.getDay() - startOffset + 7) % 7));
    const arr: string[] = [];
    for (let i = 0; i < 7; i++) {
      arr.push(
        new Intl.DateTimeFormat(currentLocale, { weekday: "short" }).format(
          new Date(d),
        ),
      );
      d.setDate(d.getDate() + 1);
    }
    return arr;
  });

  const monthNames = computed(() => {
    const arr: string[] = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(viewDate.value);
      d.setDate(1);
      d.setMonth(i);
      arr.push(
        new Intl.DateTimeFormat(currentLocale, { month: "long" }).format(d),
      );
    }
    return arr;
  });

  // Get tasks for a specific date using your utility
  const getTasksForDate = (date: Date): number => {
    const isoDate = toISODate(date);
    return tasksStore.tasks.filter((task) => task.dueDate === isoDate).length;
  };

  // Check if date has tasks
  const hasTasks = (date: Date): boolean => {
    const key = toISODate(date);

    return tasksStore.tasks.some((task) => {
      const skipped = tasksStore.skippedTasks.some(
        (s) => s.taskId === task.id && s.date === key,
      );
      if (skipped) return false;

      return occursOnDate(task, date);
    });
  };

  interface CalendarCell {
    key: number;
    displayDay: number;
    date: Date;
    isCurrentMonth: boolean;
  }

  const calendarCells = computed<CalendarCell[]>(() => {
    const startOffset = locales[currentLocale] ?? 0;
    const currentYear = viewDate.value.getFullYear();
    const currentMonth = viewDate.value.getMonth();
    const firstOfMonth = new Date(currentYear, currentMonth, 1);
    const firstWeekday = firstOfMonth.getDay();
    const leading = (firstWeekday - startOffset + 7) % 7;

    const daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();

    const totalCells = Math.ceil((leading + daysInCurrentMonth) / 7) * 7;

    const startDate = new Date(firstOfMonth);
    startDate.setDate(firstOfMonth.getDate() - leading);

    const cells: CalendarCell[] = [];

    for (let i = 0; i < totalCells; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      cells.push({
        key: cellDate.getTime(),
        displayDay: cellDate.getDate(),
        date: cellDate,
        isCurrentMonth: cellDate.getMonth() === currentMonth,
      });
    }

    return cells;
  });

  const setMonthByName = (monthName: string) => {
    const index = monthNames.value.indexOf(monthName);
    if (index >= 0) {
      const d = new Date(viewDate.value);
      d.setDate(1);
      d.setMonth(index);
      viewDate.value = d;
    }
  };

  const setYearByLabel = (yearLabel: string) => {
    const labelIndex = yearLabels.value.indexOf(yearLabel);
    let yearNumber: number | undefined;
    if (labelIndex >= 0) {
      yearNumber = yearNumbers.value[labelIndex];
    } else {
      const parsed = parseInt(yearLabel, 10);
      if (!Number.isNaN(parsed)) yearNumber = parsed;
    }

    if (yearNumber === undefined) return;

    ensureYearInList(yearNumber);

    const d = new Date(viewDate.value);
    d.setDate(1);
    d.setFullYear(yearNumber);
    viewDate.value = d;
  };

  const isActiveDay = (cellDate: Date): boolean => {
    const selected = selectedDateAsDate.value;
    return (
      selected.getFullYear() === cellDate.getFullYear() &&
      selected.getMonth() === cellDate.getMonth() &&
      selected.getDate() === cellDate.getDate()
    );
  };

  const selectDay = (cellDate: Date) => {
    calendarStore.setSelectedDate(new Date(cellDate));
  };
</script>

<template>
  <div>
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-80 bg-black/20"
      @click="emit('toggle-calendar', false)"
    />

    <!-- Calendar Container -->
    <div
      ref="calendarRef"
      class="fixed top-1/2 left-1/2 z-100 flex w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-lg bg-white p-3 text-[#8276FF] shadow-lg shadow-[#8276FF]/50 sm:absolute sm:w-auto sm:gap-4 sm:p-4"
      :class="[
        props.position === 'bottom' && 'sm:top-full sm:mt-2 sm:translate-y-0',
        props.position === 'top' && 'sm:bottom-full sm:mb-2 sm:translate-y-0',
      ]"
    >
      <!-- Month/Year Selectors -->
      <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-8">
        <Dropdown
          :default-value="currentMonth"
          :values="monthNames"
          @update:default-value="($event) => setMonthByName($event)"
          class="z-60 w-full sm:w-auto"
        />
        <Dropdown
          :default-value="currentYear"
          :values="yearLabels"
          @update:default-value="($event) => setYearByLabel($event)"
          class="w-full sm:w-auto"
        />
      </div>

      <!-- Weekday Headers -->
      <div
        class="grid grid-cols-7 justify-items-center gap-1 font-bold sm:gap-0"
      >
        <span
          v-for="weekday of weekdays"
          :key="weekday"
          class="flex h-6 w-6 items-center justify-center text-xs sm:h-8 sm:w-8 sm:text-sm"
        >
          {{ weekday.charAt(0) }}
        </span>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7 justify-items-center gap-y-6">
        <template v-for="cell in calendarCells" :key="cell.key">
          <!-- Current Month Days with Tasks Indicator -->
          <div v-if="cell.isCurrentMonth" class="relative">
            <RegularButton
              :active="isActiveDay(cell.date)"
              :border="false"
              :label="cell.displayDay.toString()"
              :name="cell.displayDay.toString()"
              class="text-2xs sm:text-2xs h-8 w-6 sm:h-8 sm:w-8"
              @click="
                () => {
                  selectDay(cell.date);
                  emit('toggle-calendar', false);
                }
              "
              :no-truncate="true"
              :class="{
                'bg-[#8276FF]/15':
                  hasTasks(cell.date) && !isActiveDay(cell.date),
              }"
            />

            <!-- Dot indicator for tasks - Fixed positioning -->
            <div
              v-if="hasTasks(cell.date)"
              class="absolute -top-0.5 -right-0.5 z-10"
            >
              <div class="h-2 w-2 rounded-full bg-red-500 sm:h-2.5 sm:w-2.5" />
            </div>
          </div>

          <!-- Non-current month days -->
          <span
            v-else
            class="flex h-8 w-8 items-center-safe justify-center text-xs text-[#B3BCCD]"
          >
            {{ cell.displayDay }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
