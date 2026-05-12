import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

type ColorId =
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "white"
  | "orange"
  | "skyblue"
  | "pink"
  | "blue"
  | "brown";

interface G1ColorDetailProps {
  colorId: string;
  onBack: () => void;
  onHome: () => void;
}

const COLOR_IMAGES: Record<ColorId, string> = {
  red:     "/assets/tuster/red_color.png",
  green:   "/assets/tuster/green_color.PNG",
  purple:  "/assets/tuster/purple_color.PNG",
  yellow:  "/assets/tuster/yellow_color.png",
  white:   "/assets/tuster/white_color.PNG",
  orange:  "/assets/tuster/orange_color.PNG",
  skyblue: "/assets/tuster/white_blue_color.png",
  pink:    "/assets/tuster/pink_color.PNG",
  blue:    "/assets/tuster/blue_color.png",
  brown:   "/assets/tuster/brown_color.PNG",
};

function toColorId(raw: string): ColorId {
  return raw in COLOR_IMAGES ? (raw as ColorId) : "red";
}

export default function G1ColorDetail({ colorId, onBack, onHome }: G1ColorDetailProps) {
  const safeId = toColorId(colorId);
  const imgSrc = COLOR_IMAGES[safeId];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f8f8f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Home */}
      <HomeButton onHome={onHome} />

      {/* Back button — top-right so it doesn't overlap HomeButton */}
      <motion.button
        onClick={() => {
          playSound("button_click.mp3");
          onBack();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 50,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#a855f7",
          color: "#fff",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Артқа"
      >
        ←
      </motion.button>

      {/* Full-screen image */}
      <img
        src={imgSrc}
        alt={safeId}
        draggable={false}
        style={{
          width: "100%",
          minHeight: "100vh",
          maxWidth: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </motion.div>
  );
}
