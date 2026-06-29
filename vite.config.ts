import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/Zoma/",
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
