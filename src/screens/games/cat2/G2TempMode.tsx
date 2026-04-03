import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G2TempMode({ onLearn, onQuiz, onHome }: Props) {
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
      <div className="bg-black/20 min-h-screen flex flex-col items-center justify-center p-6 relative">
        <HomeButton onHome={onHome} />

        <h1
          className="font-extrabold text-4xl text-white mb-10 text-center"
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.4)" }}
        >
          🌡️ Ыстық және Суық
        </h1>

        <div className="flex gap-8 flex-wrap justify-center">
          {/* Left card — learn */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            style={{
              background: "linear-gradient(135deg, #ff6b35, #ff0000)",
              border: "4px solid #cc0000",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(255,0,0,0.4)",
              padding: "32px 40px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/assets/hot_cold_images/red_temp.png"
              alt="red thermometer"
              style={{
                width: 80,
                height: 120,
                objectFit: "contain",
                filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))",
              }}
            />
            <div
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 20,
                textAlign: "center",
                marginTop: 12,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                maxWidth: 180,
              }}
            >
              Температураны ажыратайық
            </div>
          </motion.div>

          {/* Right card — quiz */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              background: "linear-gradient(135deg, #4fc3f7, #0d47a1)",
              border: "4px solid #0a2f6e",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(13,71,161,0.4)",
              padding: "32px 40px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {["cup.png", "ice_cream.png", "fire.png", "snow.png"].map((img) => (
                <img
                  key={img}
                  src={`/assets/hot_cold_images/${img}`}
                  alt={img}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 20,
                textAlign: "center",
                marginTop: 12,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                maxWidth: 180,
              }}
            >
              Біліміңді тексеріп көр
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
