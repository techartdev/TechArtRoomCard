import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const hacs = JSON.parse(fs.readFileSync("hacs.json", "utf8"));

const versionedFile = `tech-art-room-card-${pkg.version}.js`;

fs.copyFileSync("dist/tech-art-room-card.js", "tech-art-room-card.js");
fs.copyFileSync("dist/tech-art-room-card.js", versionedFile);

if (hacs.filename !== versionedFile) {
  hacs.filename = versionedFile;
  fs.writeFileSync("hacs.json", `${JSON.stringify(hacs, null, 2)}\n`);
}

console.log(`Generated root artifacts: tech-art-room-card.js and ${versionedFile}`);
