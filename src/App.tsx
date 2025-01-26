import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import AnimatedBackground from './components/AnimatedBackground';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ComparePage from './pages/ComparePage';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <AnimatedBackground />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;