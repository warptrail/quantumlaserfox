# AGENTS.md

## Project purpose

This repository is a full-stack creative boilerplate intended as a reusable launch pad for future apps, experiments, and UI/backend practice.

The codebase should stay:

* beginner-friendly
* plain JavaScript only
* easy to extend
* visually distinctive
* consistent in structure

Do not overengineer it.

---

## Stack

### Backend

* Express
* MongoDB
* Mongoose
* dotenv
* cors
* morgan

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Sonner

---

## Backend architecture rules

The backend uses a layered structure:

* `routes/` for route definitions
* `controllers/` for HTTP request/response logic
* `services/` for business logic
* `models/` for Mongoose schemas and data access
* `utils/` for reusable helpers
* `middleware/` for Express middleware

### Expectations

* Keep HTTP concerns in controllers
* Keep business logic in services
* Keep database logic in models
* Reuse existing utilities where possible
* Preserve the current Express + Mongoose structure
* Use plain JavaScript only

### Do not

* introduce TypeScript
* replace the current architecture with a different backend pattern unless explicitly asked
* move logic into giant route files
* add unnecessary abstractions

---

## Frontend architecture rules

The frontend uses:

* React
* Vite
* Tailwind
* shadcn/ui components in `frontend/src/components/ui`
* feature components in `frontend/src/components/ideas`
* API helpers in `frontend/src/lib/api.js`

### Expectations

* Prefer existing shadcn/ui components
* Use Tailwind utility classes
* Keep components readable and reasonably small
* Reuse existing layout and theme patterns
* Use environment configuration through Vite env variables

### Do not

* introduce a second UI framework
* introduce styled-components, MUI, Chakra, or other competing styling/component systems
* replace the current theme direction with neutral default SaaS styling
* introduce TypeScript

---

## Theme and UI expectations

This project intentionally uses a strong two-color visual identity:

* deep violet background
* electric green foreground/accent

The UI may invert these colors on certain surfaces, especially cards and interactive areas.

Follow the more detailed UI rules in:

```text
docs/shadcn-guidelines.md
```

When working on frontend UI, respect that file.

---

## Coding style expectations

* Prefer small, targeted changes
* Prefer consistency over novelty
* Prefer explicit readable code over clever abstractions
* Keep the project boilerplate-friendly
* Avoid unnecessary dependencies
* Keep things easy for future-you to understand

---

## API and environment expectations

### Backend env

Backend config lives in:

```text
backend/.env
backend/.env.example
```

### Frontend env

Frontend config lives in:

```text
frontend/.env
frontend/.env.example
```

Frontend API calls should use:

```text
VITE_API_BASE_URL
```

and be routed through:

```text
frontend/src/lib/api.js
```

---

## UX expectations

For frontend features, prefer including:

* loading state
* empty state
* error handling
* success feedback

Use Sonner for toast notifications where appropriate.

Destructive actions should use confirmation patterns when reasonable.

---

## Change policy for agents

Unless explicitly asked otherwise:

* do not perform large-scale rewrites
* do not replace major libraries
* do not change project structure dramatically
* do not add major complexity

When adding features, extend existing patterns first.

