import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface G1ColorModeProps {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

const makePattern = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <text x="18" y="36" font-size="26" opacity="0.08">🧁</text>
      <text x="62" y="62" font-size="26" opacity="0.08">🎁</text>
      <text x="92" y="24" font-size="22" opacity="0.08">🧁</text>
      <text x="32" y="94" font-size="22" opacity="0.08">🎁</text>
    </svg>
  `.trim();
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export default function G1ColorMode({ onLearn, onQuiz, onHome }: G1ColorModeProps) {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-[#a78bfa] via-[#c8b8e8] to-[#f0abfc] relative overflow-hidden flex items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      style={{ backgroundImage: makePattern(), backgroundRepeat: "repeat" }}
    >
      <HomeButton onHome={onHome} />

      <div className="flex flex-col sm:flex-row gap-8 max-w-3xl w-full items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playSound("button_click.mp3");
            onLearn();
          }}
          className="w-[420px] max-w-[95vw] rounded-3xl border-4 border-yellow-400 shadow-xl overflow-hidden bg-transparent flex flex-col"
          style={{ height: 220 }}
        >
          <div className="flex-[0.65] min-h-0 bg-sky-200 relative overflow-hidden">
            <img
              src="/assets/g1_rainbow.png"
              alt="rainbow"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="flex-[0.35] flex-none bg-yellow-300 flex items-center justify-center w-full">
            <div className="text-center font-black text-slate-900 text-xl md:text-2xl leading-tight">
              ТҮСТЕРДІ ҮЙРЕНЕЙІК
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playSound("button_click.mp3");
            onQuiz();
          }}
          className="w-[420px] max-w-[95vw] rounded-3xl border-4 border-yellow-400 shadow-xl overflow-hidden bg-transparent flex flex-col"
          style={{ height: 220 }}
        >
          <div className="flex-[0.65] min-h-0 bg-sky-200 relative overflow-hidden">
            <img
              src="/assets/g1_test_objects.png"
              alt="test items"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="flex-[0.35] flex-none bg-yellow-300 flex items-center justify-center w-full">
            <div className="text-center font-black text-slate-900 text-xl md:text-2xl leading-tight">
              БІЛІМІҢДІ ТЕКСЕРІП КӨР
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}

