import Image from "next/image";
import { products, categories } from "./data/products";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#0d0a07] text-[#e8dcc8]">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-[#0d0a07]/80 border-b border-[#c9a84c]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-[#c9a84c]" />
            <div>
              <span className="block text-[#c9a84c] tracking-[0.25em] uppercase text-xs font-light">
                The
              </span>
              <span className="block text-[#e8dcc8] tracking-[0.15em] uppercase text-sm font-light">
                Orient Gates
              </span>
            </div>
            <div className="w-px h-8 bg-[#c9a84c]" />
          </div>

          <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.15em] uppercase text-[#e8dcc8]/70">
            <a href="#collection" className="hover:text-[#c9a84c] transition-colors">Collection</a>
            <a href="#categories" className="hover:text-[#c9a84c] transition-colors">Categories</a>
            <a href="#heritage" className="hover:text-[#c9a84c] transition-colors">Heritage</a>
            <a href="#contact" className="hover:text-[#c9a84c] transition-colors">Contact</a>
          </div>

          <button className="btn-luxury text-[10px]">Request Consultation</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <Image
          src="/images/hero-1.jpg"
          alt="The Damascus Room — 1707 CE"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a07]/95 via-[#0d0a07]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a07] via-transparent to-[#0d0a07]/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-3xl">
          <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-6">
            Damascus · Cairo · Istanbul
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight leading-[1.1] text-[#f5ede0] mb-6">
            Where Ancient
            <br />
            <span className="text-shimmer font-light">Mastery</span>
            <br />
            Endures
          </h1>
          <p className="text-[#e8dcc8]/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
            Singular works of Islamic art and Syrian mother-of-pearl furniture,
            curated from private collections and historic estates. Each piece
            carries eight centuries of craft.
          </p>
          <div className="flex items-center gap-6">
            <a href="#collection" className="btn-luxury">View Collection</a>
            <a href="#heritage" className="text-[#c9a84c] text-xs tracking-[0.15em] uppercase hover:text-[#e8c96a] transition-colors">
              Our Heritage →
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 py-4 flex items-center gap-8 text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8]/30 border-t border-[#c9a84c]/10">
          <span>Est. 2001</span>
          <div className="w-px h-4 bg-[#c9a84c]/30" />
          <span>Private Collection Services</span>
          <div className="w-px h-4 bg-[#c9a84c]/30" />
          <span>Worldwide Shipping</span>
          <div className="w-px h-4 bg-[#c9a84c]/30" />
          <span>All Works Authenticated</span>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="py-12 border-y border-[#c9a84c]/20 bg-[#0d0a07]">
        <p className="text-center text-[#c9a84c]/50 text-xs tracking-[0.4em] uppercase">
          ✦ &nbsp; Antiques of Museum Calibre &nbsp; ✦ &nbsp; Syrian Mother-of-Pearl &nbsp;
          ✦ &nbsp; Islamic Metalwork &nbsp; ✦ &nbsp; Mamluk & Ottoman Period &nbsp; ✦
        </p>
      </div>

      {/* ── Featured Collection ── */}
      <section id="collection" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-4">Current Offering</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-[#f5ede0] mb-4">Featured Works</h2>
          <div className="ornament max-w-xs mx-auto">
            <span className="text-[#c9a84c] text-lg">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <article key={product.id} className="product-card group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1410]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 image-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-1">{product.origin}</p>
                  <p className="text-[#e8dcc8]/60 text-[10px] tracking-[0.2em] uppercase">{product.period}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] border border-[#c9a84c]/40 px-2 py-1">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="pt-5 pb-2 border-b border-[#c9a84c]/20">
                <h3 className="text-[#f5ede0] font-light text-lg leading-snug mb-2">{product.name}</h3>
                <p className="text-[#e8dcc8]/50 text-sm leading-relaxed line-clamp-2">{product.description}</p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[#c9a84c] text-lg font-light tracking-wide">{product.priceDisplay}</span>
                <button className="text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8]/50 hover:text-[#c9a84c] transition-colors">
                  Inquire →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-luxury">View Full Collection</button>
        </div>
      </section>

      {/* ── Second Hero ── */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/hero-2.jpg"
          alt="Detail of the Damascus Room"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a07] via-[#0d0a07]/40 to-[#0d0a07]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-[#c9a84c] tracking-[0.5em] uppercase text-xs mb-4">
              Damascus, Syria — 1707 CE
            </p>
            <blockquote className="text-3xl md:text-4xl font-extralight text-[#f5ede0] max-w-2xl leading-relaxed">
              &ldquo;The room breathes with the patience of centuries.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-4">Browse by Category</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-[#f5ede0]">The Collection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="product-card group relative aspect-[4/5] overflow-hidden cursor-pointer">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a07]/90 via-[#0d0a07]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[#e8dcc8]/50 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {cat.count} Works Available
                </p>
                <h3 className="text-[#f5ede0] text-2xl font-light mb-1">{cat.name}</h3>
                <p className="text-[#e8dcc8]/60 text-sm mb-4">{cat.description}</p>
                <span className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase group-hover:translate-x-1 transition-transform inline-block">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Craftsmanship ── */}
      <section className="py-24 px-6 md:px-12 bg-[#110d09]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/workshop-1.jpg"
              alt="Damascus bone inlay detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border border-[#c9a84c]/20" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#c9a84c]/30" />
          </div>
          <div>
            <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-6">The Craft</p>
            <h2 className="text-4xl font-extralight text-[#f5ede0] leading-tight mb-6">
              Eight Centuries
              <br />
              of Inlay Work
            </h2>
            <div className="w-16 h-px bg-[#c9a84c] mb-6" />
            <p className="text-[#e8dcc8]/60 leading-relaxed mb-6">
              The art of Syrian mother-of-pearl inlay — known as &ldquo;sadaf&rdquo; — reached its apex
              in 17th-century Damascus. Master craftsmen would spend years on a single cabinet,
              cutting thousands of nacre pieces no larger than a fingernail into geometric stars,
              arabesques, and floral medallions.
            </p>
            <p className="text-[#e8dcc8]/60 leading-relaxed mb-10">
              Each piece we offer has been authenticated by independent specialists in Islamic art
              and undergoes provenance research traceable to its origin. We partner with leading
              auction houses and private European collections.
            </p>
            <button className="btn-luxury">Our Authentication Process</button>
          </div>
        </div>
      </section>

      {/* ── Heritage ── */}
      <section id="heritage" className="relative py-32 overflow-hidden">
        <Image
          src="/images/heritage-bg.jpg"
          alt="Mamluk carpet — Cairo, ca. 1500"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0d0a07]/85" />
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-6">Est. 2001</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-[#f5ede0] leading-tight mb-8">
            The Orient Gates
          </h2>
          <div className="ornament max-w-xs mx-auto mb-8">
            <span className="text-[#c9a84c] text-lg">✦</span>
          </div>
          <p className="text-[#e8dcc8]/70 text-lg font-light leading-relaxed mb-6">
            Founded by a family with roots in old Damascus, The Orient Gates exists to preserve
            and place masterworks of Islamic civilisation into the hands of those who will honour
            them. We do not deal in reproductions, restorations, or uncertain attributions.
          </p>
          <p className="text-[#e8dcc8]/50 leading-relaxed mb-12">
            Our inventory is drawn from three decades of relationships with Syrian émigré families,
            Levantine estate sales, and discreet acquisitions from British and French colonial-era
            collections. Every piece arrives with full documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-luxury">Read Our Story</button>
            <button className="btn-luxury">Request a Catalogue</button>
          </div>
        </div>
      </section>

      {/* ── All Works Grid ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-4">Full Inventory</p>
          <h2 className="text-4xl font-extralight text-[#f5ede0]">All Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="product-card group cursor-pointer border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-colors"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-[#1a1410]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 image-overlay opacity-60" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-[#f5ede0] font-light leading-snug">{product.name}</h3>
                  </div>
                </div>
                <p className="text-[#e8dcc8]/40 text-xs mb-4">
                  {product.origin} · {product.period}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#c9a84c]/15">
                  <span className="text-[#c9a84c] font-light">{product.priceDisplay}</span>
                  <button className="text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8]/40 hover:text-[#c9a84c] transition-colors">
                    Inquire →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Trust Stats ── */}
      <section className="py-16 border-y border-[#c9a84c]/20 bg-[#110d09]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Works Sold", value: "340+" },
            { label: "Years of Operation", value: "23" },
            { label: "Countries Served", value: "38" },
            { label: "Avg. Work Value", value: "$47K" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-extralight text-[#c9a84c] mb-2">{stat.value}</p>
              <p className="text-[#e8dcc8]/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs mb-4">Private Consultations</p>
        <h2 className="text-4xl md:text-5xl font-extralight text-[#f5ede0] mb-6">Begin Your Acquisition</h2>
        <div className="ornament max-w-xs mx-auto mb-8">
          <span className="text-[#c9a84c] text-lg">✦</span>
        </div>
        <p className="text-[#e8dcc8]/60 leading-relaxed mb-12">
          Each acquisition at The Orient Gates begins with a private consultation. We discuss your
          collection, your sensibility, and the works that might speak to you. There is no pressure —
          only the patient conversation of connoisseurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent border border-[#c9a84c]/30 px-5 py-3 text-[#e8dcc8] placeholder-[#e8dcc8]/30 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
          />
          <button className="btn-luxury whitespace-nowrap">Begin Conversation</button>
        </div>
        <p className="text-[#e8dcc8]/25 text-xs tracking-[0.2em] uppercase">
          All inquiries are handled with absolute discretion
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#c9a84c]/20 py-12 px-6 md:px-12 bg-[#0a0804]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#c9a84c] tracking-[0.25em] uppercase text-sm mb-1">The Orient Gates</p>
            <p className="text-[#e8dcc8]/30 text-xs tracking-[0.1em]">
              Syrian & Islamic Antiques · Est. 2001
            </p>
          </div>
          <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8]/30">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Shipping</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Authentication</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Contact</a>
          </div>
          <p className="text-[#e8dcc8]/20 text-[10px] tracking-[0.1em]">
            © 2024 The Orient Gates. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
