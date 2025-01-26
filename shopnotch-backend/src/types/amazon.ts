export interface AmazonProduct {
  asin: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  affiliateLink?: string;
}

export interface AmazonAPIResponse {
  ItemsResult: {
    Items: Array<{
      ASIN: string;
      DetailPageURL: string;
      ItemInfo: {
        Title: { DisplayValue: string };
        Features?: { DisplayValues: string[] };
        Classifications?: { ProductGroup: { DisplayValue: string } };
      };
      Images: {
        Primary: {
          Large: { URL: string };
        };
      };
      Offers?: {
        Listings: Array<{
          Price: {
            DisplayAmount: string;
            Amount: number;
          };
        }>;
      };
    }>;
  };
} 