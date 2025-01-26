export const mockProducts = [
  {
    id: '1',
    name: 'ASUS ROG Gaming Laptop',
    description: 'ASUS ROG Gaming Laptop with NVIDIA RTX 4060, Intel i7, 16GB RAM, 1TB SSD',
    price: 1299.99,
    rating: 4.7,
    imageUrl: 'https://m.media-amazon.com/images/I/71K84j2O8kL._AC_SX679_.jpg',
    affiliateLink: 'https://amazon.com/sample-product-1',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Lenovo Legion Pro Gaming Laptop',
    description: 'Lenovo Legion Pro with RTX 3070, AMD Ryzen 9, 32GB RAM, 2TB SSD',
    price: 1599.99,
    rating: 4.8,
    imageUrl: 'https://m.media-amazon.com/images/I/71Bfs-CYqGL._AC_SX679_.jpg',
    affiliateLink: 'https://amazon.com/sample-product-2',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Acer Predator Gaming Laptop',
    description: 'Acer Predator with RTX 3080, Intel i9, 32GB RAM, 1TB SSD',
    price: 1899.99,
    rating: 4.6,
    imageUrl: 'https://m.media-amazon.com/images/I/71Bfs-CYqGL._AC_SX679_.jpg',
    affiliateLink: 'https://amazon.com/sample-product-3',
    category: 'Electronics'
  }
];

export const mockAnalysis = {
  summary: "Based on your requirements, here's a detailed comparison of the gaming laptops:",
  recommendations: [
    "The ASUS ROG offers the best value for money with excellent gaming performance",
    "The Lenovo Legion Pro provides superior cooling and build quality",
    "The Acer Predator has the highest raw performance but at a premium price"
  ],
  features: {
    'Performance': [
      'ASUS ROG: Great 1440p gaming performance with RTX 4060',
      'Lenovo Legion Pro: Excellent for both gaming and content creation',
      'Acer Predator: Top-tier performance for demanding games'
    ],
    'Value': [
      'ASUS ROG: Best price-to-performance ratio',
      'Lenovo Legion Pro: Premium features justify the price',
      'Acer Predator: Premium pricing but maximum performance'
    ],
    'Battery Life': [
      'ASUS ROG: Up to 6 hours for normal use',
      'Lenovo Legion Pro: Up to 8 hours with optimizations',
      'Acer Predator: Around 4-5 hours under normal use'
    ]
  }
}; 