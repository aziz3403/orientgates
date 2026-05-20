// ══════════════════════════════════════════════
// THE ORIENT GATES — Product & Category Data
// ══════════════════════════════════════════════

// ── Types ──

export type ProductType = "purchasable" | "inquiry";
export type Availability = "available" | "sold" | "reserved";

export interface Category {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroDescription: string;
  image: string;
  accent: string;
  parent?: string; // slug of parent category
  featured?: boolean;
  order: number;
}

export interface AuctionRecord {
  house: string;
  date: string;
  lot?: string;
  salePrice?: string;
}

export interface Product {
  id: string;
  sku?: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  subcategory?: string;
  type: ProductType;
  price: number | null;
  priceDisplay: string;
  availability: Availability;
  period: string;
  origin: string;
  materials: string[];
  dimensions: string;
  weight?: string;
  description: string;
  craftsmanship: string;
  condition: string;
  provenance: string;
  shipping?: string;
  insurance?: string;
  images: string[];
  featured?: boolean;
  newArrival?: boolean;
  dateAdded: string;
  certificateOfAuthenticity?: boolean;
  expertAppraisal?: string;
  auctionHistory?: AuctionRecord[];
  tags?: string[];
  relatedIds?: string[];
  restorationHistory?: string;
  exhibitionHistory?: string;
  literatureReferences?: string;
  comparableSales?: string;
  insuranceValuation?: number;
  videoUrl?: string;
  materialsDetail?: string;
}

// Auto-generate SKU from product ID if not set
export function getProductSKU(product: Product): string {
  if (product.sku) return product.sku;
  const prefix = product.category === "mother-of-pearl-furniture" ? "MOP"
    : product.subcategory === "islamic-antiques" ? "ISL"
    : product.subcategory === "european-antiques" ? "EUR"
    : product.subcategory === "asian-antiques" ? "ASN"
    : product.category === "carpets-textiles" ? "TXT"
    : "GEN";
  const num = product.id.replace(/\D/g, "").padStart(3, "0");
  return `TOG-${prefix}-${num}`;
}

// ── Top-Level Categories ──

export const topCategories = [
  {
    slug: "antiques",
    title: "Antiques",
    subtitle: "Treasures Across Civilizations",
    description: "Rare and scholarly pieces spanning Islamic, European, and Asian artistic traditions — calligraphy, metalwork, ceramics, sculpture, and architectural fragments.",
    image: "/images/cat-antiques.jpg",
    children: [
      { slug: "islamic-antiques", title: "Islamic Antiques" },
      { slug: "european-antiques", title: "European Antiques" },
      { slug: "asian-antiques", title: "Asian Antiques" },
    ],
  },
  {
    slug: "carpets-textiles",
    title: "Carpets & Textiles",
    subtitle: "Woven Heritage",
    description: "Handwoven carpets, silk textiles, and embroidered works from Persia, the Ottoman Empire, and the Silk Road.",
    image: "/images/cat-carpets.jpg",
    children: [],
  },
  {
    slug: "mother-of-pearl-furniture",
    title: "Mother of Pearl Furniture",
    subtitle: "The Signature Collection",
    description: "Exquisite handcrafted furniture adorned with intricate mother-of-pearl inlay — a centuries-old tradition of Levantine artistry.",
    image: "/images/cat-mop.jpg",
    children: [
      { slug: "mop-mirrors", title: "Mirrors & Wall Decor" },
      { slug: "mop-tables", title: "Tables" },
      { slug: "mop-seating", title: "Seating" },
      { slug: "mop-consoles-cabinets", title: "Consoles & Cabinets" },
      { slug: "mop-chest-of-drawers", title: "Chest of Drawers" },
      { slug: "mop-accessories", title: "Accessories" },
      { slug: "mop-game-tables", title: "Game Tables" },
    ],
  },
];

// ── All Categories (flat list for routing) ──

export const categories: Category[] = [
  // Antiques
  {
    slug: "antiques",
    title: "Antiques",
    subtitle: "Treasures Across Civilizations",
    description: "Rare and scholarly pieces spanning Islamic, European, and Asian artistic traditions.",
    heroDescription: "Our antiques collection spans millennia of artistic achievement across civilizations. From magnificent Mamluk metalwork to refined European furniture, from delicate Asian porcelain to Ottoman calligraphy — each piece carries the weight of history.",
    image: "/images/cat-antiques.jpg",
    accent: "from-amber-900/30 to-stone-900/20",
    order: 1,
  },
  {
    slug: "islamic-antiques",
    title: "Islamic Antiques",
    subtitle: "Sacred Heritage",
    description: "Calligraphy, metalwork, ceramics, and architectural fragments from the great Islamic civilizations spanning over a millennium.",
    heroDescription: "Our Islamic antiques collection spans centuries of artistic achievement across the Muslim world. From magnificent Mamluk metalwork to Ottoman calligraphy, each piece carries the weight of history and the devotion of master artisans.",
    image: "/images/cat-islamic.jpg",
    accent: "from-emerald-900/30 to-teal-900/20",
    parent: "antiques",
    order: 2,
  },
  {
    slug: "european-antiques",
    title: "European Antiques",
    subtitle: "Continental Grandeur",
    description: "Fine European furniture, decorative arts, and collector pieces from the Renaissance through Art Deco — France, Italy, England, and beyond.",
    heroDescription: "From the gilded splendour of Versailles to the restrained elegance of Georgian England, our European collection presents the finest achievements of Continental craftsmanship across five centuries.",
    image: "/images/cat-european.jpg",
    accent: "from-blue-900/30 to-slate-900/20",
    parent: "antiques",
    order: 3,
  },
  {
    slug: "asian-antiques",
    title: "Asian Antiques",
    subtitle: "Eastern Mastery",
    description: "Porcelain, jade, lacquerwork, screens, and decorative arts from China, Japan, and Southeast Asia.",
    heroDescription: "The refined aesthetics of Asia — from Song dynasty ceramics to Japanese lacquerwork, from Mughal jade to Qing porcelain. Each object embodies centuries of artistic philosophy and technical mastery.",
    image: "/images/cat-asian.jpg",
    accent: "from-red-900/25 to-orange-900/15",
    parent: "antiques",
    order: 4,
  },
  // Carpets
  {
    slug: "carpets-textiles",
    title: "Carpets & Textiles",
    subtitle: "Woven Heritage",
    description: "Handwoven carpets, silk textiles, and embroidered works from Persia, the Ottoman Empire, and the Silk Road.",
    heroDescription: "Our textile collection celebrates the art of the loom and needle. From Persian silk carpets of extraordinary fineness to Ottoman embroideries, these textiles represent some of the most sophisticated artistic traditions in human history.",
    image: "/images/cat-carpets.jpg",
    accent: "from-red-900/30 to-rose-900/20",
    order: 5,
  },
  // Mother of Pearl
  {
    slug: "mother-of-pearl-furniture",
    title: "Mother of Pearl Furniture",
    subtitle: "The Signature Collection",
    description: "Exquisite handcrafted furniture adorned with intricate mother-of-pearl inlay — the signature of The Orient Gates.",
    heroDescription: "Each piece represents hundreds of hours of meticulous hand inlay work. Artisans carefully cut, shape, and set each fragment of shell into intricate geometric and floral patterns, creating furniture that transcends function to become living works of art.",
    image: "/images/cat-mop.jpg",
    accent: "from-amber-900/40 to-yellow-900/20",
    featured: true,
    order: 6,
  },
  {
    slug: "mop-mirrors",
    title: "Mirrors & Wall Decor",
    subtitle: "Reflections of Artistry",
    description: "Mother-of-pearl mirrors, wall panels, and decorative frames — each a luminous statement piece.",
    heroDescription: "Our mirror collection showcases the mesmerizing interplay of light on shell inlay. From grand overmantel mirrors to intimate wall panels, each piece transforms any space with its quiet luminescence.",
    image: "/images/cat-mop-mirrors.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 7,
  },
  {
    slug: "mop-tables",
    title: "Tables",
    subtitle: "Surfaces of Light",
    description: "Dining tables, side tables, coffee tables, and occasional tables adorned with intricate shell inlay.",
    heroDescription: "From grand dining tables to delicate occasional pieces, our table collection demonstrates the full range of mother-of-pearl artistry — geometric precision meets organic beauty.",
    image: "/images/cat-mop-tables.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 8,
  },
  {
    slug: "mop-seating",
    title: "Seating",
    subtitle: "Thrones of Craft",
    description: "Chairs, settees, and benches featuring mother-of-pearl inlay in traditional and contemporary forms.",
    heroDescription: "Seating that commands attention — from ceremonial chairs with full shell inlay to elegant settees that blend comfort with extraordinary decorative artistry.",
    image: "/images/cat-mop-seating.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 9,
  },
  {
    slug: "mop-consoles-cabinets",
    title: "Consoles & Cabinets",
    subtitle: "Grand Statements",
    description: "Console tables, display cabinets, bookcases, and storage pieces with elaborate mother-of-pearl decoration.",
    heroDescription: "The grandest expressions of Damascene craft — cabinets and consoles that showcase thousands of hand-cut shell fragments in patterns of breathtaking complexity.",
    image: "/images/cat-mop-consoles.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 10,
  },
  {
    slug: "mop-chest-of-drawers",
    title: "Chest of Drawers",
    subtitle: "Layered Beauty",
    description: "Dressers and chests featuring all-over shell inlay with intricate geometric patterns on every surface.",
    heroDescription: "Each drawer face presents a distinct variation of the star motif — these are storage pieces elevated to the level of fine art through the density and precision of their inlay work.",
    image: "/images/cat-mop-chests.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 11,
  },
  {
    slug: "mop-accessories",
    title: "Accessories",
    subtitle: "Refined Details",
    description: "Jewellery boxes, trays, frames, and decorative objects featuring mother-of-pearl inlay.",
    heroDescription: "Smaller treasures that bring the art of shell inlay into everyday life — jewellery boxes, picture frames, trays, and decorative objects, each crafted with the same devotion as our grandest pieces.",
    image: "/images/cat-mop-accessories.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 12,
  },
  {
    slug: "mop-game-tables",
    title: "Game Tables",
    subtitle: "Play in Splendour",
    description: "Backgammon, chess, and card tables with inlaid mother-of-pearl playing surfaces and storage.",
    heroDescription: "The ancient tradition of game tables reaches its pinnacle in these pieces — backgammon boards, chess tables, and card tables where the playing surface itself is a work of art in shell and wood.",
    image: "/images/cat-mop-games.jpg",
    accent: "from-amber-900/30 to-yellow-900/15",
    parent: "mother-of-pearl-furniture",
    order: 13,
  },
];


// ── Helper Functions ──

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getChildCategories(parentSlug: string): Category[] {
  return categories.filter((c) => c.parent === parentSlug);
}

