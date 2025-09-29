"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Pension Planner Pro",
      short:
        "Pension benefit optimizer built for MUFG hackathon — compare pension schemes across countries and run 'what-if' scenarios.",
      features:
        "AI chatbot · 'What-if' scenario simulator · Pension comparison · Pension calculator",
      tech:
        "Next.js · Firebase Auth · MongoDB · Gemini API · JWT Auth · Redis · Vercel AI SDK",
      github: "https://github.com/Shardulkacheria/PensionBenefit11",
      live: "https://pension12.vercel.app/",
      thumbnail: "/assets/pension.png",
    },
    {
      id: 2,
      title: "Rezzai",
      short:
        "Job automation system: upload resume, parse skills, find and apply to jobs automatically with AI resume generation.",
      features:
        "Resume parser · Job searching · AI CV generation · Auto-apply",
      tech:
        "Next.js · Firebase Auth · Redis · MongoDB · Gemini API · AWS · Docker · Kubernetes · Selenium · Puppeteer · JWT",
      github: "https://github.com/Shardulkacheria/Rezzai",
      live: null,
      thumbnail: "/assets/rezzai.png",
    },
    {
      id: 3,
      title: "Resumify",
      short:
        "Interview prep web app for job applicants — targeted question generation using resume + company data.",
      features: "Resume-based interview Qs · Company-context Qs · Gen-AI driven",
      tech: "React · Express · Node.js · MongoDB",
      github: "https://github.com/Shardulkacheria/Flex2024",
      live: null,
      thumbnail: "/assets/rezzai.png",
    },
  ];

  // Background parallax + hover card animations
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const moveAmount = 30;
    let raf = null;

    function onMove(e) {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const relX = (e.clientX - cx) / (rect.width / 2);
      const relY = (e.clientY - cy) / (rect.height / 2);

      const tx = Math.max(-1, Math.min(1, relX)) * moveAmount;
      const ty = Math.max(-1, Math.min(1, relY)) * moveAmount * 0.6;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(bg, {
          x: tx,
          y: ty,
          rotation: tx * 0.02,
          scale: 1.03,
          ease: "power3.out",
          duration: 0.6,
        });
      });
    }

    function onLeave() {
      if (raf) cancelAnimationFrame(raf);
      gsap.to(bg, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    // Cards hover animations
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const el = card;
      const img = el.querySelector(".card-thumb");
      const details = el.querySelector(".card-details");

      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.05,
          y: -8,
          boxShadow: "0px 30px 60px rgba(0,0,0,0.45)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power3.out" });
        gsap.to(details, {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          y: 0,
          boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
        gsap.to(details, {
          autoAlpha: 0,
          y: 10,
          duration: 0.25,
          ease: "power3.out",
        });
      });
    });

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // GSAP text flip with ScrollTrigger
  useEffect(() => {
    const animateText = (el) => {
      if (!el) return;
      const text = el.textContent;
      el.textContent = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
        span.style.display = "inline-block";
        el.appendChild(span);
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // when top of section hits middle of viewport
          end: "bottom center", // when bottom leaves middle
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        el.children,
        { rotationX: -90, opacity: 0, y: 20 },
        {
          rotationX: 0,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.05,
        }
      );

      // Hover effect (still works when in view)
      el.addEventListener("mouseenter", () => {
        gsap.to(el.children, {
          color: "#60a5fa",
          duration: 0.3,
          stagger: 0.03,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el.children, {
          color: "#ffffff",
          duration: 0.3,
          stagger: 0.03,
        });
      });
    };

    animateText(headingRef.current);
    animateText(subheadingRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url('/assets/animeprogram.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "saturate(1.05) contrast(1.02)",
        }}
      />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Projects */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center"
        >
          My Projects
        </h2>
        <p
          ref={subheadingRef}
          className="text-center text-gray-200 max-w-3xl mx-auto mb-12"
        >
          Selected work showing the tools and features I built. Hover any card
          to view details and links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative rounded-2xl overflow-hidden p-0"
            >
              <div
                className="relative bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Image */}
                <div className="h-44 md:h-48 w-full overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={`${p.title} thumbnail`}
                    className="card-thumb w-full h-full object-cover transform transition-transform duration-500"
                  />
                </div>

                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {p.short}
                  </p>

                  <div
                    className="card-details mt-4 text-sm text-gray-200"
                    style={{ opacity: 0, transform: "translateY(10px)" }}
                  >
                    <p className="mb-2">
                      <strong>Features:</strong> {p.features}
                    </p>
                    <p className="mb-3">
                      <strong>Tech:</strong> {p.tech}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-white/8 hover:bg-white/12 border border-white/10"
                      >
                        GitHub
                      </a>
                      <a
                        href={p.live || "#"}
                        target={p.live ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                          p.live
                            ? "bg-white/8 hover:bg-white/12"
                            : "bg-white/6 cursor-not-allowed opacity-50"
                        }`}
                      >
                        {p.live ? "View Live" : "Live (TBD)"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
