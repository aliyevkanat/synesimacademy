import { motion } from "framer-motion";
import HomeButton from "../components/HomeButton";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

const gridStyle = `
  .cat1-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 350px));
    justify-content: center;
    column-gap: 68px;
    row-gap: 18px;
    width: min(820px, 92vw);
  }
  @media (max-width: 560px) {
    .cat1-grid {
      grid-template-columns: 1fr;
    }
  }
`;

interface Cat1CategoryMenuProps {
  title: string;
  onSelect: (screen: Screen) => void;
  onHome: () => void;
}

interface Cat1Card {
  id: Screen;
  label: string;
  preview: string;
  previewAlt: string;
  cardGradient: string;
  panelBg: string;
  panelBorder: string;
  border: string;
  shadow: string;
  previewMaxHeight: number;
  ctaGradient: string;
  ctaShadow: string;
}

const CARDS: Cat1Card[] = [
  {
    id: "g1_color_mode",
    label: "Түстер",
    preview: "/assets/alem/colors_menun.png",
    previewAlt: "Түрлі-түсті фигуралар",
    cardGradient: "linear-gradient(150deg, #ff8a9b 0%, #ff7043 50%, #ffb74d 100%)",
    panelBg: "rgba(255,255,255,0.26)",
    panelBorder: "rgba(255,255,255,0.55)",
    border: "3px solid rgba(255,255,255,0.6)",
    shadow: "0 14px 28px rgba(214, 84, 85, 0.28)",
    previewMaxHeight: 150,
    ctaGradient: "linear-gradient(135deg, #e91e63, #ff7043)",
    ctaShadow: "0 6px 16px rgba(233, 30, 99, 0.35)",
  },
  {
    id: "g1_size_mode",
    label: "Үлкен және Кіші",
    preview: "/assets/alem/big_small_menu.png",
    previewAlt: "Үлкен және кіші заттар",
    cardGradient: "linear-gradient(150deg, #80deea 0%, #29b6f6 50%, #1976d2 100%)",
    panelBg: "rgba(255,255,255,0.24)",
    panelBorder: "rgba(255,255,255,0.55)",
    border: "3px solid rgba(255,255,255,0.6)",
    shadow: "0 14px 28px rgba(25, 118, 210, 0.28)",
    previewMaxHeight: 150,
    ctaGradient: "linear-gradient(135deg, #0288d1, #26c6da)",
    ctaShadow: "0 6px 16px rgba(2, 136, 209, 0.35)",
  },
  {
    id: "g1_length_mode",
    label: "Ұзын және Қысқа",
    preview: "/assets/alem/long_short_menu.png",
    previewAlt: "Ұзын және қысқа заттар",
    cardGradient: "linear-gradient(150deg, #ffe082 0%, #ffb74d 50%, #ff9800 100%)",
    panelBg: "rgba(255,255,255,0.28)",
    panelBorder: "rgba(255,255,255,0.6)",
    border: "3px solid rgba(255,255,255,0.6)",
    shadow: "0 14px 28px rgba(255, 152, 0, 0.28)",
    previewMaxHeight: 150,
    ctaGradient: "linear-gradient(135deg, #f57c00, #fbc02d)",
    ctaShadow: "0 6px 16px rgba(245, 124, 0, 0.35)",
  },
  {
    id: "g1_width_mode",
    label: "Жуан және Жіңішке",
    preview: "/assets/alem/thick_thin_menu.png",
    previewAlt: "Жуан және жіңішке заттар",
    cardGradient: "linear-gradient(145deg, #ce93d8 0%, #ab47bc 45%, #7b1fa2 100%)",
    panelBg: "rgba(255,255,255,0.26)",
    panelBorder: "rgba(255,255,255,0.52)",
    border: "3px solid rgba(255,255,255,0.55)",
    shadow: "0 14px 28px rgba(110, 73, 176, 0.28)",
    previewMaxHeight: 150,
    ctaGradient: "linear-gradient(135deg, #7e57c2, #ec407a)",
    ctaShadow: "0 6px 16px rgba(126, 87, 194, 0.35)",
  },
];

export default function Cat1CategoryMenu({ title, onSelect, onHome }: Cat1CategoryMenuProps) {
  return (
    <>
    <style>{gridStyle}</style>
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
        backgroundImage: "url('/assets/alem/alem_background.png')",
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
          background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "5%",
          left: "8%",
          width: 142,
          height: 66,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.55)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
        animate={{ x: [0, 16, 0], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "9%",
          right: "10%",
          width: 108,
          height: 50,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.45)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
        animate={{ x: [0, -14, 0], y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: "6%",
          top: "30%",
          fontSize: 21,
          opacity: 0.55,
          textShadow: "0 2px 8px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "7%",
          top: "35%",
          fontSize: 24,
          opacity: 0.5,
          textShadow: "0 2px 8px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
      >
        🌟
      </motion.div>

      <HomeButton onHome={onHome} className="!top-2" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "72px 20px 56px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{
            marginBottom: 24,
            padding: "14px 36px",
            borderRadius: 28,
            background: "rgba(255,255,255,0.38)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(24px, 3.5vw, 40px)",
            letterSpacing: 0.4,
            textShadow: "0 2px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.18)",
            textAlign: "center",
          }}
        >
          {title}
        </motion.div>

        <div className="cat1-grid">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => {
                playSound("button_click.mp3");
                onSelect(card.id);
              }}
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 175, damping: 16, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${card.label}, Таңдау`}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
                padding: 0,
                borderRadius: 20,
                overflow: "hidden",
                border: card.border,
                boxShadow: card.shadow,
                background: card.cardGradient,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  padding: "13px 13px 13px",
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(17px, 2.1vw, 22px)",
                    fontWeight: 900,
                    color: "#fff",
                    textShadow: "0 2px 10px rgba(0,0,0,0.25)",
                    marginBottom: 10,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    borderRadius: 14,
                    background: card.panelBg,
                    border: `2px solid ${card.panelBorder}`,
                    padding: "10px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 116,
                  }}
                >
                  <img
                    src={card.preview}
                    alt={card.previewAlt}
                    draggable={false}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: card.previewMaxHeight,
                      objectFit: "contain",
                      filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.22))",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "grid",
                  placeItems: "center",
                  padding: "6px 12px 12px",
                }}
              >
                <div
                  style={{
                    borderRadius: 999,
                    padding: "12px 42px",
                    minWidth: "min(86%, 260px)",
                    width: "min(86%, 260px)",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 16,
                    letterSpacing: 0.4,
                    background: card.ctaGradient,
                    boxShadow: card.ctaShadow,
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Таңдау
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
    </>
  );
}
