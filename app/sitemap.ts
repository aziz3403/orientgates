import { MetadataRoute } from "next";
import { categories, productUrl } from "@/lib/data";
import { getAllProducts } from "@/lib/products-server";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theorientgates.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/antiques`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/carpets-textiles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/mother-of-pearl-furniture`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/new-arrivals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/customize`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/designers-collectors`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/heritage`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/craftsmanship`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Legal — included for completeness, low priority.
    { url: `${baseUrl}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Subcategory listings (e.g. /antiques/islamic-antiques, /mother-of-pearl-furniture/mop-mirrors)
  const subcategoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.parent)
    .map((c) => ({
      url: `${baseUrl}/${c.parent}/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const products = await getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}${productUrl(p)}`,
    lastModified: new Date(p.dateAdded),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...subcategoryPages, ...productPages];
}
