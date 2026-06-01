import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/cart",
          "/checkout",
          "/wishlist",
          // Legacy /collection/* paths 307 to the canonical URL — keep
          // them out of the crawl budget rather than wasting it on redirects.
          "/collection",
          "/collection/",
        ],
      },
    ],
    sitemap: "https://theorientgates.com/sitemap.xml",
    host: "https://theorientgates.com",
  };
}
