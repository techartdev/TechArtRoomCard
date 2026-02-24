import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/tech-art-room-card.ts",
  output: {
    file: "dist/tech-art-room-card.js",
    format: "es",
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript(),
  ],
};
