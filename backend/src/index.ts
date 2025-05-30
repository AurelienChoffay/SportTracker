import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler, notFound } from './middleware/errorHandler';
import healthRouter from './routes/health.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW * 60 * 1000,
  max: config.RATE_LIMIT_MAX,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Routes
app.use(`${config.API_PREFIX}/health`, healthRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(config.PORT, () => {
  console.log(`
🚀 Server is running!
📭 Port: ${config.PORT}
🏠 URL: http://${config.HOST}:${config.PORT}
🌍 Environment: ${config.NODE_ENV}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default app;
