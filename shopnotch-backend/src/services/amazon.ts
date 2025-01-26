import { AmazonProduct } from '../types/amazon.js';
import { mockProducts, mockAnalysis } from './mock.js';

export async function getProductByUrl(url: string): Promise<AmazonProduct> {
  console.log('Getting product by URL:', url);
  return mockProducts[0];
}

export async function searchProducts(query: string) {
  console.log('Searching products with query:', query);
  return mockProducts;
}

// For product name search
export async function searchProductsByName(name: string) {
  console.log('Searching products by name:', name);
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(name.toLowerCase())
  );
}

export async function getProductAnalysis(products: any[], query: string) {
  console.log('Analyzing products:', { products, query });
  return mockAnalysis;
} 