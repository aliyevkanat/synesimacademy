import { motion } from "framer-motion";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

interface Cat2CategoryMenuProps {
  onSelect: (screen: Screen) => void;
  onHome: () => void;
}

const cardsData = [
  {
    id: "g2_temp_mode" as Screen,
    title: "Ыстық және Суық",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #FF9500 50%, #FFB347 100%)",
    icon: "/assets/sandyq/hot_cold_icon.png",
  },
  {
    id: "g2_texture_mode" as Screen,
    title: "Жұмсақ және Қатты",
    gradient: "linear-gradient(135deg, #7B5EA7 0%, #9C6FD6 50%, #B39DDB 100%)",
    icon: "/assets/sandyq/hard_soft_icon.png",
  },
  {
    id: "g2_weight_mode" as Screen,
    title: "Жеңіл және Ауыр",
    gradient: "linear-gradient(135deg, #2E7D32 0%, #43A047 50%, #66BB6A 100%)",
    icon: "/assets/sandyq/heavy_light_icon.png",
  },
];

export default function Cat2CategoryMenu({ onSelect, onHome }: Cat2CategoryMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/assets/sandyq/sandyq_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Nunito, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: "clamp(16px, 2.5vh, 32px)",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "2px solid rgba(255,255,255,0.5)",
          borderRadius: 50,
          padding: "10px 40px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playSound("button_click.mp3");
            onHome();
          }}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
            border: "2px solid rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h1
          style={{
            fontFamily: "Fredoka, Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "white",
            letterSpacing: 3,
            textShadow: "2px 3px 0px rgba(0,0,0,0.35)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          СИҚЫРЛЫ САНДЫҚ
        </h1>
      </motion.div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "clamp(20px, 3vw, 40px)",
          padding: "clamp(24px, 3vh, 48px) 24px clamp(32px, 5vh, 80px)",
          flex: 1,
          alignContent: "center",
        }}
      >
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 60, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onSelect(card.id);
            }}
            style={{
              width: "clamp(240px, 26vw, 300px)",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.28)",
              cursor: "pointer",
              background: "white",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: card.gradient,
                padding: "20px 16px 40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <h2
                style={{
                  fontFamily: "Fredoka, Nunito, sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                  textShadow: "1px 2px 0px rgba(0,0,0,0.2)",
                }}
              >
                {card.title}
              </h2>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  lineHeight: 0,
                }}
              >
                <svg
                  viewBox="0 0 500 40"
                  preserveAspectRatio="none"
                  style={{ width: "100%", height: 40, display: "block" }}
                >
                  <path
                    d="M0,20 C125,40 375,0 500,20 L500,40 L0,40 Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                background: "white",
                padding: "8px 16px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: 20,
                  border: "2px dashed #E0E0E0",
                  padding: "14px 12px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.12))",
                  }}
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("button_click.mp3");
                  onSelect(card.id);
                }}
                style={{
                  background: "#6B3FCC",
                  color: "white",
                  borderRadius: 50,
                  padding: "13px 0",
                  width: "90%",
                  fontWeight: 900,
                  fontSize: 18,
                  fontFamily: "Fredoka, Nunito, sans-serif",
                  boxShadow: "0 5px 0 #462799",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Ойнау
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
