export interface Product {
  id: number;
  slug: string;
  title: string;
  category: 'Mirrors' | 'Furniture' | 'Antiques';
  description: string;
  longDescription: string;
  dimensions: string;
  materials: string;
  origin: string;
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'calligraphy-arch-mirror',
    title: 'Calligraphy Arch Mirror',
    category: 'Mirrors',
    description: 'Grand arch mirror with hand-inlaid Quranic calligraphy and floral motifs.',
    longDescription: 'A masterwork of Damascene craftsmanship, this monumental arch mirror features thousands of individually hand-cut mother of pearl pieces inlaid into solid walnut wood. The ornate frame showcases Quranic calligraphy rendered in exquisite detail, surrounded by floral and arabesque patterns that flow seamlessly from base to apex. A statement piece of unparalleled artistry.',
    dimensions: '252 × 130 cm',
    materials: 'Solid walnut wood, mother of pearl, brass inlay',
    origin: 'Damascus, Syria',
    image: '/m1.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'damascus-floral-mirror',
    title: 'Damascus Floral Mirror',
    category: 'Mirrors',
    description: 'Rectangular mirror frame with dense floral mother of pearl inlay.',
    longDescription: 'This elegant rectangular mirror exemplifies the finest tradition of Syrian mother of pearl artistry. Each flower and vine is individually hand-cut and placed by master craftsmen, creating a tapestry of iridescent beauty. The depth of the walnut wood provides the perfect contrast to the luminous shell.',
    dimensions: '180 × 90 cm',
    materials: 'Solid walnut wood, mother of pearl',
    origin: 'Damascus, Syria',
    image: '/m2.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'imperial-octagonal-mirror',
    title: 'Imperial Octagonal Mirror',
    category: 'Mirrors',
    description: 'Geometric octagonal frame with Islamic star pattern inlay.',
    longDescription: 'Inspired by the geometric perfection of Islamic architectural tradition, this octagonal mirror frame features an intricate eight-pointed star pattern rendered entirely in mother of pearl. The symmetry and precision of the inlay work reflects centuries of mathematical and artistic mastery.',
    dimensions: '140 × 140 cm',
    materials: 'Solid walnut wood, mother of pearl, ebony',
    origin: 'Damascus, Syria',
    image: '/m3.jpg',
    featured: true,
  },
  {
    id: 4,
    slug: 'grand-salon-mirror',
    title: 'Grand Salon Mirror',
    category: 'Mirrors',
    description: 'Palace-scale mirror with scrollwork and arabesque border.',
    longDescription: 'Designed for grand interiors and palatial residences, this mirror commands attention with its sweeping scale and intricate detailing. The frame features continuous arabesque scrollwork punctuated by geometric medallions, all executed in hand-cut mother of pearl against deep-toned walnut.',
    dimensions: '220 × 110 cm',
    materials: 'Solid walnut wood, mother of pearl, gold leaf detail',
    origin: 'Damascus, Syria',
    image: '/m4.jpg',
    featured: true,
  },
  {
    id: 5,
    slug: 'crescent-arch-mirror',
    title: 'Crescent Arch Mirror',
    category: 'Mirrors',
    description: 'Slender arched mirror with crescent motifs and fine vine work.',
    longDescription: 'The crescent arch form draws from Ottoman architectural tradition, creating an elegant profile that works beautifully in both classic and contemporary interiors. Fine vine tendrils and crescent moon motifs wind across the entire frame surface in luminous mother of pearl.',
    dimensions: '200 × 80 cm',
    materials: 'Solid walnut wood, mother of pearl',
    origin: 'Damascus, Syria',
    image: '/m5.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'royal-damascus-mirror',
    title: 'Royal Damascus Mirror',
    category: 'Mirrors',
    description: 'Full-coverage mother of pearl with gilded accent details.',
    longDescription: 'The most opulent expression of the Damascene mirror tradition, this piece features full surface coverage in mother of pearl with gilded brass accent medallions at each corner and center. No wood is left exposed — the entire frame shimmers with iridescent light from every angle.',
    dimensions: '160 × 95 cm',
    materials: 'Solid walnut wood, mother of pearl, gilded brass',
    origin: 'Damascus, Syria',
    image: '/m6.jpg',
    featured: false,
  },
  {
    id: 7,
    slug: 'mother-of-pearl-console-table',
    title: 'Mother of Pearl Console Table',
    category: 'Furniture',
    description: 'Iconic half-moon console table with full mother of pearl inlay.',
    longDescription: 'Our signature console table — the piece that defines The Orient Gates. The demi-lune form is entirely clothed in hand-inlaid mother of pearl, with floral motifs cascading from the marble top to the delicate tapered legs. Paired with our round mirror, it creates an entrance of extraordinary drama.',
    dimensions: '120 × 45 × 85 cm (custom available)',
    materials: 'Solid walnut wood, mother of pearl, marble top',
    origin: 'Damascus, Syria',
    image: '/f1.jpg',
    featured: true,
  },
  {
    id: 8,
    slug: 'damascus-writing-desk',
    title: 'Damascus Writing Desk',
    category: 'Furniture',
    description: 'Full-size writing desk with geometric mosaic inlay on all surfaces.',
    longDescription: 'A functional work of art for the discerning collector. This writing desk features the same exacting mother of pearl inlay work across its entire surface — top, drawers, and legs. The geometric mosaic pattern is inspired by the great mosques of Damascus, brought into the intimate scale of daily use.',
    dimensions: '140 × 70 × 78 cm (custom available)',
    materials: 'Solid walnut wood, mother of pearl, brass hardware',
    origin: 'Damascus, Syria',
    image: '/f2.jpg',
    featured: false,
  },
  {
    id: 9,
    slug: 'antique-ottoman-chest',
    title: 'Antique Ottoman Chest',
    category: 'Antiques',
    description: '19th century Ottoman storage chest with original inlay and brass fittings.',
    longDescription: 'A genuine antique from the Ottoman period, this chest retains its original mother of pearl and tortoiseshell inlay alongside the original brass fittings and lock mechanism. Sourced directly from a family collection in Damascus, it represents an irreplaceable piece of Levantine history.',
    dimensions: '95 × 55 × 65 cm',
    materials: 'Walnut wood, mother of pearl, tortoiseshell, brass (antique)',
    origin: 'Damascus, Syria — circa 1880',
    image: '/a1.jpg',
    featured: false,
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured).slice(0, 6);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getRelatedProducts = (slug: string, count = 3) =>
  products.filter(p => p.slug !== slug).slice(0, count);
