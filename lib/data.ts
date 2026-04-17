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

// ── Products ──

export const products: Product[] = [
  // ─── Mother of Pearl Furniture ───
  {
    id: "mop-1",
    sku: "TOG-MOP-001",
    slug: "grand-damascus-cabinet",
    title: "Grand Damascus Mother-of-Pearl Cabinet",
    subtitle: "A Masterwork of Levantine Craft",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-consoles-cabinets",
    type: "inquiry",
    price: null,
    priceDisplay: "Price on Request",
    availability: "available",
    period: "Late 19th Century, c. 1880",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone Inlay", "Brass Hardware"],
    dimensions: '180cm H × 120cm W × 55cm D (70.8" × 47.2" × 21.6")',
    weight: "85 kg",
    description: "An extraordinary grand cabinet from the workshops of Damascus, featuring thousands of individually hand-cut mother-of-pearl fragments arranged in mesmerizing geometric patterns. The craftsmanship represents the pinnacle of Syrian inlay work.",
    craftsmanship: "Over 15,000 individual pieces of mother-of-pearl, hand-cut and set into walnut. Each geometric pattern follows centuries-old mathematical principles. The brass hardware is hand-forged and engraved with arabesque motifs.",
    condition: "Excellent. Museum-quality restoration preserving all original inlay work. Minor age-appropriate patina to brass elements.",
    provenance: "From a distinguished private collection in Beirut. Previously in the collection of a prominent Levantine trading family.",
    shipping: "White-glove delivery available worldwide. Custom crating included.",
    insurance: "Full transit insurance included. Valued and insured at replacement cost.",
    images: ["/images/products/mop-cabinet-1.jpg", "/images/products/mop-cabinet-2.jpg", "/images/products/mop-cabinet-3.jpg", "/images/products/mop-cabinet-4.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-01-15",
    certificateOfAuthenticity: true,
    expertAppraisal: "Examined and authenticated by Dr. Khalid Rashid, specialist in Levantine decorative arts, who dates this piece to the late Ottoman period based on the geometric vocabulary and construction techniques.",
    auctionHistory: [
      { house: "Sotheby's", date: "2018", lot: "Lot 142", salePrice: "Undisclosed" },
    ],
    tags: ["museum-quality", "damascene", "geometric", "walnut", "statement-piece"],
    relatedIds: ["mop-2", "mop-3", "mop-4"],
    restorationHistory: "Conserved in 2017 by Atelier Farouk, Beirut. Stabilization of 23 loose inlay fragments on left door panel. Original brass hardware cleaned and lacquered. No replacements made — 100% original material preserved.",
    exhibitionHistory: "Exhibited at 'Treasures of the Levant', Sharjah Museum of Islamic Civilization, 2019. Previously displayed at the Beirut Art Center, 2016.",
    literatureReferences: "Referenced in 'The Art of Syrian Inlay: A Study of Damascene Furniture' by Dr. K. Rashid (2020), p. 142-145. Illustrated in Sotheby's 'Arts of the Islamic World' catalogue, October 2018.",
    comparableSales: "A comparable Damascus cabinet of similar period sold at Christie's London in 2021 for £62,000. A smaller example from the same workshop tradition sold at Bonhams in 2020 for $48,000.",
    insuranceValuation: 95000,
  },
  {
    id: "mop-2",
    sku: "TOG-MOP-002",
    slug: "syrian-overmantel-mirror",
    title: "Syrian Mother-of-Pearl Overmantel Mirror",
    subtitle: "A Crown Jewel for Any Interior",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-mirrors",
    type: "inquiry",
    price: null,
    priceDisplay: "Price on Request",
    availability: "available",
    period: "c. 1890",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone", "Mercury Mirror Glass"],
    dimensions: '150cm H × 95cm W (59" × 37.4")',
    weight: "45 kg",
    description: "A breathtaking overmantel mirror featuring an elaborate frame composed of thousands of shell inlay pieces in cascading geometric patterns. The arched crest is surmounted by a delicate cresting of intertwined arabesque forms.",
    craftsmanship: "The frame is constructed from aged walnut, with each surface covered in individually cut and polished mother-of-pearl and bone fragments creating a shimmering visual effect that changes with the light.",
    condition: "Excellent. Professionally restored with all original inlay preserved. Mirror glass replaced with period-appropriate mercury glass.",
    provenance: "Acquired from a private villa in Aleppo.",
    shipping: "White-glove delivery. Custom crating and specialist art handling.",
    insurance: "Full transit insurance included.",
    images: ["/images/products/mop-mirror-1.jpg", "/images/products/mop-mirror-2.jpg"],
    featured: true,
    newArrival: true,
    dateAdded: "2026-03-01",
    certificateOfAuthenticity: true,
    tags: ["mirror", "damascene", "wall-decor", "arabesque"],
    relatedIds: ["mop-1", "mop-3"],
  },
  {
    id: "mop-3",
    sku: "TOG-MOP-003",
    slug: "levantine-chest-of-drawers",
    title: "Levantine Mother-of-Pearl Chest of Drawers",
    subtitle: "Five Centuries of Pattern",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-chest-of-drawers",
    type: "purchasable",
    price: 35000,
    priceDisplay: "$35,000",
    availability: "available",
    period: "c. 1870",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Ebony", "Brass"],
    dimensions: '110cm H × 100cm W × 50cm D (43.3" × 39.4" × 19.7")',
    description: "A sumptuous chest featuring extraordinary density of mother-of-pearl inlay across all visible surfaces. Geometric patterns reflect the mathematical precision of Islamic decorative arts.",
    craftsmanship: "Thousands of hand-cut shell fragments in an all-over pattern of remarkable complexity. Ebony stringing provides contrast. Brass drawer pulls are hand-cast in traditional forms.",
    condition: "Very good. Minor professional stabilization of inlay in two areas. All original hardware.",
    provenance: "From a family collection in Beirut, continuously held since original acquisition.",
    images: ["/images/products/mop-chest-1.jpg", "/images/products/mop-chest-2.jpg"],
    featured: false,
    newArrival: false,
    dateAdded: "2025-06-10",
    certificateOfAuthenticity: true,
    tags: ["chest", "damascene", "geometric", "ebony"],
    relatedIds: ["mop-1", "mop-2"],
  },
  {
    id: "mop-4",
    sku: "TOG-MOP-004",
    slug: "damascus-writing-desk",
    title: "Damascus Mother-of-Pearl Writing Desk",
    subtitle: "Where Art Meets Function",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-tables",
    type: "inquiry",
    price: null,
    priceDisplay: "Price on Request",
    availability: "available",
    period: "c. 1900",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone", "Brass", "Leather"],
    dimensions: '78cm H × 120cm W × 65cm D (30.7" × 47.2" × 25.6")',
    description: "An exceptional writing desk showcasing the finest traditions of Damascene furniture making. Hand-tooled leather writing surface, with every wooden surface covered in elaborate mother-of-pearl and bone inlay.",
    craftsmanship: "Over 20,000 individual inlay pieces. Secret compartments accessed through concealed mechanisms. Leather top hand-tooled with gold leaf. Brass hinges and pulls hand-engraved.",
    condition: "Excellent. Museum-quality conservation. Original leather with attractive patina. All mechanisms functional.",
    provenance: "From a diplomatic collection. The desk served in the study of a European consul in Damascus.",
    images: ["/images/products/mop-desk-1.jpg", "/images/products/mop-desk-2.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-04-20",
  },
  {
    id: "mop-5",
    slug: "inlaid-backgammon-table",
    title: "Mother-of-Pearl Backgammon Table",
    subtitle: "The Noble Game",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-game-tables",
    type: "purchasable",
    price: 18500,
    priceDisplay: "$18,500",
    availability: "available",
    period: "c. 1910",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone", "Ebony"],
    dimensions: '75cm H × 65cm W × 65cm D (29.5" × 25.6" × 25.6")',
    description: "A magnificent backgammon table with fold-open inlaid playing surface. The exterior features geometric star patterns while the interior reveals a beautifully crafted backgammon board in contrasting shell and ebony.",
    craftsmanship: "Dual-purpose design with exterior display surface and hidden game board. Playing pieces hand-turned from bone and ebony. Storage compartments for pieces integrated into the design.",
    condition: "Very good. Complete with original playing pieces. Minor wear to playing surface consistent with use.",
    provenance: "From a private collection in Istanbul.",
    images: ["/images/products/mop-backgammon-1.jpg", "/images/products/mop-backgammon-2.jpg"],
    featured: false,
    newArrival: true,
    dateAdded: "2026-03-15",
  },
  {
    id: "mop-6",
    slug: "shell-inlay-side-chair",
    title: "Damascene Mother-of-Pearl Side Chair",
    subtitle: "Ceremonial Elegance",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-seating",
    type: "purchasable",
    price: 8500,
    priceDisplay: "$8,500",
    availability: "available",
    period: "c. 1895",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Silk Upholstery"],
    dimensions: '95cm H × 48cm W × 45cm D (37.4" × 18.9" × 17.7")',
    description: "An elegant side chair with shell-inlaid frame and seat back. The legs and rails are covered in geometric patterns while the seat is upholstered in burgundy silk damask.",
    craftsmanship: "Frame fully inlaid with geometric shell patterns. Hand-carved crest rail with arabesque motif. Traditional mortise-and-tenon joinery throughout.",
    condition: "Good. Upholstery replaced with period-appropriate silk. Frame and inlay original and stable.",
    provenance: "From a set originally in a merchant's house in the Old City of Damascus.",
    images: ["/images/products/mop-chair-1.jpg", "/images/products/mop-chair-2.jpg"],
    featured: false,
    newArrival: true,
    dateAdded: "2026-02-20",
  },
  {
    id: "mop-7",
    slug: "pearl-jewellery-box",
    title: "Mother-of-Pearl Jewellery Box",
    subtitle: "A Treasure for Treasures",
    category: "mother-of-pearl-furniture",
    subcategory: "mop-accessories",
    type: "purchasable",
    price: 2800,
    priceDisplay: "$2,800",
    availability: "available",
    period: "c. 1920",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Velvet Lining", "Brass"],
    dimensions: '12cm H × 28cm W × 18cm D (4.7" × 11" × 7.1")',
    description: "An exquisite jewellery box with all-over shell inlay and fitted interior lined in deep burgundy velvet. Multiple compartments with a lift-out tray.",
    craftsmanship: "Hundreds of precisely cut shell fragments forming interlocking star patterns. Brass hinges and clasp hand-engraved. Interior hand-lined with silk velvet.",
    condition: "Excellent. Original velvet lining in very good condition. All hardware functional.",
    provenance: "From a private collection.",
    images: ["/images/products/mop-box-1.jpg"],
    featured: false,
    newArrival: false,
    dateAdded: "2025-09-01",
  },

  // ─── Islamic Antiques ───
  {
    id: "isl-1",
    slug: "ottoman-calligraphy-panel",
    title: "Magnificent Ottoman Calligraphy Panel",
    subtitle: "The Art of the Word",
    category: "antiques",
    subcategory: "islamic-antiques",
    type: "inquiry",
    price: null,
    priceDisplay: "Price on Request",
    availability: "available",
    period: "18th Century, c. 1750",
    origin: "Istanbul, Ottoman Empire",
    materials: ["Gold Leaf", "Natural Pigments", "Handmade Paper", "Cedar Frame"],
    dimensions: '95cm H × 65cm W (37.4" × 25.6")',
    description: "A masterful calligraphic composition in thuluth script, executed with extraordinary precision and adorned with gold leaf illumination.",
    craftsmanship: "Written with reed pen using hand-ground carbon ink. Gold leaf applied with traditional burnishing technique. Illuminated borders in lapis lazuli blue and vermillion.",
    condition: "Very good. Minor age toning. Gold leaf retains excellent brilliance. Original cedar frame.",
    provenance: "Acquired from an Ottoman collector's estate in Istanbul. Accompanied by a letter of provenance dating to the early 20th century.",
    shipping: "Museum-grade packing. Climate-controlled transit available.",
    insurance: "Insured at full appraised value during transit.",
    images: ["/images/products/ottoman-panel-1.jpg", "/images/products/ottoman-panel-2.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-02-10",
    certificateOfAuthenticity: true,
    expertAppraisal: "Authenticated by Prof. M. Behrens-Abouseif, specialist in Ottoman calligraphic arts. Attributed to a court atelier based on the quality of illumination.",
    auctionHistory: [
      { house: "Sotheby's", date: "2019", lot: "Arts of the Islamic World, Lot 89" },
      { house: "Bonhams", date: "2012", lot: "Islamic and Indian Art, Lot 215", salePrice: "Undisclosed" },
    ],
    tags: ["calligraphy", "ottoman", "gold-leaf", "thuluth", "scholarly"],
    relatedIds: ["isl-2", "isl-3"],
  },
  {
    id: "isl-2",
    slug: "iznik-tile-panel",
    title: "Ottoman Iznik Tile Panel",
    subtitle: "The Golden Age of Ceramics",
    category: "antiques",
    subcategory: "islamic-antiques",
    type: "purchasable",
    price: 52000,
    priceDisplay: "$52,000",
    availability: "available",
    period: "16th Century, c. 1575",
    origin: "Iznik, Ottoman Empire",
    materials: ["Fritware", "Underglaze Pigments", "Lead Glaze"],
    dimensions: '90cm H × 60cm W (35.4" × 23.6") — 6 tiles',
    description: "A magnificent panel of six Iznik tiles from the golden age of Ottoman ceramic production featuring cobalt blue, turquoise, and sealing-wax red against brilliant white.",
    craftsmanship: "Each tile hand-formed from fritware and painted with mineral pigments beneath a clear lead glaze. The famous 'Armenian bole' red sits in slight relief — a hallmark of the finest Iznik production.",
    condition: "Good to very good. Minor edge chips. Two tiles with hairline cracks. Colors remain vivid.",
    provenance: "Reportedly from a mosque renovation in Istanbul. In a European private collection since the 1950s.",
    images: ["/images/products/iznik-panel-1.jpg", "/images/products/iznik-panel-2.jpg"],
    featured: false,
    newArrival: false,
    dateAdded: "2025-05-15",
  },
  {
    id: "isl-3",
    slug: "mamluk-brass-tray",
    title: "Mamluk Silver-Inlaid Brass Tray Table",
    subtitle: "Courtly Splendour",
    category: "antiques",
    subcategory: "islamic-antiques",
    type: "purchasable",
    price: 18500,
    priceDisplay: "$18,500",
    availability: "available",
    period: "14th Century, c. 1350",
    origin: "Cairo or Damascus, Mamluk Sultanate",
    materials: ["Brass", "Silver Inlay", "Carved Hardwood Stand"],
    dimensions: '60cm H × 75cm Diameter (23.6" × 29.5")',
    description: "A rare Mamluk brass tray with extensive silver inlay depicting courtly life, on a later carved hardwood stand. Bands of thuluth calligraphy, roundels with figural scenes.",
    craftsmanship: "Brass body hand-raised from a single sheet. Silver inlay hammered into chased channels. Calligraphic bands engraved with prayers and blessings.",
    condition: "Good. Expected patina. Silver inlay approximately 85% intact. Stand is a sympathetic 19th-century addition.",
    provenance: "Ex-collection of a prominent European Orientalist. Published in a 1925 exhibition catalogue.",
    images: ["/images/products/mamluk-tray-1.jpg", "/images/products/mamluk-tray-2.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-03-01",
  },

  // ─── European Antiques ───
  {
    id: "eur-1",
    slug: "french-empire-console",
    title: "French Empire Gilt Bronze Console Table",
    subtitle: "Napoleonic Grandeur",
    category: "antiques",
    subcategory: "european-antiques",
    type: "purchasable",
    price: 28000,
    priceDisplay: "$28,000",
    availability: "available",
    period: "Early 19th Century, c. 1810",
    origin: "Paris, France",
    materials: ["Mahogany", "Gilt Bronze (Ormolu)", "Griotte Marble", "Brass"],
    dimensions: '90cm H × 130cm W × 45cm D (35.4" × 51.2" × 17.7")',
    description: "A magnificent Empire console with superbly chased gilt bronze mounts — winged caryatids, laurel wreaths, and classical motifs. Rare Griotte marble top.",
    craftsmanship: "Gilt bronze mounts are mercury-gilded (dorure au mercure), the most refined gilding technique. Flame-figured Cuban mahogany. Hand-carved details throughout.",
    condition: "Very good. Original gilt bronze with warm aged patina. Marble top with minor surface wear. Structurally excellent.",
    provenance: "From a Parisian private collection. Previously in a notable Loire Valley château.",
    images: ["/images/products/empire-console-1.jpg", "/images/products/empire-console-2.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-01-20",
  },
  {
    id: "eur-2",
    slug: "baroque-gilded-mirror",
    title: "Italian Baroque Carved Giltwood Mirror",
    subtitle: "Florentine Magnificence",
    category: "antiques",
    subcategory: "european-antiques",
    type: "purchasable",
    price: 16000,
    priceDisplay: "$16,000",
    availability: "available",
    period: "Early 18th Century, c. 1720",
    origin: "Florence, Italy",
    materials: ["Carved Limewood", "Water Gilt Gold Leaf", "Mercury Glass"],
    dimensions: '165cm H × 95cm W (65" × 37.4")',
    description: "A magnificent Baroque mirror with exuberantly carved frame of scrolling acanthus, shells, and cartouches, finished in original water-gilding.",
    craftsmanship: "Deeply carved from solid limewood. Water-gilt technique: bole preparation, gold leaf application, and burnishing for areas of both matte and brilliant gold.",
    condition: "Good. Original water-gilding with attractive wear. Mercury glass with characteristic foxing. Two small replaced carved elements.",
    provenance: "From a Florentine noble family's estate.",
    images: ["/images/products/baroque-mirror-1.jpg", "/images/products/baroque-mirror-2.jpg"],
    featured: false,
    newArrival: true,
    dateAdded: "2026-02-28",
  },
  {
    id: "eur-3",
    slug: "venetian-glass-chandelier",
    title: "Monumental Venetian Glass Chandelier",
    subtitle: "Murano Brilliance",
    category: "antiques",
    subcategory: "european-antiques",
    type: "purchasable",
    price: 22000,
    priceDisplay: "$22,000",
    availability: "available",
    period: "Late 19th Century, c. 1885",
    origin: "Murano, Venice, Italy",
    materials: ["Hand-Blown Murano Glass", "Gilt Metal Armature"],
    dimensions: '120cm H × 90cm Diameter (47.2" × 35.4")',
    description: "A grand Venetian chandelier with tiers of hand-blown glass arms adorned with flowers, leaves, and fruit in clear and colored glass.",
    craftsmanship: "Every element hand-blown and shaped using centuries-old Murano techniques. Flowers individually formed using lampwork. Gilt metal armature hand-forged.",
    condition: "Very good. All original glass intact. Professionally rewired. Minor oxidation to gilt armature.",
    provenance: "From a Venetian palazzo.",
    images: ["/images/products/chandelier-1.jpg", "/images/products/chandelier-2.jpg"],
    featured: false,
    newArrival: false,
    dateAdded: "2025-07-15",
  },

  // ─── Asian Antiques ───
  {
    id: "asn-1",
    slug: "qing-cloisonne-vases",
    title: "Pair of Qing Dynasty Cloisonne Vases",
    subtitle: "Imperial Artistry",
    category: "antiques",
    subcategory: "asian-antiques",
    type: "purchasable",
    price: 24000,
    priceDisplay: "$24,000 (pair)",
    availability: "available",
    period: "Qianlong Period, c. 1760",
    origin: "Beijing, China",
    materials: ["Bronze", "Cloisonne Enamel", "Gilt Bronze"],
    dimensions: '45cm H × 22cm Diameter each (17.7" × 8.7")',
    description: "A superb pair of cloisonne vases with lotus scroll decoration on a turquoise ground. Gilt bronze rims and foot rings. The quality of enamel and firing suggests imperial workshop production.",
    craftsmanship: "Copper wire cloisons soldered to bronze body, filled with mineral-based enamels and fired multiple times. Each color requires a separate firing at precise temperatures.",
    condition: "Very good. Bright enamel with minor expected wear. Gilding well-preserved. No repairs.",
    provenance: "From a European diplomatic collection formed in Beijing in the early 20th century.",
    images: ["/images/products/cloisonne-vases-1.jpg", "/images/products/cloisonne-vases-2.jpg"],
    featured: true,
    newArrival: true,
    dateAdded: "2026-01-10",
  },

  // ─── Carpets & Textiles ───
  {
    id: "txt-1",
    slug: "persian-silk-isfahan",
    title: "Exceptional Persian Silk Isfahan Carpet",
    subtitle: "A Masterwork of the Loom",
    category: "carpets-textiles",
    type: "purchasable",
    price: 45000,
    priceDisplay: "$45,000",
    availability: "available",
    period: "Early 20th Century, c. 1920",
    origin: "Isfahan, Persia",
    materials: ["Pure Silk Pile", "Silk Foundation", "Natural Dyes"],
    dimensions: '320cm × 210cm (10\'6" × 6\'11")',
    description: "An exceptionally fine Isfahan carpet of extraordinary silk quality with medallion design, deep indigo, ivory, and soft rose on burgundy field. Over 800 knots per square inch.",
    craftsmanship: "Entirely hand-knotted in pure silk with asymmetric Persian knots at extraordinary density. Natural dyes from pomegranate, indigo, and madder. Designed by a master naqqash.",
    condition: "Excellent. Full pile with vibrant original colors. No repairs or restoration.",
    provenance: "From a European diplomat stationed in Tehran. Acquired directly from the Isfahan workshops.",
    shipping: "Specialist textile shipping. Rolled on acid-free tube with custom crating.",
    insurance: "Full transit insurance at declared value.",
    images: ["/images/products/persian-carpet-1.jpg", "/images/products/persian-carpet-2.jpg"],
    featured: true,
    newArrival: false,
    dateAdded: "2025-04-01",
    certificateOfAuthenticity: true,
    expertAppraisal: "Appraised by the Oriental Rug Society of Great Britain. Rated as 'exceptional' for knot density and color integrity.",
    auctionHistory: [
      { house: "Christie's", date: "2015", lot: "Lot 287", salePrice: "$38,000" },
    ],
    tags: ["silk", "isfahan", "persian", "medallion", "museum-quality"],
    relatedIds: ["txt-2"],
  },
  {
    id: "txt-2",
    slug: "anatolian-prayer-rug",
    title: "Antique Anatolian Silk Prayer Rug",
    subtitle: "Woven Devotion",
    category: "carpets-textiles",
    type: "purchasable",
    price: 12500,
    priceDisplay: "$12,500",
    availability: "available",
    period: "Late 18th Century, c. 1780",
    origin: "Konya Region, Anatolia",
    materials: ["Silk Pile", "Cotton Foundation", "Natural Dyes"],
    dimensions: '170cm × 120cm (5\'7" × 3\'11")',
    description: "A rare silk prayer rug from the Konya region, with mihrab design, columns, and hanging lamp motif in soft gold, sage green, and ivory.",
    craftsmanship: "Hand-knotted with Turkish symmetric knots in pure silk. Cotton foundation. Natural dyes including saffron, weld, and indigo.",
    condition: "Good. Even low pile. Colors luminous. Minor old repair to one selvedge.",
    provenance: "From a Turkish family collection in Konya.",
    images: ["/images/products/prayer-rug-1.jpg", "/images/products/prayer-rug-2.jpg"],
    featured: false,
    newArrival: false,
    dateAdded: "2025-08-20",
  },
];

// ── Helper Functions ──

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getChildCategories(parentSlug: string): Category[] {
  return categories.filter((c) => c.parent === parentSlug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(
    (p) => p.category === categorySlug || p.subcategory === categorySlug
  );
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return products
    .filter((p) => p.newArrival)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
}

export function getAllProducts(): Product[] {
  return [...products].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export function getProductsBySubcategory(subcategorySlug: string): Product[] {
  return products.filter((p) => p.subcategory === subcategorySlug);
}
