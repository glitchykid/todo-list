# Todo List (Vue 3 + TypeScript)

SPA-приложение для управления задачами с поддержкой рабочих пространств, календаря, истории и корзины.

Демо: `https://todo-list-beta-lake-67.vercel.app`

## Что важно знать
- Это полностью frontend-проект, без Python и без отдельного backend.
- Данные сохраняются локально в браузере через `IndexedDB`.
- Поддерживаются mobile и desktop интерфейсы, светлая и тёмная тема.

## Функциональность
- Создание задач с:
  - названием,
  - временем,
  - правилом повторения (`none`, `every day`, `every week`, `every month`),
  - привязкой к выбранной дате.
- Быстрые фильтры даты: `Today`, `Tomorrow`, произвольная дата через календарь.
- Рабочие пространства (`Spaces`): создание, переименование, удаление.
- Страницы:
  - `Home` — активные задачи;
  - `History` — выполненные задачи;
  - `Bin` — удалённые задачи.
- В `History` и `Bin` есть фильтры, сортировка, массовое выделение и действия `Purge/Recover`.

## Технологии
- `Vue 3`
- `TypeScript`
- `Pinia`
- `Vue Router`
- `Tailwind CSS v4`
- `Vite`
- `Vitest`

## Архитектура проекта
Проект разделён на слои:
- `src/domain` — доменные типы и правила (без UI-зависимостей).
- `src/application` — use-case и orchestration-логика.
- `src/stores` — состояние приложения и side effects (Pinia).
- `src/components` — UI-компоненты:
  - `primitives`,
  - `composites`,
  - `sections`,
  - `layouts`.
- `src/services` + `src/db` — адаптеры персистентности (`IndexedDB`).

## Требования
- `Node.js` `^24`
- `npm`

## Локальный запуск
```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:5173`.

## Запуск в Docker
```bash
docker compose up --build
```

Compose запускает dev-режим Vite на `0.0.0.0:5173`.

Остановить:
```bash
docker compose down
```

## Скрипты
- `npm run dev` — dev-сервер Vite.
- `npm run build` — `type-check` + production build.
- `npm run build-only` — только production build.
- `npm run type-check` — проверка типов через `vue-tsc`.
- `npm run test` — тесты Vitest.
- `npm run preview` — локальный просмотр production-сборки.

## Качество и проверка перед коммитом
```bash
npm run type-check
npm run test -- --run
npm run build
```

## Где хранятся данные
- Хранилища `tasks`, `workspaces`, `calendar` пишутся в `IndexedDB` (БД `todo-app`).
- Если нужно полностью сбросить данные, удалите site data в браузере для этого домена.

## Структура роутов
- `/` — Home
- `/history` — History
- `/bin` — Bin

## Git и коммиты
В репозитории принят стиль `Conventional Commits`:
- `feat(scope): ...`
- `fix(scope): ...`
- `style(scope): ...`
- `docs(scope): ...`
- `chore(scope): ...`
