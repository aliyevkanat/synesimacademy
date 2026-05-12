import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props {
  onHome: () => void;
  onReplay: () => void;
}

type Side = "pleasant" | "unpleasant";

interface SmellItem {
  id: string;
  image: string;
  correct: Side;
}

const PLEASANT_ITEMS: SmellItem[] = [
  { id: "flowers",    image: "/assets/tasty/zhagumdy/flowers_game.png",    correct: "pleasant" },
  { id: "parfume",    image: "/assets/tasty/zhagumdy/parfume_game.png",    correct: "pleasant" },
  { id: "orange",     image: "/assets/tasty/zhagumdy/orange_game.png",     correct: "pleasant" },
  { id: "strawberry", image: "/assets/tasty/zhagumdy/strawberry_game.png", correct: "pleasant" },
];

const UNPLEASANT_ITEMS: SmellItem[] = [
  { id: "garbage",  image: "/assets/tasty/zhagumdy/garbage_game.png",  correct: "unpleasant" },
  { id: "fish",     image: "/assets/tasty/zhagumdy/fish_game.png",     correct: "unpleasant" },
  { id: "egg",      image: "/assets/tasty/zhagumdy/egg_game.png",      correct: "unpleasant" },
  { id: "oil",      image: "/assets/tasty/zhagumdy/oil_game.png",      correct: "unpleasant" },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function fireSideConfetti(side: Side) {
  const x = side === "pleasant" ? 0.08 : 0.92;
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x, y: 0.55 },
    colors:
      side === "pleasant"
        ? ["#F48FB1", "#E91E63", "#FFD600", "#66BB6A", "#AB47BC"]
        : ["#8D6E63", "#6D4C41", "#FFB300", "#9E9E9E", "#795548"],
  });
}

export default function G3Smell({ onHome, onReplay }: Props) {
  const initialOrder = useMemo(
    () => shuffle([...PLEASANT_ITEMS, ...UNPLEASANT_ITEMS]),
    [],
  );

  const [centerOrder, setCenterOrder] = useState<SmellItem[]>(initialOrder);
  const [placed, setPlaced] = useState<Record<string, Side>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shakeSide, setShakeSide] = useState<Side | null>(null);
  const [allDone, setAllDone] = useState(false);

  const pleasantPlaced = centerOrder.filter((i) => placed[i.id] === "pleasant");
  const unpleasantPlaced = centerOrder.filter((i) => placed[i.id] === "unpleasant");

  const handleItemClick = (id: string) => {
    if (placed[id] || allDone) return;
    playSound("button_click.mp3");
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleSideClick = (side: Side) => {
    if (!selectedId || allDone) return;
    const item = centerOrder.find((i) => i.id === selectedId);
    if (!item) return;

    if (item.correct === side) {
      playSound("correct_answer.mp3");
      fireSideConfetti(side);
      setPlaced((prev) => {
        const next = { ...prev, [item.id]: side };
        if (Object.keys(next).length === centerOrder.length) {
          window.setTimeout(() => setAllDone(true), 700);
        }
        return next;
      });
      setSelectedId(null);
    } else {
      playSound("wrong_answer.mp3");
      setShakeSide(side);
      window.setTimeout(() => setShakeSide(null), 500);
    }
  };

  const resetQuiz = () => {
    setCenterOrder(shuffle([...PLEASANT_ITEMS, ...UNPLEASANT_ITEMS]));
    setPlaced({});
    setSelectedId(null);
    setShakeSide(null);
    setAllDone(false);
    onReplay();
  };

  const renderSlot = (item: SmellItem | undefined, key: string, accent: string) => (
    <div
      key={key}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 14,
        background: "rgba(255,255,255,0.22)",
        border: `2px dashed ${accent}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      {item && (
        <motion.img
          key={item.id}
          src={item.image}
          alt=""
          draggable={false}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          style={{ width: "80%", height: "80%", objectFit: "contain" }}
        />
      )}
    </div>
  );

  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        backgroundImage: "url('/assets/tasty/zhagumdy/zhagumdy_background.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeButton onHome={onHome} />

      {/* Title — centered in top band (horizontal + vertical middle) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(56px, 9vh, 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 16,
          paddingRight: 16,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 18 }}
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.85)",
            borderRadius: 24,
            padding: "8px 28px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
            textAlign: "center",
            whiteSpace: "nowrap",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 2.2vw, 28px)",
              color: "#4A148C",
              letterSpacing: 1,
            }}
          >
            Иісі қандай?
          </div>
        </motion.div>
      </motion.div>

      {/* Main layout row — pinned to edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "70px 0 16px",
        }}
      >
        {/* ── LEFT PANEL (Жағымды) ── */}
        <motion.div
          onClick={() => handleSideClick("pleasant")}
          animate={shakeSide === "pleasant" ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(6px, 0.8vh, 12px)",
            padding: "clamp(8px, 1vw, 14px)",
            width: "clamp(122px, 13.5vw, 188px)",
            alignSelf: "stretch",
            justifyContent: "center",
            borderRadius: "0 20px 20px 0",
            background: selectedId
              ? "rgba(252,228,236,0.28)"
              : "rgba(252,228,236,0.10)",
            border: selectedId
              ? "3px solid #E91E63"
              : "2px solid rgba(244,143,177,0.45)",
            borderLeft: "none",
            boxShadow: selectedId
              ? "inset 0 0 0 2px rgba(233,30,99,0.15), 4px 0 20px rgba(233,30,99,0.12)"
              : "none",
            cursor: selectedId ? "pointer" : "default",
            transition: "border 0.2s, box-shadow 0.2s",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(13px, 1.4vw, 18px)",
              color: "#880E4F",
              textAlign: "center",
              letterSpacing: 1,
              textShadow: "0 1px 3px rgba(255,255,255,0.8)",
              marginBottom: 4,
            }}
          >
            Жағымды
          </div>
          {[0, 1, 2, 3].map((i) =>
            renderSlot(pleasantPlaced[i], `pleasant-${i}`, "#F48FB1"),
          )}
        </motion.div>

        {/* ── CENTER GRID ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(10px, 1.4vw, 20px)",
              padding: "clamp(10px, 1.4vw, 18px)",
              borderRadius: 24,
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "2px solid rgba(255,255,255,0.55)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
            }}
          >
            {centerOrder.map((item) => {
              const isPlaced = !!placed[item.id];
              const isSelected = selectedId === item.id;
              const ICON = "clamp(94px, 11.2vw, 144px)";
              return (
                <div
                  key={item.id}
                  style={{
                    width: ICON,
                    height: ICON,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!isPlaced ? (
                    <motion.button
                      onClick={() => handleItemClick(item.id)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      animate={isSelected ? { y: [0, -5, 0] } : { y: 0 }}
                      transition={
                        isSelected
                          ? { duration: 1, repeat: Infinity }
                          : { duration: 0.15 }
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.90)",
                        border: isSelected
                          ? "3px solid #FFB300"
                          : "2px solid rgba(255,255,255,0.8)",
                        boxShadow: isSelected
                          ? "0 0 0 4px rgba(255,179,0,0.3), 0 6px 16px rgba(0,0,0,0.18)"
                          : "0 4px 12px rgba(0,0,0,0.14)",
                        cursor: "pointer",
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        draggable={false}
                        style={{
                          width: "85%",
                          height: "85%",
                          objectFit: "contain",
                          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
                        }}
                      />
                    </motion.button>
                  ) : (
                    /* empty placeholder keeps the grid cell */
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.18)",
                        border: "2px dashed rgba(255,255,255,0.4)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT PANEL (Жағымсыз) ── */}
        <motion.div
          onClick={() => handleSideClick("unpleasant")}
          animate={shakeSide === "unpleasant" ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(6px, 0.8vh, 12px)",
            padding: "clamp(8px, 1vw, 14px)",
            width: "clamp(122px, 13.5vw, 188px)",
            alignSelf: "stretch",
            justifyContent: "center",
            borderRadius: "20px 0 0 20px",
            background: selectedId
              ? "rgba(239,235,233,0.30)"
              : "rgba(239,235,233,0.10)",
            border: selectedId
              ? "3px solid #6D4C41"
              : "2px solid rgba(141,110,99,0.45)",
            borderRight: "none",
            boxShadow: selectedId
              ? "inset 0 0 0 2px rgba(109,76,65,0.15), -4px 0 20px rgba(109,76,65,0.12)"
              : "none",
            cursor: selectedId ? "pointer" : "default",
            transition: "border 0.2s, box-shadow 0.2s",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(13px, 1.4vw, 18px)",
              color: "#3E2723",
              textAlign: "center",
              letterSpacing: 1,
              textShadow: "0 1px 3px rgba(255,255,255,0.8)",
              marginBottom: 4,
            }}
          >
            Жағымсыз
          </div>
          {[0, 1, 2, 3].map((i) =>
            renderSlot(unpleasantPlaced[i], `unpleasant-${i}`, "#8D6E63"),
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {allDone && <WellDone onReplay={resetQuiz} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
