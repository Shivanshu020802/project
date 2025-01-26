import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ShoppingBag, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { searchProducts } from '../lib/supabase';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  products?: Product[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image_url: string;
  description: string;
  affiliate_link: string;
}

const ExplorePage = () => {
  const { isDarkMode } = useThemeStore();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! What kind of product are you looking for today? You can ask me anything like "Best laptops under $1000" or "Skincare products for sensitive skin".'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const products = await searchProducts(query);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Based on your requirements, here are some recommendations:',
        products: products as Product[]
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error searching products:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while searching for products. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
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
          <Sparkles className="text-purple-600" />
          Explore Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Tell me what you're looking for, and I'll help you find the perfect product.
        </p>
      </motion.div>

      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white ml-4'
                    : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mr-4`
                }`}
              >
                <p>{message.content}</p>
                {message.products && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {message.products.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-lg overflow-hidden ${
                          isDarkMode ? 'bg-gray-700' : 'bg-white'
                        } shadow-lg`}
                      >
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <p className="text-sm mb-2">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">${product.price}</span>
                            <span className="text-yellow-500">★ {product.rating}</span>
                          </div>
                          <a
                            href={product.affiliate_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-2 flex items-center justify-center gap-2 p-2 rounded ${
                              isDarkMode
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-purple-100 hover:bg-purple-200'
                            } transition-colors`}
                          >
                            <ShoppingBag size={16} />
                            View on Amazon
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mr-4`}>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className={`flex-1 p-4 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
              disabled={isLoading}
            >
              <Send size={20} />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExplorePage;