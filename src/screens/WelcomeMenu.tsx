import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { playSound } from "../utils/audio";

interface WelcomeMenuProps {
  onStart: () => void;
}

const INFO_TEXT = `5 жастағы бала үшін экран алдында отыру уақыты шектеулі болуы керек. World Health Organization және American Academy of Pediatrics ұсынымдары бойынша:

• Күніне 1 сағаттан аспағаны дұрыс — телефон, планшет, теледидар, компьютердің жалпы уақыты.
• Контент сапалы әрі жасына сай болуы керек.
• Экранды жалғыз емес, ата-анамен бірге қараған пайдалы.
• Ұйықтардан кемінде 1 сағат бұрын экран қолданбаған дұрыс.
• Әр 20–30 минут сайын көзге және денеге үзіліс жасау керек.
• Экран уақыты белсенді ойын, далада жүру, кітап оқу, ұйқы орнына кетпеуі маңызды.


Балабақшадағы экран қолдану да шектеулі болғаны дұрыс. 5 жастағы балалар үшін мамандардың көпшілігі мынадай қағиданы ұсынады:

• Балабақшадағы экран уақыты қысқа және мақсатты болуы керек — мысалы, ән, дамыту видеосы, интерактивті оқу.
• Бір отырыс әдетте 15–20 минуттан аспағаны жақсы.
• Күні бойғы жалпы экран уақыты (үй + балабақша) шамамен 1 сағат көлемінде болғаны дұрыс.
• Экран тек "баланы тыныш отырғызу" құралы емес, тәрбиешімен бірге талқыланатын оқу материалы болғаны пайдалы.`;

export default function WelcomeMenu({ onStart }: WelcomeMenuProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <motion.div
      style={{
        position: "relative",
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

      {/* Info button — bottom-left */}
      <motion.button
        type="button"
        aria-label="Ақпарат"
        onClick={() => {
          playSound("button_click.mp3");
          setInfoOpen((v) => !v);
        }}
        style={{
          position: "fixed",
          bottom: 72,
          left: 28,
          zIndex: 50,
          width: 78,
          height: 78,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #27ae60 0%, #1e8449 100%)",
          border: "3px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 24px rgba(30,132,73,0.65), 0 2px 10px rgba(0,0,0,0.28)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          outline: "none",
        }}
        whileHover={{ scale: 1.12, boxShadow: "0 6px 28px rgba(39,174,96,0.7)" }}
        whileTap={{ scale: 0.93 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 16 }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="7.5" r="2.5" fill="white" />
          <rect x="11.5" y="12" width="5" height="12" rx="2.5" fill="white" />
        </svg>
      </motion.button>

      {/* Info panel — full screen overlay */}
      <AnimatePresence>
        {infoOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="info-backdrop"
              onClick={() => setInfoOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 55,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Full-screen centered panel */}
            <motion.div
              key="info-panel"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 20px",
                pointerEvents: "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                style={{
                  width: "min(680px, calc(100vw - 40px))",
                  maxHeight: "calc(100vh - 48px)",
                  background: "rgba(8, 35, 18, 0.88)",
                  backdropFilter: "blur(24px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                  borderRadius: 28,
                  border: "1.5px solid rgba(46,204,113,0.4)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                  padding: "32px 36px 28px 36px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  pointerEvents: "auto",
                }}
                initial={{ scale: 0.88, y: 32 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #27ae60, #1e8449)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 16px rgba(30,132,73,0.6)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="7.5" r="2.5" fill="white" />
                      <rect x="11.5" y="12" width="5" height="12" rx="2.5" fill="white" />
                    </svg>
                  </div>
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 20,
                      letterSpacing: 0.3,
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    Ата-аналарға ақпарат
                  </span>
                  <button
                    type="button"
                    onClick={() => setInfoOpen(false)}
                    style={{
                      marginLeft: "auto",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 22,
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: "background 0.15s",
                    }}
                    aria-label="Жабу"
                  >
                    ×
                  </button>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1.5,
                    background: "linear-gradient(90deg, rgba(46,204,113,0.6), rgba(46,204,113,0.1), transparent)",
                    borderRadius: 1,
                  }}
                />

                {/* Text */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 16,
                    lineHeight: 1.85,
                    margin: 0,
                    whiteSpace: "pre-line",
                    fontWeight: 400,
                    textShadow: "0 1px 4px rgba(0,0,0,0.35)",
                  }}
                >
                  {INFO_TEXT}
                </p>

                {/* Bottom accent */}
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, #27ae60, #1e8449, transparent)",
                    marginTop: 4,
                    opacity: 0.65,
                  }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
