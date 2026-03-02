<script setup lang="ts">
  import TimeField from "@/components/primitives/TimeField.vue";
  import { ref, watch } from "vue";

  const emit = defineEmits<{
    (e: "toggle-time", value: boolean): void;
    (e: "take-hours-and-minutes", value: [string, string]): void;
  }>();

  const hours = ref<string>("00");
  const minutes = ref<string>("00");

  watch([hours, minutes], ([newHours, newMinutes]) => {
    newHours = newHours.replace(/[^0-9]/g, "");
    newMinutes = newMinutes.replace(/[^0-9]/g, "");
    if (newHours.length === 1) newHours = "0" + newHours;
    else if (newHours === "" || newHours === "0") newHours = "00";
    else if (Number(newHours) > 23) newHours = "23";
    if (newMinutes.length === 1) newMinutes = "0" + newMinutes;
    else if (newMinutes === "" || newMinutes === "0") newMinutes = "00";
    else if (Number(newMinutes) > 59) newMinutes = "59";
    emit("take-hours-and-minutes", [newHours, newMinutes] as [string, string]);
  });
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        class="fixed inset-0 z-[90] bg-[var(--color-overlay)]"
        aria-hidden="true"
        @click="emit('toggle-time', false)"
      />
    </Transition>

    <Transition name="popover" appear>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Set due time"
        class="app-card fixed top-1/2 left-1/2 z-[100] flex max-h-[calc(100dvh-1.25rem)] w-[calc(100vw-1rem)] max-w-72 -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-center gap-4 overflow-auto p-4 text-[var(--color-text)]"
      >
        <TimeField placeholder="hh" :max="23" v-model="hours" />
        <span class="text-lg font-semibold text-[var(--color-text-muted)]">:</span>
        <TimeField placeholder="mm" :max="59" v-model="minutes" />
      </div>
    </Transition>
  </Teleport>
</template>
