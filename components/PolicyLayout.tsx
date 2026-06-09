import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

interface Props {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

// Shared shell for policy / legal pages: privacy, terms, legal.
// Narrow column, generous leading, hierarchy that scans well.
export default function PolicyLayout({ eyebrow, title, lastUpdated, children }: Props) {
  return (
    <>
      <section className="pt-36 pb-12 bg-midnight">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-brass/40" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-brass/60 font-sans">{eyebrow}</span>
            </div>
            <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-serif text-ivory leading-[1.05] mb-4">
              {title}
            </h1>
            <p className="text-[12px] text-warm-gray/60 font-sans">
              Last updated: {lastUpdated}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="pb-section bg-midnight">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <AnimateIn>
            <article className="prose-policy space-y-8 text-[14px] text-warm-gray/85 leading-[1.85] font-sans">
              {children}
            </article>
          </AnimateIn>

          <div className="mt-16 pt-10 border-t border-white/[0.06] flex flex-wrap gap-6 text-[10px] tracking-[0.3em] uppercase font-sans text-warm-gray/60">
            <Link href="/privacy" className="hover:text-brass transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brass transition-colors">Terms</Link>
            <Link href="/legal" className="hover:text-brass transition-colors">Legal Notice</Link>
            <Link href="/shipping-returns" className="hover:text-brass transition-colors">Shipping &amp; Returns</Link>
            <Link href="/faq" className="hover:text-brass transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-brass transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Heading helper for policy pages — use inside <PolicyLayout>.
export function PolicyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] tracking-[0.15em] uppercase text-ivory font-sans font-medium mt-12 mb-4 pb-3 border-b border-white/[0.06]">
      {children}
    </h2>
  );
}
