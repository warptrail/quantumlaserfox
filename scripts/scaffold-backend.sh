#!/usr/bin/env bash

mkdir -p backend/{config,controllers,models,routes,services,middleware,utils}

touch \
    backend/app.js \
    backend/server.js \
    backend/config/db.js \
    backend/controllers/ideaController.js \
    backend/models/Idea.js \
    backend/routes/ideaRoutes.js \
    backend/services/ideaService.js \
    backend/middleware/errorHandler.js \
    backend/middleware/notFound.js \
    backend/utils/AppError.js \
    backend/utils/asyncHandler.js
