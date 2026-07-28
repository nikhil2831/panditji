"use client";

import { useState, useEffect, useRef } from "react";
import { BookingForm } from "@/components/booking-form";
import { PoojaCard } from "@/components/pooja-card";
import { poojaServices } from "@/lib/data/poojas";
import { User, BookOpen, Flower2, Mail, ShieldCheck, Home as HomeIcon, Heart, Flame, Phone, Sparkles, CheckCircle2 } from "lucide-react";

// Slider Content Configuration
const slides = [
  {
    title: "भगवद गीता से जीवन के कुछ महत्वपूर्ण पाठ",
    desc: "संगीतमय कथावाचन के माध्यम से भगवद गीता के शाश्वत ज्ञान का अनुभव करें।",
    img: "/Peacock feather.jpeg",
    label: "वैदिक ज्ञान और गीता के उपदेश",
  },
  {
    title: "हम राम में आस्था रखने वाले एक हिंदू ट्रस्ट हैं",
    desc: "श्री राम के पारंपरिक मूल्यों का संरक्षण और धर्मनिष्ठ समाज निर्माण के लिए प्रतिबद्ध।",
    img: "/home.jpeg",
    label: "Sanatan Culture & Ramrajya",
  },
  {
    title: "वैदिक यज्ञ और भक्तिमय कथाएँ",
    desc: "आचार्य जी के मार्गदर्शन में यज्ञ और कथाओं द्वारा शांति व कल्याण का आह्वान।",
    img: "/download.jpeg",
    label: "पवित्र हवन और पुराण",
  },
];

// Custom hook for scroll-based reveal
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Reusable section reveal wrapper
function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const { ref, isVisible } = useScrollReveal();

  let transformInit = "translateY(30px)";
  if (direction === "down") transformInit = "translateY(-30px)";
  else if (direction === "left") transformInit = "translateX(-40px)";
  else if (direction === "right") transformInit = "translateX(40px)";
  else if (direction === "none") transformInit = "none";

  const transformFinal = direction === "left" || direction === "right" ? "translateX(0)" : (direction === "none" ? "none" : "translateY(0)");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? transformFinal : transformInit,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Monitor scroll state for sticky blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col font-sans bg-template-light text-template-dark">

      {/* ══════════════════════════════════════════════════════════
          1. ANNOUNCEMENT BAR — Scrolling marquee style
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-template-maroon via-template-burgundy to-template-maroon text-white py-2 px-4 font-bold text-[11px] tracking-widest overflow-hidden z-[1100] relative border-b border-gold/15 shadow-sm font-devanagari">
        <div className="flex items-center justify-center gap-x-8">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-gold text-sm" style={{ animation: "gentlePulse 2s ease-in-out infinite" }}>🚩</span> 
            हर-हर गंगे
          </span>
          <span className="text-gold/30">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-gold text-sm">✨</span> 
            !! श्रीमते रामानुजाय नमः !!
          </span>
          <span className="hidden md:inline text-gold/30">•</span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="text-gold text-sm">🙏</span> 
            !! जय श्री राम !!
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. HEADER — Sticky Glassmorphism with Centered Logo
      ══════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-[1000] transition-all duration-500 border-b flex items-center ${
          isScrolled
            ? "h-16 sm:h-20 bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(62,31,36,0.08)] border-template-sand/50"
            : "h-20 sm:h-24 bg-white shadow-none border-template-sand"
        }`}
      >
        <div className="container h-full flex items-center justify-between gap-4">
          {/* Logo on the left */}
          <a className="flex items-center gap-2.5 sm:gap-3 group shrink-0" href="#">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-template-maroon to-template-red flex items-center justify-center shadow-[0_2px_8px_rgba(109,40,49,0.2)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-base sm:text-lg leading-none font-devanagari animate-pulse-glow">
                ॐ
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[13px] sm:text-[15px] text-template-maroon font-serif italic tracking-wide group-hover:text-template-red transition-colors duration-300 leading-none">
                Vishwa Trust
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold tracking-[1.5px] text-gold/80 uppercase mt-1 leading-none">
                RANCHI, JHARKHAND
              </span>
            </div>
          </a>

          {/* Centered navigation links (Desktop only) */}
          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 font-extrabold text-[11px] uppercase tracking-[0.15em] text-fg-muted">
            {[
              { label: "Home", href: "#home" },
              { label: "Trust", href: "#about-trust" },
              { label: "Services", href: "#services" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                className="relative py-1 hover:text-template-red transition-all duration-300 group"
                href={item.href}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-template-red to-saffron rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA & Toggle on the right */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-template-maroon to-template-red hover:from-template-red hover:to-saffron text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_2px_10px_rgba(200,58,42,0.15)] hover:shadow-[0_4px_15px_rgba(200,58,42,0.3)] hover:scale-105 active:scale-95 animate-gentlePulse"
              href="#contact"
            >
              Book Consultation →
            </a>

            {/* Mobile hamburger button */}
            <div className="flex lg:hidden items-center justify-end">
              <button
                suppressHydrationWarning
                className="flex flex-col gap-1.5 w-8 h-8 cursor-pointer justify-center items-center hover:opacity-85 relative z-[1200] rounded-lg hover:bg-template-sand/50 transition-colors duration-200 p-1"
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className={`w-5 h-0.5 bg-template-maroon rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`}></span>
                <span className={`w-4 h-0.5 bg-template-maroon rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-0" : ""}`}></span>
                <span className={`w-5 h-0.5 bg-template-maroon rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full border-b border-template-sand shadow-2xl transition-all duration-400 ease-in-out overflow-hidden ${
            isScrolled ? "bg-white/95 backdrop-blur-xl" : "bg-white"
          } ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col py-3 px-5">
            {[
              { label: "Home", href: "#home", icon: <HomeIcon className="w-4 h-4 text-template-red" strokeWidth={2.5} /> },
              { label: "Trust", href: "#about-trust", icon: <Heart className="w-4 h-4 text-template-red" strokeWidth={2.5} /> },
              { label: "Services", href: "#services", icon: <Flame className="w-4 h-4 text-template-red" strokeWidth={2.5} /> },
              { label: "Contact", href: "#contact", icon: <Phone className="w-4 h-4 text-template-red" strokeWidth={2.5} /> },
            ].map((item, index) => (
              <a
                key={item.label}
                className="flex items-center gap-3 py-3 px-4 text-[13px] font-bold uppercase tracking-wider text-template-dark hover:text-template-red hover:bg-template-sand/50 rounded-xl transition-all duration-200 border-b border-template-sand/20 last:border-b-0"
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animation: mobileMenuOpen ? `fadeInUp 0.3s ease-out ${index * 60}ms both` : "none",
                }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
            {/* Mobile Phone Link */}
            <div className="mt-2 pt-3 border-t border-template-sand/50 flex items-center gap-3 px-4 pb-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-template-sand to-template-sand/50 flex items-center justify-center text-template-maroon">
                <Phone className="w-4 h-4 text-template-red" strokeWidth={2.5} />
              </div>
              <a href="tel:+918294990206" className="text-sm font-extrabold text-template-red font-sans">
                8294990206
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          3. HERO SECTION — Full-width immersive slider
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] bg-template-burgundy overflow-hidden noise-overlay" id="home">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_20%,rgba(62,31,36,0.97)_65%)] z-10 pointer-events-none"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-gold/20 floating-dot z-10"></div>
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-saffron/15 floating-dot z-10"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full bg-gold/25 floating-dot z-10"></div>

        <div className="container relative z-20 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center py-12 sm:py-16 gap-8 lg:gap-14">
          {/* Left Text */}
          <div
            key={currentSlide}
            className="flex flex-col items-start text-white"
            style={{ animation: "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
          >
            <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-[3px] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-5 sm:mb-6 backdrop-blur-sm">
              {slides[currentSlide].label}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-5 sm:mb-6 tracking-tight font-devanagari">
              {slides[currentSlide].title.split(/(Ram|राम)/g).map((t, i) => {
                if (t === "Ram") return <span key={i} className="shimmer-text font-sans">Ram</span>;
                if (t === "राम") return <span key={i} className="shimmer-text">राम</span>;
                return t;
              })}
            </h1>
            <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-8 sm:mb-10 max-w-[540px] border-l-2 border-gradient-to-b border-saffron/60 pl-5 font-serif italic">
              &ldquo;{slides[currentSlide].desc}&rdquo;
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                className="inline-flex items-center gap-2 bg-gradient-to-r from-template-maroon to-template-red hover:from-template-red hover:to-saffron text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-6 sm:px-7 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(200,58,42,0.3)] hover:shadow-[0_8px_30px_rgba(200,58,42,0.45)] hover:scale-105 active:scale-95"
                href="#contact"
              >
                Book Consultation →
              </a>
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-6 sm:px-7 py-3.5 sm:py-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm hover:scale-105 active:scale-95"
                href="#services"
              >
                View Services →
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/30 group z-20">
            <img
              key={currentSlide}
              src={slides[currentSlide].img}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
              style={{ animation: "scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-template-burgundy/70 via-transparent to-transparent"></div>

            {/* Slide indicator dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {slides.map((_, idx) => (
                <button
                  suppressHydrationWarning
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? "w-8 h-2 bg-gradient-to-r from-saffron to-gold"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. ABOUT TRUST — Collage + Rich Text
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden" id="about-trust">
        {/* Subtle background decorative circles */}
        <div className="absolute top-20 -right-32 w-64 h-64 rounded-full bg-template-sand/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full bg-saffron/5 blur-3xl pointer-events-none"></div>

        <div className="container grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Layered Collage of 3 Images */}
          <RevealSection delay={100} direction="left">
            <div className="relative h-[350px] sm:h-[420px] w-full max-w-[450px] mx-auto lg:mx-0">
              {/* Main Center Image Frame */}
              <div className="absolute top-[12%] left-[10%] w-[58%] h-[68%] border-4 border-white shadow-xl rounded-2xl z-20 overflow-hidden bg-white card-hover-lift cursor-pointer group">
                <img src="/download.jpeg" alt="Shiva Meditating" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Top Left Back Image Frame */}
              <div className="absolute top-0 left-0 w-[42%] h-[48%] border-4 border-white shadow-lg rounded-2xl z-10 overflow-hidden bg-white card-hover-lift cursor-pointer group">
                <img src="/download (1).jpeg" alt="Diya Om" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Bottom Right Frame */}
              <div className="absolute bottom-[4%] right-0 w-[42%] h-[48%] border-4 border-white shadow-lg rounded-2xl z-30 overflow-hidden bg-white card-hover-lift cursor-pointer group">
                <img src="/home.jpeg" alt="Lord Ram Stencil" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Decorative elements */}
              <div className="absolute right-[22%] top-[5%] w-4 h-4 bg-gradient-to-br from-template-maroon to-saffron rounded-sm z-0 floating-dot"></div>
              <div className="absolute left-[65%] bottom-[15%] w-3 h-3 bg-gold/30 rounded-full z-0 floating-dot"></div>
            </div>
          </RevealSection>

          {/* Right Text Column */}
          <RevealSection delay={250} direction="right">
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-template-red uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-gradient-to-r from-template-red to-saffron rounded-full"></span>
                About The Trust
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-template-maroon leading-tight mb-6 tracking-tight font-devanagari">
                हम राम में आस्था रखने वाले एक हिंदू ट्रस्ट हैं
              </h2>

              {/* Feature grid with modern icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full mb-7 font-devanagari">
                {[
                  { icon: <Sparkles className="w-5 h-5 text-[#D97706]" strokeWidth={2.5} />, text: "मन की शांति" },
                  { icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />, text: "100% संतुष्टि" },
                  { icon: <Flower2 className="w-5 h-5 text-[#6D1B1B]" strokeWidth={2.5} />, text: "पूजा की संपूर्ण व्यवस्था" },
                  { icon: <ShieldCheck className="w-5 h-5 text-blue-600" strokeWidth={2.5} />, text: "विश्वसनीय ट्रस्ट" },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-template-sand/50 transition-colors duration-200 group cursor-default"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {feat.icon}
                    </span>
                    <span className="font-bold text-[13px] sm:text-[14px] text-template-dark">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-fg-muted leading-relaxed mb-7 border-l-2 border-saffron/30 pl-4 font-devanagari">
                गौ सेवा, वैदिक शिक्षा और जनकल्याणकारी कार्यों के लिए प्रतिबद्ध ट्रस्ट।
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. SERVICES — Cards grid with decorative background
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#FFF8F2] relative overflow-hidden" id="services">
        {/* Soft mandala pattern in background (very low opacity) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] text-[#6D1B1B]/[0.015] pointer-events-none z-0 select-none">
          <svg className="w-full h-full animate-rotate-mandala" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
            <circle cx="50" cy="50" r="46" strokeDasharray="1.5,1.5"/>
            <circle cx="50" cy="50" r="38"/>
            <circle cx="50" cy="50" r="28" strokeDasharray="1,1"/>
            <circle cx="50" cy="50" r="18"/>
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 360) / 360;
              return (
                <circle
                  key={i}
                  cx={(50 + 38 * Math.cos((i * 10 * Math.PI) / 180)).toFixed(2)}
                  cy={(50 + 38 * Math.sin((i * 10 * Math.PI) / 180)).toFixed(2)}
                  r="1.5"
                />
              );
            })}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * 360) / 18;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={(50 + 46 * Math.cos((angle * Math.PI) / 180)).toFixed(2)}
                  y2={(50 + 46 * Math.sin((angle * Math.PI) / 180)).toFixed(2)}
                />
              );
            })}
          </svg>
        </div>

        {/* Subtle glowing dots */}
        <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-[#D97706]/10 floating-dot z-0"></div>
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 rounded-full bg-[#C89B3C]/15 floating-dot z-0"></div>
        <div className="absolute top-1/2 left-5 w-1.5 h-1.5 rounded-full bg-[#6D1B1B]/5 floating-dot z-0"></div>

        <div className="container relative z-10">
          <RevealSection>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[10px] font-black text-[#D97706] uppercase tracking-[3px] bg-[#D97706]/5 border border-[#D97706]/10 px-4 py-1.5 rounded-full mb-4">
                🔱 Our Divine Services
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6D1B1B] font-devanagari leading-tight">
                विधि-विधान से संपन्न <span className="text-[#C89B3C] font-serif italic">अनुष्ठान</span>
              </h2>
              <div className="w-16 h-[2.5px] bg-gradient-to-r from-[#D97706] to-[#C89B3C] mx-auto mt-4 rounded-full"></div>
              <p className="text-[13.5px] text-fg-muted mt-4 leading-relaxed font-serif italic max-w-md mx-auto">
                Experience traditional Vedic rituals performed with complete authenticity and devotion under Acharya Ji's guidance.
              </p>
            </div>
          </RevealSection>

          {/* Grid Layout of Cards: 4 columns desktop, 2 columns tablet, 1 column mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
            {poojaServices.map((pooja, index) => (
              <RevealSection key={pooja.id} delay={index * 60}>
                <PoojaCard pooja={pooja} index={index} />
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={350}>
            <div className="mt-14 text-center">
              <a
                className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[#6D1B1B]/80 hover:text-[#6D1B1B] uppercase tracking-widest cursor-pointer transition-all duration-300 hover:gap-3 group"
                href="#contact"
              >
                Get Started Now
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. CONTACT / BOOKING FORM — Immersive background
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/backgroundpandit.png')" }} id="contact">
        {/* Deep overlay */}
        <div className="absolute inset-0 bg-template-burgundy/80 z-0"></div>

        {/* Decorative floating elements */}
        <div className="absolute top-16 right-16 w-2 h-2 rounded-full bg-gold/20 floating-dot z-[1]"></div>
        <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-saffron/10 floating-dot z-[1]"></div>

        <div className="container grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center relative z-10">
          <RevealSection delay={100} direction="left">
            <div className="flex flex-col items-start text-white font-devanagari">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold uppercase tracking-[2px] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-5 sm:mb-6 backdrop-blur-sm">
                🙏 पूजा का सदुपयोग, जीवन में सुख और शांति
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight mb-5 sm:mb-6 tracking-tight text-white">
                हमसे संपर्क करें या{" "}
                <span className="text-saffron">अनुष्ठान बुक</span> करें
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-7 sm:mb-8 border-l-2 border-saffron/40 pl-5">
                कथा आयोजन, यज्ञ, कुण्डली या हस्तरेखा परामर्श हेतु फॉर्म भरें।
                आचार्य जी शीघ्र संपर्क करेंगे।
              </p>

              {/* Combined Contact Box */}
              <div className="bg-[#3e1f24]/30 backdrop-blur-xl border border-white/10 p-5 rounded-2xl w-full max-w-md mb-7 sm:mb-8">
                {/* Phone Numbers */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <a href="tel:+918294990206" className="text-white hover:text-gold font-sans font-bold text-sm sm:text-base transition-colors duration-200">8294990206</a>
                  </div>
                  <span className="opacity-30 text-white/50 font-sans">|</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <a href="tel:+917909058828" className="text-white hover:text-gold font-sans font-bold text-sm sm:text-base transition-colors duration-200">7909058828</a>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] bg-white/10 flex-grow"></div>
                  <span className="text-[11px] font-bold text-white/50 tracking-wider">हमसे जुड़ें</span>
                  <div className="h-[1px] bg-white/10 flex-grow"></div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3">
                  {/* Facebook */}
                  <a href="https://www.facebook.com/search/top?q=Ramkumar%20shukla" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 flex items-center justify-center text-white/70 hover:text-[#1877F2] transition-all duration-300 hover:scale-110" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50 flex items-center justify-center text-white/70 hover:text-[#E4405F] transition-all duration-300 hover:scale-110" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/results?search_query=Ramkumar+shukla+dharmacharya" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 flex items-center justify-center text-white/70 hover:text-[#FF0000] transition-all duration-300 hover:scale-110" aria-label="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2a29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2a29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/918294990206" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 flex items-center justify-center text-white/70 hover:text-[#25D366] transition-all duration-300 hover:scale-110" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </a>
                </div>
              </div>

              {/* Disclaimer Callout */}
              <div className="flex items-center gap-3 text-xs text-white bg-[#3e1f24]/30 backdrop-blur-sm border border-white/10 p-3.5 rounded-xl w-full max-w-md">
                <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <p className="leading-relaxed font-bold text-white/90">
                  सभी अनुष्ठान शास्त्रों के विधि-विधान और पूर्ण श्रद्धा के साथ संपन्न किए जाते हैं।
                </p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={300} direction="right">
            <BookingForm services={poojaServices} />
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. FOOTER — Modern dark footer with gradient accents
      ══════════════════════════════════════════════════════════ */}
      <footer className="bg-gradient-to-b from-template-sand to-[#ede5dd] border-t border-template-sand pt-14 sm:pt-16 pb-6 sm:pb-8 text-template-dark">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
            {/* Trust Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5">
                <svg className="w-8 h-8 text-gold animate-pulse-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.25))" }}>
                  <path d="M12 3v18" />
                  <path d="M8 7c0 3 4 3 4 3s4 0 4-3" />
                  <path d="M10 21h4" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-black text-[16px] sm:text-[18px] text-template-maroon font-devanagari tracking-wide leading-tight">
                    विश्व धर्मार्थ सेवा ट्रस्ट
                  </span>
                  <span className="text-[10px] font-bold text-template-maroon/70 font-devanagari mt-0.5 leading-none">
                    ।। सर्वे भवन्तु सुखिनः ।।
                  </span>
                </div>
              </div>
              
              <div className="w-12 h-[2px] bg-gradient-to-r from-template-red to-saffron mb-4"></div>

              <p className="text-xs sm:text-[13px] text-fg-muted leading-relaxed mb-4 max-w-[280px]">
                Dedicated to Sanatan Dharma, Vedic culture, cow protection & community welfare. Working for the well-being of all beings through Dharma, Seva & Sanskar.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-white/40 border border-template-sand/50 px-3.5 py-2.5 rounded-2xl w-fit text-[11px] font-extrabold text-template-maroon font-sans shadow-sm">
                <span className="w-5 h-5 rounded-full bg-template-maroon/10 flex items-center justify-center text-template-maroon shrink-0">
                  <User className="w-3 h-3 text-template-maroon" strokeWidth={2.5} />
                </span>
                <span>Founder: Acharya Pandit Ram Kumar Shukla</span>
              </div>
            </div>

            {/* Holy Kathas */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-template-red" strokeWidth={2.5} />
                <h4 className="text-[11px] sm:text-[12px] font-black text-template-maroon uppercase tracking-widest">
                  Holy Kathas
                </h4>
              </div>
              <div className="flex flex-col gap-3.5 text-xs sm:text-[13px] font-bold">
                {[
                  "Shrimad Bhagwat Mahapuran",
                  "Shrimad Devi Bhagwat",
                  "Muryadamyi Shri Ram Katha",
                  "Kalyankari Shiv Mahapuran",
                ].map((link) => (
                  <a key={link} className="text-fg-muted hover:text-template-red transition-all duration-200 hover:translate-x-1 flex items-center gap-2" href="#services">
                    <span className="text-[10px] text-template-red/70 font-sans">&gt;</span>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Consultations */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Flower2 className="w-4 h-4 text-template-red" strokeWidth={2.5} />
                <h4 className="text-[11px] sm:text-[12px] font-black text-template-maroon uppercase tracking-widest">
                  Consultations & Yajnas
                </h4>
              </div>
              <div className="flex flex-col gap-3.5 text-xs sm:text-[13px] font-bold">
                {[
                  "Vedic Yajnas & Havan",
                  "Astrology Consultation",
                  "Janam Kundli Analysis",
                  "Palmistry Consultation",
                ].map((link) => (
                  <a key={link} className="text-fg-muted hover:text-template-red transition-all duration-200 hover:translate-x-1 flex items-center gap-2" href="#services">
                    <span className="text-[10px] text-template-red/70 font-sans">&gt;</span>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-template-sand/80 my-5"></div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-1 text-[11px] text-fg-muted gap-4 font-sans">
            <div className="leading-relaxed text-left">
              © {new Date().getFullYear()} Vishwa Dharmarth Seva Trust, Ranchi, Jharkhand (India).<br/>
              All Rights Reserved.
            </div>
            
            <div className="flex gap-4 font-devanagari text-[12px] text-template-red font-bold tracking-wide">
              <span>।। सर्वे भवन्तु सुखिनः ।।</span>
              <span>।। सर्वे सन्तु निरामयाः ।।</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
