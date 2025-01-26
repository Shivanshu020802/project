import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { fetchProductByUrl, searchProducts as searchAmazonProducts, AmazonProduct } from './amazon';
import { generateEmbedding, calculateSimilarity } from './embeddings';
import { analyzeProducts, compareProductsWithGPT } from './gpt';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function storeProduct(product: AmazonProduct, embedding: number[]) {
  const { error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      image_url: product.imageUrl,
      category: product.category,
      embedding: embedding
    });

  if (error) throw error;
}

async function findSimilarProducts(embedding: number[], limit = 5) {
  const { data: products } = await supabase
    .from('products')
    .select('*');

  if (!products) return [];

  // Calculate similarity scores and sort
  const productsWithScores = products
    .filter(p => p.embedding)
    .map(product => ({
      ...product,
      similarity: calculateSimilarity(embedding, product.embedding!)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return productsWithScores;
}

export async function searchProducts(query: string) {
  try {
    // Generate embedding for the query
    const { embedding } = await generateEmbedding(query);

    // Store the query
    await supabase
      .from('queries')
      .insert({
        query_text: query,
        embedding: embedding
      });

    // Search for similar products in the database
    let products = await findSimilarProducts(embedding);

    // If no products found, fetch from Amazon API
    if (products.length === 0) {
      const amazonProducts = await searchAmazonProducts(query);
      
      // Generate embeddings and store products
      for (const product of amazonProducts) {
        const { embedding: productEmbedding } = await generateEmbedding(product.description);
        await storeProduct(product, productEmbedding);
      }

      // Search again with the new products
      products = await findSimilarProducts(embedding);
    }

    // Add GPT analysis for enhanced reasoning
    const analysis = await analyzeProducts(products, query);

    // Combine embedding similarity with GPT analysis
    return products.map(product => ({
      ...product,
      reasoning: analysis.reasoning,
      features: analysis.features
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function compareProducts(productUrls: string[], userQuery: string) {
  try {
    const products = [];

    // Fetch product details
    for (const url of productUrls) {
      const product = await fetchProductByUrl(url);
      products.push(product);

      // Store in database if not exists
      const { embedding } = await generateEmbedding(product.description);
      await storeProduct(product, embedding);
    }

    // Use GPT to compare products
    const comparison = await compareProductsWithGPT(products, userQuery);

    // Store comparison result
    await supabase
      .from('product_comparisons')
      .insert({
        user_query: userQuery,
        products: products,
        result: comparison
      });

    return comparison;
  } catch (error) {
    console.error('Error comparing products:', error);
    return null;
  }
}