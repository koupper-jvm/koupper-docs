const fs = require("fs");
const path = require("path");

const docsRoot = path.join(__dirname, "..", "docs");
const providersIndexPath = path.join(docsRoot, "providers", "index.md");
const vitepressConfigPath = path.join(docsRoot, ".vitepress", "config.js");
const providersDir = path.join(docsRoot, "providers");
const catalogPathCandidates = [
  process.env.KOUPPER_PROVIDERS_CATALOG_PATH,
  path.join(__dirname, "..", "..", "koupper", "providers", "src", "main", "resources", "providers-catalog.json"),
  path.join(__dirname, "..", "koupper-core", "koupper", "providers", "src", "main", "resources", "providers-catalog.json"),
  path.join(__dirname, "..", "..", "koupper-core", "koupper", "providers", "src", "main", "resources", "providers-catalog.json"),
].filter(Boolean);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function uniq(values) {
  return [...new Set(values)];
}

function difference(a, b) {
  const right = new Set(b);
  return a.filter((item) => !right.has(item));
}

const catalogPath = catalogPathCandidates.find((candidate) => fs.existsSync(candidate));

if (!catalogPath) {
  console.error("Provider sync validation failed: could not locate providers-catalog.json");
  console.error("Checked paths:");
  catalogPathCandidates.forEach((candidate) => console.error(`- ${candidate}`));
  process.exit(1);
}

const catalog = JSON.parse(read(catalogPath));
const catalogIds = uniq((catalog.providers || []).map((provider) => provider.id));

const providersIndex = read(providersIndexPath);
const indexMatches = [...providersIndex.matchAll(/\|\s*\[`([^`]+)`\]\(\/providers\/[^)]+\)\s*\|/g)];
const indexIds = uniq(indexMatches.map((match) => match[1]));

const vitepressConfig = read(vitepressConfigPath);
const sidebarMatches = [...vitepressConfig.matchAll(/link:\s*"\/providers\/([^"/]+)"/g)];
const sidebarIds = uniq(
  sidebarMatches
    .map((match) => match[1])
    .filter((id) => id !== "")
);

const pageIds = uniq(
  fs
    .readdirSync(providersDir)
    .filter((file) => file.endsWith(".md") && file !== "index.md")
    .map((file) => file.replace(/\.md$/, ""))
);

const errors = [];

const missingInIndex = difference(catalogIds, indexIds);
if (missingInIndex.length > 0) {
  errors.push(`Missing in docs/providers/index.md table: ${missingInIndex.join(", ")}`);
}

const missingInSidebar = difference(catalogIds, sidebarIds);
if (missingInSidebar.length > 0) {
  errors.push(`Missing in docs/.vitepress/config.js sidebar: ${missingInSidebar.join(", ")}`);
}

const missingProviderPages = difference(catalogIds, pageIds);
if (missingProviderPages.length > 0) {
  errors.push(`Missing provider deep-dive pages in docs/providers: ${missingProviderPages.join(", ")}`);
}

if (errors.length > 0) {
  console.error("Provider sync validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`provider sync validation passed (${catalogIds.length} providers checked).`);
