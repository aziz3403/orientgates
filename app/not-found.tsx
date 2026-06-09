import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-midnight">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-32 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-brass/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">404</span>
          <div className="w-12 h-px bg-brass/40" />
        </div>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-serif text-ivory leading-[1.1] mb-6">
          This page could not be found
        </h1>
        <p className="text-[14px] text-warm-gray/80 font-sans leading-[1.85] max-w-xl mx-auto mb-12">
          The piece you were looking for may have found a new home, or the
          address may have changed. Our collections are always open.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] tracking-[0.3em] uppercase font-sans">
          <Link href="/" className="text-brass hover:text-brass-light transition-colors">
            Home
          </Link>
          <Link href="/antiques" className="text-warm-gray/70 hover:text-ivory transition-colors">
            Antiques
          </Link>
          <Link
            href="/mother-of-pearl-furniture"
            className="text-warm-gray/70 hover:text-ivory transition-colors"
          >
            Mother of Pearl
          </Link>
          <Link href="/contact" className="text-warm-gray/70 hover:text-ivory transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
