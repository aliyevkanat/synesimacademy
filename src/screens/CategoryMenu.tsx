import { motion } from "framer-motion";
import HomeButton from "../components/HomeButton";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

interface GameEntry {
  id: Screen;
  label: string;
  emoji: string;
}

interface CategoryMenuProps {
  title: string;
  color: string;
  games: GameEntry[];
  onSelect: (screen: Screen) => void;
  onHome: () => void;
}

export default function CategoryMenu({ title, color, games, onSelect, onHome }: CategoryMenuProps) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />

      <h1 className="text-3xl font-bold mb-8" style={{ color }}>
        {title}
      </h1>

      <div className="flex flex-col gap-3 max-w-sm w-full">
        {games.map((game, i) => (
          <motion.button
            key={game.id}
            onClick={() => {
              playSound("button_click.mp3");
              onSelect(game.id);
            }}
            className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-center gap-3 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.3 }}
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl">{game.emoji}</span>
            <span className="flex-1 font-bold text-slate-700">{game.label}</span>
            <span className="text-slate-400 font-bold text-xl">›</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
