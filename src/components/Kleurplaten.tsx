"use client";

import { motion } from "framer-motion";
import { Download, Printer } from "lucide-react";
import Image from "next/image";

const kleurplaten = [
  { name: "Karel Zonderling", file: "/kleurplaten/karel.svg" },
  { name: "Alien Colibri", file: "/kleurplaten/colibri.svg" },
  { name: "Snoezy de Muis", file: "/kleurplaten/snoezy.svg" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Kleurplaten() {
  return (
    <section id="kleurplaten" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-karel-paars tracking-wider mb-4">
            Kleurplaten
          </h2>
          <p className="font-body text-lg text-gray-600 font-bold">
            Download, print en kleur je favoriete superheld!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {kleurplaten.map((kp) => (
            <motion.div
              key={kp.name}
              variants={item}
              className="comic-panel bg-white p-4 flex flex-col items-center"
            >
              <div className="w-full aspect-[4/5] relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={kp.file}
                  alt={`Kleurplaat van ${kp.name}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="font-heading text-xl text-gray-800 tracking-wide mb-3">
                {kp.name}
              </h3>
              <a
                href={kp.file}
                download={`${kp.name.toLowerCase().replace(/ /g, "-")}-kleurplaat.svg`}
                className="inline-flex items-center gap-2 bg-karel-paars text-white font-heading text-lg px-6 py-2 rounded-full hover:bg-purple-600 transition-colors tracking-wide"
                style={{ border: "3px solid #2D2D2D" }}
              >
                <Download size={18} />
                Download
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-8 font-body text-gray-500 font-bold flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Printer size={18} />
          Tip: Print de kleurplaat op A4 voor het beste resultaat!
        </motion.p>
      </div>
    </section>
  );
}
