import { motion } from "framer-motion";
import { playSound } from "../utils/audio";

interface WelcomeMenuProps {
  onStart: () => void;
}

export default function WelcomeMenu({ onStart }: WelcomeMenuProps) {
  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/assets/main_main_menu.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.button
        type="button"
        onClick={() => {
          playSound("button_click.mp3");
          onStart();
        }}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: 0,
          lineHeight: 0,
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        aria-label="Бастау"
      >
        <img
          src="/assets/main_button.png"
          alt="Бастау"
          draggable={false}
          style={{
            width: "clamp(120px, 14vw, 220px)",
            height: "auto",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.35))",
          }}
        />
      </motion.button>
    </motion.div>
  );
}
