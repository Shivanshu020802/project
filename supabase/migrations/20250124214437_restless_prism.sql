/*
  # Initial Schema Setup

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `rating` (numeric)
      - `image_url` (text)
      - `affiliate_link` (text)
      - `category` (text)
      - `created_at` (timestamptz)
      - `embedding` (vector)
    
    - `queries`
      - `id` (uuid, primary key)
      - `query_text` (text)
      - `embedding` (vector)
      - `created_at` (timestamptz)
      
    - `product_comparisons`
      - `id` (uuid, primary key)
      - `user_query` (text)
      - `products` (jsonb)
      - `result` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric,
  rating numeric,
  image_url text,
  affiliate_link text,
  category text,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- Queries table
CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- Product comparisons table
CREATE TABLE IF NOT EXISTS product_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_query text NOT NULL,
  products jsonb NOT NULL,
  result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_comparisons ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read access to queries"
  ON queries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert queries"
  ON queries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage their comparisons"
  ON product_comparisons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);