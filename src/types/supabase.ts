export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number | null
          rating: number | null
          image_url: string | null
          affiliate_link: string | null
          category: string | null
          embedding: number[] | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price?: number | null
          rating?: number | null
          image_url?: string | null
          affiliate_link?: string | null
          category?: string | null
          embedding?: number[] | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number | null
          rating?: number | null
          image_url?: string | null
          affiliate_link?: string | null
          category?: string | null
          embedding?: number[] | null
          created_at?: string
        }
      }
      queries: {
        Row: {
          id: string
          query_text: string
          embedding: number[] | null
          created_at: string
        }
        Insert: {
          id?: string
          query_text: string
          embedding?: number[] | null
          created_at?: string
        }
        Update: {
          id?: string
          query_text?: string
          embedding?: number[] | null
          created_at?: string
        }
      }
      product_comparisons: {
        Row: {
          id: string
          user_query: string
          products: Json
          result: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_query: string
          products: Json
          result: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_query?: string
          products?: Json
          result?: Json
          created_at?: string
        }
      }
    }
  }
}