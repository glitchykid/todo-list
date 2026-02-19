# Todo List

## RU

### О проекте
`Todo List` - это SPA-приложение на Vue 3 + TypeScript для управления задачами с фокусом на чистую архитектуру, предсказуемое состояние и удобный интерфейс для мобильных и десктопных устройств.

Проект построен как практический продуктовый pet-проект: от проектирования UX до реализации, тестирования и деплоя.

Live demo: `https://todo-list-beta-lake-67.vercel.app`

### Основные возможности
- Создание, выполнение, восстановление и удаление задач.
- Поддержка повторяющихся задач.
- Пространства (spaces/workspaces) для группировки задач.
- История выполненных задач и корзина.
- Фильтрация и сортировка в разделах History/Bin.
- Светлая и темная темы.
- Адаптивный интерфейс для мобильных и десктопных экранов.

### Технологии
- `Vue 3` + `TypeScript`
- `Pinia` для управления состоянием
- `Vue Router`
- `Tailwind CSS v4`
- `Vite` для dev/build
- `Vitest` для тестирования

### Архитектура
Проект разделен по слоям:
- `src/domain` - доменные типы и бизнес-правила без зависимости от UI.
- `src/application` - orchestration/use-case логика для представления.
- `src/stores` - границы состояния и персистентности (Pinia).
- `src/components` - презентационный слой (primitives/composites/sections/layouts).

### Быстрый старт
Требования:
- `Node.js ^24`
- `npm`

Установка и запуск:
```bash
npm install
npm run dev
```

### Скрипты
- `npm run dev` - запуск dev-сервера (`5173`).
- `npm run build` - type-check + production build.
- `npm run build-only` - production build без type-check.
- `npm run type-check` - проверка типов через `vue-tsc`.
- `npm test` - запуск тестов (`Vitest`).

### Docker
```bash
docker compose up
```

---

## EN

### Project Overview
`Todo List` is a Vue 3 + TypeScript single-page application for task management, focused on clean architecture, predictable state, and a practical UX for both mobile and desktop.

This repository is a product-style pet project covering the full cycle: UX design, implementation, testing, and deployment.

Live demo: `https://todo-list-beta-lake-67.vercel.app`

### Core Features
- Create, complete, restore, and delete tasks.
- Support for repeatable tasks.
- Workspaces to group tasks by context.
- Completed-task history and recycle bin flows.
- Filtering and sorting on History/Bin screens.
- Light and dark theme support.
- Responsive UI for mobile and desktop layouts.

### Tech Stack
- `Vue 3` + `TypeScript`
- `Pinia` for state management
- `Vue Router`
- `Tailwind CSS v4`
- `Vite` for development/build
- `Vitest` for tests

### Architecture
The codebase is organized by layers:
- `src/domain` - framework-agnostic business rules and types.
- `src/application` - UI-facing orchestration and use-case logic.
- `src/stores` - state boundaries and persistence concerns.
- `src/components` - presentation layer (primitives/composites/sections/layouts).

### Quick Start
Requirements:
- `Node.js ^24`
- `npm`

Install and run:
```bash
npm install
npm run dev
```

### Scripts
- `npm run dev` - start Vite dev server (`5173`).
- `npm run build` - type-check and production build.
- `npm run build-only` - production build without type-check.
- `npm run type-check` - run `vue-tsc`.
- `npm test` - run test suite (`Vitest`).

### Docker
```bash
docker compose up
```
