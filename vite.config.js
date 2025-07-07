import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/the-wild-oasis/",
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["node_modules"],
    }),
  ],
  server: {
    fs: {
      strict: false,
    },
    open: "/the-wild-oasis/",
  },
});
