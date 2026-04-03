import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.DEV) {
  import("@stagewise/toolbar").then(({ initToolbar }) => {
    initToolbar({ plugins: [] });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
