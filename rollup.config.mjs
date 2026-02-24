import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = pkg.version;

export default {
  input: "src/tech-art-room-card.ts",
  output: {
    file: "tech-art-room-card.js",
    format: "es",
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript(),
    {
      name: "inject-version",
      renderChunk(code) {
        return code.replace(
          /__CARD_VERSION__/g,
          `"${version}"`
        );
      },
    },
  ],
};
