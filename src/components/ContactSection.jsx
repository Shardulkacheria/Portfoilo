"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Instagram } from 'lucide-react';
import { gsap } from 'gsap';

export default function ContactSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const particlesRef = useRef([]);
  const [isPaused, setIsPaused] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const contacts = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/shardul-kacheria-55a4b2263/',
      color: '#0077B5',
      copyable: false
    },
    {
      icon: Github,
      label: 'GitHub',
      link: 'https://github.com/Shardulkacheria',
      color: '#333',
      copyable: false
    },
    {
      icon: Instagram,
      label: 'Instagram',
      link: 'https://www.instagram.com/shardulkacheria/?next=%2F',
      color: '#E4405F',
      copyable: false
    },
    {
      icon: Mail,
      label: 'Email',
      link: 'mailto:shardulkacheria@gmail.com',
      color: '#EA4335',
      copyable: true,
      copyText: 'shardulkacheria@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      link: 'tel:+918855069090',
      color: '#25D366',
      copyable: true,
      copyText: '8855069090'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;
    let radius = Math.max(cw, ch);

    // Create particles
    const particles = Array(99);
    const icons = ['●', '◆', '■', '▲', '★', '♦', '◉', '◈'];
    
    for (let i = 0; i < particles.length; i++) {
      particles[i] = {
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
        icon: icons[i % icons.length],
        color: `hsl(${(i / particles.length) * 360}, 70%, 60%)`
      };
    }
    particlesRef.current = particles;

    const draw = () => {
      particles.sort((a, b) => a.scale - b.scale);
      ctx.clearRect(0, 0, cw, ch);
      
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(cw / 2 + p.x, ch / 2 + p.y);
        ctx.rotate(p.rotate);
        ctx.font = `${40 * p.scale}px Arial`;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.icon, 0, 0);
        ctx.restore();
      });
    };

    const tl = gsap.timeline({ onUpdate: draw, repeat: -1 })
      .fromTo(particles, {
        x: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.cos(angle * 10) * radius;
        },
        y: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.sin(angle * 10) * radius;
        },
        scale: 1.1,
        rotate: 0
      }, {
        duration: 5,
        ease: 'sine',
        x: 0,
        y: 0,
        scale: 0,
        rotate: -3,
        stagger: { each: -0.05 }
      }, 0)
      .seek(99);

    timelineRef.current = tl;

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      radius = Math.max(cw, ch);
      tl.invalidate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, []);

  const toggleAnimation = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        timeScale: timelineRef.current.isActive() ? 0 : 1
      });
      setIsPaused(!isPaused);
    }
  };

  const handleContactClick = (e, contact) => {
    if (contact.copyable) {
      e.preventDefault();
      navigator.clipboard.writeText(contact.copyText).then(() => {
        setCopiedText(contact.copyText);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] md:h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={toggleAnimation}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-8xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
          Get In Touch
        </h1>
        <p className="text-base md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-md md:max-w-2xl drop-shadow-lg">
          Let's connect and build something extraordinary together
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleContactClick(e, contact)}
                className="group relative"
              >
                <div 
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border-2 border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/40 shadow-2xl"
                  style={{ 
                    boxShadow: `0 0 30px ${contact.color}40`
                  }}
                >
                  <Icon className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="absolute -bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 text-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {contact.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Copied notification */}
        <div className={`fixed top-6 md:top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-2xl transition-all duration-300 ${showCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <span className="font-semibold">✓ Copied to clipboard:</span> {copiedText}
        </div>

        
      </div>
    </div>
  );
}