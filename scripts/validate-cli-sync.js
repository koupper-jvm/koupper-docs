const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cliCommandCandidates = [
  path.join(
    root,
    "koupper-cli",
    "src",
    "main",
    "kotlin",
    "com",
    "koupper",
    "cli",
    "commands",
    "AvailableCommands.kt"
  ),
  path.join(
    root,
    "..",
    "koupper-cli",
    "src",
    "main",
    "kotlin",
    "com",
    "koupper",
    "cli",
    "commands",
    "AvailableCommands.kt"
  ),
  path.join(
    root,
    "koupper-core",
    "src",
    "main",
    "kotlin",
    "com",
    "koupper",
    "cli",
    "commands",
    "AvailableCommands.kt"
  ),
  path.join(
    root,
    "koupper-core",
    "koupper-cli",
    "src",
    "main",
    "kotlin",
    "com",
    "koupper",
    "cli",
    "commands",
    "AvailableCommands.kt"
  ),
];

const commandsDocsDir = path.join(root, "docs", "commands");
const commandsIndexPath = path.join(commandsDocsDir, "index.md");
const sidebarPath = path.join(root, "docs", ".vitepress", "config.js");

const cliCommandsPath = cliCommandCandidates.find((candidate) => fs.existsSync(candidate));

if (!cliCommandsPath) {
  console.error(`CLI commands file not found. Looked in: ${cliCommandCandidates.join(", ")}`);
  process.exit(1);
}

const cliText = fs.readFileSync(cliCommandsPath, "utf8");
const commandMatches = [...cliText.matchAll(/const val\s+(\w+)\s*=\s*"([a-z\-]+)"/g)];
const ignored = new Set(["help", "undefined", "default", "build"]);

const expectedCommands = commandMatches
  .map(([, , value]) => value)
  .filter((name) => !ignored.has(name));

const docsIndex = fs.readFileSync(commandsIndexPath, "utf8");
const sidebar = fs.readFileSync(sidebarPath, "utf8");

const missingDocsFiles = [];
const missingIndexLinks = [];
const missingSidebarLinks = [];

for (const command of expectedCommands) {
  const docFile = path.join(commandsDocsDir, `${command}.md`);
  if (!fs.existsSync(docFile)) {
    missingDocsFiles.push(command);
  }

  if (!docsIndex.includes(`/commands/${command}`)) {
    missingIndexLinks.push(command);
  }

  if (!sidebar.includes(`/commands/${command}`)) {
    missingSidebarLinks.push(command);
  }
}

const problems = [];
if (missingDocsFiles.length) {
  problems.push(`Missing docs/commands/*.md for: ${missingDocsFiles.join(", ")}`);
}
if (missingIndexLinks.length) {
  problems.push(`Missing in docs/commands/index.md: ${missingIndexLinks.join(", ")}`);
}
if (missingSidebarLinks.length) {
  problems.push(`Missing in docs/.vitepress/config.js sidebar: ${missingSidebarLinks.join(", ")}`);
}

if (problems.length) {
  console.error("CLI docs sync validation failed:");
  problems.forEach((p) => console.error(`- ${p}`));
  process.exit(1);
}

console.log(`CLI docs sync validation passed (${expectedCommands.length} commands checked).`);
