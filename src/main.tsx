import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname + window.location.hash} />
  </StrictMode>
);

// Production pages are prerendered at build time: hydrate them.
// In dev the root is empty: render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
