"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-[#03393F] text-[#FDF1EA] border-t border-[#5D867F]/30 py-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#5D867F]/30">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center gap-2 cursor-pointer mb-2"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FDF1EA] group-hover:text-[#F2BB8E] transition-colors">
                Maheen Fatima
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2BB8E] inline-block" />
            </a>
            <p className="text-xs text-[#FAE6D9]/80 max-w-sm">
              Personal portfolio engineered with Next.js, TypeScript, and a warm editorial design aesthetic.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-[#FAE6D9]/80 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#F2BB8E] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Back to Top Button */}
          <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="btn-sunshine p-3 rounded-full bg-[#022428] border border-[#5D867F]/40 hover:border-[#F2BB8E] text-[#F2BB8E] hover:bg-[#F2BB8E] hover:text-[#03393F] transition-all group shadow-sm cursor-pointer"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAE6D9]/60">
          <p>© {new Date().getFullYear()} Maheen Fatima. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with precision &amp; purpose</span>
            <span className="text-[#F2BB8E]">•</span>
            <span className="text-[#F2BB8E] font-mono">Warm Editorial Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
