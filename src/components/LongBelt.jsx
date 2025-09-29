"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  "figma.svg",
  "nextjs.svg",
  "vitejs.svg",
  "mongodb.svg",
  "eclipse.svg",
  "intel.svg",
  "java.svg",
  "react.svg",
  "vue.svg",
  "err.svg",
];

export default function LongBelt() {
  const beltRef = useRef(null);

  useEffect(() => {
    const belt = beltRef.current;
    if (!belt) return;

    // Take a snapshot of original children
    const originalChildren = Array.from(belt.children);

    // Duplicate children using DocumentFragment for seamless scrolling
    const fragment = document.createDocumentFragment();
    originalChildren.forEach((child) => fragment.appendChild(child.cloneNode(true)));
    belt.appendChild(fragment);

    // Total width to scroll (half, because duplicated)
    const totalWidth = belt.scrollWidth / 2;

    // GSAP infinite horizontal scroll
    gsap.fromTo(
      belt,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 25, // adjust scroll speed here
        ease: "linear",
        repeat: -1,
      }
    );
  }, []);

  return (
    <div className="absolute bottom-0 md:bottom-6 left-0 w-full overflow-hidden">
      <div
        ref={beltRef}
        className="flex gap-6 md:gap-12 whitespace-nowrap will-change-transform"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        }}
      >
        {logos.map((logo, i) => (
          <img
            key={i}
            src={`/assets/${logo}`}
            alt={logo}
            className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
}
