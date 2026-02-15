"use client";

import { motion } from "framer-motion";
import { Play, Headphones, ExternalLink, Heart } from "lucide-react";

interface Episode {
  number: number;
  title: string;
  description: string;
  highlight: string;
  spotifyUrl: string;
}

const episodes: Episode[] = [
  {
    number: 1,
    title: "De Donutcode",
    description: "In het Donut Café lijkt alles rustig, tot de kassajuf plots het geheime codewoord zegt...",
    highlight: "Het avontuur begint!",
    spotifyUrl: "https://open.spotify.com/episode/7JPQov5PGujvY0qjW1HEBo",
  },
  {
    number: 2,
    title: "De Grote snoepgoed verdwijning bij meneer Willy",
    description: "Een mysterieus figuur steelt al het snoep uit de winkel van Meneer Willy met een knip van zijn vingers!",
    highlight: "Wie stal het snoep?",
    spotifyUrl: "https://open.spotify.com/episode/76rgAmRAnCTP16xM6bzUsg",
  },
  {
    number: 3,
    title: "De Suikersporen en De Pratende Badeend",
    description: "Het onderzoek naar de snoep-diefstal leidt tot een bijzondere ontdekking: Dylan de badeend kan praten!",
    highlight: "Dylan kan praten!",
    spotifyUrl: "https://open.spotify.com/episode/09pPvSzEZkwdrV6M4MZDYA",
  },
  {
    number: 4,
    title: "De Kaasval",
    description: "Snoezy trapt in een val van Bobby de Boze in een mechanisch pak. Kan het team hem redden?",
    highlight: "Snoezy in gevaar!",
    spotifyUrl: "https://open.spotify.com/episode/5qy0tnR3s4rP4MCjyPuyCl",
  },
  {
    number: 5,
    title: "Het plan van Bobby de Boze",
    description: "Het team ontdekt dat Snoezy vermist is. Een mysterieuze deur leidt naar een dreigende ontdekking...",
    highlight: "Bobby's grote plan",
    spotifyUrl: "https://open.spotify.com/episode/61OLdwQRpSy6waCCUxAHDB",
  },
  {
    number: 6,
    title: "Bobby de Boze\u2026 of Bobby de Verdrietige?",
    description: "Karel blijft achter bij een kapotte deur. De spanning stijgt en hulp komt eraan!",
    highlight: "Waarom is Bobby boos?",
    spotifyUrl: "https://open.spotify.com/episode/3tF4b99seJGf5BmaBm4KVh",
  },
  {
    number: 7,
    title: "De Saaiste dag ooit! Of toch niet?",
    description: "Verveling verandert in een wild avontuur met chocoladefonteinen en pretzels!",
    highlight: "Chocoladefonteinen!",
    spotifyUrl: "https://open.spotify.com/episode/3TgxiZM2Xlf11v991Rwbuq",
  },
  {
    number: 8,
    title: "Het grote feest van Bobby de Grappige",
    description: "'Kom je ook naar mijn feestje?' Mysterieuze posters verschijnen door de hele stad!",
    highlight: "Bobby's feestje",
    spotifyUrl: "https://open.spotify.com/episode/6jY12SwDiUynONX9J2RIfG",
  },
  {
    number: 9,
    title: "Er is er een jarig!",
    description: "Een verjaardags-zwemfeest voor Alien Colibri met onverwachte cadeaus!",
    highlight: "Colibri is jarig!",
    spotifyUrl: "https://open.spotify.com/episode/1qN8julgl3qZ8KERLhIs8V",
  },
];

const bonusEpisode: Episode = {
  number: 0,
  title: "Valentijnsspecial",
  description: "Karel en zijn vrienden vieren Valentijnsdag met een speciaal avontuur!",
  highlight: "Bonus aflevering!",
  spotifyUrl: "https://open.spotify.com/episode/1mYAEHUEHtr9JvteAFfpc8?si=McHg_AyjQDWVMVIRoqEs1g",
};

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
            9 afleveringen vol avontuur, vriendschap en marshmallows!
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

        {/* Bonus Valentine episode */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={bonusEpisode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ x: 8 }}
              className="comic-panel p-4 md:p-5 flex items-center gap-4 group cursor-pointer"
              style={{ background: "linear-gradient(135deg, #fff0f3, #ffe0e6)" }}
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF0000", border: "3px solid #2D2D2D" }}
              >
                <Heart size={24} className="text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading text-xl md:text-2xl text-gray-800 tracking-wide">
                    {bonusEpisode.title}
                  </h3>
                  <span className="text-xs font-bold bg-super-rood text-white px-2 py-0.5 rounded-full">
                    BONUS
                  </span>
                </div>
                <p className="font-body text-sm text-gray-600 mt-1 hidden md:block">
                  {bonusEpisode.description}
                </p>
                <span className="inline-block mt-1 text-xs font-bold bg-red-200 text-red-700 px-3 py-1 rounded-full">
                  {bonusEpisode.highlight}
                </span>
              </div>
              <motion.div
                className="flex-shrink-0 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <Play size={20} className="text-white ml-0.5" />
              </motion.div>
            </motion.div>
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
            <a
              key={ep.number}
              href={ep.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
            <motion.div
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
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
