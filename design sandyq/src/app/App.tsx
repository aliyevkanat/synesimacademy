import React from 'react';
import { motion } from 'motion/react';
import { Settings, RefreshCcw } from 'lucide-react';

const Tree = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.8 }}
    className={`absolute ${className}`}
  >
    {/* Trunk */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-24 bg-amber-700 rounded-sm" />
    {/* Leaves */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-green-500 rounded-full" />
    <div className="absolute bottom-20 left-4 w-20 h-20 bg-green-400 rounded-full" />
    <div className="absolute bottom-20 right-4 w-20 h-20 bg-green-600 rounded-full" />
  </motion.div>
);

const Spring = () => (
  <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="#3b0764" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="-mt-1 -mb-2 z-0 relative">
    <path d="M12 0 C 12 5, 22 5, 22 10 C 22 15, 2 15, 2 20 C 2 25, 22 25, 22 30 C 22 35, 12 35, 12 40" />
  </svg>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#1e1a38] flex items-center justify-center p-2 sm:p-4 md:p-8 font-['Nunito'] overflow-hidden">
      {/* Outer Device Frame */}
      <div className="relative w-full max-w-[1200px] aspect-[4/3] md:aspect-[16/10] bg-[#5c35c5] rounded-[2.5rem] md:rounded-[3.5rem] p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden ring-[12px] ring-[#462799] mx-auto flex flex-col">
        
        {/* Inner Screen */}
        <div className="relative w-full h-full bg-[#87CEEB] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner border-4 border-[#3b1e84]/20">
          
          {/* BACKGROUND SCENE */}
          {/* Clouds */}
          <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-10 left-[10%] w-32 h-12 bg-white/90 rounded-full blur-[1px] shadow-sm" />
          <motion.div animate={{ x: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-16 right-[15%] w-24 h-10 bg-white/90 rounded-full blur-[1px] shadow-sm" />
          <motion.div animate={{ x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} className="absolute top-8 left-[45%] w-40 h-14 bg-white/80 rounded-full blur-[1px] shadow-sm" />
          
          {/* Background Trees */}
          <Tree className="bottom-[40%] left-[5%] scale-75 z-0 opacity-80" delay={0.2} />
          <Tree className="bottom-[35%] right-[8%] scale-[0.6] z-0 opacity-80" delay={0.4} />

          {/* Hills */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#66BB6A] rounded-[100%] z-0 border-t-[8px] border-[#4CAF50]" />
          <div className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[55%] bg-[#4CAF50] rounded-[100%] z-0 border-t-[8px] border-[#43A047]" />
          
          {/* Road */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] h-[45%] bg-[#9B88CF] z-0"
            style={{ clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0% 100%)' }}
          >
            {/* Road lines */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 border-l-4 border-dashed border-white/40" />
          </div>

          {/* Foreground Trees */}
          <Tree className="bottom-[15%] left-0 scale-[1.2] z-10" delay={0.6} />
          <Tree className="bottom-[20%] right-[-2%] scale-100 z-10" delay={0.8} />

          {/* TOP BAR */}
          <div className="relative z-20 flex justify-between items-start md:items-center p-4 lg:p-6">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-[2rem] px-4 py-3 md:py-4 shadow-lg border border-white/40 mr-4 lg:mr-6"
            >
              <h1 className="font-['Fredoka'] font-bold text-2xl md:text-3xl leading-tight text-white drop-shadow-md tracking-wide text-center uppercase">
                Сиқырлы сандық
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex gap-4"
            >
              <button className="w-14 h-14 bg-[#FFD700] hover:bg-[#FFE033] rounded-full flex items-center justify-center text-[#5c35c5] shadow-lg transition-transform hover:scale-110 active:scale-95 border-[3px] border-white/50 group">
                <RefreshCcw className="w-7 h-7 stroke-[3px] group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button className="w-14 h-14 bg-[#FFD700] hover:bg-[#FFE033] rounded-full flex items-center justify-center text-[#5c35c5] shadow-lg transition-transform hover:scale-110 active:scale-95 border-[3px] border-white/50 group">
                <Settings className="w-7 h-7 stroke-[3px] group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </motion.div>
          </div>

          {/* MAIN CARDS */}
          <div className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-4 pb-32 overflow-y-auto md:overflow-visible scrollbar-hide">
            {cardsData.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 100, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.2 * (idx + 1), type: 'spring', bounce: 0.5, duration: 0.8 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="relative w-full max-w-[280px] min-w-[260px] bg-white rounded-[24px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] overflow-visible shrink-0 group"
              >
                {/* Decorative character peeking */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5, ease: "easeInOut" }}
                  className="absolute -top-10 right-4 text-5xl z-30 drop-shadow-lg filter"
                >
                  {card.character}
                </motion.div>
                
                {/* Header Section */}
                <div className={`h-28 rounded-t-[24px] ${card.gradient} flex flex-col justify-center items-center px-4 relative overflow-hidden`}>
                  {/* Wavy bottom border effect via SVG curve */}
                  <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
                      <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-white" />
                    </svg>
                  </div>
                  
                  {/* Card Title */}
                  <h2 className="font-['Fredoka'] font-bold text-white text-[22px] leading-tight text-center relative z-10 drop-shadow-md mb-4 px-2">
                    {card.title}
                  </h2>
                </div>

                {/* Body Section */}
                <div className="p-5 pt-2 flex flex-col items-center relative z-20">
                  <div className="w-full flex justify-between items-center mb-6 px-4 bg-slate-50 rounded-2xl py-6 border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 md:w-20 md:h-20 text-6xl flex items-center justify-center drop-shadow-md transform group-hover:scale-110 transition-transform">
                      {card.iconLeft}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 font-bold shadow-sm border border-slate-100 text-sm italic z-10">vs</div>
                    <div className="w-16 h-16 md:w-20 md:h-20 text-6xl flex items-center justify-center drop-shadow-md transform group-hover:scale-110 transition-transform">
                      {card.iconRight}
                    </div>
                  </div>
                  
                  <button className="w-full py-3.5 bg-[#6B3FCC] hover:bg-[#5c35c5] text-white rounded-full font-['Fredoka'] font-bold text-[18px] shadow-[0_6px_0_#462799] hover:shadow-[0_2px_0_#462799] hover:translate-y-[4px] transition-all active:shadow-none active:translate-y-[6px]">
                    Ойнау
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM VEHICLE DASHBOARD & NAVIGATION */}
          <div className="absolute bottom-0 left-0 w-full h-40 z-30 flex items-end">
            {/* Dashboard surface */}
            <div className="absolute bottom-0 w-full h-24 md:h-28 bg-[#462799] rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.4)] border-t-[6px] border-[#6B3FCC]">
               {/* Dashboard internal lines/details */}
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
                {/* Fox Character Body/Head */}
                <div className="h-[5rem] md:h-[6.5rem] mb-4 w-12"></div>
                
                {/* Driver hands / Steering Wheel */}
                <motion.div 
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-0 -right-12 md:-right-16 w-24 md:w-32 h-24 md:h-32 rounded-full border-[10px] md:border-[14px] border-[#2A2A2A] bg-[#444]/40 flex items-center justify-center shadow-xl backdrop-blur-sm z-20"
                >
                  {/* Wheel inner cross */}
                  <div className="w-full h-3 md:h-4 bg-[#2A2A2A] absolute rotate-45" />
                  <div className="w-full h-3 md:h-4 bg-[#2A2A2A] absolute -rotate-45" />
                  {/* Horn */}
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-[#FF9500] rounded-full z-10 shadow-inner flex items-center justify-center border-2 border-[#cc7700]">
                    <div className="w-4 h-4 bg-white/40 rounded-full" />
                  </div>
                  {/* Fox "paws" on wheel */}
                  <div className="absolute top-2 -left-2 w-6 h-6 bg-[#E07A5F] rounded-full border-2 border-[#333]" />
                  <div className="absolute bottom-2 -right-2 w-6 h-6 bg-[#E07A5F] rounded-full border-2 border-[#333]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Nav Items on Springs */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end justify-center gap-4 md:gap-16 z-40 w-full pl-24 md:pl-0">
              {navItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.2 + (idx * 0.1), type: "spring", bounce: 0.3 }}
                  className="flex flex-col items-center group cursor-pointer w-24 md:w-32"
                >
                  {/* Icon Container with Floating animation */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                    whileHover={{ scale: 1.10, rotate: [-3, 3, -3, 0] }}
                    className="relative w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-b from-white to-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center text-3xl md:text-4xl border-4 border-[#8B5CF6] z-20"
                  >
                    {item.icon}
                    {/* Glossy highlight */}
                    <div className="absolute top-1 left-2 right-2 h-1/3 bg-white/60 rounded-full rounded-b-none" />
                  </motion.div>
                  
                  {/* Spring SVG */}
                  <div className="z-10 relative">
                    <Spring />
                  </div>

                  {/* Label Platform */}
                  <div className="bg-[#8B5CF6] text-white text-[10px] md:text-xs font-['Fredoka'] font-bold px-3 md:px-5 py-2 md:py-2.5 rounded-full border-[3px] border-white/30 shadow-lg -mt-4 z-20 group-hover:bg-[#9d72f9] group-hover:shadow-[#8B5CF6]/50 transition-all text-center leading-tight min-w-[90px] md:min-w-[120px]">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Sparkles Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
             <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-[20%] left-[8%] text-yellow-300 text-3xl drop-shadow-md">✨</motion.div>
             <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute top-[12%] right-[22%] text-white text-4xl drop-shadow-md">🌟</motion.div>
             <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-[35%] right-[5%] text-yellow-300 text-2xl drop-shadow-md">✨</motion.div>
             <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3.5, delay: 1.5 }} className="absolute bottom-[40%] left-[20%] text-white text-3xl drop-shadow-md">🌟</motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardsData = [
  {
    id: 1,
    title: 'Ыстық және Суық',
    gradient: 'bg-gradient-to-b from-[#FF9500] to-[#FFB347]',
    character: '🌡️',
    iconLeft: '☀️',
    iconRight: '🧊',
  },
  {
    id: 2,
    title: 'Жұмсақ және Қатты',
    gradient: 'bg-gradient-to-b from-[#FFD700] to-[#FFF176]',
    character: '☁️',
    iconLeft: '🧸',
    iconRight: '🪨',
  },
  {
    id: 3,
    title: 'Жеңіл және Ауыр',
    gradient: 'bg-gradient-to-b from-[#66BB6A] to-[#A5D6A7]',
    character: '⚖️',
    iconLeft: '🪶',
    iconRight: '⚓',
  },
];

const navItems = [
  { icon: '🌡️', label: 'Ыстық-Суық' },
  { icon: '🪨', label: 'Жұмсақ-Қатты' },
  { icon: '⚖️', label: 'Жеңіл-Ауыр' },
];
