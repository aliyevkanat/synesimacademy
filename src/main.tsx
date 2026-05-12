import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/** Force favicon to /favicon.png (copy of ikonka) so preview hosts and cached tabs pick up the right icon. */
function ensureFavicon() {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base.slice(0, -1) : base;
  const href = `${root || ""}/favicon.png?v=1`;

  document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach((el) => {
    el.type = "image/png";
    el.href = href;
  });
  let shortcut = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
  if (!shortcut) {
    shortcut = document.createElement("link");
    shortcut.rel = "shortcut icon";
    document.head.prepend(shortcut);
  }
  shortcut.type = "image/png";
  shortcut.href = href;

  let apple = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
  if (!apple) {
    apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    document.head.prepend(apple);
  }
  apple.type = "image/png";
  apple.href = href;
}
ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
