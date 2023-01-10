import { defineConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: { src: resolve(__dirname, "src") },
  },
});
