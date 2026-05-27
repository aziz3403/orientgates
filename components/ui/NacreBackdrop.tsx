// Subtle dark mother-of-pearl girih texture for otherwise-empty sections.
// Place inside a `relative overflow-hidden` section, before the content
// (which should sit in its own `relative` wrapper so it stays above this).
// Degrades to nothing if the image asset is missing.

interface NacreBackdropProps {
  /** 0–100. Texture strength. Default 40. */
  opacity?: number;
}

export default function NacreBackdrop({ opacity = 40 }: NacreBackdropProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none"
        style={{
          backgroundImage: "url('/images/craft-bg-nacre.jpg')",
          opacity: opacity / 100,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/55 to-midnight/75 pointer-events-none" />
    </>
  );
}
