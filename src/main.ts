import { appRoutes } from "@/routes/routes";
import { initializeTheme } from "@/composables/useTheme";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./assets/styles/animations.css";
import "./assets/styles/tailwind.css";

import { useCalendarStore } from "./stores/calendar";
import { useTasksStore } from "./stores/tasks";
import { useWorkspacesStore } from "./stores/workspaces";

async function bootstrap() {
  initializeTheme();

  const app = createApp(App);

  const routes = appRoutes.map(({ component, path }) => ({
    path,
    component,
  }));

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  const pinia = createPinia();

  app.use(router);
  app.use(pinia);

  const calendarStore = useCalendarStore(pinia);
  const tasksStore = useTasksStore(pinia);
  const wsStore = useWorkspacesStore(pinia);

  await Promise.all([
    calendarStore.hydrate(),
    tasksStore.hydrate(),
    wsStore.hydrate(),
  ]);

  app.mount("#app");
}

bootstrap();
