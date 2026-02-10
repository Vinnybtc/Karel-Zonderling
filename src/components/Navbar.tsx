"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Headphones } from "lucide-react";

const navLinks = [
  { href: "#helden", label: "Onze Helden" },
  { href: "#afleveringen", label: "Afleveringen" },
  { href: "#tijdcapsule", label: "Tijdcapsule" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-karel-paars/95 backdrop-blur-sm border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-donut-goud rounded-full border-3 border-black flex items-center justify-center"
            style={{ border: "3px solid black" }}
          >
            <span className="font-heading text-xl text-black">K</span>
          </motion.div>
          <span className="font-heading text-xl text-white tracking-wider hidden sm:block">
            Karel Zonderling
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-lg text-white hover:text-donut-goud transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DB954] text-white font-heading text-lg px-4 py-2 rounded-full border-2 border-black hover:scale-105 transition-transform"
          >
            <Headphones size={18} />
            Luister op Spotify
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-karel-paars border-t-2 border-black overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-xl text-white hover:text-donut-goud transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1DB954] text-white font-heading text-lg px-4 py-2 rounded-full border-2 border-black"
              >
                <Headphones size={18} />
                Luister op Spotify
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
