import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { Express } from 'express';

// Create Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Request logging middleware
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body
  });
  next();
};

// Error logging middleware
const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body
  });
  next(err);
};

// Setup function to add logging middleware to Express app
export const setupLogging = (app: Express) => {
  app.use(requestLogger);
  app.use(errorLogger);
}; 