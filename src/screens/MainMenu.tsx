import { motion } from "framer-motion";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

interface MainMenuProps {
  go: (screen: Screen) => void;
}

const categories: {
  id: Screen;
  title: string;
  image: string;
  style: React.CSSProperties;
  floatEmoji: string;
  floatStyle: React.CSSProperties;
  floatDelay: number;
}[] = [
  {
    id: "cat1",
    title: "Түрлі-түсті әлем",
    image: "/assets/images/menu1.png",
    style: { position: "absolute", top: "21%", left: "19%", zIndex: 10 },
    floatEmoji: "🌈",
    floatStyle: { top: "calc(21% - 30px)", left: "calc(19% + 10px)" },
    floatDelay: 0,
  },
  {
    id: "cat2",
    title: "Сиқырлы сандық",
    image: "/assets/images/menu2.png",
    style: { position: "absolute", top: "21%", right: "16%", zIndex: 10 },
    floatEmoji: "✨",
    floatStyle: { top: "calc(21% - 30px)", right: "calc(16% + 10px)" },
    floatDelay: 0.6,
  },
  {
    id: "cat3",
    title: "Дәм мен Иіс",
    image: "/assets/images/menu3.png",
    style: { position: "absolute", bottom: "16%", left: "19%", zIndex: 10 },
    floatEmoji: "🍬",
    floatStyle: { bottom: "calc(16% + 150px)", left: "calc(19% + 10px)" },
    floatDelay: 1.2,
  },
  {
    id: "cat4",
    title: "Дыбыстар әлемі",
    image: "/assets/images/menu4.png",
    style: { position: "absolute", bottom: "16%", right: "16%", zIndex: 10 },
    floatEmoji: "🎵",
    floatStyle: { bottom: "calc(16% + 150px)", right: "calc(16% + 10px)" },
    floatDelay: 1.8,
  },
];

const Nail = ({ side }: { side: "left" | "right" }) => (
  <div
    style={{
      position: "absolute",
      top: "8px",
      [side]: "10px",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #e0e0e0, #888)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
    }}
  />
);

export default function MainMenu({ go }: MainMenuProps) {
  return (
    <motion.div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/assets/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        <h1
          style={{
            fontWeight: "900",
            fontSize: "clamp(24px, 4vw, 44px)",
            color: "#ffffff",
            textShadow: "3px 3px 0px #5c3a00, -1px -1px 0px #5c3a00",
            margin: 0,
          }}
        >
          Сын есім академиясы
        </h1>
        <p
          style={{
            color: "#fff9e6",
            fontWeight: "700",
            fontSize: "clamp(12px, 1.8vw, 20px)",
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
            margin: "4px 0 0",
          }}
        >
          Қазақ тіліндегі сын есімдер
        </p>
      </div>

      {/* Floating decorations */}
      {categories.map((cat) => (
        <motion.div
          key={`float-${cat.id}`}
          style={{
            position: "absolute",
            fontSize: "20px",
            pointerEvents: "none",
            zIndex: 11,
            ...cat.floatStyle,
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: cat.floatDelay }}
        >
          {cat.floatEmoji}
        </motion.div>
      ))}

      {/* Desktop: absolutely positioned cards */}
      <div className="hidden-on-mobile">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => {
              playSound("button_click.mp3");
              go(cat.id);
            }}
            style={{
              ...cat.style,
              position: "absolute",
              background: "linear-gradient(180deg, #f5deb3 0%, #deb887 50%, #c8a06e 100%)",
              border: "4px solid #8b6914",
              borderRadius: "16px",
              boxShadow: "0 6px 0px #5a4009, 0 12px 24px rgba(0,0,0,0.45)",
              padding: "20px 24px 24px",
              width: "clamp(180px, 18vw, 240px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
            whileHover={{ y: -8, scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.93 }}
          >
            {/* Hanging rope */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "20px",
                background: "linear-gradient(180deg, #8b6914, #c8a06e)",
                borderRadius: "2px",
              }}
            />
            {/* Nail decorations */}
            <Nail side="left" />
            <Nail side="right" />

            <img
              src={cat.image}
              alt={cat.title}
              style={{
                width: "clamp(100px, 11vw, 140px)",
                height: "clamp(100px, 11vw, 140px)",
                objectFit: "contain",
                mixBlendMode: "multiply",
                filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.3))",
              }}
              draggable={false}
            />
            <span
              style={{
                fontWeight: "900",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                textAlign: "center",
                color: "#3d1f00",
                marginTop: "12px",
                textShadow: "0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              {cat.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Mobile: 2×2 centered grid */}
      <div className="mobile-grid">
        {categories.map((cat, i) => (
          <motion.button
            key={`m-${cat.id}`}
            type="button"
            onClick={() => {
              playSound("button_click.mp3");
              go(cat.id);
            }}
            style={{
              background: "linear-gradient(180deg, #f5deb3 0%, #deb887 50%, #c8a06e 100%)",
              border: "4px solid #8b6914",
              borderRadius: "16px",
              boxShadow: "0 6px 0px #5a4009, 0 12px 24px rgba(0,0,0,0.45)",
              padding: "12px 14px 16px",
              width: "140px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
            whileHover={{ y: -8, scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.93 }}
          >
            <Nail side="left" />
            <Nail side="right" />
            <img
              src={cat.image}
              alt={cat.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                mixBlendMode: "multiply",
                filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.3))",
              }}
              draggable={false}
            />
            <span
              style={{
                fontWeight: "900",
                fontSize: "clamp(11px, 3vw, 14px)",
                textAlign: "center",
                color: "#3d1f00",
                marginTop: "8px",
                textShadow: "0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              {cat.title}
            </span>
          </motion.button>
        ))}
      </div>

      <style>{`
        .hidden-on-mobile { display: block; }
        .mobile-grid { display: none; }

        @media (max-width: 768px) {
          .hidden-on-mobile { display: none !important; }
          .mobile-grid {
            display: grid;
            grid-template-columns: repeat(2, 140px);
            gap: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }
        }
      `}</style>
    </motion.div>
  );
}
