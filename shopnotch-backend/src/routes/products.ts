import { Router } from 'express';
import * as amazonService from '../services/amazon.js';
import * as openaiService from '../services/openai.js';
import { validateProductSearch, validateProductCompare } from '../middleware/validate.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

router.post('/search', validateProductSearch, async (req, res, next) => {
  try {
    console.log('Search query:', req.body.query);
    const products = await amazonService.searchProducts(req.body.query);
    const analysis = await openaiService.analyzeProducts(products, req.body.query);
    
    res.json({
      success: true,
      products: products,
      analysis: analysis
    });
  } catch (error) {
    console.error('Search error:', error);
    next(new AppError(500, error instanceof Error ? error.message : 'Failed to search products'));
  }
});

router.post('/search-by-name', async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log('Searching by name:', name);
    
    const products = await amazonService.searchProductsByName(name);
    console.log('Products found by name:', products);
    
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    console.error('Search by name error:', error);
    next(new AppError(500, 'Failed to search products by name'));
  }
});

router.post('/compare', validateProductCompare, async (req, res, next) => {
  try {
    const { names, query } = req.body;
    console.log('Compare request:', { names, query });

    // Get products by names
    const products = await Promise.all(
      names.map(async (name: string) => {
        const searchResults = await amazonService.searchProductsByName(name);
        return searchResults[0]; // Get the first matching product
      })
    );

    console.log('Products found:', products);
    
    // Get analysis
    const analysis = await amazonService.getProductAnalysis(products, query);
    
    res.json({
      success: true,
      products: products,
      analysis: analysis
    });
  } catch (error) {
    console.error('Compare error:', error);
    next(new AppError(500, error instanceof Error ? error.message : 'Failed to compare products'));
  }
});

export default router; 