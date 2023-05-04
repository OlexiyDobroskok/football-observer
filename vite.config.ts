import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      modules: path.resolve(__dirname, "./src/modules"),
      pages: path.resolve(__dirname, "./src/pages"),
      store: path.resolve(__dirname, "./src/store"),
      ui: path.resolve(__dirname, "./src/ui"),
      styles: path.resolve(__dirname, "./src/styles"),
      types: path.resolve(__dirname, "./src/types"),
      helpers: path.resolve(__dirname, "./src/helpers"),
      api: path.resolve(__dirname, "./src/api"),
    },
  },
});
