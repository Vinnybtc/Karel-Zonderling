"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const EXPIRY_DATE = new Date("2026-02-22T23:59:59");
const SPOTIFY_URL = "https://open.spotify.com/episode/1mYAEHUEHtr9JvteAFfpc8?si=McHg_AyjQDWVMVIRoqEs1g";

export default function ValentinePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show if past expiry date
    if (new Date() > EXPIRY_DATE) return;
    // Don't show if user already dismissed
    if (localStorage.getItem("valentine-popup-dismissed")) return;
    // Show after a short delay
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("valentine-popup-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div
              className="relative bg-white max-w-md w-full p-6 md:p-8 pointer-events-auto text-center"
              style={{
                border: "4px solid #2D2D2D",
                borderRadius: "16px",
                boxShadow: "6px 6px 0px #2D2D2D",
              }}
            >
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Hearts */}
              <div className="flex justify-center gap-2 mb-4">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  <Heart size={28} className="text-super-rood fill-super-rood" />
                </motion.div>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>
                  <Heart size={36} className="text-super-rood fill-super-rood" />
                </motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>
                  <Heart size={28} className="text-super-rood fill-super-rood" />
                </motion.div>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl text-karel-paars tracking-wider mb-2">
                Bonus aflevering!
              </h2>
              <p className="font-heading text-xl md:text-2xl text-super-rood tracking-wide mb-3">
                Valentijnsspecial
              </p>
              <p className="font-body text-base md:text-lg text-gray-600 font-bold mb-6">
                Karel en zijn vrienden vieren Valentijnsdag met een speciaal avontuur!
              </p>

              {/* Spotify embed */}
              <div className="mb-5">
                <iframe
                  src="https://open.spotify.com/embed/episode/1mYAEHUEHtr9JvteAFfpc8?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1DB954] text-white font-heading text-xl px-8 py-3 rounded-full hover:bg-[#1ed760] transition-colors tracking-wide"
                style={{ border: "3px solid #2D2D2D" }}
                onClick={dismiss}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Luister nu!
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
