"use client";

import { useState } from "react";
import { placeholderImage } from "@/lib/utils";

interface LuxuryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  label?: string;
  priority?: boolean;
}

export default function LuxuryImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  label,
  priority = false,
}: LuxuryImageProps) {
  const [error, setError] = useState(false);
  const placeholder = placeholderImage(width, height, label || alt);

  return (
    <img
      src={error ? placeholder : src}
      alt={alt}
      className={`object-cover ${className}`}
      loading={priority ? "eager" : "lazy"}
      onError={() => setError(true)}
      // Fallback immediately since we're using placeholder images
      ref={(el) => {
        if (el && !el.naturalWidth && !error) {
          setError(true);
        }
      }}
    />
  );
}
