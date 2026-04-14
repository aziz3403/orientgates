import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

const OUT = join(import.meta.dirname, "../public/images");

// Ensure directories
mkdirSync(join(OUT, "products"), { recursive: true });

// Color palette
const midnight = "#0a0a0a";
const charcoal = "#181410";
const espresso = "#2c1810";
const brass = "#b8972f";
const brassMuted = "#8a7525";
const pearl = "#e8e0d4";
const warmGray = "#a89f94";

/**
 * Generate a luxury placeholder image with gradient background,
 * subtle geometric overlay, and centered label text.
 */
async function generateImage(filename, label, opts = {}) {
  const {
    w = 1200,
    h = 800,
    bgFrom = midnight,
    bgTo = espresso,
    angle = 135,
    accent = brass,
  } = opts;

  const filePath = join(OUT, filename);

  // Create SVG with luxury aesthetic
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="${Math.cos(angle * Math.PI/180) * 100}%" y2="${Math.sin(angle * Math.PI/180) * 100}%">
        <stop offset="0%" stop-color="${bgFrom}"/>
        <stop offset="50%" stop-color="${charcoal}"/>
        <stop offset="100%" stop-color="${bgTo}"/>
      </linearGradient>
      <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="50%" stop-color="${accent}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
      <pattern id="geo" width="120" height="120" patternUnits="userSpaceOnUse">
        <line x1="0" y1="120" x2="120" y2="0" stroke="${accent}" stroke-opacity="0.04" stroke-width="0.5"/>
        <line x1="60" y1="120" x2="120" y2="60" stroke="${accent}" stroke-opacity="0.03" stroke-width="0.5"/>
        <line x1="0" y1="60" x2="60" y2="0" stroke="${accent}" stroke-opacity="0.03" stroke-width="0.5"/>
      </pattern>
    </defs>

    <!-- Background gradient -->
    <rect width="${w}" height="${h}" fill="url(#bg)"/>

    <!-- Geometric overlay -->
    <rect width="${w}" height="${h}" fill="url(#geo)"/>

    <!-- Horizontal accent lines -->
    <rect x="0" y="${h * 0.35}" width="${w}" height="1" fill="url(#line)"/>
    <rect x="0" y="${h * 0.65}" width="${w}" height="1" fill="url(#line)"/>

    <!-- Center accent -->
    <rect x="${w/2 - 30}" y="${h/2 - 60}" width="60" height="1" fill="${accent}" opacity="0.4"/>

    <!-- Label text -->
    <text x="${w/2}" y="${h/2}" text-anchor="middle" dominant-baseline="middle"
          font-family="Georgia, 'Times New Roman', serif" font-size="${Math.min(w,h) * 0.045}"
          fill="${pearl}" opacity="0.7" letter-spacing="0.1em">
      ${safeLabel}
    </text>

    <!-- Sub label -->
    <text x="${w/2}" y="${h/2 + Math.min(w,h) * 0.07}" text-anchor="middle"
          font-family="system-ui, sans-serif" font-size="${Math.min(w,h) * 0.015}"
          fill="${warmGray}" opacity="0.5" letter-spacing="0.35em" text-transform="uppercase">
      THE ORIENT GATES
    </text>

    <!-- Bottom accent line -->
    <rect x="${w/2 - 30}" y="${h/2 + Math.min(w,h) * 0.11}" width="60" height="1" fill="${accent}" opacity="0.3"/>

    <!-- Corner accents -->
    <line x1="${w*0.05}" y1="${h*0.05}" x2="${w*0.05+40}" y2="${h*0.05}" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>
    <line x1="${w*0.05}" y1="${h*0.05}" x2="${w*0.05}" y2="${h*0.05+40}" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>
    <line x1="${w*0.95}" y1="${h*0.95}" x2="${w*0.95-40}" y2="${h*0.95}" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>
    <line x1="${w*0.95}" y1="${h*0.95}" x2="${w*0.95}" y2="${h*0.95-40}" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(filePath);

  console.log(`  ✓ ${filename}`);
}

async function main() {
  console.log("Generating luxury placeholder images...\n");

  // ── Category Headers ──
  console.log("Category images:");
  await generateImage("cat-mop.jpg", "Mother of Pearl", { bgTo: "#2a1f10", w: 1200, h: 900 });
  await generateImage("cat-islamic.jpg", "Islamic Antiques", { bgTo: "#0f1a1a" });
  await generateImage("cat-european.jpg", "European Antiques", { bgTo: "#121520" });
  await generateImage("cat-asian.jpg", "Asian Antiques", { bgTo: "#1a0f0f" });
  await generateImage("cat-carpets.jpg", "Carpets & Textiles", { bgTo: "#1a1210" });
  await generateImage("cat-antiques.jpg", "Antiques", { bgTo: "#181412" });

  // MOP Subcategory images
  console.log("\nMOP Subcategory images:");
  await generateImage("cat-mop-mirrors.jpg", "Mirrors & Wall Decor", { w: 1200, h: 900, bgTo: "#1f1a10" });
  await generateImage("cat-mop-tables.jpg", "Tables", { w: 1200, h: 900, bgTo: "#1f1810" });
  await generateImage("cat-mop-seating.jpg", "Seating", { w: 1200, h: 900, bgTo: "#1a1510" });
  await generateImage("cat-mop-consoles.jpg", "Consoles & Cabinets", { w: 1200, h: 900, bgTo: "#201a12" });
  await generateImage("cat-mop-chests.jpg", "Chest of Drawers", { w: 1200, h: 900, bgTo: "#1c1610" });
  await generateImage("cat-mop-accessories.jpg", "Accessories", { w: 1200, h: 900, bgTo: "#1a1410" });
  await generateImage("cat-mop-games.jpg", "Game Tables", { w: 1200, h: 900, bgTo: "#1e1812" });

  // ── Page Heroes ──
  console.log("\nPage hero images:");
  await generateImage("mother-of-pearl-hero.jpg", "Mother of Pearl Collection", { w: 1920, h: 1080 });
  await generateImage("craftsmanship-hero.jpg", "The Art of Craftsmanship", { w: 1920, h: 1080, bgTo: "#1a1510" });
  await generateImage("heritage-hero.jpg", "Our Heritage", { w: 1920, h: 1080, bgTo: "#1c1510" });
  await generateImage("designers-hero.jpg", "For Designers & Collectors", { w: 1920, h: 1080, bgTo: "#141418" });
  await generateImage("designers-interior.jpg", "Luxury Interior", { w: 1200, h: 900, bgTo: "#181520" });
  await generateImage("contact-hero.jpg", "Private Consultation", { w: 1920, h: 1080, bgTo: "#161210" });
  await generateImage("contact-showroom.jpg", "Our Showroom", { w: 600, h: 450 });

  // ── Heritage & Story ──
  console.log("\nHeritage images:");
  await generateImage("heritage-workshop.jpg", "Heritage Workshop", { w: 800, h: 1067, bgTo: "#1c1510" });
  await generateImage("heritage-family.jpg", "Family Legacy", { w: 1200, h: 800, bgTo: "#1a1510" });

  // ── MOP Detail & Process ──
  console.log("\nMOP detail images:");
  await generateImage("mop-detail-1.jpg", "Inlay Detail", { w: 1200, h: 800, bgTo: "#1f1a10" });
  await generateImage("mop-process-1.jpg", "Shell Selection", { w: 800, h: 600, bgTo: "#1a1510" });
  await generateImage("mop-process-2.jpg", "Carving Process", { w: 800, h: 600, bgTo: "#1c1610" });
  await generateImage("mop-process-3.jpg", "Final Assembly", { w: 800, h: 600, bgTo: "#1e1810" });

  // ── Craftsmanship Steps ──
  console.log("\nCraft step images:");
  await generateImage("craft-shell.jpg", "Shell Selection", { w: 400, h: 533, bgTo: "#1a1510" });
  await generateImage("craft-carving.jpg", "Hand Carving", { w: 400, h: 533, bgTo: "#1c1610" });
  await generateImage("craft-inlay.jpg", "Inlay Setting", { w: 400, h: 533, bgTo: "#1e1810" });
  await generateImage("craft-polish.jpg", "Polishing", { w: 400, h: 533, bgTo: "#201a12" });
  await generateImage("craft-design.jpg", "Design & Drawing", { w: 400, h: 533, bgTo: "#1a1510" });
  await generateImage("craft-wood.jpg", "Wood Preparation", { w: 400, h: 533, bgTo: "#1c1610" });
  await generateImage("craft-cutting.jpg", "Shell Cutting", { w: 400, h: 533, bgTo: "#1e1810" });
  await generateImage("craft-channels.jpg", "Channel Work", { w: 400, h: 533, bgTo: "#201a12" });
  await generateImage("craft-setting.jpg", "Inlay Setting", { w: 400, h: 533, bgTo: "#1a1510" });
  await generateImage("craft-finishing.jpg", "Finishing", { w: 400, h: 533, bgTo: "#1c1610" });

  // ── Team Portraits ──
  console.log("\nTeam portrait images:");
  await generateImage("team-1.jpg", "Principal & Director", { w: 600, h: 800, bgTo: "#181510" });
  await generateImage("team-2.jpg", "Head of Antiques", { w: 600, h: 800, bgTo: "#161410" });
  await generateImage("team-3.jpg", "European Collection", { w: 600, h: 800, bgTo: "#141612" });
  await generateImage("team-4.jpg", "Master Craftsman", { w: 600, h: 800, bgTo: "#181410" });

  // ── Product Images ──
  console.log("\nProduct images:");
  const products = [
    ["mop-cabinet", "Grand Damascus Cabinet", 4],
    ["mop-mirror", "Syrian Overmantel Mirror", 2],
    ["mop-chest", "Levantine Chest", 2],
    ["mop-desk", "Damascus Writing Desk", 2],
    ["mop-backgammon", "Backgammon Table", 2],
    ["mop-chair", "Damascene Side Chair", 2],
    ["mop-box", "Jewellery Box", 1],
    ["ottoman-panel", "Ottoman Calligraphy Panel", 2],
    ["iznik-panel", "Iznik Tile Panel", 2],
    ["mamluk-tray", "Mamluk Brass Tray", 2],
    ["empire-console", "Empire Console Table", 2],
    ["baroque-mirror", "Baroque Mirror", 2],
    ["chandelier", "Venetian Chandelier", 2],
    ["cloisonne-vases", "Cloisonné Vases", 2],
    ["persian-carpet", "Persian Silk Carpet", 2],
    ["prayer-rug", "Anatolian Prayer Rug", 2],
  ];

  for (const [slug, label, count] of products) {
    for (let i = 1; i <= count; i++) {
      await generateImage(`products/${slug}-${i}.jpg`, label, {
        w: 1000,
        h: 750,
        bgTo: "#1a1510",
      });
    }
  }

  console.log("\n✓ All images generated successfully!");
}

main().catch(console.error);
