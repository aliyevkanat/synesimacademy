import clsx from "clsx";
import { motion } from "framer-motion";

interface TransparentBackButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function TransparentBackButton({
  onClick,
  className,
  ariaLabel = "Артқа",
}: TransparentBackButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "z-50 flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        "border-2 border-white/55 bg-white/25 shadow-lg backdrop-blur-md",
        "text-white",
        className,
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
        aria-hidden
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </motion.button>
  );
}
