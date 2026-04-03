import { motion } from "framer-motion";

export default function Fox() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 text-5xl select-none pointer-events-none"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      🦊
    </motion.div>
  );
}
