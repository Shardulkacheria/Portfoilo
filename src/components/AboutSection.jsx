  "use client";
  import React, { useRef, useEffect } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  export default function AboutSection() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
      const slides = gsap.utils.toArray(".about-slide");

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth,
        },
      });
    }, []);

    // Bright background colors for each slide
    const bgColors = [
      "bg-red-500",
      "bg-green-400",
      "bg-blue-500",
      "bg-yellow-400",
      "bg-pink-500",
    ];

    return (
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        {/* Horizontal scroll container */}
        <div ref={containerRef} className="flex w-[500vw] h-full">
          {["I.svg", "CREATE.svg", "CODE.svg", "AND.svg", "DEPLOY.svg"].map(
            (svg, i) => (
              <div
                key={i}
                className={`about-slide flex items-center justify-center w-screen h-full ${bgColors[i]} transition-colors duration-500`}
              >
                <img
                  src={`/assets/${svg}`}
                  alt={svg.replace(".svg", "")}
                  className="max-h-[60%] object-contain drop-shadow-lg"
                />
              </div>
            )
          )}
        </div>
      </section>
    );
  }
