import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/EmojiAnimator.tsx",
      name: "EmojiAnimator",
      fileName: (format) => `emoji-animator.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          "solid-js": "Solid",
        },
      },
      plugins: [terser()],
    },
  },
  plugins: [solidPlugin()],
});
