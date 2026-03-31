module.exports = {
  title: "Koupper",
  description: "Event-driven Kotlin runtime + CLI for production scripting",
  head: [
    ["link", { rel: "icon", href: "/koupper-logo.svg" }],
  ],
  themeConfig: {
    logo: "/koupper-logo.svg",
    siteTitle: "Koupper Docs",
    nav: [
      { text: "Guide", link: "/getting-started" },
      { text: "Architecture", link: "/how-a-web-script-works" },
      { text: "GitHub", link: "https://github.com/koupper-jvm/koupper" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/koupper-jvm/koupper" },
    ],
    footer: {
      message: "Built with Koupper and VitePress",
      copyright: "Copyright © 2026 Koupper",
    },
    sidebar: [
      {
        text: "Start Here",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "Quick Smoke", link: "/examples/quick-smoke" },
        ],
      },
      {
        text: "Core Commands",
        items: [
          { text: "run", link: "/commands/run" },
          { text: "new", link: "/commands/new" },
          { text: "module", link: "/commands/module" },
          { text: "job", link: "/commands/job" },
          { text: "deploy", link: "/commands/deploy" },
          { text: "provider", link: "/commands/provider" },
        ],
      },
      {
        text: "Providers",
        items: [
          { text: "Catalog", link: "/providers/" },
          { text: "db", link: "/providers/db" },
          { text: "mailing", link: "/providers/mailing" },
          { text: "logger", link: "/providers/logger" },
          { text: "http", link: "/providers/http" },
          { text: "files", link: "/providers/files" },
          { text: "jwt", link: "/providers/jwt" },
          { text: "crypto", link: "/providers/crypto" },
          { text: "aws-dynamo", link: "/providers/aws-dynamo" },
          { text: "aws-s3", link: "/providers/aws-s3" },
          { text: "hashing", link: "/providers/hashing" },
          { text: "GitHub Provider", link: "/providers/github" },
          { text: "ai", link: "/providers/ai" },
          { text: "templates", link: "/providers/templates" },
          { text: "rss", link: "/providers/rss" },
        ],
      },
      {
        text: "Automation",
        items: [
          { text: "GitHub Integration Flow", link: "/automation/github-integration-flow" },
        ],
      },
      {
        text: "Architecture",
        items: [
          { text: "How a Web Script Works", link: "/how-a-web-script-works" },
          { text: "Local-first Scaffolding", link: "/architecture/local-first-scaffolding" },
        ],
      },
      {
        text: "Production",
        items: [
          { text: "Hardening Guide", link: "/production/hardening" },
          { text: "Release Workflow", link: "/production/release-workflow" },
          { text: "Troubleshooting", link: "/production/troubleshooting" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
  },
};
