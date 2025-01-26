import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-2 rounded-full ${
        isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-purple-100 text-purple-900'
      }`}
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  );
};

export default ThemeToggle;