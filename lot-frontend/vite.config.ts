import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const frontendPort = parseInt(env.VITE_PORT || "5173");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: frontendPort,
      proxy: {
        "/api/image/upload": {
          target: "https://photo.uncommmon.dev",
          changeOrigin: true,
        },
        "/api": "http://localhost:5000",
      },
      allowedHosts: ["lot.uncommmon.dev"],
    },
  };
});
