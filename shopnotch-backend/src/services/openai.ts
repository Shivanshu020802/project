import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { mockAnalysis } from './mock.js';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.trim()
});

export async function generateEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('OpenAI embedding error:', error);
    throw new Error('Failed to generate embedding');
  }
}

export async function analyzeProducts(products: any[], userQuery: string) {
  console.log('Starting mock OpenAI analysis...');
  console.log('Products to analyze:', products);
  console.log('User query:', userQuery);
  
  // Return mock analysis instead of calling OpenAI
  return mockAnalysis.summary + '\n\n' + mockAnalysis.recommendations.join('\n');
} 