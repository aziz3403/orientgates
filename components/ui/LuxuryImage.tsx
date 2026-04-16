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
  const isExternal = src.startsWith("http");

  return (
    <img
      src={error ? placeholder : src}
      alt={alt}
      className={`object-cover ${className}`}
      loading={priority ? "eager" : "lazy"}
      onError={() => setError(true)}
      ref={(el) => {
        // Only fallback to placeholder for local images that don't exist
        if (el && !isExternal && !el.naturalWidth && !error) {
          setError(true);
        }
      }}
    />
  );
}
