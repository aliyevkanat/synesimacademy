import { motion } from "framer-motion";

interface PopupLabelProps {
  text: string;
  color: string;
}

export default function PopupLabel({ text, color }: PopupLabelProps) {
  return (
    <motion.div
      className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-3 rounded-2xl shadow-xl text-white font-bold text-lg text-center pointer-events-none"
      style={{ backgroundColor: color }}
      initial={{ scale: 0.5, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {text}
    </motion.div>
  );
}
