"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsap from "@/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const headRef = useRef();

  useGsap(() => {
    gsap.fromTo(
      headRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-end bg-center bg-cover bg-no-repeat bg-gray-900 pb-28"
      style={{ backgroundImage: `url('/assets/ssk.svg')` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero content */}
      <div
        ref={headRef}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          I’m a developer passionate about building modern web experiences
          with Next.js, Tailwind, and GSAP.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
