import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion, useAnimationControls } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props {
  onHome: () => void;
  onReplay: () => void;
}

type CupSide = "left" | "right";

const ASSETS = {
  base: "/assets/heavy_light_images/base.png",
  crossbar: "/assets/heavy_light_images/crossbar.png",
  leftCup: "/assets/heavy_light_images/left_pumpkin_cup.png",
  rightCup: "/assets/heavy_light_images/right_eggplant_cup.png",
} as const;

function fireCorrectConfetti() {
  const colors = ["#ff4d8d", "#ffcc00", "#4ade80", "#22c55e", "#60a5fa", "#a855f7"];
  const origin = { x: 0.33, y: 0.6 };

  const burst = (particleCount: number, spread: number, startVelocity: number) => {
    confetti({
      particleCount,
      spread,
      startVelocity,
      gravity: 1.1,
      ticks: 220,
      scalar: 0.95,
      origin,
      colors,
    });
  };

  burst(55, 62, 36);
  window.setTimeout(() => burst(45, 72, 32), 220);
  window.setTimeout(() => burst(35, 86, 28), 460);
}

export default function G2Weight({ onHome, onReplay }: Props) {
  const [tiltAngle, setTiltAngle] = useState(0);
  const [showWellDone, setShowWellDone] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongSide, setWrongSide] = useState<CupSide | null>(null);

  const leftControls = useAnimationControls();
  const rightControls = useAnimationControls();

  const timersRef = useRef<number[]>([]);
  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const cupInverseRotate = useMemo(() => -tiltAngle, [tiltAngle]);

  const triggerWrong = async (side: CupSide) => {
    playSound("wrong_answer.mp3");
    setWrongSide(side);

    const controls = side === "left" ? leftControls : rightControls;
    await controls.start({
      x: [-8, 8, -8, 8, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });

    const t = window.setTimeout(() => setWrongSide((s) => (s === side ? null : s)), 260);
    timersRef.current.push(t);
  };

  const triggerCorrect = () => {
    if (locked) return;
    setLocked(true);
    playSound("correct_answer.mp3");
    setTiltAngle(-12);
    fireCorrectConfetti();

    const t = window.setTimeout(() => setShowWellDone(true), 1900);
    timersRef.current.push(t);
  };

  const onPick = (side: CupSide) => {
    if (locked) return;
    if (side === "left") {
      triggerCorrect();
      return;
    }
    void triggerWrong(side);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-8"
      style={{
        background:
          "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.95) 0%, rgba(255,242,252,0.8) 28%, rgba(214,236,255,0.95) 60%, rgba(207,221,255,1) 100%)",
      }}
    >
      <HomeButton onHome={onHome} />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from -8deg at 50% 22%, rgba(255,255,255,0.55) 0deg, rgba(255,255,255,0.55) 10deg, rgba(255,255,255,0) 10deg, rgba(255,255,255,0) 18deg)",
          }}
        />
        <div
          className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[920px] max-w-[150vw] h-[520px] opacity-[0.18]"
          style={{
            background:
              "conic-gradient(from 180deg, rgba(255,0,120,0.9), rgba(255,200,0,0.9), rgba(60,220,140,0.9), rgba(80,160,255,0.9), rgba(168,85,247,0.9), rgba(255,0,120,0.9))",
            borderRadius: "9999px",
            filter: "blur(42px)",
          }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-[980px] rounded-[34px] border-[6px] border-pink-300/90 bg-white/65 shadow-2xl backdrop-blur-md px-6 sm:px-10 pt-3 sm:pt-5 pb-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="translate-y-6 sm:translate-y-8">
          <div className="text-center">
            <div
              className="inline-block -translate-y-3 sm:-translate-y-4 text-[40px] sm:text-[52px] font-black tracking-tight text-fuchsia-700"
              style={{
                textShadow:
                  "0 3px 0 rgba(255,255,255,0.9), 0 7px 18px rgba(126,34,206,0.28)",
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
              }}
            >
              Қайсысы ауыр?
            </div>
            <div className="-translate-y-2 sm:-translate-y-3 mt-0 text-lg sm:text-xl font-extrabold text-purple-800/90">
              Ауыр затты таңда
            </div>
          </div>

          <div className="mt-20 sm:mt-24 flex items-center justify-center">
            <div className="relative w-full max-w-[760px] h-[430px] sm:h-[470px]">
              <img
                src={ASSETS.base}
                alt="scale base"
                draggable={false}
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[360px] sm:w-[420px] select-none"
              />

              <motion.div
                className="absolute left-1/2 bottom-[362px] sm:bottom-[382px] -translate-x-1/2 w-[760px] max-w-[96vw] h-[240px] select-none"
                style={{ transformOrigin: "50% 52%", x: -405 }}
                animate={{ rotate: tiltAngle }}
                transition={{ type: "spring", stiffness: 170, damping: 18 }}
              >
              <img
                src={ASSETS.crossbar}
                alt="scale crossbar"
                draggable={false}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
              />

              <motion.button
                type="button"
                onClick={() => onPick("left")}
                disabled={locked}
                className={[
                  "absolute left-[-34%] top-[41%] w-[540px] sm:w-[620px] origin-top cursor-pointer",
                  "focus:outline-none",
                ].join(" ")}
                style={{ transformOrigin: "50% 0%" }}
                whileHover={locked ? undefined : { scale: 1.06 }}
                whileTap={locked ? undefined : { scale: 0.95 }}
                animate={{
                  y: tiltAngle === 0 ? 0 : 24,
                  rotate: cupInverseRotate,
                  filter: wrongSide === "left" ? "drop-shadow(0 0 0 rgba(0,0,0,0))" : "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
                }}
                transition={{ type: "spring", stiffness: 210, damping: 16 }}
              >
                <motion.div
                  animate={leftControls}
                  className={[
                    "relative rounded-2xl",
                    wrongSide === "left"
                      ? "ring-4 ring-red-400 shadow-[0_0_0_6px_rgba(248,113,113,0.25)]"
                      : "ring-0",
                  ].join(" ")}
                  style={{
                    boxShadow:
                      wrongSide === "left"
                        ? "0 0 0 6px rgba(248,113,113,0.25)"
                        : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <img
                    src={ASSETS.leftCup}
                    alt="pumpkin (heavy)"
                    draggable={false}
                    className="w-full h-auto select-none"
                  />
                  {!locked && (
                    <div
                      className="absolute -inset-2 rounded-3xl opacity-0"
                      style={{
                        boxShadow: "0 0 0 0 rgba(236,72,153,0.0)",
                      }}
                    />
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => onPick("right")}
                disabled={locked}
                className={[
                  "absolute right-[-32%] top-[40%] w-[520px] sm:w-[580px] origin-top cursor-pointer",
                  "focus:outline-none",
                ].join(" ")}
                style={{ transformOrigin: "50% 0%" }}
                whileHover={locked ? undefined : { scale: 1.06 }}
                whileTap={locked ? undefined : { scale: 0.95 }}
                animate={{
                  y: tiltAngle === 0 ? 0 : -24,
                  rotate: cupInverseRotate,
                  filter: wrongSide === "right" ? "drop-shadow(0 0 0 rgba(0,0,0,0))" : "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
                }}
                transition={{ type: "spring", stiffness: 210, damping: 16 }}
              >
                <motion.div
                  animate={rightControls}
                  className={[
                    "relative rounded-2xl",
                    wrongSide === "right"
                      ? "ring-4 ring-red-400 shadow-[0_0_0_6px_rgba(248,113,113,0.25)]"
                      : "ring-0",
                  ].join(" ")}
                  style={{
                    boxShadow:
                      wrongSide === "right"
                        ? "0 0 0 6px rgba(248,113,113,0.25)"
                        : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <img
                    src={ASSETS.rightCup}
                    alt="eggplant (light)"
                    draggable={false}
                    className="w-full h-auto select-none"
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
        </div>
      </motion.div>

      {showWellDone && (
        <WellDone
          onReplay={() => {
            clearTimers();
            onReplay();
          }}
          onHome={() => {
            clearTimers();
            onHome();
          }}
        />
      )}
    </div>
  );
}
