import { motion } from "framer-motion";
import HomeButton from "../components/HomeButton";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

interface Cat3CategoryMenuProps {
  onSelect: (screen: Screen) => void;
  onHome: () => void;
}

interface Cat3Card {
  id: Screen;
  label: string;
  preview: string;
  previewAlt: string;
  cardGradient: string;
  ctaGradient: string;
  ctaShadow: string;
  titleColor: string;
  titleShadow: string;
}

const CARDS: Cat3Card[] = [
  {
    id: "g3_taste_mode",
    label: "Тәтті және Ащы",
    preview: "/assets/tasty/tatty_ashy.png",
    previewAlt: "Тәтті және ащы дәм",
    cardGradient: "linear-gradient(145deg, #FF6B6B 0%, #FF8E53 55%, #FFA07A 100%)",
    ctaGradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
    ctaShadow: "0 6px 16px rgba(255,100,80,0.40)",
    titleColor: "#ffffff",
    titleShadow: "1px 2px 4px rgba(0,0,0,0.25)",
  },
  {
    id: "g3_sour_mode",
    label: "Тәтті және қышқыл",
    preview: "/assets/tasty/tatty_qushqyl.png",
    previewAlt: "Тәтті және қышқыл дәм",
    cardGradient: "linear-gradient(145deg, #FFE033 0%, #FFC107 50%, #FF9800 100%)",
    ctaGradient: "linear-gradient(135deg, #FFD600, #FF9800)",
    ctaShadow: "0 6px 16px rgba(255,180,0,0.42)",
    titleColor: "#5C3600",
    titleShadow: "1px 2px 4px rgba(255,255,255,0.45)",
  },
  {
    id: "g3_smell_mode",
    label: "Жағымды және жағымсыз иіс",
    preview: "/assets/tasty/zhagumdy_zhagumsyz.png",
    previewAlt: "Жағымды және жағымсыз иіс",
    cardGradient: "linear-gradient(145deg, #56CCF2 0%, #2F80ED 50%, #1A56A0 100%)",
    ctaGradient: "linear-gradient(135deg, #56CCF2, #2F80ED)",
    ctaShadow: "0 6px 16px rgba(47,128,237,0.40)",
    titleColor: "#ffffff",
    titleShadow: "1px 2px 4px rgba(0,0,0,0.25)",
  },
];

export default function Cat3CategoryMenu({ onSelect, onHome }: Cat3CategoryMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        backgroundImage: "url('/assets/tasty/tasty_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,200,220,0.10) 0%, rgba(180,100,120,0.12) 100%)",
          pointerEvents: "none",
        }}
      />

      <HomeButton onHome={onHome} />

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: "clamp(66px, 7vh, 88px)",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "min(92vw, 640px)",
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{
            background: "rgba(255,255,255,0.40)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "2px solid rgba(255,255,255,0.60)",
            borderRadius: 28,
            padding: "13px 36px",
            boxShadow: "0 10px 28px rgba(220,80,120,0.18)",
            fontWeight: 900,
            fontSize: "clamp(22px, 3vw, 36px)",
            color: "#6B0032",
            textShadow: "1px 1px 0 rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          🍬 Дәм мен иіс
        </motion.div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "92px 20px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(18px, 2.5vw, 28px)",
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            maxWidth: 1200,
            transform: "translateY(calc(-1 * clamp(12px, 2.5vh, 32px)))",
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              role="button"
              tabIndex={0}
              aria-label={`${card.label}, Таңдау`}
              onClick={() => {
                playSound("button_click.mp3");
                onSelect(card.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  playSound("button_click.mp3");
                  onSelect(card.id);
                }
              }}
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 16, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "clamp(280px, 28vw, 360px)",
                cursor: "pointer",
                borderRadius: 26,
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,0.58)",
                boxShadow: "0 18px 36px rgba(0,0,0,0.20)",
                background: card.cardGradient,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                outline: "none",
              }}
            >
              {/* Фиксированная высота: длинный заголовок на 2 строки не сдвигает рамку с фото */}
              <div
                style={{
                  flexShrink: 0,
                  height: "clamp(88px, 11vw, 104px)",
                  padding: "0 14px",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(15px, 1.9vw, 21px)",
                    lineHeight: 1.22,
                    color: card.titleColor,
                    textShadow: card.titleShadow,
                    textAlign: "center",
                  }}
                >
                  {card.label}
                </div>
              </div>

              <div
                style={{
                  margin: "0 14px 12px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.28)",
                  border: "2px solid rgba(255,255,255,0.50)",
                  padding: "5px 6px 10px",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  height: 232,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={card.preview}
                    alt={card.previewAlt}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.15))",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  background: "rgba(255,255,255,0.93)",
                  borderRadius: "0 0 26px 26px",
                  padding: "14px 16px 18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    borderRadius: 999,
                    padding: "11px 0",
                    width: "82%",
                    margin: "0 auto",
                    color: "white",
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: 0.5,
                    background: card.ctaGradient,
                    boxShadow: card.ctaShadow,
                    textShadow: "0 1px 2px rgba(0,0,0,0.18)",
                  }}
                >
                  Таңдау
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
