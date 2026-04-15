const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "docs", "examples", "source-map.md");
const content = fs.readFileSync(file, "utf8");
const matches = [...content.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());

if (matches.length === 0) {
  console.error("No mapped references found in docs/examples/source-map.md");
  process.exit(1);
}

const allowedPrefixes = [
  "https://github.com/koupper-jvm/koupper/blob/develop/",
  "https://github.com/koupper-jvm/koupper-document/blob/develop/",
];

const invalid = matches.filter((entry) => {
  if (!entry.startsWith("https://")) return true;
  return !allowedPrefixes.some((prefix) => entry.startsWith(prefix));
});

if (invalid.length > 0) {
  console.error("Invalid source-map entries detected:");
  invalid.forEach((entry) => console.error(`- ${entry}`));
  process.exit(1);
}

console.log(`source-map validation passed (${matches.length} entries).`);
