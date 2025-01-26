import { motion } from 'framer-motion';
import { Search, SplitSquareHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Never Get It Wrong With</h1>
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ShopNotch
        </h2>
        <p className="text-xl md:text-2xl mt-4 text-purple-600 font-semibold">
          #1 AI Powered Shopper
        </p>
      </motion.div>

      <motion.img
        src="/panda.png"
        alt="ShopNotch Panda"
        className="w-48 h-48 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/explore')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg w-full ${
            isDarkMode 
              ? 'bg-purple-900 hover:bg-purple-800' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white font-semibold`}
        >
          <Search size={24} />
          I want to find
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/compare')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg w-full ${
            isDarkMode 
              ? 'bg-purple-900 hover:bg-purple-800' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white font-semibold`}
        >
          <SplitSquareHorizontal size={24} />
          I want to compare
        </motion.button>
      </div>

      <div className="flex justify-between mt-8 w-full max-w-2xl text-center">
        <p className="flex-1">
          Discover with ShopNotch: Perfect Product Match based on your needs
        </p>
        <p className="flex-1">
          Compare with ShopNotch: Hassle-Free Comparison to choose the best
        </p>
      </div>
    </div>
  );
};

export default HomePage;