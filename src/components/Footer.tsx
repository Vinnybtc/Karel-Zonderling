"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-karel-paars border-t-4 border-black py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Characters mini */}
        <div className="flex justify-center gap-4 mb-6">
          {["K", "C", "S"].map((letter, i) => (
            <motion.div
              key={letter}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
              style={{ border: "3px solid #2D2D2D" }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <span className="font-heading text-xl text-karel-paars">{letter}</span>
            </motion.div>
          ))}
        </div>

        <p className="font-heading text-2xl text-white tracking-wider mb-2">
          De Show van Karel Zonderling
        </p>
        <p className="font-body text-white/80 text-sm mb-4">
          Een kinderpodcast over superhelden, marshmallows en pratende badeenden.
        </p>

        <div className="flex items-center justify-center gap-1 text-white/60 text-sm font-body">
          <span>Gemaakt met</span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart size={14} className="text-super-rood fill-super-rood" />
          </motion.div>
          <span>voor alle kleine superhelden</span>
        </div>
      </div>
    </footer>
  );
}
