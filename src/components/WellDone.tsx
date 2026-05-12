import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface WellDoneProps {
  onReplay: () => void;
  onHome: () => void;
}

export default function WellDone({ onReplay, onHome }: WellDoneProps) {
  useEffect(() => {
    const duration = 2200;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 38,
      spread: 360,
      ticks: 70,
      zIndex: 60,
      colors: ["#FFD166", "#06D6A0", "#118AB2", "#EF476F", "#FF9F80", "#A78BFA"],
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    // Initial big burst from the center
    confetti({
      ...defaults,
      particleCount: 140,
      origin: { x: 0.5, y: 0.55 },
      spread: 110,
      startVelocity: 55,
    });

    // Continuous side bursts for ~2 seconds
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }
      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 280);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 mx-4"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="text-7xl">🌟</span>
        <p className="text-3xl font-bold text-slate-700">Жарайсың!</p>
        <div className="flex gap-4">
          <motion.button
            onClick={onReplay}
            className="px-6 py-3 bg-amber-400 text-white font-bold text-lg rounded-2xl shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Қайталау
          </motion.button>
          <motion.button
            onClick={onHome}
            className="px-6 py-3 bg-amber-400 text-white font-bold text-lg rounded-2xl shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 Мәзірге
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
