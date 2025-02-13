/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.svmpharmaceutical.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin", "/private"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"],
      },
    ],
    additionalSitemaps: ["https://www.svmpharmaceutical.com/sitemap.xml"],
  },
};

export default config;
