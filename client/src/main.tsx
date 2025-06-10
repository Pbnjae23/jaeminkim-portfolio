import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Clear any caches to ensure style updates take effect
if (window.location.hostname === 'localhost') {
  // Force reload of styles in development
  const now = new Date().getTime();
  document.documentElement.dataset.forcedReload = now.toString();
}

createRoot(document.getElementById("root")!).render(<App />);
