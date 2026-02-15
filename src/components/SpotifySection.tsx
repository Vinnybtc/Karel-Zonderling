"use client";

import { motion } from "framer-motion";
import { Play, Headphones, ExternalLink } from "lucide-react";

interface Episode {
  number: number;
  title: string;
  description: string;
  highlight: string;
}

const episodes: Episode[] = [
  {
    number: 1,
    title: "Het Geheime Hoofdkwartier",
    description: "Karel ontdekt een geheim onder het donut-cafe. Codewoord: 'Wil je er een koekje bij?'",
    highlight: "De ontdekking van het HQ",
  },
  {
    number: 2,
    title: "De Komst van Colibri",
    description: "Een buitenaards wezen landt in de achtertuin. Ze heeft paarse staartjes en een grote glimlach!",
    highlight: "Eerste ontmoeting met de alien",
  },
  {
    number: 3,
    title: "Snoezy's Grote Dag",
    description: "Een kleine grijze muis bewijst dat moed niets met grootte te maken heeft.",
    highlight: "Snoezy krijgt zijn cape",
  },
  {
    number: 4,
    title: "Dylan de Badeend",
    description: "Een pratende badeend met een zonnebril? In dit hoofdkwartier is alles mogelijk!",
    highlight: "De coolste badeend ooit",
  },
  {
    number: 5,
    title: "Het Verdwenen Snoep",
    description: "Al het snoep van Meneer Willy is verdwenen! Wie heeft het gestolen?",
    highlight: "Het mysterie begint",
  },
  {
    number: 6,
    title: "Bobby de Boze",
    description: "Een mysterieuze schurk maakt het leven zuur. Maar waarom is Bobby eigenlijk zo boos?",
    highlight: "De antagonist verschijnt",
  },
  {
    number: 7,
    title: "Het Marshmallow-Feest",
    description: "Tante Loesy organiseert het grootste marshmallow-feest ooit! Muren van terkwaas!",
    highlight: "Marshmallow-muren!",
  },
  {
    number: 8,
    title: "Boepsie in Bananenpak",
    description: "De alien-broertjes komen op bezoek. Boepsie draagt een bananenpak. Niemand snapt waarom.",
    highlight: "Alien familie-reunie",
  },
  {
    number: 9,
    title: "Bobby de Grappige",
    description: "Bobby ontdekt dat lachen veel leuker is dan boos zijn. Een onverwachte transformatie!",
    highlight: "De grote verandering",
  },
  {
    number: 10,
    title: "De Tijdcapsule",
    description: "Het team begraaft een tijdcapsule met de kruimel van de eerste taart. Tot seizoen 2!",
    highlight: "Het seizoensfinale",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { x: -30, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function SpotifySection() {
  return (
    <section id="afleveringen" className="py-20 px-4 bg-gradient-to-b from-transparent via-terkwaas/10 to-transparent relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-karel-paars tracking-wider mb-4">
            Seizoen 1
          </h2>
          <p className="font-body text-lg text-gray-600 font-bold mb-6">
            10 afleveringen vol avontuur, vriendschap en marshmallows!
          </p>
          <a
            href="https://open.spotify.com/show/7eL8rBY47fQNSBQ5F9zl3t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1DB954] text-white font-heading text-xl px-8 py-3 rounded-full border-3 border-black hover:scale-105 transition-transform"
            style={{ border: "3px solid black" }}
          >
            <Headphones size={24} />
            Luister alles op Spotify
            <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Episode list */}
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {episodes.map((ep) => (
            <motion.div
              key={ep.number}
              variants={item}
              whileHover={{ x: 8 }}
              className="comic-panel bg-white p-4 md:p-5 flex items-center gap-4 group cursor-pointer"
            >
              {/* Episode number */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: ep.number % 2 === 0 ? "#7B68EE" : "#FF0000",
                  border: "3px solid #2D2D2D",
                }}
              >
                <span className="font-heading text-2xl text-white">{ep.number}</span>
              </div>

              {/* Episode info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-xl md:text-2xl text-gray-800 tracking-wide">
                  {ep.title}
                </h3>
                <p className="font-body text-sm text-gray-600 mt-1 hidden md:block">
                  {ep.description}
                </p>
                <span className="inline-block mt-1 text-xs font-bold bg-donut-goud/30 text-gray-700 px-3 py-1 rounded-full">
                  {ep.highlight}
                </span>
              </div>

              {/* Play icon */}
              <motion.div
                className="flex-shrink-0 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <Play size={20} className="text-white ml-0.5" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
