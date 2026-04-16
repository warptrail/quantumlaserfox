# QuantumLaserFox

A full-stack creative boilerplate built with Express, MongoDB, React, Vite, Tailwind, and shadcn/ui.

This project is meant to be a reusable launch pad for future experiments, side projects, and UI/backend practice. It currently includes a working Ideas dashboard with full CRUD functionality.

## Stack

### Backend

* Express
* MongoDB
* Mongoose
* MVC-style structure:
    * routes
    * controllers
    * services
    * models
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

## Features

### Current

* Ideas dashboard
* Create ideas
* View ideas
* Edit ideas
* Delete ideas
* MongoDB persistence
* Backend API with layered architecture
* Dark neon purple/green theme
* Toast notifications
* Environment-based API configuration

### Planned / nice next additions

* Delete confirmation dialog
* Prompt generator
* Sandbox/components page
* Search and filtering
* Additional resource types like notes or prompts

---

## Project structure

```text
quantumlaserfox/
    backend/
        config/
            db.js
        controllers/
            ideaController.js
        middleware/
            errorHandler.js
            notFound.js
        models/
            Idea.js
        routes/
            ideaRoutes.js
        services/
            ideaService.js
        utils/
            AppError.js
            asyncHandler.js
            isValidObjectId.js
        .env.example
        app.js
        package.json
        server.js

    frontend/
        src/
            components/
                ideas/
                ui/
            lib/
            App.jsx
            main.jsx
            index.css
        .env.example
        package.json
        vite.config.js
        jsconfig.json

    scripts/
    tools/
    notes/

    .gitignore
    package.json
    README.md
```

---

## Environment variables

## Backend

Create:

```text
backend/.env
```

based on:

```text
backend/.env.example
```

Example:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/creative_boilerplate
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Frontend

Create:

```text
frontend/.env
```

based on:

```text
frontend/.env.example
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## Installation

## 1. Clone the repo

```bash
git clone <your-repo-url>
cd quantumlaserfox
```

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## Running the app

You need two terminals.

## Terminal 1: backend

```bash
cd backend
npm run dev
```

Backend should run on:

```text
http://localhost:5001
```

Health route:

```text
http://localhost:5001/api/health
```

## Terminal 2: frontend

```bash
cd frontend
npm run dev
```

Frontend should run on:

```text
http://localhost:5173
```

---

## Current API routes

## Health

* `GET /api/health`

## Ideas

* `GET /api/ideas`
* `GET /api/ideas/:id`
* `POST /api/ideas`
* `PUT /api/ideas/:id`
* `DELETE /api/ideas/:id`

---

## Example idea payload

```json
{
    "title": "Habit tracker for dragons",
    "description": "Track hoarding, flying, and fire practice.",
    "category": "fun",
    "tags": ["fantasy", "weird", "productivity"],
    "isStarred": true
}
```

---

## API testing with curl

## Get all ideas

```bash
curl http://localhost:5001/api/ideas | jq
```

## Create an idea

```bash
curl -X POST http://localhost:5001/api/ideas \
-H "Content-Type: application/json" \
-d '{
    "title": "Habit tracker for dragons",
    "description": "Track hoarding, flying, and fire practice.",
    "category": "fun",
    "tags": ["fantasy", "weird", "productivity"],
    "isStarred": true
}' | jq
```

## Update an idea

```bash
curl -X PUT http://localhost:5001/api/ideas/<idea-id> \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated dragon tracker",
    "description": "Track treasure inventory and daily flame output.",
    "category": "fantasy-tools",
    "tags": ["fantasy", "tracker"],
    "isStarred": false
}' | jq
```

## Delete an idea

```bash
curl -X DELETE http://localhost:5001/api/ideas/<idea-id> | jq
```

---

## Frontend notes

The frontend currently includes:

* a live Ideas dashboard
* create/edit/delete UI wired to the backend
* shadcn/ui components
* Sonner toast notifications
* a custom two-color neon dark theme

---

## Theme direction

This project currently uses a bold dark-mode palette inspired by accessible duo-tone color schemes:

* deep violet background
* electric green foreground
* inverted green/purple surfaces for contrast

The goal is to keep the UI visually striking while still functional as a reusable creative boilerplate.

---

## Development notes

### Backend architecture

The backend follows a layered structure:

* **routes** define endpoints
* **controllers** handle HTTP request/response
* **services** contain business logic
* **models** handle MongoDB/Mongoose data
* **utils** contain reusable helpers

### Frontend architecture

The frontend is currently organized by feature and UI layer:

* `components/ideas/` for app-specific feature components
* `components/ui/` for shadcn/ui components
* `lib/` for API helpers and utilities

---

## Git ignore / env files

Real `.env` files should not be committed.

Only commit:

* `backend/.env.example`
* `frontend/.env.example`

---

## Current status

This project is currently at a strong MVP / boilerplate base:

* backend and frontend are connected
* CRUD works end-to-end
* theme system is in place
* environment config is in place
* ready to expand with more creative features

---

## Good next steps

* add delete confirmation dialog
* add a prompt generator page
* add search/filtering for ideas
* add a component sandbox page
* add more reusable layout primitives
* add root-level convenience scripts
* improve loading states and UI polish

---

## License

Personal boilerplate / starter project.

