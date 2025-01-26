import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

export const validateProductSearch = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req.body;
  
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new AppError(400, 'Search query is required');
  }
  
  next();
};

export const validateProductCompare = (req: Request, res: Response, next: NextFunction) => {
  const { names, query } = req.body;
  
  if (!names || !Array.isArray(names) || names.length === 0) {
    throw new AppError(400, 'At least one product name is required');
  }
  
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new AppError(400, 'Comparison query is required');
  }
  
  // Validate names
  names.forEach(name => {
    if (typeof name !== 'string' || !name.trim()) {
      throw new AppError(400, 'Invalid product name');
    }
  });
  
  next();
}; 