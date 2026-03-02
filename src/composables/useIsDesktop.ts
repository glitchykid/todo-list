import { computed, onMounted, onUnmounted, ref } from "vue";

const viewportWidth = ref<number>(
  typeof window !== "undefined" ? window.innerWidth : 1280,
);

let subscribers = 0;

const handleResize = () => {
  viewportWidth.value = window.innerWidth;
};

export function useIsDesktop(breakpoint = 768) {
  onMounted(() => {
    if (subscribers === 0) {
      window.addEventListener("resize", handleResize, { passive: true });
      handleResize();
    }
    subscribers += 1;
  });

  onUnmounted(() => {
    subscribers = Math.max(0, subscribers - 1);
    if (subscribers === 0) {
      window.removeEventListener("resize", handleResize);
    }
  });

  const isDesktop = computed(() => viewportWidth.value >= breakpoint);

  return { isDesktop };
}
