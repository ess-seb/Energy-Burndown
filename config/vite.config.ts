import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "energy-burndown-card.js",
        format: "es"
      }
    }
  }
});

