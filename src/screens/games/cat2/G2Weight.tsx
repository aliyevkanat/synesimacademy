import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion, useAnimationControls } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onHome: () => void;
  onReplay: () => void;
}

type CupSide = "left" | "right";

type CupAnchorX = "left" | "right";

interface CupStyle {
  width: string;
  anchorX: CupAnchorX;
  anchorPercent: number;
  topPercent: number;
  offsetX: number;
  offsetY: number;
}

interface LevelConfig {
  title: string;
  subtitle: string;
  leftImage: string;
  leftAlt: string;
  rightImage: string;
  rightAlt: string;
  correctSide: CupSide;
  heavySide: CupSide;
  leftStyle: CupStyle;
  rightStyle: CupStyle;
}

const LEVELS: LevelConfig[] = [
  {
    title: "Қайсысы ауыр?",
    subtitle: "Ауыр затты таңда",
    leftImage: "/assets/heavy_light_images/left_pumpkin_cup.png",
    leftAlt: "pumpkin (heavy)",
    rightImage: "/assets/heavy_light_images/right_eggplant_cup.png",
    rightAlt: "eggplant (light)",
    correctSide: "left",
    heavySide: "left",
    leftStyle: {
      width: "w-[530px] sm:w-[600px]",
      anchorX: "left",
      anchorPercent: -34,
      topPercent: 41,
      offsetX: 20,
      offsetY: 0,
    },
    rightStyle: {
      width: "w-[520px] sm:w-[590px]",
      anchorX: "right",
      anchorPercent: -32,
      topPercent: 40,
      offsetX: 12,
      offsetY: 0,
    },
  },
  {
    title: "Қайсысы жеңіл?",
    subtitle: "Жеңіл затты таңда",
    leftImage: "/assets/heavy_light_images/left_pencil_cup_game2.png",
    leftAlt: "pencil (light)",
    rightImage: "/assets/heavy_light_images/right_iron_cup_game2.png",
    rightAlt: "iron (heavy)",
    correctSide: "left",
    heavySide: "right",
    leftStyle: {
      width: "w-[232px] sm:w-[268px]",
      anchorX: "left",
      anchorPercent: -34,
      topPercent: 41,
      offsetX: 188,
      offsetY: 0,
    },
    rightStyle: {
      width: "w-[250px] sm:w-[290px]",
      anchorX: "right",
      anchorPercent: -32,
      topPercent: 40,
      offsetX: -120,
      offsetY: 0,
    },
  },
  {
    title: "Қайсысы ауыр?",
    subtitle: "Ауыр затты таңда",
    leftImage: "/assets/heavy_light_images/left_bucket_cup_game3.png",
    leftAlt: "bucket (heavy)",
    rightImage: "/assets/heavy_light_images/right_wallet_cup_game3.png",
    rightAlt: "wallet (light)",
    correctSide: "left",
    heavySide: "left",
    leftStyle: {
      width: "w-[300px] sm:w-[340px]",
      anchorX: "left",
      anchorPercent: -34,
      topPercent: 41,
      offsetX: 180,
      offsetY: 0,
    },
    rightStyle: {
      width: "w-[290px] sm:w-[330px]",
      anchorX: "right",
      anchorPercent: -32,
      topPercent: 40,
      offsetX: -120,
      offsetY: 0,
    },
  },
  {
    title: "Қайсысы жеңіл?",
    subtitle: "Жеңіл затты таңда",
    leftImage: "/assets/heavy_light_images/left_aquarium_game4.png",
    leftAlt: "aquarium (heavy)",
    rightImage: "/assets/heavy_light_images/right_pipe_game4.png",
    rightAlt: "pipe (light)",
    correctSide: "right",
    heavySide: "left",
    leftStyle: {
      width: "w-[242px] sm:w-[282px]",
      anchorX: "left",
      anchorPercent: -34,
      topPercent: 41,
      offsetX: 165,
      offsetY: -24,
    },
    rightStyle: {
      width: "w-[268px] sm:w-[308px]",
      anchorX: "right",
      anchorPercent: -32,
      topPercent: 40,
      offsetX: -80,
      offsetY: 0,
    },
  },
];

const CONFETTI_COLORS = [
  "#ff4d8d",
  "#ffcc00",
  "#4ade80",
  "#22c55e",
  "#60a5fa",
  "#a855f7",
];

function fireConfettiAt(origin: { x: number; y: number }) {
  const burst = (
    particleCount: number,
    spread: number,
    startVelocity: number,
  ) => {
    confetti({
      particleCount,
      spread,
      startVelocity,
      gravity: 1.1,
      ticks: 220,
      scalar: 0.95,
      origin,
      colors: CONFETTI_COLORS,
    });
  };

  burst(55, 62, 36);
  window.setTimeout(() => burst(45, 72, 32), 220);
  window.setTimeout(() => burst(35, 86, 28), 460);
}

export default function G2Weight({ onHome }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [tiltAngle, setTiltAngle] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
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

  const level = LEVELS[currentLevel];
  const cupInverseRotate = useMemo(() => -tiltAngle, [tiltAngle]);

  const leftCupY = useMemo(() => {
    if (tiltAngle === 0) return 0;
    return level.heavySide === "left" ? 24 : -24;
  }, [tiltAngle, level.heavySide]);

  const rightCupY = useMemo(() => {
    if (tiltAngle === 0) return 0;
    return level.heavySide === "right" ? 24 : -24;
  }, [tiltAngle, level.heavySide]);

  const triggerWrong = async (side: CupSide) => {
    playSound("wrong_answer.mp3");
    setWrongSide(side);

    const controls = side === "left" ? leftControls : rightControls;
    await controls.start({
      x: [-8, 8, -8, 8, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });

    const t = window.setTimeout(
      () => setWrongSide((s) => (s === side ? null : s)),
      260,
    );
    timersRef.current.push(t);
  };

  const triggerCorrect = () => {
    if (locked) return;
    setLocked(true);
    playSound("correct_answer.mp3");

    const angle = level.heavySide === "left" ? -12 : 12;
    setTiltAngle(angle);

    const confettiX = level.correctSide === "left" ? 0.33 : 0.67;
    fireConfettiAt({ x: confettiX, y: 0.6 });

    const t = window.setTimeout(() => setShowComplete(true), 1900);
    timersRef.current.push(t);
  };

  const onPick = (side: CupSide) => {
    if (locked) return;
    if (side === level.correctSide) {
      triggerCorrect();
      return;
    }
    void triggerWrong(side);
  };

  const resetLevel = () => {
    clearTimers();
    setTiltAngle(0);
    setShowComplete(false);
    setLocked(false);
    setWrongSide(null);
  };

  const handleNext = () => {
    if (currentLevel >= LEVELS.length - 1) {
      clearTimers();
      onHome();
      return;
    }
    resetLevel();
    setCurrentLevel((prev) => prev + 1);
  };

  const handleReplay = () => {
    resetLevel();
  };

  const isLastLevel = currentLevel >= LEVELS.length - 1;

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
        className="relative w-full max-w-[1080px] rounded-[34px] border-[6px] border-pink-300/90 bg-white/65 shadow-2xl backdrop-blur-md px-6 sm:px-10 pt-3 sm:pt-5 pb-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="translate-y-4 sm:translate-y-5">
          <div className="relative z-10 text-center -translate-y-4 sm:-translate-y-6">
            <motion.div
              key={`title-${currentLevel}`}
              className="inline-block -translate-y-4 sm:-translate-y-5 text-[40px] sm:text-[52px] font-black tracking-tight text-fuchsia-700"
              style={{
                textShadow:
                  "0 3px 0 rgba(255,255,255,0.9), 0 7px 18px rgba(126,34,206,0.28)",
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {level.title}
            </motion.div>
            <motion.div
              key={`sub-${currentLevel}`}
              className="-translate-y-3 sm:-translate-y-4 mt-0 text-lg sm:text-xl font-extrabold text-purple-800/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {level.subtitle}
            </motion.div>

            <div className="flex items-center justify-center gap-2 mt-0.5 -translate-y-1 sm:-translate-y-2">
              {LEVELS.map((_, i) => (
                <div
                  key={i}
                  className={[
                    "w-3 h-3 rounded-full transition-all duration-300",
                    i === currentLevel
                      ? "bg-fuchsia-500 scale-125 shadow-md"
                      : i < currentLevel
                        ? "bg-fuchsia-300"
                        : "bg-purple-200",
                  ].join(" ")}
                />
              ))}
              <span className="ml-2 text-sm font-bold text-purple-600/70">
                {currentLevel + 1}/{LEVELS.length}
              </span>
            </div>
          </div>

          <div className="mt-20 sm:mt-24 flex items-center justify-center">
            <div className="relative w-full max-w-[760px] h-[430px] sm:h-[470px]">
              <img
                src="/assets/heavy_light_images/base.png"
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
                  src="/assets/heavy_light_images/crossbar.png"
                  alt="scale crossbar"
                  draggable={false}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                />

                <motion.button
                  type="button"
                  onClick={() => onPick("left")}
                  disabled={locked}
                  className={[
                    "absolute origin-top cursor-pointer focus:outline-none",
                    level.leftStyle.width,
                  ].join(" ")}
                  style={{
                    transformOrigin: "50% 0%",
                    [level.leftStyle.anchorX]: `${level.leftStyle.anchorPercent}%`,
                    top: `${level.leftStyle.topPercent}%`,
                  }}
                  whileHover={locked ? undefined : { scale: 1.06 }}
                  whileTap={locked ? undefined : { scale: 0.95 }}
                  animate={{
                    x: level.leftStyle.offsetX,
                    y: leftCupY + level.leftStyle.offsetY,
                    rotate: cupInverseRotate,
                    filter:
                      wrongSide === "left"
                        ? "drop-shadow(0 0 0 rgba(0,0,0,0))"
                        : "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
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
                      src={level.leftImage}
                      alt={level.leftAlt}
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
                    "absolute origin-top cursor-pointer focus:outline-none",
                    level.rightStyle.width,
                  ].join(" ")}
                  style={{
                    transformOrigin: "50% 0%",
                    [level.rightStyle.anchorX]: `${level.rightStyle.anchorPercent}%`,
                    top: `${level.rightStyle.topPercent}%`,
                  }}
                  whileHover={locked ? undefined : { scale: 1.06 }}
                  whileTap={locked ? undefined : { scale: 0.95 }}
                  animate={{
                    x: level.rightStyle.offsetX,
                    y: rightCupY + level.rightStyle.offsetY,
                    rotate: cupInverseRotate,
                    filter:
                      wrongSide === "right"
                        ? "drop-shadow(0 0 0 rgba(0,0,0,0))"
                        : "drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
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
                      src={level.rightImage}
                      alt={level.rightAlt}
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

      {showComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 mx-4"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-7xl">🌟</span>
            <p className="text-3xl font-bold text-slate-700">Жарайсың!</p>
            <div className="flex gap-4">
              <motion.button
                onClick={handleReplay}
                className="px-6 py-3 bg-amber-400 text-white font-bold text-lg rounded-2xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Қайталау
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="px-6 py-3 bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLastLevel ? "🏠 Мәзірге" : "Келесі ▶"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
