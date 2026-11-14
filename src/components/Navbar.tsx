"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // If opened directly without a specific section hash, ensure page starts at the top (Home)
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FDF1EA]/95 backdrop-blur-md border-b border-[#03393F]/10 py-4 shadow-sm"
          : "bg-[#FDF1EA]/75 backdrop-blur-sm py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-1.5 cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#03393F] transition-colors">
            Maheen Fatima
          </span>
          <span className="w-2 h-2 rounded-full bg-[#F2BB8E] inline-block group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#03393F] font-bold"
                    : "text-[#03393F]/75 hover:text-[#03393F] font-medium"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F2BB8E] rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#03393F] text-white text-sm font-semibold tracking-wide hover:bg-[#022428] transition-all duration-200 shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F2BB8E]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-cloud-muted hover:text-sunshine focus:outline-none border border-cloud-border"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDF1EA]/98 backdrop-blur-xl border-b border-[#03393F]/15 px-6 pt-4 pb-8 transition-all">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-md text-base transition-colors ${
                    isActive
                      ? "bg-[#FAE6D9] text-[#03393F] font-bold border-l-2 border-[#03393F]"
                      : "text-[#03393F]/75 hover:text-[#03393F]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="pt-4 border-t border-[#03393F]/15">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#03393F] text-white font-semibold hover:bg-[#022428] transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[#F2BB8E]" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

