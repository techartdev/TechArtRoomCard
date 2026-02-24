import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Build already outputs to root as tech-art-room-card.js
// This script creates a versioned backup for reference/debugging
const versionedFile = `tech-art-room-card-${pkg.version}.js`;

if (fs.existsSync("tech-art-room-card.js")) {
  fs.copyFileSync("tech-art-room-card.js", versionedFile);
  console.log(`Created versioned artifact: ${versionedFile}`);
} else {
  console.error("Error: tech-art-room-card.js not found. Run 'npm run build' first.");
  process.exit(1);
}

// DO NOT modify hacs.json - it should always reference the main tech-art-room-card.js
// HACS manages caching via the file content, and users reference the consistent filename
console.log("Version artifact script complete.");
console.log(`Card version: ${pkg.version}`);
