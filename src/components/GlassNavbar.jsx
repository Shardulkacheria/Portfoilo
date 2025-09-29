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

  const navItems = ["Home", "About", "Portfolio", "Services", "Contact"];

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

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 md:mx-10">
      {/* SHARDUL Logo */}
      <div ref={logoRef} className="text-white font-bold text-2xl cursor-default">
        SHARDUL
      </div>

      {/* Desktop Navbar */}
      <div className="relative hidden md:flex space-x-8 
                      bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
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
        <div className="absolute top-full mt-3 right-0 w-48 bg-gray-900/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg md:hidden">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`text-lg transition-colors duration-300 ${
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
