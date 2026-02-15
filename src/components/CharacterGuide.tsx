"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Character {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
  letter?: string;
  category: "held" | "vriend" | "schurk";
}

const characters: Character[] = [
  {
    name: "Karel Zonderling",
    emoji: "K",
    color: "#FFB07C",
    bgColor: "#7B68EE",
    description: "De blonde superheld met de paarse trui en rode cape. Leider van het team!",
    letter: "K",
    category: "held",
  },
  {
    name: "Alien Colibri",
    emoji: "C",
    color: "#22C55E",
    bgColor: "#7B68EE",
    description: "Een vrolijke alien met groene huid, zwarte ogen en paarse staartjes. Altijd klaar voor avontuur!",
    letter: "C",
    category: "held",
  },
  {
    name: "Snoezy",
    emoji: "S",
    color: "#B0B0B0",
    bgColor: "#7B68EE",
    description: "De dappere grijze muis met een groot hart en een nog grotere cape!",
    letter: "S",
    category: "held",
  },
  {
    name: "Dylan de Badeend",
    emoji: "D",
    color: "#FFD700",
    bgColor: "#FFA500",
    description: "Een felgele badeend met iconische zwarte zonnebril. Cooler dan cool!",
    letter: "D",
    category: "vriend",
  },
  {
    name: "Tante Loesy",
    emoji: "T",
    color: "#FF69B4",
    bgColor: "#FFB6C1",
    description: "De liefste tante ooit! Beroemd om haar marshmallow-feesten.",
    category: "vriend",
  },
  {
    name: "Meneer Willy",
    emoji: "W",
    color: "#8B4513",
    bgColor: "#DEB887",
    description: "De eigenaar van de snoepwinkel. Zijn snoep is mysterieus verdwenen...",
    category: "vriend",
  },
  {
    name: "Bobby de Boze",
    emoji: "B",
    color: "#FF4444",
    bgColor: "#FFCCCC",
    description: "Eerst een boze schurk, maar nu... Bobby de Grappige! Iedereen kan veranderen.",
    category: "schurk",
  },
  {
    name: "Boepsie",
    emoji: "Bo",
    color: "#22C55E",
    bgColor: "#FFFF44",
    description: "Eentje van de alien-broertjes, altijd in een bananenpak! Niemand weet waarom.",
    category: "vriend",
  },
];

const categoryLabels = {
  held: { label: "De Helden", color: "bg-super-rood" },
  vriend: { label: "De Vrienden", color: "bg-terkwaas" },
  schurk: { label: "De (Ex-)Schurken", color: "bg-donut-goud" },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function CharacterGuide() {
  const [activeCategory, setActiveCategory] = useState<"held" | "vriend" | "schurk" | "all">("all");
  const [flipped, setFlipped] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? characters
    : characters.filter((c) => c.category === activeCategory);

  return (
    <section id="helden" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-heading text-5xl md:text-6xl text-center text-karel-paars mb-4 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Onze Helden & Vrienden
        </motion.h2>
        <motion.p
          className="text-center text-lg text-gray-600 mb-10 font-body font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Klik op een karakter om meer te leren!
        </motion.p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`font-heading text-lg px-5 py-2 rounded-full border-2 border-black transition-all ${
              activeCategory === "all" ? "bg-karel-paars text-white scale-105" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Iedereen
          </button>
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-heading text-lg px-5 py-2 rounded-full border-2 border-black transition-all ${
                activeCategory === cat ? `${categoryLabels[cat].color} text-white scale-105` : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {categoryLabels[cat].label}
            </button>
          ))}
        </div>

        {/* Character grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filtered.map((char, index) => (
            <motion.div
              key={char.name}
              variants={item}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFlipped(flipped === char.name ? null : char.name)}
              className="cursor-pointer"
            >
              <div className="comic-panel bg-white p-4 h-full flex flex-col items-center text-center">
                {/* Character avatar */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-3 border-3"
                  style={{
                    backgroundColor: char.bgColor,
                    border: "3px solid #2D2D2D",
                  }}
                >
                  {char.letter ? (
                    <span className="font-heading text-4xl text-white drop-shadow-md">
                      {char.letter}
                    </span>
                  ) : (
                    <span className="text-4xl">{char.emoji}</span>
                  )}
                </div>

                <h3 className="font-heading text-xl text-gray-800 tracking-wide mb-2">
                  {char.name}
                </h3>

                {/* Category badge */}
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full text-white mb-3 ${
                    categoryLabels[char.category].color
                  }`}
                >
                  {categoryLabels[char.category].label}
                </span>

                {/* Description (shown on click/hover) */}
                <motion.p
                  className="font-body text-sm text-gray-600"
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    flipped === char.name
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                >
                  {char.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
