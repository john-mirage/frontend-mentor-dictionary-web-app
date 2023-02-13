import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@fonts": resolve(__dirname, "src/fonts"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  }
});