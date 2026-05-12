import { motion } from "framer-motion";
import TransparentBackButton from "../components/TransparentBackButton";
import type { Screen } from "../types/game";
import { playSound } from "../utils/audio";

interface MainMenuProps {
  go: (screen: Screen) => void;
}

interface CategoryEntry {
  id: Screen;
  title: string;
  image: string;
  /** Absolute placement on the map (desktop). Cat1 uses a separate wrapper. */
  desktopStyle?: React.CSSProperties;
  desktopWidth: string;
}

const categories: CategoryEntry[] = [
  {
    id: "cat1",
    title: "Ғажайып әлем",
    image: "/assets/images/gazhaiyp_alem.png",
    desktopWidth: "clamp(240px, 26vw, 360px)",
  },
  {
    id: "cat2",
    title: "Сиқырлы сандық",
    image: "/assets/images/siqurly_sandyk.png",
    desktopStyle: {
      position: "absolute",
      top: "40%",
      left: "40%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
    },
    desktopWidth: "clamp(240px, 26vw, 360px)",
  },
  {
    id: "cat3",
    title: "Дәм мен Иіс",
    image: "/assets/images/dam_men_iys.png",
    desktopStyle: { position: "absolute", bottom: "23%", right: "3%", zIndex: 10 },
    desktopWidth: "clamp(240px, 26vw, 360px)",
  },
];

interface IconProps {
  src: string;
  alt: string;
  width: string;
}

function CategoryIcon({ src, alt, width }: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width,
        height: "auto",
        display: "block",
        filter: "drop-shadow(3px 5px 10px rgba(0,0,0,0.45))",
      }}
    />
  );
}

const cat1Entry = categories.find((c) => c.id === "cat1")!;
const categoriesWithoutCat1 = categories.filter((c) => c.id !== "cat1");

export default function MainMenu({ go }: MainMenuProps) {
  return (
    <motion.div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/assets/images/main_menu.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <TransparentBackButton
        className="fixed top-4 left-4 z-20 md:hidden"
        ariaLabel="Артқа — басты бет"
        onClick={() => {
          playSound("button_click.mp3");
          go("welcome");
        }}
      />

      {/* Desktop: icons placed along the paths */}
      <div className="hidden-on-mobile">
        <motion.div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "5%",
            zIndex: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0, type: "spring", stiffness: 200, damping: 18 }}
        >
          <TransparentBackButton
            ariaLabel="Артқа — басты бет"
            onClick={() => {
              playSound("button_click.mp3");
              go("welcome");
            }}
          />
          <motion.button
            type="button"
            role="button"
            tabIndex={0}
            aria-label={cat1Entry.title}
            onClick={() => {
              playSound("button_click.mp3");
              go(cat1Entry.id);
            }}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              lineHeight: 0,
            }}
            whileHover={{ y: -8, scale: 1.07, rotate: 0.8 }}
            whileTap={{ scale: 0.94 }}
          >
            <CategoryIcon src={cat1Entry.image} alt={cat1Entry.title} width={cat1Entry.desktopWidth} />
          </motion.button>
        </motion.div>

        {categoriesWithoutCat1.map((cat, i) => (
          <motion.button
            key={cat.id}
            type="button"
            role="button"
            tabIndex={0}
            aria-label={cat.title}
            onClick={() => {
              playSound("button_click.mp3");
              go(cat.id);
            }}
            style={{
              ...cat.desktopStyle,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              lineHeight: 0,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: (i + 1) * 0.18, type: "spring", stiffness: 200, damping: 18 }}
            whileHover={{ y: -8, scale: 1.07, rotate: 0.8 }}
            whileTap={{ scale: 0.94 }}
          >
            <CategoryIcon src={cat.image} alt={cat.title} width={cat.desktopWidth} />
          </motion.button>
        ))}
      </div>

      {/* Mobile: centered vertical column of 3 icons */}
      <div
        className="mobile-grid"
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={`m-${cat.id}`}
            type="button"
            role="button"
            tabIndex={0}
            aria-label={cat.title}
            onClick={() => {
              playSound("button_click.mp3");
              go(cat.id);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              lineHeight: 0,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.18, type: "spring", stiffness: 200, damping: 18 }}
            whileHover={{ y: -6, scale: 1.05, rotate: 0.8 }}
            whileTap={{ scale: 0.94 }}
          >
            <CategoryIcon src={cat.image} alt={cat.title} width="190px" />
          </motion.button>
        ))}
      </div>

      <style>{`
        .hidden-on-mobile { display: block; }

        @media (max-width: 768px) {
          .hidden-on-mobile { display: none !important; }
          .mobile-grid { display: flex !important; }
        }
      `}</style>
    </motion.div>
  );
}
