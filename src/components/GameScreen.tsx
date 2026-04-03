import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import backgroundImg from "@/assets/background.png";

type Screen = "welcome" | "menu" | "colors" | "shapes" | "taste" | "touch";

interface ChoiceOption {
  id: string;
  label: string;
  // Tailwind classes for visuals (bg, border, etc.)
  style: string;
  isCorrect: boolean;
}

const playTone = (type: "success" | "error") => {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "success") {
    osc.frequency.value = 523;
    gain.gain.value = 0.25;
    osc.start();
    setTimeout(() => {
      osc.frequency.value = 659;
    }, 150);
    setTimeout(() => {
      osc.frequency.value = 784;
    }, 300);
    osc.stop(ctx.currentTime + 0.5);
  } else {
    osc.frequency.value = 200;
    gain.gain.value = 0.2;
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }
};

const useKazakhSpeech = () => {
  return useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "kk-KZ";
    utter.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, []);
};

const GameScreen: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const speak = useKazakhSpeech();

  const goToMenu = () => {
    setScreen("menu");
    setFeedback(null);
  };

  const handleChoice = (option: ChoiceOption) => {
    if (option.isCorrect) {
      setFeedback("success");
      playTone("success");
      speak("Жарайсың!");
    } else {
      setFeedback("error");
      playTone("error");
      speak("Тағы байқап көрші");
    }
  };

  const renderTaskHeader = (taskText: string) => (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => speak(taskText)}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl shadow-lg"
          aria-label="Дыбыстап оқу"
        >
          🔊
        </motion.button>
        <p className="text-xl md:text-2xl font-bold text-foreground text-center max-w-xl">
          {taskText}
        </p>
      </div>

      <AnimatePresence>
        {feedback === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="px-6 py-3 rounded-full bg-success text-white font-black text-lg md:text-2xl shadow-lg"
          >
            Жарайсың!
          </motion.div>
        )}
        {feedback === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-black text-lg md:text-2xl shadow-lg"
          >
            Тағы байқап көрші
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const colorsOptions: ChoiceOption[] = [
    {
      id: "red",
      label: "Қызыл доп",
      style: "bg-red-500",
      isCorrect: true,
    },
    {
      id: "blue",
      label: "Көк доп",
      style: "bg-blue-500",
      isCorrect: false,
    },
    {
      id: "yellow",
      label: "Сары доп",
      style: "bg-yellow-400",
      isCorrect: false,
    },
  ];

  const shapesOptions: ChoiceOption[] = [
    {
      id: "circle",
      label: "Дөңгелек",
      style: "bg-accent rounded-full",
      isCorrect: true,
    },
    {
      id: "square",
      label: "Шаршы",
      style: "bg-primary rounded-lg",
      isCorrect: false,
    },
    {
      id: "triangle",
      label: "Үшбұрыш",
      style:
        "bg-secondary [clip-path:polygon(50%_0%,0%_100%,100%_100%)] rounded-none",
      isCorrect: false,
    },
  ];

  const tasteOptions: ChoiceOption[] = [
    {
      id: "sweet",
      label: "Тәтті алма",
      style: "bg-red-400",
      isCorrect: true,
    },
    {
      id: "sour",
      label: "Қышқыл лимон",
      style: "bg-yellow-400",
      isCorrect: false,
    },
    {
      id: "bitter",
      label: "Ащы бұрыш",
      style: "bg-green-500",
      isCorrect: false,
    },
  ];

  const touchOptions: ChoiceOption[] = [
    {
      id: "soft",
      label: "Жұмсақ қауырсын",
      style: "bg-pink-300",
      isCorrect: true,
    },
    {
      id: "hard",
      label: "Қатты тас",
      style: "bg-slate-400",
      isCorrect: false,
    },
    {
      id: "rough",
      label: "Бедерлі тас",
      style: "bg-slate-500",
      isCorrect: false,
    },
  ];

  const renderOptions = (options: ChoiceOption[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
      {options.map((option) => (
        <motion.button
          key={option.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleChoice(option)}
          className="flex flex-col items-center gap-3"
        >
          <div
            className={`w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-white ${option.style}`}
          />
          <span className="text-lg md:text-xl font-bold text-foreground text-center">
            {option.label}
          </span>
        </motion.button>
      ))}
    </div>
  );

  const renderBackButton = () => (
    <div className="mt-10 flex justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goToMenu}
        className="px-8 py-3 rounded-full bg-muted text-foreground font-bold text-lg md:text-xl shadow-md"
      >
        ⬅️ Басты меню
      </motion.button>
    </div>
  );

  if (screen === "welcome") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="game-title text-foreground text-center drop-shadow-lg"
        >
          Сиқырлы Сөздер Әлемі
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-black text-foreground text-center"
        >
          Сәлем, достым!
        </motion.p>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
          className="bg-card rounded-3xl px-10 py-6 shadow-2xl flex items-center gap-4 md:gap-6"
        >
          <div className="text-6xl md:text-7xl animate-bounce">🦊</div>
          <div className="max-w-xs text-left">
            <p className="text-lg md:text-xl font-bold text-card-foreground">
              Менің атым Түлкі Ақылшы.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mt-1">
              Кел, бірге жаңа сөздер үйренейік!
            </p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            speak("Сәлем, достым! Кел, бірге ойнайық.");
            goToMenu();
          }}
          className="px-12 py-5 bg-primary text-primary-foreground text-2xl md:text-3xl font-black rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          🎮 Бастау
        </motion.button>
      </div>
    );
  }

  if (screen === "menu") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-10 p-6"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-black text-center text-foreground drop-shadow"
        >
          Қай сөздерді бірге үйренеміз?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setScreen("colors");
              setFeedback(null);
              speak("Түстер. Қызыл, көк, сары сияқты сөздер.");
            }}
            className="bg-card rounded-3xl px-6 py-6 shadow-xl flex items-center gap-4 md:gap-6"
          >
            <div className="text-4xl md:text-5xl">🎨</div>
            <div className="text-left">
              <p className="text-2xl md:text-3xl font-black text-card-foreground">
                Түстер
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Қызыл, көк, сары...
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setScreen("shapes");
              setFeedback(null);
              speak("Пішіндер. Дөңгелек, шаршы, үшбұрыш.");
            }}
            className="bg-card rounded-3xl px-6 py-6 shadow-xl flex items-center gap-4 md:gap-6"
          >
            <div className="text-4xl md:text-5xl">🟣▢🔺</div>
            <div className="text-left">
              <p className="text-2xl md:text-3xl font-black text-card-foreground">
                Пішіндер
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Дөңгелек, шаршы, үшбұрыш
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setScreen("taste");
              setFeedback(null);
              speak("Дәм. Тәтті, қышқыл, ащы.");
            }}
            className="bg-card rounded-3xl px-6 py-6 shadow-xl flex items-center gap-4 md:gap-6"
          >
            <div className="text-4xl md:text-5xl">🍎🍦</div>
            <div className="text-left">
              <p className="text-2xl md:text-3xl font-black text-card-foreground">
                Дәм
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Тәтті, қышқыл, ащы
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setScreen("touch");
              setFeedback(null);
              speak("Сипап сезу. Жұмсақ және қатты.");
            }}
            className="bg-card rounded-3xl px-6 py-6 shadow-xl flex items-center gap-4 md:gap-6"
          >
            <div className="text-4xl md:text-5xl">🪶🪨</div>
            <div className="text-left">
              <p className="text-2xl md:text-3xl font-black text-card-foreground">
                Сипап сезу (Қатты/Жұмсақ)
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Жұмсақ қауырсын, қатты тас
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    );
  }

  let content: React.ReactNode = null;

  if (screen === "colors") {
    const task = "Қызыл допты тап.";
    content = (
      <>
        {renderTaskHeader(task)}
        {renderOptions(colorsOptions)}
      </>
    );
  } else if (screen === "shapes") {
    const task = "Дөңгелекті тап.";
    content = (
      <>
        {renderTaskHeader(task)}
        {renderOptions(shapesOptions)}
      </>
    );
  } else if (screen === "taste") {
    const task = "Тәтті затты тап.";
    content = (
      <>
        {renderTaskHeader(task)}
        {renderOptions(tasteOptions)}
      </>
    );
  } else if (screen === "touch") {
    const task = "Жұмсақ затты тап.";
    content = (
      <>
        {renderTaskHeader(task)}
        {renderOptions(touchOptions)}
      </>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-card/90 rounded-3xl shadow-2xl px-6 py-8 md:px-10 md:py-10 max-w-3xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-black text-center text-card-foreground mb-6"
        >
          Тапсырманы мұқият тыңда да, дұрыс суретті таңда.
        </motion.h2>
        {content}
        {renderBackButton()}
      </div>
    </div>
  );
};

export default GameScreen;
