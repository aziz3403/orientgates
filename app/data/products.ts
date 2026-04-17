export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceDisplay: string;
  origin: string;
  period: string;
  description: string;
  image: string;
  featured?: boolean;
  sold?: boolean;
}

export const products: Product[] = [
  {
    id: "damascus-room-panel",
    name: "Damascus Ceremonial Wall Panel",
    category: "furniture",
    price: 85000,
    priceDisplay: "$85,000",
    origin: "Damascus, Syria",
    period: "Early 18th Century",
    description:
      "An exceptional example of Damascene craftsmanship, this monumental wall panel features the iconic mother-of-pearl inlay tradition of Ottoman Syria. Carved from aged poplar with gesso relief, gold leaf, and hand-cut nacre medallions — each piece placed by artisans who devoted their lives to this dying art.",
    image: "/images/hero-1.jpg",
    featured: true,
  },
  {
    id: "mosque-lamp-mamluk",
    name: "Mamluk Mosque Lamp",
    category: "antiques",
    price: 62000,
    priceDisplay: "$62,000",
    origin: "Cairo, Egypt",
    period: "Late 13th Century",
    description:
      "Blown glass, enameled in cobalt and crimson, gilded with Qur'anic inscriptions from Surat al-Nur — the verse of light. A direct antecedent to this piece hung in the mausoleum of Amir Aydakin. Museum-quality condition with intact original enamel.",
    image: "/images/product-lamp.jpg",
    featured: true,
  },
  {
    id: "brass-ewer-mosul",
    name: "Mosul Brass Ewer with Silver Inlay",
    category: "antiques",
    price: 48000,
    priceDisplay: "$48,000",
    origin: "Mosul, Iraq",
    period: "Dated 623 AH / 1226 CE",
    description:
      "Cast brass inlaid with silver and black compound, depicting processional horsemen within interlacing arabesques. The master craftsman's signature is preserved in the cartouche at the neck. One of fewer than twelve known examples of this atelier.",
    image: "/images/product-ewer.jpg",
    featured: true,
  },
  {
    id: "minbar-doors-cairo",
    name: "Pair of Carved Minbar Doors",
    category: "furniture",
    price: 95000,
    priceDisplay: "$95,000",
    origin: "Cairo, Egypt",
    period: "circa 1325–1330",
    description:
      "Rosewood and mulberry, carved and inlaid with ivory and ebony in a geometric star pattern of extraordinary precision — 1,440 hand-cut pieces per square foot. Provenance traces to a dismantled Cairene mosque, acquired by a European diplomat in 1891.",
    image: "/images/category-furniture.jpg",
    featured: false,
  },
  {
    id: "damascus-bath-box",
    name: "Damascus Bone-Inlay Bath Box",
    category: "antiques",
    price: 22000,
    priceDisplay: "$22,000",
    origin: "Damascus, Syria",
    period: "17th–18th Century",
    description:
      "Wood inlaid with bone and polychrome wood marquetry in the traditional Damascene style, with lathe-turned feet. Interior lined with aged cedar. A rare domestic object of completeness — lid, body, and all internal fittings intact.",
    image: "/images/workshop-1.jpg",
    featured: false,
  },
  {
    id: "islamic-bronze-mirror",
    name: "Seljuq Cast Bronze Mirror",
    category: "mirrors",
    price: 34000,
    priceDisplay: "$34,000",
    origin: "Iran",
    period: "13th Century",
    description:
      "A cast bronze mirror of superb patina, the reverse decorated with concentric registers of vegetal scrollwork and geometric interlace surrounding a central roundel of confronted birds. The handle terminates in an elegant palmette.",
    image: "/images/category-mirrors.jpg",
    featured: false,
  },
];

export const categories = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Thrones, daybeds, screens & cabinets",
    image: "/images/category-furniture.jpg",
    count: 24,
  },
  {
    id: "antiques",
    name: "Islamic Antiques",
    description: "Brass, glass, ceramics & metalwork",
    image: "/images/category-antiques.jpg",
    count: 41,
  },
  {
    id: "mirrors",
    name: "Mirrors & Panels",
    description: "Mother-of-pearl, carved wood & bronze",
    image: "/images/category-mirrors.jpg",
    count: 18,
  },
];
