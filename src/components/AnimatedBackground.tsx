import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full ${
            isDarkMode ? 'bg-purple-600/10' : 'bg-purple-300/10'
          }`}
          initial={{ x: bubble.x, y: bubble.y, scale: 0 }}
          animate={{
            x: [bubble.x - 50, bubble.x + 50, bubble.x - 50],
            y: [bubble.y - 50, bubble.y + 50, bubble.y - 50],
            scale: 1,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: bubble.size,
            height: bubble.size,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;