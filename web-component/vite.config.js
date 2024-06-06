import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/EmojiAnimator.tsx",
      name: "EmojiAnimator",
      fileName: (format) => `emoji-animator.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        dir: "dist",
      },
    },
  },
  plugins: [solidPlugin()],
});
