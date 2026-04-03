import { Settings, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

export function TopBar() {
  return (
    <div className="relative z-10 w-full flex items-center justify-between p-4 sm:p-6 pb-2 sm:pb-4">
      {/* Profile Pill */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-[#6B3FCC]/80 backdrop-blur-md rounded-full p-1.5 sm:p-2 pr-4 sm:pr-6 flex items-center gap-2 sm:gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-2 ring-white/20 hover:ring-white/40 transition-all cursor-pointer"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-xl sm:text-2xl border-2 border-[#FFD700] shadow-inner">
          🦊
        </div>
        <div className="flex flex-col">
          <span className="text-white font-['Fredoka'] font-bold text-base sm:text-lg leading-tight tracking-wide">Түлкішақ</span>
          <span className="text-white/80 font-['Nunito'] text-xs sm:text-sm leading-tight font-medium">Сиқырлы сандық</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="flex items-center gap-2 sm:gap-4"
      >
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -30 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_4px_0_#D4AF37] hover:shadow-[0_2px_0_#D4AF37] hover:translate-y-[2px] transition-all group"
        >
          <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B3FCC] group-hover:text-purple-900 transition-colors" strokeWidth={3} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_4px_0_#D4AF37] hover:shadow-[0_2px_0_#D4AF37] hover:translate-y-[2px] transition-all group"
        >
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B3FCC] group-hover:text-purple-900 transition-colors" strokeWidth={3} />
        </motion.button>
      </motion.div>
    </div>
  );
}
