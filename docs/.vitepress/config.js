module.exports = {
  title: "Koupper",
  description: "The functional kotlin framework",
  themeConfig: {
    logo: "/koupper-logo.svg",
    siteTitle: "Koupper",
    nav: [
      { text: "Blog", link: "/about" },
      { text: "Documentation", link: "/contact" },
    ],
    sidebar: [
      {
        text: "Section A",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "Section B",
        collapsible: false,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "Section C",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
    ],
  },
};
