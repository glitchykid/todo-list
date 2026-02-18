import { computed, ref } from "vue";

type Theme = "light" | "dark";

const STORAGE_KEY = "todo-list-theme";
const theme = ref<Theme>("light");
const initialized = ref(false);

function detectPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(nextTheme: Theme, persist: boolean): void {
  theme.value = nextTheme;

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  if (persist && typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, nextTheme);
  }
}

export function initializeTheme(): void {
  if (initialized.value) return;

  let nextTheme: Theme = detectPreferredTheme();
  if (typeof localStorage !== "undefined") {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      nextTheme = storedTheme;
    }
  }

  applyTheme(nextTheme, false);
  initialized.value = true;
}

export function useTheme() {
  if (!initialized.value) initializeTheme();

  const isDark = computed(() => theme.value === "dark");

  const setTheme = (nextTheme: Theme): void => {
    applyTheme(nextTheme, true);
  };

  const toggleTheme = (): void => {
    setTheme(theme.value === "dark" ? "light" : "dark");
  };

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}

