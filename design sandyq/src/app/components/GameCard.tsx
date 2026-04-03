import { motion } from 'motion/react';

interface GameCardProps {
  title: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  emoji: string;
  leftIcon: string;
  rightIcon: string;
  delay: number;
}

export function GameCard({ title, gradientFrom, gradientTo, accentColor, emoji, leftIcon, rightIcon, delay }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-[280px] sm:w-[320px] h-[360px] sm:h-[400px] bg-white rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.15)] flex flex-col mx-2 transition-all duration-300 group"
    >
      {/* Peeking Character */}
      <motion.div 
        initial={{ y: 20, rotate: 0 }}
        animate={{ y: 0, rotate: 15 }}
        transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300, damping: 12 }}
        whileHover={{ y: -10, rotate: 0 }}
        className="absolute -top-8 right-4 text-4xl sm:text-5xl z-20 drop-shadow-lg cursor-pointer origin-bottom"
      >
        {emoji}
      </motion.div>

      {/* Header */}
      <div 
        className="h-28 sm:h-32 w-full rounded-t-[24px] rounded-br-[60px] flex items-start p-5 sm:p-6 relative overflow-hidden shrink-0"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white rounded-full opacity-20 blur-xl mix-blend-overlay" />
        <div className="absolute left-10 -bottom-10 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl" />
        
        {/* Fold effect corner */}
        <div 
            className="absolute -right-4 -bottom-4 w-16 h-16 bg-white rotate-45 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] opacity-30"
        />
        
        <h2 className="text-white font-['Fredoka'] font-semibold text-xl sm:text-2xl leading-tight drop-shadow-md w-[85%] z-10">
          {title}
        </h2>
      </div>

      {/* Body Illustration area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 bg-white group-hover:bg-neutral-50 transition-colors">
        
        {/* Playful background blobs */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-200 via-transparent to-transparent"></div>
        
        <div className="flex items-center justify-between w-full max-w-[200px] sm:max-w-[220px]">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: -10 }} 
            className="text-6xl sm:text-7xl drop-shadow-xl cursor-grab active:cursor-grabbing hover:z-20 transition-transform"
          >
            {leftIcon}
          </motion.div>
          
          <div className="h-20 w-1 sm:h-24 sm:w-1.5 border-r-4 border-dashed border-gray-200 rounded-full" />
          
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 10 }} 
            className="text-6xl sm:text-7xl drop-shadow-xl cursor-grab active:cursor-grabbing hover:z-20 transition-transform"
          >
            {rightIcon}
          </motion.div>
        </div>
      </div>

      {/* Button */}
      <div className="p-5 sm:p-6 pt-0 mt-auto flex justify-center z-20 bg-white rounded-b-[24px]">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3.5 sm:py-4 rounded-full bg-[#6B3FCC] text-white font-bold font-['Fredoka'] text-lg sm:text-xl shadow-[0_6px_0_#4c2999] hover:shadow-[0_2px_0_#4c2999] hover:translate-y-[4px] hover:bg-[#7949e2] transition-all uppercase tracking-wider active:bg-[#5a33b0]"
        >
          Ойнау
        </motion.button>
      </div>
      
      {/* Decorative dots pattern on border */}
      <div className="absolute top-0 left-0 w-full h-full rounded-[24px] border-4 border-white pointer-events-none mix-blend-overlay opacity-30" />
    </motion.div>
  );
}
