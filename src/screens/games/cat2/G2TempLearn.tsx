import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onHot: () => void;
  onCold: () => void;
  onBack: () => void;
  onHome: () => void;
}

export default function G2TempLearn({ onHot, onCold, onBack, onHome }: Props) {
  void onBack;

  return (
    <motion.div
      style={{
        backgroundImage: "url('/assets/hot_cold_images/hot_cold%20background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/20 min-h-screen flex flex-col items-center justify-center p-6">
        <HomeButton onHome={onBack} />

        <h1
          className="font-extrabold text-3xl text-white mb-12 text-center"
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}
        >
          Температураны ажыратайық
        </h1>

        <div className="flex gap-12 flex-wrap justify-center items-center">
          {/* Hot thermometer */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onHot();
            }}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
            }}
          >
            <img
              src="/assets/hot_cold_images/red_temp.png"
              alt="hot thermometer"
              style={{
                width: "clamp(100px, 12vw, 160px)",
                height: "clamp(160px, 20vw, 260px)",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 16px rgba(255,50,50,0.5))",
              }}
            />
            <div
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 900,
                color: "#ff3333",
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.3), 0 0 20px rgba(255,100,100,0.8)",
                letterSpacing: "2px",
                background: "rgba(255,255,255,0.85)",
                padding: "8px 24px",
                borderRadius: "20px",
                border: "3px solid #ff3333",
              }}
            >
              ЫСТЫҚ
            </div>
          </motion.div>

          {/* Cold thermometer */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onCold();
            }}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
            }}
          >
            <img
              src="/assets/hot_cold_images/blue_temp.png"
              alt="cold thermometer"
              style={{
                width: "clamp(100px, 12vw, 160px)",
                height: "clamp(160px, 20vw, 260px)",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 16px rgba(50,100,255,0.5))",
              }}
            />
            <div
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 900,
                color: "#1565c0",
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.3), 0 0 20px rgba(50,150,255,0.8)",
                letterSpacing: "2px",
                background: "rgba(255,255,255,0.85)",
                padding: "8px 24px",
                borderRadius: "20px",
                border: "3px solid #1565c0",
              }}
            >
              СУЫҚ
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
