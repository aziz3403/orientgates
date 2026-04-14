// ── Category Data ──
export interface Category {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroDescription: string;
  image: string;
  accent: string;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    slug: "mother-of-pearl",
    title: "Mother-of-Pearl",
    subtitle: "The Signature Collection",
    description:
      "Exquisite handcrafted furniture adorned with intricate mother-of-pearl inlay, a centuries-old tradition of Levantine artistry passed down through generations.",
    heroDescription:
      "Each piece in our mother-of-pearl collection represents hundreds of hours of meticulous hand inlay work. Artisans carefully cut, shape, and set each fragment of shell into intricate geometric and floral patterns, creating furniture that transcends mere function to become living works of art.",
    image: "/images/mother-of-pearl-hero.jpg",
    accent: "from-amber-900/40 to-yellow-900/20",
    featured: true,
  },
  {
    slug: "islamic-antiques",
    title: "Islamic Antiques",
    subtitle: "Sacred Heritage",
    description:
      "Rare and scholarly pieces from the great Islamic civilizations — calligraphy, metalwork, ceramics, and architectural fragments spanning over a millennium of artistic achievement.",
    heroDescription:
      "Our Islamic antiques collection spans centuries of artistic achievement across the Muslim world. From magnificent Mamluk metalwork to Ottoman calligraphy, each piece carries the weight of history and the devotion of master artisans who created beauty as an act of worship.",
    image: "/images/islamic-antiques-hero.jpg",
    accent: "from-emerald-900/30 to-teal-900/20",
  },
  {
    slug: "furniture",
    title: "Furniture",
    subtitle: "Grand & Collectible",
    description:
      "Statement furniture pieces from the great traditions of European and Oriental craftsmanship — each one a testament to an era of uncompromising quality and artistry.",
    heroDescription:
      "From ornate Syrian consoles to refined European commodes, our furniture collection presents grand pieces that have furnished the homes of collectors, diplomats, and connoisseurs for generations. Each piece speaks to an era when furniture was built to endure centuries.",
    image: "/images/furniture-hero.jpg",
    accent: "from-stone-900/30 to-neutral-900/20",
  },
  {
    slug: "carpets-textiles",
    title: "Carpets & Textiles",
    subtitle: "Woven Heritage",
    description:
      "Handwoven carpets, silk textiles, and embroidered works from Persia, the Ottoman Empire, and the Silk Road — each thread a story of tradition and mastery.",
    heroDescription:
      "Our textile collection celebrates the art of the loom and needle. From Persian silk carpets of extraordinary fineness to Ottoman embroideries of exquisite beauty, these textiles represent some of the most sophisticated artistic traditions in human history.",
    image: "/images/carpets-hero.jpg",
    accent: "from-red-900/30 to-rose-900/20",
  },
  {
    slug: "decorative-objects",
    title: "Decorative Objects",
    subtitle: "Refined & Curated",
    description:
      "A curated selection of rare decorative objects — from Bohemian crystal to Islamic brass, carved jade to gilded mirrors — each chosen for its beauty, rarity, and provenance.",
    heroDescription:
      "Our decorative objects collection is a cabinet of wonders — carefully curated pieces that transform spaces with their presence. From delicate Bohemian crystal chandeliers to powerful Islamic brass vessels, each object has been selected for its extraordinary artistry and character.",
    image: "/images/decorative-hero.jpg",
    accent: "from-purple-900/30 to-indigo-900/20",
  },
];

// ── Product / Object Data ──
export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string | null;
  period: string;
  origin: string;
  materials: string[];
  dimensions: string;
  description: string;
  craftsmanship: string;
  condition: string;
  provenance: string;
  images: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "damascus-mother-of-pearl-cabinet",
    title: "Grand Damascus Mother-of-Pearl Cabinet",
    category: "mother-of-pearl",
    price: null,
    period: "Late 19th Century, c. 1880",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone Inlay", "Brass Hardware"],
    dimensions: '180cm H × 120cm W × 55cm D (70.8" × 47.2" × 21.6")',
    description:
      "An extraordinary grand cabinet from the workshops of Damascus, featuring thousands of individually hand-cut mother-of-pearl fragments arranged in mesmerizing geometric patterns. The craftsmanship represents the pinnacle of Syrian inlay work, with intricate star patterns radiating across every surface.",
    craftsmanship:
      "Over 15,000 individual pieces of mother-of-pearl, hand-cut and set into walnut. Each geometric pattern follows centuries-old mathematical principles. The brass hardware is hand-forged and engraved with arabesque motifs.",
    condition: "Excellent. Museum-quality restoration preserving all original inlay work. Minor age-appropriate patina to brass elements.",
    provenance: "From a distinguished private collection in Beirut. Previously in the collection of a prominent Levantine trading family.",
    images: [
      "/images/products/mop-cabinet-1.jpg",
      "/images/products/mop-cabinet-2.jpg",
      "/images/products/mop-cabinet-3.jpg",
      "/images/products/mop-cabinet-4.jpg",
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "ottoman-calligraphy-panel",
    title: "Magnificent Ottoman Calligraphy Panel",
    category: "islamic-antiques",
    price: null,
    period: "18th Century, c. 1750",
    origin: "Istanbul, Ottoman Empire",
    materials: ["Gold Leaf", "Natural Pigments", "Handmade Paper", "Cedar Frame"],
    dimensions: '95cm H × 65cm W (37.4" × 25.6")',
    description:
      "A masterful calligraphic composition in thuluth script, executed with extraordinary precision and adorned with gold leaf illumination. The panel displays verses rendered with the fluid grace that defines the highest achievement of Ottoman calligraphic art.",
    craftsmanship:
      "Written with reed pen (qalam) using hand-ground carbon ink. Gold leaf applied with traditional burnishing technique. The illuminated borders feature delicate floral arabesques in lapis lazuli blue and vermillion.",
    condition: "Very good. Some minor age toning consistent with period. Gold leaf retains excellent brilliance. Original cedar frame.",
    provenance: "Acquired from an Ottoman collector's estate in Istanbul. Accompanied by a letter of provenance dating to the early 20th century.",
    images: [
      "/images/products/ottoman-panel-1.jpg",
      "/images/products/ottoman-panel-2.jpg",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "persian-silk-carpet",
    title: "Exceptional Persian Silk Isfahan Carpet",
    category: "carpets-textiles",
    price: "$45,000",
    period: "Early 20th Century, c. 1920",
    origin: "Isfahan, Persia",
    materials: ["Pure Silk Pile", "Silk Foundation", "Natural Dyes"],
    dimensions: '320cm × 210cm (10\'6" × 6\'11")',
    description:
      "An exceptionally fine Isfahan carpet of extraordinary silk quality with a medallion design of breathtaking intricacy. The color palette features deep indigo, ivory, and soft rose against a field of rich burgundy, with over 800 knots per square inch.",
    craftsmanship:
      "Entirely hand-knotted in pure silk with asymmetric (Persian) knots at extraordinary density. Natural dyes derived from pomegranate skin, indigo, and madder root. The design was drawn by a master designer (naqqash) and executed by highly skilled weavers over approximately two years.",
    condition: "Excellent. Full pile with vibrant original colors. Minor age-appropriate mellowing of dyes. No repairs or restoration.",
    provenance: "From the collection of a European diplomat stationed in Tehran. Acquired directly from the Isfahan workshops.",
    images: [
      "/images/products/persian-carpet-1.jpg",
      "/images/products/persian-carpet-2.jpg",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "french-empire-console",
    title: "French Empire Gilt Bronze Console Table",
    category: "furniture",
    price: "$28,000",
    period: "Early 19th Century, c. 1810",
    origin: "Paris, France",
    materials: ["Mahogany", "Gilt Bronze (Ormolu)", "Marble Top", "Brass"],
    dimensions: '90cm H × 130cm W × 45cm D (35.4" × 51.2" × 17.7")',
    description:
      "A magnificent Empire period console table attributed to the workshops of Paris, featuring superbly chased gilt bronze mounts in the form of winged caryatids, laurel wreaths, and classical motifs. The top is of rare Griotte marble.",
    craftsmanship:
      "The gilt bronze mounts are mercury-gilded (dorure au mercure), the most refined gilding technique. The mahogany is flame-figured Cuban stock. Hand-carved details with exceptional precision throughout.",
    condition: "Very good. Original gilt bronze mounts with warm aged patina. Marble top has minor surface wear consistent with age. Structurally excellent.",
    provenance: "From a Parisian private collection. Previously in a notable château in the Loire Valley.",
    images: [
      "/images/products/empire-console-1.jpg",
      "/images/products/empire-console-2.jpg",
    ],
    featured: true,
  },
  {
    id: "5",
    slug: "mamluk-brass-tray-table",
    title: "Mamluk Silver-Inlaid Brass Tray Table",
    category: "decorative-objects",
    price: "$18,500",
    period: "14th Century, c. 1350",
    origin: "Cairo or Damascus, Mamluk Sultanate",
    materials: ["Brass", "Silver Inlay", "Carved Hardwood Stand"],
    dimensions: '60cm H × 75cm Diameter (23.6" × 29.5")',
    description:
      "A rare and important Mamluk brass tray with extensive silver inlay depicting scenes of courtly life, mounted on a later carved hardwood stand. The tray's elaborate decoration includes bands of thuluth calligraphy, roundels with figural scenes, and intricate arabesque patterns.",
    craftsmanship:
      "The brass body is hand-raised from a single sheet. Silver inlay is hammered into channels chased into the surface — a technique requiring extraordinary precision. The calligraphic bands are engraved with prayers and blessings.",
    condition: "Good. Expected surface wear and patina for a piece of this age. Silver inlay approximately 85% intact. The hardwood stand is a sympathetic 19th-century addition.",
    provenance: "Ex-collection of a prominent European Orientalist. Published in a 1925 exhibition catalogue.",
    images: [
      "/images/products/mamluk-tray-1.jpg",
      "/images/products/mamluk-tray-2.jpg",
    ],
    featured: true,
  },
  {
    id: "6",
    slug: "mother-of-pearl-mirror",
    title: "Syrian Mother-of-Pearl Overmantel Mirror",
    category: "mother-of-pearl",
    price: null,
    period: "c. 1890",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone", "Mirror Glass"],
    dimensions: '150cm H × 95cm W (59" × 37.4")',
    description:
      "A breathtaking overmantel mirror from Damascus featuring an elaborate frame composed of thousands of shell inlay pieces arranged in cascading geometric patterns. The arched crest is surmounted by a delicate cresting of intertwined arabesque forms.",
    craftsmanship:
      "The frame is constructed from aged walnut, with each surface covered in individually cut and polished mother-of-pearl and bone fragments. The alternating light and dark materials create a shimmering visual effect that changes with the light.",
    condition: "Excellent. Professionally restored with all original inlay preserved. Mirror glass replaced with period-appropriate mercury glass.",
    provenance: "Acquired from a private villa in Aleppo. The mirror was originally commissioned for a merchant's residence.",
    images: [
      "/images/products/mop-mirror-1.jpg",
      "/images/products/mop-mirror-2.jpg",
    ],
    featured: true,
  },
  {
    id: "7",
    slug: "mother-of-pearl-chest",
    title: "Levantine Mother-of-Pearl Chest of Drawers",
    category: "mother-of-pearl",
    price: "$35,000",
    period: "c. 1870",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Ebony", "Brass"],
    dimensions: '110cm H × 100cm W × 50cm D (43.3" × 39.4" × 19.7")',
    description:
      "A sumptuous chest of drawers featuring an extraordinary density of mother-of-pearl inlay across all visible surfaces. The geometric patterns reflect the mathematical precision of Islamic decorative arts, with each drawer face presenting a distinct variation on the star motif.",
    craftsmanship:
      "Thousands of hand-cut shell fragments create an all-over pattern of remarkable complexity. Ebony stringing provides contrast and definition. The brass drawer pulls are hand-cast in traditional forms.",
    condition: "Very good. Minor professional stabilization of inlay in two areas. All original hardware. Rich aged patina throughout.",
    provenance: "From a family collection in Beirut, continuously held since original acquisition.",
    images: [
      "/images/products/mop-chest-1.jpg",
      "/images/products/mop-chest-2.jpg",
    ],
  },
  {
    id: "8",
    slug: "iznik-tile-panel",
    title: "Ottoman Iznik Tile Panel",
    category: "islamic-antiques",
    price: "$52,000",
    period: "16th Century, c. 1575",
    origin: "Iznik, Ottoman Empire",
    materials: ["Fritware", "Underglaze Pigments", "Lead Glaze"],
    dimensions: '90cm H × 60cm W (35.4" × 23.6") - 6 tiles',
    description:
      "A magnificent panel of six Iznik tiles from the golden age of Ottoman ceramic production. The design features the iconic cobalt blue, turquoise, and sealing-wax red (Armenian bole) palette against a brilliant white ground, with tulips, carnations, and saz leaves.",
    craftsmanship:
      "Each tile is hand-formed from fritware (quartz paste) and painted with mineral pigments beneath a clear lead glaze. The famous 'Armenian bole' red sits in slight relief above the surface — a hallmark of the finest Iznik production.",
    condition: "Good to very good. Minor edge chips consistent with age. Two tiles with hairline cracks. Colors remain vivid and unfaded.",
    provenance: "Reportedly from a mosque renovation in Istanbul. In a European private collection since the 1950s.",
    images: [
      "/images/products/iznik-panel-1.jpg",
      "/images/products/iznik-panel-2.jpg",
    ],
  },
  {
    id: "9",
    slug: "venetian-glass-chandelier",
    title: "Monumental Venetian Glass Chandelier",
    category: "decorative-objects",
    price: "$22,000",
    period: "Late 19th Century, c. 1885",
    origin: "Murano, Venice, Italy",
    materials: ["Hand-Blown Murano Glass", "Gilt Metal Armature"],
    dimensions: '120cm H × 90cm Diameter (47.2" × 35.4")',
    description:
      "A grand Venetian chandelier of exceptional quality featuring tiers of hand-blown glass arms adorned with flowers, leaves, and fruit in clear and colored glass. The warm amber and rose-tinted elements create an enchanting play of light.",
    craftsmanship:
      "Every element is hand-blown and hand-shaped by master glassblowers using centuries-old Murano techniques. The flowers are individually formed using lampwork. The gilt metal armature is hand-forged with delicate scrollwork.",
    condition: "Very good. All original glass elements intact. Professionally rewired for modern electrical standards. Minor expected oxidation to gilt armature.",
    provenance: "From a Venetian palazzo. Acquired through a prominent Milanese antiques dealer.",
    images: [
      "/images/products/chandelier-1.jpg",
      "/images/products/chandelier-2.jpg",
    ],
  },
  {
    id: "10",
    slug: "turkish-prayer-rug",
    title: "Antique Anatolian Silk Prayer Rug",
    category: "carpets-textiles",
    price: "$12,500",
    period: "Late 18th Century, c. 1780",
    origin: "Konya Region, Anatolia",
    materials: ["Silk Pile", "Cotton Foundation", "Natural Dyes"],
    dimensions: '170cm × 120cm (5\'7" × 3\'11")',
    description:
      "A rare and luminous silk prayer rug from the Konya region, featuring a beautifully articulated mihrab design with columns and a hanging lamp motif. The palette of soft gold, sage green, and ivory creates an atmosphere of serene contemplation.",
    craftsmanship:
      "Hand-knotted with Turkish (symmetric) knots in pure silk. The foundation is finely spun cotton. Natural dyes include saffron, weld, and indigo in various dilutions to achieve the subtle tonal gradations.",
    condition: "Good. Even low pile throughout. Colors remain luminous. Minor old repair to one selvedge. No moth damage.",
    provenance: "From a Turkish family collection in Konya, reportedly from a mosque endowment (vakif).",
    images: [
      "/images/products/prayer-rug-1.jpg",
      "/images/products/prayer-rug-2.jpg",
    ],
  },
  {
    id: "11",
    slug: "mother-of-pearl-writing-desk",
    title: "Damascus Mother-of-Pearl Writing Desk",
    category: "mother-of-pearl",
    price: null,
    period: "c. 1900",
    origin: "Damascus, Syria",
    materials: ["Walnut", "Mother-of-Pearl", "Bone", "Brass", "Leather"],
    dimensions: '78cm H × 120cm W × 65cm D (30.7" × 47.2" × 25.6")',
    description:
      "An exceptional writing desk showcasing the finest traditions of Damascene furniture making. The writing surface is inset with hand-tooled leather, while every visible wooden surface is covered in elaborate mother-of-pearl and bone inlay in geometric and floral patterns.",
    craftsmanship:
      "The desk features over 20,000 individual inlay pieces. Secret compartments are accessed through concealed mechanisms. The leather top is hand-tooled with gold leaf. Brass hinges and pulls are hand-engraved.",
    condition: "Excellent. Museum-quality conservation. Original leather writing surface with attractive patina. All mechanisms functional.",
    provenance: "From a diplomatic collection. The desk served in the study of a European consul in Damascus.",
    images: [
      "/images/products/mop-desk-1.jpg",
      "/images/products/mop-desk-2.jpg",
    ],
  },
  {
    id: "12",
    slug: "baroque-gilded-mirror",
    title: "Italian Baroque Carved Giltwood Mirror",
    category: "furniture",
    price: "$16,000",
    period: "Early 18th Century, c. 1720",
    origin: "Florence, Italy",
    materials: ["Carved Limewood", "Water Gilt Gold Leaf", "Original Mercury Glass"],
    dimensions: '165cm H × 95cm W (65" × 37.4")',
    description:
      "A magnificent Baroque mirror with an exuberantly carved frame of scrolling acanthus, shells, and cartouches, finished in original water-gilding. The proportions and quality of carving suggest a Florentine workshop of the highest caliber.",
    craftsmanship:
      "Deeply carved from solid limewood by a master carver. The gilding is applied using the traditional water-gilt technique: bole preparation, gold leaf application, and burnishing to achieve areas of both matte and brilliant gold.",
    condition: "Good. Original water-gilding with attractive wear and re-gilding to areas of high contact. Original mercury glass with characteristic foxing. Two small replaced carved elements.",
    provenance: "From a Florentine noble family's estate. Acquired through Sotheby's in the 1990s.",
    images: [
      "/images/products/baroque-mirror-1.jpg",
      "/images/products/baroque-mirror-2.jpg",
    ],
  },
];

// ── Helper functions ──
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
