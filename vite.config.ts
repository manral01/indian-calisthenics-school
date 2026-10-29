import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bundle these into the build-time SSR renderer (avoids CJS/ESM default-export interop issues)
  ssr: { noExternal: ["styled-components", "framer-motion", "lucide-react"] },
});
