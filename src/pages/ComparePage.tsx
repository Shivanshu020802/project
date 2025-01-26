import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, SplitSquareHorizontal, Trash2, MessageSquare } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { compareProducts } from '../lib/supabase';

interface Product {
  id: string;
  url: string;
  name?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  description?: string;
  features?: string[];
}

interface ComparisonResult {
  summary: string;
  recommendations: string[];
  features: Record<string, string[]>;
}

const ComparePage = () => {
  const { isDarkMode } = useThemeStore();
  const [products, setProducts] = useState<Product[]>([{ id: '1', url: '' }]);
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  const handleAddProduct = () => {
    setProducts(prev => [...prev, { id: Date.now().toString(), url: '' }]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const handleProductUrlChange = (id: string, url: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, url } : product
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || products.some(p => !p.url.trim())) return;

    setIsLoading(true);
    try {
      const productNames = products.map(p => p.url.trim());
      const response = await fetch('http://localhost:3001/api/products/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          names: productNames,
          query: userQuery
        })
      });

      const data = await response.json();
      if (data.success) {
        setComparisonResult({
          summary: data.analysis.summary,
          recommendations: data.analysis.recommendations,
          features: data.analysis.features
        });
      }
    } catch (error) {
      console.error('Error comparing products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <SplitSquareHorizontal className="text-purple-600" />
          Compare Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Add product URLs and tell us what matters most to you for a detailed comparison.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-purple-600 font-semibold">
                  Product {index + 1}
                </span>
                <input
                  type="url"
                  value={product.url}
                  onChange={(e) => handleProductUrlChange(product.id, e.target.value)}
                  placeholder="Enter product URL"
                  className={`flex-1 p-2 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600`}
                />
                {products.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleAddProduct}
          className={`w-full p-4 rounded-lg border-2 border-dashed ${
            isDarkMode
              ? 'border-gray-700 hover:border-purple-600'
              : 'border-gray-300 hover:border-purple-600'
          } flex items-center justify-center gap-2`}
        >
          <Plus size={20} />
          Add Another Product
        </motion.button>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={20} className="text-purple-600" />
            <label className="font-semibold">What matters most to you?</label>
          </div>
          <textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="E.g., I need a laptop with good battery life and performance for video editing under $1500"
            className={`w-full p-2 rounded ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            } focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]`}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`w-full p-4 rounded-lg ${
            isDarkMode
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white font-semibold flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-200" />
            </div>
          ) : (
            <>
              <Search size={20} />
              Compare Products
            </>
          )}
        </motion.button>
      </form>

      {comparisonResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-6 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}
        >
          <h2 className="text-2xl font-bold mb-4">Comparison Results</h2>
          <p className="mb-4">{comparisonResult.summary}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-2">
              {comparisonResult.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Feature Comparison</h3>
            <div className="space-y-4">
              {Object.entries(comparisonResult.features).map(([category, features]) => (
                <div key={category} className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h4 className="font-semibold text-purple-600 mb-2">{category}</h4>
                  <ul className="list-disc list-inside">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparePage;