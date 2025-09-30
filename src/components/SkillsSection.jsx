'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Palette, Cloud, Wrench, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);

  const skillSlides = [
    {
      title: "Languages",
      icon: <Code2 className="w-16 h-16" />,
      skills: ["JavaScript", "Java", "Python"],
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      bgPattern: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)"
    },
    {
      title: "Frontend",
      icon: <Layers className="w-16 h-16" />,
      skills: ["React", "Next.js", "GSAP"],
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.5) 0%, transparent 50%)"
    },
    {
      title: "Backend",
      icon: <Wrench className="w-16 h-16" />,
      skills: ["FastAPI", "Flask", "Spring Boot"],
      gradient: "from-orange-500 via-orange-600 to-red-500",
      bgPattern: "radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.5) 0%, transparent 50%)"
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="w-16 h-16" />,
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
      gradient: "from-green-500 via-emerald-600 to-teal-500",
      bgPattern: "radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.5) 0%, transparent 50%)"
    },
    {
      title: "Tools & Design",
      icon: <Palette className="w-16 h-16" />,
      skills: ["GitHub", "Figma", "Adobe Photoshop", "Vercel", "Postman"],
      gradient: "from-yellow-500 via-amber-600 to-orange-500",
      bgPattern: "radial-gradient(circle at 70% 60%, rgba(234, 179, 8, 0.5) 0%, transparent 50%)"
    },
    {
      title: "Expertise",
      icon: <Zap className="w-16 h-16" />,
      skills: ["Full Stack Development", "Cloud Architecture", "UI/UX Design"],
      gradient: "from-indigo-500 via-violet-600 to-purple-500",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)"
    }
  ];

  useEffect(() => {
    const slides = slidesRef.current;
    const delay = 0.5;

    // Initial setup
    gsap.set(slides, {
      rotationX: (i) => (i ? -90 : 0),
      transformOrigin: "center center -200px"
    });

    // Create timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        transformOrigin: "center center -200px"
      },
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${(slides.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Animate each slide
    slides.forEach((slide, i) => {
      const nextSlide = slides[i + 1];
      if (!nextSlide) return;

      tl.to(
        slide,
        {
          rotationX: 90,
          onComplete: () => gsap.set(slide, { rotationX: -90 })
        },
        `+=${delay}`
      ).to(
        nextSlide,
        {
          rotationX: 0
        },
        "<"
      );
    });

    // Keep final slide on screen
    tl.to({}, { duration: delay });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-slate-950">
      {/* Main wrapper */}
      <div ref={wrapperRef} className="w-full h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        {/* Title */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            My Skills
          </h2>
        </div>

        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="relative w-[90vw] max-w-2xl h-[60vh] max-h-[500px]"
          style={{ perspective: "1000px" }}
        >
          {/* Dashed border outline */}
          <div className="absolute -inset-8 border-2 border-dashed border-gray-700/30 rounded-3xl pointer-events-none"></div>

          {/* Slides */}
          {skillSlides.map((slide, index) => (
            <div
              key={index}
              ref={el => slidesRef.current[index] = el}
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`}></div>
              
              {/* Pattern overlay */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{ background: slide.bgPattern }}
              ></div>

              {/* Noise texture */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
                {/* Icon */}
                <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  {slide.icon}
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
                  {slide.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-3 max-w-lg">
                  {slide.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm md:text-base font-medium border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-6 right-6 text-white/60 text-sm font-medium">
                  {index + 1} / {skillSlides.length}
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;