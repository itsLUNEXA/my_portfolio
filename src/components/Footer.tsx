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
    <footer className="bg-graphite-950 border-t border-cloud-border py-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-cloud-border/70">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center gap-2 cursor-pointer mb-2"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-cloud group-hover:text-sunshine transition-colors">
                Maheen Fatima
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sunshine inline-block" />
            </a>
            <p className="text-xs text-cloud-muted max-w-sm">
              Personal portfolio engineered with Next.js, TypeScript, and a cinematic editorial design system.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-cloud-muted font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-sunshine transition-colors"
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
              className="p-3 rounded-full bg-graphite border border-cloud-border hover:border-sunshine text-cloud-muted hover:text-sunshine transition-all group shadow-sm"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cloud-subtle">
          <p>© {new Date().getFullYear()} Maheen Fatima. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with precision & high standards</span>
            <span className="text-sunshine">•</span>
            <span className="text-sunshine font-mono">Editorial Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
