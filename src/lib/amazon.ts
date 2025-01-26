// Amazon API integration
// Replace with actual Amazon API client implementation
export interface AmazonProduct {
  asin: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
}

const API_URL = 'http://localhost:3001';  // Changed from 3000

export async function fetchProductByUrl(url: string) {
  const response = await fetch(`${API_URL}/api/products/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urls: [url] })
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
}

export async function searchProducts(query: string) {
  const response = await fetch(`${API_URL}/api/products/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return response.json();
}

export async function searchProductsByName(name: string) {
  const response = await fetch(`${API_URL}/api/products/search-by-name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  });

  if (!response.ok) {
    throw new Error('Failed to search products by name');
  }

  return response.json();
}