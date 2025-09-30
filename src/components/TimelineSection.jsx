"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const logoRef = useRef(null);
  const milestoneEls = useRef([]);
  const shownRef = useRef([]);

  const milestones = [
    {
      id: 1,
      title: "Primary Education and Secondary Education",
      school: "Amrutvahini International School",
      year: "2006 - 2019",
      icon: "🎓",
      position: 0.25,
    },
    {
      id: 2,
      title: "High School",
      school: "Dr Amrutlala Ohara Jr College",
      year: "2019 - 2021",
      icon: "📚",
      position: 0.5,
    },
    {
      id: 3,
      title: "College",
      school: "Symbiosis Institute of Technology, Pune",
      year: "2022 - Present",
      icon: "🎯",
      position: 0.75,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const logo = logoRef.current;
    if (!section || !svg || !path || !logo || !container) return;

    // Initialize shown state
    shownRef.current = milestones.map(() => false);

    const pathLength = path.getTotalLength();

    // Set initial state - path hidden, logo at start
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.set(logo, {
      opacity: 1,
    });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          checkMilestoneReveal(self.progress);
        },
      },
    });

    // Animate path drawing
    tl.to(path, {
      strokeDashoffset: 0,
      ease: "none",
    }, 0);

    // Animate logo along path
    tl.to(logo, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
      },
      ease: "none",
    }, 0);

    // Function to check and reveal milestones
    function checkMilestoneReveal(progress) {
      milestones.forEach((milestone, i) => {
        const el = milestoneEls.current[i];
        if (!el) return;

        const threshold = milestone.position;
        const showRange = 0.05;

        if (progress >= threshold - showRange && !shownRef.current[i]) {
          shownRef.current[i] = true;
          gsap.fromTo(
            el,
            { 
              opacity: 0, 
              scale: 0.8, 
              y: 30,
            },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              duration: 0.6, 
              ease: "back.out(1.7)",
            }
          );
        } else if (progress < threshold - showRange && shownRef.current[i]) {
          shownRef.current[i] = false;
          gsap.to(el, { 
            opacity: 0, 
            scale: 0.8, 
            y: 30, 
            duration: 0.3, 
            ease: "power2.in" 
          });
        }
      });
    }

    // Position milestones alongside the path
    function positionMilestones() {
      const stickyContainer = svg.closest('.sticky');
      if (!stickyContainer) return;
      
      const stickyRect = stickyContainer.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const total = pathLength;

      milestones.forEach((milestone, i) => {
        const el = milestoneEls.current[i];
        if (!el) return;

        // Get point on path
        const point = path.getPointAtLength(total * milestone.position);
        
        // Convert SVG coordinates to screen coordinates
        const scaleX = svgRect.width / 400;
        const scaleY = svgRect.height / 1200;
        
        const screenX = svgRect.left + point.x * scaleX;
        const screenY = svgRect.top + point.y * scaleY;

        // Position relative to the sticky container
        const elRect = el.getBoundingClientRect();
        
        // Alternate left and right based on path position
        const isLeft = i % 2 === 0;
        const offsetX = isLeft ? -(elRect.width + 80) : 80;
        
        let leftPos = screenX - stickyRect.left + offsetX;
        let topPos = screenY - stickyRect.top - elRect.height / 2;

        // Apply positioning
        el.style.position = "absolute";
        el.style.left = `${leftPos}px`;
        el.style.top = `${topPos}px`;
      });
    }

    // Initial positioning - call multiple times to ensure proper layout
    const initPositioning = () => {
      positionMilestones();
      ScrollTrigger.refresh();
    };
    
    setTimeout(initPositioning, 50);
    setTimeout(initPositioning, 150);
    setTimeout(initPositioning, 300);
    requestAnimationFrame(initPositioning);

    // Handle resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        positionMilestones();
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white"
      aria-label="Timeline Section"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header - Shows first, not sticky */}
      <div className="relative z-10 text-center py-32">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          My Journey
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto px-6">
          Follow the path to explore my educational milestones
        </p>
        
        {/* Arrow indicator */}
        <div className="mt-12 flex justify-center">
          <svg className="w-6 h-6 text-cyan-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Timeline Container - This is where scroll animation happens */}
      <div ref={containerRef} className="relative min-h-[300vh]">
        {/* SVG Path - Sticky and centered */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <svg
            ref={svgRef}
            viewBox="0 0 400 1200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-lg h-[90vh]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="markerGradient">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Glow layer */}
            <path
              d="
                M200 100
                C200 250, 280 300, 280 450
                C280 600, 120 650, 120 800
                C120 950, 280 1000, 280 1100
              "
              stroke="url(#pathGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              opacity="0.2"
              filter="url(#glow)"
            />

            {/* Main path */}
            <path
              ref={pathRef}
              d="
                M200 100
                C200 250, 280 300, 280 450
                C280 600, 120 650, 120 800
                C120 950, 280 1000, 280 1100
              "
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Moving logo */}
            <g ref={logoRef}>
              <circle
                cx="0"
                cy="0"
                r="32"
                fill="url(#markerGradient)"
                opacity="0.2"
                filter="url(#glow)"
              />
              <circle
                cx="0"
                cy="0"
                r="24"
                fill="url(#markerGradient)"
                filter="url(#glow)"
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="24"
                fill="white"
              >
                ⚛️
              </text>
            </g>
          </svg>

          {/* Milestone Cards - positioned absolutely relative to sticky container */}
          <div className="absolute inset-0 pointer-events-none">
            {milestones.map((m, i) => (
              <div
                key={m.id}
                ref={(el) => (milestoneEls.current[i] = el)}
                className="pointer-events-auto opacity-0 absolute"
              >
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl w-72 md:w-80 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 hover:from-cyan-500/5 hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>
                  
                  {/* Icon badge */}
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/50">
                    {m.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      {m.year}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{m.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{m.school}</p>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-tl-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="relative z-10 py-20"></div>
    </section>
  );
}