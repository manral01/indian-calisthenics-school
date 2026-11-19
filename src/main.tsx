import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadPage } from "./pages/registry";
import { captureOAuthRedirect } from "./lms/session";
import "./index.css";

// Google sign-in returns to the site with the login tokens in the URL hash:
// store them and clean the URL before the router reads it.
captureOAuthRedirect();

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname + window.location.search + window.location.hash} />
  </StrictMode>
);

// Production pages are prerendered at build time: hydrate them.
// In dev the root is empty: render from scratch.
// Load this page's code first, so hydration renders exactly the prerendered HTML.
preloadPage(window.location.pathname).then(() => {
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
