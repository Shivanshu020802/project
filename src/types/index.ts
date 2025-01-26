export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  affiliateLink: string;
  category: string;
}

export interface UserQuery {
  id: string;
  text: string;
  createdAt: Date;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}