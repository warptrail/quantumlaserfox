const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const ideaRoutes = require('./routes/ideaRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend server is running',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'API is running',
  });
});

app.use('/api/ideas', ideaRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
