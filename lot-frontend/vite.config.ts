import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/image/upload": {
        target: "https://photo.uncommmon.dev",
        changeOrigin: true,
      },
      "/api": "http://localhost:5000",
    },
    allowedHosts: ["lot.uncommmon.dev"],
  },
});
