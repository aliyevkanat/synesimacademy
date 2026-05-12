import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Screen } from "./types/game";

import WelcomeMenu from "./screens/WelcomeMenu";
import MainMenu from "./screens/MainMenu";
import CategoryMenu from "./screens/CategoryMenu";
import Cat1CategoryMenu from "./screens/Cat1CategoryMenu";
import Cat2CategoryMenu from "./screens/Cat2CategoryMenu";
import Cat3CategoryMenu from "./screens/Cat3CategoryMenu";

import G1ColorMode from "./screens/games/cat1/G1ColorMode";
import G1ColorQuiz from "./screens/games/cat1/G1ColorQuiz";
import G1LearnColors from "./screens/games/cat1/G1LearnColors";
import G1ColorDetail from "./screens/games/cat1/G1ColorDetail";
import G1Size from "./screens/games/cat1/G1Size";
import G1SizeMode from "./screens/games/cat1/G1SizeMode";
import G1SizeLearn from "./screens/games/cat1/G1SizeLearn";
import G1SizeQuiz from "./screens/games/cat1/G1SizeQuiz";
import G1LengthMode from "./screens/games/cat1/G1LengthMode";
import G1LengthLearn from "./screens/games/cat1/G1LengthLearn";
import G1LengthQuiz from "./screens/games/cat1/G1LengthQuiz";
import G1Height from "./screens/games/cat1/G1Height";
import G1WidthMode from "./screens/games/cat1/G1WidthMode";
import G1WidthLearn from "./screens/games/cat1/G1WidthLearn";
import G1WidthQuiz from "./screens/games/cat1/G1WidthQuiz";
import G1Quiz from "./screens/games/cat1/G1Quiz";

import G2Temperature from "./screens/games/cat2/G2Temperature";
import G2TempMode from "./screens/games/cat2/G2TempMode";
import G2TempLearn from "./screens/games/cat2/G2TempLearn";
import G2TempHot from "./screens/games/cat2/G2TempHot";
import G2TempCold from "./screens/games/cat2/G2TempCold";
import G2TempQuiz from "./screens/games/cat2/G2TempQuiz";
import G2Texture from "./screens/games/cat2/G2Texture";
import G2TextureMode from "./screens/games/cat2/G2TextureMode";
import G2TextureLearn from "./screens/games/cat2/G2TextureLearn";
import G2TextureQuiz from "./screens/games/cat2/G2TextureQuiz";
import G2WeightMode from "./screens/games/cat2/G2WeightMode";
import G2WeightLearn from "./screens/games/cat2/G2WeightLearn";
import G2Weight from "./screens/games/cat2/G2Weight";

import G3Taste from "./screens/games/cat3/G3Taste";
import G3TasteMode from "./screens/games/cat3/G3TasteMode";
import G3TasteLearn from "./screens/games/cat3/G3TasteLearn";
import G3SourMode from "./screens/games/cat3/G3SourMode";
import G3SourLearn from "./screens/games/cat3/G3SourLearn";
import G3Smell from "./screens/games/cat3/G3Smell";
import G3SmellMode from "./screens/games/cat3/G3SmellMode";
import G3SmellLearn from "./screens/games/cat3/G3SmellLearn";

const cat2Games = [
  { id: "g2_temp_mode" as Screen, label: "Ыстық және Суық", emoji: "🌡️" },
  { id: "g2_texture" as Screen, label: "Жұмсақ және Қатты", emoji: "🪨" },
  { id: "g2_weight" as Screen, label: "Жеңіл және Ауыр", emoji: "⚖️" },
];

const cat3Games = [
  { id: "g3_taste_mode" as Screen, label: "Тәтті және Ащы", emoji: "🍬" },
  { id: "g3_sour" as Screen, label: "Тәтті және қышқыл", emoji: "🍋" },
  { id: "g3_smell" as Screen, label: "Хош және Жағымсыз иіс", emoji: "🌸" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [replayKey, setReplayKey] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [soundMuted, setSoundMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem("aca_sound_muted") === "1";
    } catch {
      return false;
    }
  });

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const soundMutedRef = useRef(soundMuted);
  const didStartRef = useRef(false);

  const attemptPlay = async () => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (soundMutedRef.current) return;
    try {
      audio.muted = false;
      audio.volume = 0.6;
      await audio.play();
      didStartRef.current = true;
    } catch {
      // Autoplay might be blocked until the first user gesture.
    }
  };

  const setMuted = (nextMuted: boolean) => {
    setSoundMuted(nextMuted);
    try {
      localStorage.setItem("aca_sound_muted", nextMuted ? "1" : "0");
    } catch (e) {
      void e;
    }

    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.muted = nextMuted;
    if (nextMuted) {
      audio.pause();
      return;
    }
    // Turning sound back on should start immediately.
    void (async () => {
      try {
        audio.volume = 0.6;
        await audio.play();
        didStartRef.current = true;
      } catch {
        // ignore, will start after first gesture
      }
    })();
  };

  useEffect(() => {
    soundMutedRef.current = soundMuted;
  }, [soundMuted]);

  useEffect(() => {
    const audio = new Audio("/assets/audio/bg_music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio.muted = soundMuted;
    bgAudioRef.current = audio;

    // Try to start immediately (some browsers allow autoplay).
    if (!soundMuted) {
      void attemptPlay();
    }

    const onGesture = () => {
      if (didStartRef.current) return;
      if (soundMutedRef.current) return;
      void attemptPlay();
      window.removeEventListener("pointerdown", onGesture);
    };
    window.addEventListener("pointerdown", onGesture);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      bgAudioRef.current?.pause();
      bgAudioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (s: Screen) => setScreen(s);
  const home = () => setScreen("menu");
  const replay = () => setReplayKey((k) => k + 1);

  const gameProps = { onHome: home, onReplay: replay, key: replayKey };

  return (
    <div className="font-nunito">
      <div
        className="fixed bottom-4 left-4 z-50 pointer-events-none select-none rounded-lg px-3 py-1.5"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <span className="text-[19px] font-bold text-white leading-tight" style={{ opacity: 0.85 }}>
          Алиева Дананың авторлық интербелсенді платформасы
        </span>
      </div>
      <motion.button
        type="button"
        onClick={() => setMuted(!soundMuted)}
        className={`fixed right-4 z-50 w-12 h-12 rounded-full bg-purple-200/90 shadow-lg flex items-center justify-center ${screen === "cat1" ? "!top-2" : "top-4"}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={soundMuted ? "Unmute sound" : "Mute sound"}
      >
        {soundMuted ? (
          <img src="/assets/icons/sound-off.png" alt="Muted" className="w-7 h-7" draggable={false} />
        ) : (
          <span className="text-xl font-black text-purple-900">🔊</span>
        )}
      </motion.button>
      <AnimatePresence mode="wait">
        {screen === "welcome" && <WelcomeMenu key="welcome" onStart={() => go("menu")} />}
        {screen === "menu" && <MainMenu key="menu" go={go} />}

        {screen === "cat1" && (
          <Cat1CategoryMenu
            key="cat1"
            title="Ғажайып әлем"
            onSelect={go}
            onHome={home}
          />
        )}
        {screen === "cat2" && (
          <Cat2CategoryMenu
            key="cat2"
            onSelect={go}
            onHome={home}
          />
        )}
        {screen === "cat3" && (
          <Cat3CategoryMenu key="cat3" onSelect={go} onHome={home} />
        )}

        {screen === "g1_color_mode" && (
          <G1ColorMode
            onLearn={() => go("g1_learn_colors")}
            onQuiz={() => go("g1_color_quiz")}
            onHome={() => go("cat1")}
          />
        )}
        {screen === "g1_color_quiz" && (
          <G1ColorQuiz
            key={`g1_color_quiz_${replayKey}`}
            onBack={() => go("g1_color_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}
        {screen === "g1_learn_colors" && (
          <G1LearnColors
            onSelectColor={(colorId) => {
              setSelectedColor(colorId);
              go("g1_color_detail");
            }}
            onBack={() => go("g1_color_mode")}
            onHome={home}
          />
        )}
        {screen === "g1_color_detail" && (
          <G1ColorDetail
            colorId={selectedColor ?? "red"}
            onBack={() => go("g1_learn_colors")}
            onHome={home}
          />
        )}
        {screen === "g1_quiz" && (
          <G1Quiz
            onHome={home}
            onBackToMode={() => go("g1_color_mode")}
          />
        )}
        {screen === "g1_size" && <G1Size {...gameProps} />}
        {screen === "g1_size_mode" && (
          <G1SizeMode
            key="g1_size_mode"
            onLearn={() => go("g1_size_learn")}
            onQuiz={() => go("g1_size_quiz")}
            onHome={() => go("cat1")}
          />
        )}
        {screen === "g1_size_quiz" && (
          <G1SizeQuiz
            key={`g1_size_quiz_${replayKey}`}
            onBack={() => go("g1_size_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}
        {screen === "g1_size_learn" && (
          <G1SizeLearn
            key="g1_size_learn"
            onBack={() => go("g1_size_mode")}
            onHome={home}
          />
        )}
        {screen === "g1_length_mode" && (
          <G1LengthMode
            key="g1_length_mode"
            onLearn={() => go("g1_length_learn")}
            onQuiz={() => go("g1_length_quiz")}
            onHome={() => go("cat1")}
          />
        )}
        {screen === "g1_length_learn" && (
          <G1LengthLearn
            key="g1_length_learn"
            onBack={() => go("g1_length_mode")}
            onHome={home}
          />
        )}
        {screen === "g1_length_quiz" && (
          <G1LengthQuiz
            key={`g1_length_quiz_${replayKey}`}
            onBack={() => go("g1_length_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}
        {screen === "g1_height" && <G1Height {...gameProps} />}
        {screen === "g1_width_mode" && (
          <G1WidthMode
            onLearn={() => go("g1_width_learn")}
            onQuiz={() => go("g1_width_quiz")}
            onHome={() => go("cat1")}
          />
        )}
        {screen === "g1_width_learn" && (
          <G1WidthLearn
            onBack={() => go("g1_width_mode")}
            onHome={home}
          />
        )}
        {screen === "g1_width_quiz" && (
          <G1WidthQuiz
            key={`g1_width_quiz_${replayKey}`}
            onBack={() => go("g1_width_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}

        {screen === "g2_temp" && <G2Temperature {...gameProps} />}

        {screen === "g2_temp_mode" && (
          <G2TempMode
            key="g2_temp_mode"
            onLearn={() => go("g2_temp_learn")}
            onQuiz={() => go("g2_temp_quiz")}
            onHome={() => go("cat2")}
          />
        )}
        {screen === "g2_temp_learn" && (
          <G2TempLearn
            key="g2_temp_learn"
            onHot={() => go("g2_temp_hot")}
            onCold={() => go("g2_temp_cold")}
            onBack={() => go("g2_temp_mode")}
            onHome={home}
          />
        )}
        {screen === "g2_temp_hot" && (
          <G2TempHot
            key="g2_temp_hot"
            onBack={() => go("g2_temp_learn")}
            onHome={home}
          />
        )}
        {screen === "g2_temp_cold" && (
          <G2TempCold
            key="g2_temp_cold"
            onBack={() => go("g2_temp_learn")}
            onHome={home}
          />
        )}
        {screen === "g2_temp_quiz" && (
          <G2TempQuiz
            key={`g2_temp_quiz_${replayKey}`}
            onBack={() => go("g2_temp_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}

        {screen === "g2_texture" && <G2Texture {...gameProps} />}
        {screen === "g2_texture_mode" && (
          <G2TextureMode
            key="g2_texture_mode"
            onLearn={() => go("g2_texture_learn")}
            onQuiz={() => go("g2_texture_quiz")}
            onHome={() => go("cat2")}
          />
        )}
        {screen === "g2_texture_learn" && (
          <G2TextureLearn
            key="g2_texture_learn"
            onBack={() => go("g2_texture_mode")}
            onHome={home}
          />
        )}
        {screen === "g2_texture_quiz" && (
          <G2TextureQuiz
            key={`g2_texture_quiz_${replayKey}`}
            onBack={() => go("g2_texture_mode")}
            onHome={home}
            onReplay={replay}
          />
        )}
        {screen === "g2_weight_mode" && (
          <G2WeightMode
            key="g2_weight_mode"
            onLearn={() => go("g2_weight_learn")}
            onQuiz={() => go("g2_weight")}
            onHome={() => go("cat2")}
          />
        )}
        {screen === "g2_weight_learn" && (
          <G2WeightLearn
            key="g2_weight_learn"
            onBack={() => go("g2_weight_mode")}
            onHome={home}
          />
        )}
        {screen === "g2_weight" && <G2Weight {...gameProps} />}

        {screen === "g3_taste_mode" && (
          <G3TasteMode
            key="g3_taste_mode"
            onLearn={() => go("g3_taste_learn")}
            onQuiz={() => go("g3_taste")}
            onHome={() => go("cat3")}
          />
        )}
        {screen === "g3_taste_learn" && (
          <G3TasteLearn
            key="g3_taste_learn"
            onBack={() => go("g3_taste_mode")}
            onHome={home}
          />
        )}
        {screen === "g3_taste" && <G3Taste {...gameProps} variant="sweet_spicy" />}
        {screen === "g3_sour_mode" && (
          <G3SourMode
            key="g3_sour_mode"
            onLearn={() => go("g3_sour_learn")}
            onQuiz={() => go("g3_sour")}
            onHome={() => go("cat3")}
          />
        )}
        {screen === "g3_sour_learn" && (
          <G3SourLearn
            key="g3_sour_learn"
            onBack={() => go("g3_sour_mode")}
            onHome={home}
          />
        )}
        {screen === "g3_sour" && <G3Taste {...gameProps} variant="sweet_sour" />}
        {screen === "g3_smell_mode" && (
          <G3SmellMode
            key="g3_smell_mode"
            onLearn={() => go("g3_smell_learn")}
            onQuiz={() => go("g3_smell")}
            onHome={() => go("cat3")}
          />
        )}
        {screen === "g3_smell_learn" && (
          <G3SmellLearn
            key="g3_smell_learn"
            onBack={() => go("g3_smell_mode")}
            onHome={home}
          />
        )}
        {screen === "g3_smell" && <G3Smell {...gameProps} />}

      </AnimatePresence>
    </div>
  );
}
