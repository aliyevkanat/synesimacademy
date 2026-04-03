import { motion } from "framer-motion";
import { playSound } from "../utils/audio";

interface HomeButtonProps {
  onHome: () => void;
}

export default function HomeButton({ onHome }: HomeButtonProps) {
  return (
    <motion.button
      onClick={() => {
        playSound("button_click.mp3");
        onHome();
      }}
      className="fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
    >
      🏠
    </motion.button>
  );
}
