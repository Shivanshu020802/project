import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

export const cacheMiddleware = (key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cachedData = cache.get(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    const originalJson = res.json;
    res.json = function(body) {
      cache.set(key, body);
      return originalJson.call(this, body);
    };
    next();
  };
}; 