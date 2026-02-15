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

              {/* Share & Play */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Luister naar "${ep.title}" van Karel Zonderling op Spotify! 🎧 ${ep.spotifyUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  title="Deel via WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <motion.div
                  className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2 }}
                >
                  <Play size={20} className="text-white ml-0.5" />
                </motion.div>
              </div>
            </motion.div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
