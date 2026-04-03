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
    gradient: "bg-gradient-to-b from-[#FF9500] to-[#FFB347]",
    gradientFrom: "#FF9500",
    gradientTo: "#FFB347",
    character: "🌡️",
    iconLeft: "☀️",
    iconRight: "🧊",
  },
  {
    id: "g2_texture" as Screen,
    title: "Жұмсақ және Қатты",
    gradient: "bg-gradient-to-b from-[#FFD700] to-[#FFF176]",
    gradientFrom: "#FFD700",
    gradientTo: "#FFF176",
    character: "☁️",
    iconLeft: "🧸",
    iconRight: "🪨",
  },
  {
    id: "g2_weight" as Screen,
    title: "Жеңіл және Ауыр",
    gradient: "bg-gradient-to-b from-[#66BB6A] to-[#A5D6A7]",
    gradientFrom: "#66BB6A",
    gradientTo: "#A5D6A7",
    character: "⚖️",
    iconLeft: "🪶",
    iconRight: "⚓",
  },
];


function Tree({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={`absolute ${className}`}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-24 bg-amber-700 rounded-sm" />
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-green-500 rounded-full" />
      <div className="absolute bottom-20 left-4 w-20 h-20 bg-green-400 rounded-full" />
      <div className="absolute bottom-20 right-4 w-20 h-20 bg-green-600 rounded-full" />
    </motion.div>
  );
}


export default function Cat2CategoryMenu({ onSelect, onHome }: Cat2CategoryMenuProps) {
  const handleCardClick = (id: Screen) => {
    playSound("button_click.mp3");
    onSelect(id);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-screen bg-[#1e1a38] flex items-center justify-center p-0 font-['Nunito'] overflow-hidden"
    >
      {/* Outer Device Frame */}
      <div className="relative w-full h-full bg-[#5c35c5] rounded-none p-2 sm:p-3 lg:p-4 shadow-2xl overflow-hidden ring-0 flex flex-col">

        {/* Inner Screen */}
        <div className="relative w-full h-full bg-[#87CEEB] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner border-4 border-[#3b1e84]/20">

          {/* Clouds */}
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-10 left-[10%] w-32 h-12 bg-white/90 rounded-full blur-[1px] shadow-sm"
          />
          <motion.div
            animate={{ x: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute top-16 right-[15%] w-24 h-10 bg-white/90 rounded-full blur-[1px] shadow-sm"
          />
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="absolute top-8 left-[45%] w-40 h-14 bg-white/80 rounded-full blur-[1px] shadow-sm"
          />

          {/* Background Trees */}
          <Tree className="bottom-[40%] left-[5%] scale-75 z-0 opacity-80" delay={0.2} />
          <Tree className="bottom-[35%] right-[8%] scale-[0.6] z-0 opacity-80" delay={0.4} />

          {/* Hills */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#66BB6A] rounded-[100%] z-0 border-t-[8px] border-[#4CAF50]" />
          <div className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[55%] bg-[#4CAF50] rounded-[100%] z-0 border-t-[8px] border-[#43A047]" />

          {/* Road */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] h-[45%] bg-[#9B88CF] z-0"
            style={{ clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0% 100%)" }}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 border-l-4 border-dashed border-white/40" />
          </div>

          {/* Foreground Trees */}
          <Tree className="bottom-[15%] left-0 scale-[1.2] z-10" delay={0.6} />
          <Tree className="bottom-[20%] right-[-2%] scale-100 z-10" delay={0.8} />

          {/* TOP BAR */}
          <div className="relative z-20 flex items-start md:items-center p-4 lg:p-6 gap-4">
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSound("button_click.mp3");
                onHome();
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/40 shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-[2rem] px-4 py-3 md:py-4 shadow-lg border border-white/40"
            >
              <h1 className="font-['Fredoka'] font-bold text-2xl md:text-3xl leading-tight text-white drop-shadow-md tracking-wide text-center uppercase">
                Сиқырлы сандық
              </h1>
            </motion.div>
          </div>

          {/* MAIN CARDS */}
          <div className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-4 pb-32 overflow-y-auto md:overflow-visible scrollbar-hide">
            {cardsData.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 100, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.2 * (idx + 1), type: "spring", bounce: 0.5, duration: 0.8 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="relative w-full max-w-[280px] min-w-[260px] bg-white rounded-[24px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] overflow-visible shrink-0 group cursor-pointer"
              >
                {/* Decorative character peeking */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5, ease: "easeInOut" }}
                  className="absolute -top-10 right-4 text-5xl z-30 drop-shadow-lg"
                >
                  {card.character}
                </motion.div>

                {/* Header */}
                <div
                  className="h-28 rounded-t-[24px] flex flex-col justify-center items-center px-4 relative overflow-hidden"
                  style={{ background: `linear-gradient(to bottom, ${card.gradientFrom}, ${card.gradientTo})` }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
                      <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="white" />
                    </svg>
                  </div>
                  <h2 className="font-['Fredoka'] font-bold text-white text-[22px] leading-tight text-center relative z-10 drop-shadow-md mb-4 px-2">
                    {card.title}
                  </h2>
                </div>

                {/* Body */}
                <div className="p-5 pt-2 flex flex-col items-center relative z-20">
                  <div className="w-full flex justify-between items-center mb-6 px-4 bg-slate-50 rounded-2xl py-6 border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 md:w-20 md:h-20 text-6xl flex items-center justify-center drop-shadow-md transform group-hover:scale-110 transition-transform">
                      {card.iconLeft}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 font-bold shadow-sm border border-slate-100 text-sm italic z-10">
                      vs
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 text-6xl flex items-center justify-center drop-shadow-md transform group-hover:scale-110 transition-transform">
                      {card.iconRight}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCardClick(card.id)}
                    className="w-full py-3.5 bg-[#6B3FCC] hover:bg-[#5c35c5] text-white rounded-full font-['Fredoka'] font-bold text-[18px] shadow-[0_6px_0_#462799] hover:shadow-[0_2px_0_#462799] hover:translate-y-[4px] transition-all active:shadow-none active:translate-y-[6px]"
                  >
                    Ойнау
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM DASHBOARD & NAVIGATION */}
          <div className="absolute bottom-0 left-0 w-full h-40 z-30 flex items-end">
            {/* Dashboard surface */}
            <div className="absolute bottom-0 w-full h-24 md:h-28 bg-[#462799] rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.4)] border-t-[6px] border-[#6B3FCC]">
              <div className="absolute top-2 left-4 right-4 h-2 bg-white/10 rounded-full" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-2 bg-white/10 rounded-full" />
            </div>

            {/* Fox Driver */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute bottom-2 left-4 md:left-12 z-40 flex items-end"
            >
              <div className="relative">
                <div className="h-[5rem] md:h-[6.5rem] mb-4 w-12" />
                {/* Steering Wheel */}
                <motion.div
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-0 -right-16 md:-right-20 w-32 md:w-40 h-32 md:h-40 rounded-full border-[12px] md:border-[16px] border-[#2A2A2A] bg-[#444]/40 flex items-center justify-center shadow-xl backdrop-blur-sm z-20"
                >
                  <div className="w-full h-3 md:h-4 bg-[#2A2A2A] absolute rotate-45" />
                  <div className="w-full h-3 md:h-4 bg-[#2A2A2A] absolute -rotate-45" />
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-[#FF9500] rounded-full z-10 shadow-inner flex items-center justify-center border-2 border-[#cc7700]">
                    <div className="w-4 h-4 bg-white/40 rounded-full" />
                  </div>
                  <div className="absolute top-2 -left-2 w-6 h-6 bg-[#E07A5F] rounded-full border-2 border-[#333]" />
                  <div className="absolute bottom-2 -right-2 w-6 h-6 bg-[#E07A5F] rounded-full border-2 border-[#333]" />
                </motion.div>
              </div>
            </motion.div>

            
          </div>

          {/* Sparkles */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
            <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-[20%] left-[8%] text-yellow-300 text-3xl drop-shadow-md">✨</motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute top-[12%] right-[22%] text-white text-4xl drop-shadow-md">🌟</motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-[35%] right-[5%] text-yellow-300 text-2xl drop-shadow-md">✨</motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3.5, delay: 1.5 }} className="absolute bottom-[40%] left-[20%] text-white text-3xl drop-shadow-md">🌟</motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
