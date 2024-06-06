import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/EmojiAnimator.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "default",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    babel({
      presets: ["solid"],
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
    }),
    terser(),
  ],
  external: ["solid-js"],
};
