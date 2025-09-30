"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function GlassNavbar() {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const underlineRef = useRef(null);
  const navRefs = useRef({});
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);

  const navItems = ["Home", "About", "Projects", "Timeline", "Skills", "Contact"]; 

  // Animate underline on active change
  useEffect(() => {
    if (underlineRef.current && navRefs.current[active]) {
      const el = navRefs.current[active];
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();

      gsap.to(underlineRef.current, {
        x: rect.left - parentRect.left,
        width: rect.width,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [active]);

  // Animate navbar, logo, and hamburger on mount
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

    // Animate logo from left
    if (logoRef.current) {
      timeline.from(logoRef.current, { opacity: 0, x: -50 });
    }

    // Animate desktop links staggered from top
    Object.values(navRefs.current).length &&
      timeline.from(Object.values(navRefs.current), { opacity: 0, y: -20, stagger: 0.1 }, "<");

    // Animate hamburger icon (mobile)
    if (hamburgerRef.current) {
      timeline.from(hamburgerRef.current, { opacity: 0, y: -20 }, "<");
    }
  }, []);

  // Observe sections to sync active state while scrolling
  useEffect(() => {
    const idByItem = {
      Home: 'home',
      About: 'about',
      Projects: 'projects',
      Timeline: 'timeline',
      Skills: 'skills',
      Contact: 'contact',
    };

    const sections = Object.entries(idByItem)
      .map(([item, id]) => ({ item, el: typeof document !== 'undefined' ? document.getElementById(id) : null }))
      .filter(({ el }) => !!el);

    if (!sections.length) return;

    let ticking = false;
    const handleIntersect = (entries) => {
      // Choose the entry with highest intersection ratio
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const match = sections.find(s => s.el === visible.target);
          if (match && match.item !== active) {
            setActive(match.item);
          }
          ticking = false;
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      // A bit more than half of the viewport to avoid flicker on small screens
      threshold: [0.55, 0.75],
    });

    sections.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, [active]);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6 py-3 md:mx-10">
      {/* SHARDUL Logo */}
      <div ref={logoRef} className="text-white font-bold text-xl md:text-2xl cursor-default">
        SHARDUL
      </div>

      {/* Desktop Navbar */}
      <div className="relative hidden md:flex space-x-8 
                      bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
            className="text-lg text-white hover:text-red-500 transition-colors duration-300 relative"
            ref={(el) => (navRefs.current[item] = el)}
            onClick={() => setActive(item)}
          >
            {item}
          </Link>
        ))}

        {/* Underline Indicator */}
        <span
          ref={underlineRef}
          className="absolute -bottom-1 h-[2px] bg-red-500 rounded-full"
          style={{ left: 0, width: 0 }}
        />
      </div>

      {/* Mobile Hamburger */}
      <button
        ref={hamburgerRef}
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-3 right-4 w-56 bg-gray-900/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg md:hidden">
          <nav className="flex flex-col items-stretch py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
                className={`px-4 py-2 text-base transition-colors duration-300 ${
                  active === item
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }`}
                onClick={() => {
                  setActive(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
