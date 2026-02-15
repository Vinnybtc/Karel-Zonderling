"use client";

import { motion } from "framer-motion";

function KarelSVG() {
  return (
    <motion.svg
      viewBox="0 0 200 360"
      className="w-40 md:w-52"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
    >
      {/* Cape */}
      <motion.path
        d="M100,80 L180,120 Q200,200 180,300 L100,280 Z"
        fill="#FF0000"
        stroke="#2D2D2D"
        strokeWidth="3"
        className="cape-wave"
      />
      {/* Body */}
      <rect x="65" y="110" width="70" height="100" rx="8" fill="#7B68EE" stroke="#2D2D2D" strokeWidth="3" />
      {/* K on chest */}
      <text x="100" y="175" textAnchor="middle" fill="#FF0000" fontWeight="bold" fontSize="36" fontFamily="Arial">K</text>
      {/* Pants */}
      <rect x="65" y="205" width="30" height="80" rx="5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="3" />
      <rect x="105" y="205" width="30" height="80" rx="5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="3" />
      {/* Shoes */}
      <ellipse cx="80" cy="290" rx="18" ry="10" fill="#8B4513" stroke="#2D2D2D" strokeWidth="3" />
      <ellipse cx="120" cy="290" rx="18" ry="10" fill="#8B4513" stroke="#2D2D2D" strokeWidth="3" />
      {/* Head */}
      <circle cx="100" cy="65" r="42" fill="#FFB07C" stroke="#2D2D2D" strokeWidth="3" />
      {/* Hair */}
      <path d="M62,50 Q70,15 100,20 Q130,15 138,50 Q140,35 130,25 Q110,5 90,10 Q70,15 60,40 Z" fill="#FFD700" stroke="#2D2D2D" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="85" cy="60" r="5" fill="#2D2D2D" />
      <circle cx="115" cy="60" r="5" fill="#2D2D2D" />
      {/* Smile */}
      <path d="M85,78 Q100,92 115,78" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms - superhero pose */}
      <path d="M65,130 L30,110 L25,95" fill="none" stroke="#FFB07C" strokeWidth="14" strokeLinecap="round" />
      <path d="M135,130 L170,110 L175,95" fill="none" stroke="#FFB07C" strokeWidth="14" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="25" cy="92" r="8" fill="#FFB07C" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="175" cy="92" r="8" fill="#FFB07C" stroke="#2D2D2D" strokeWidth="2" />
    </motion.svg>
  );
}

function ColibriSVG() {
  return (
    <motion.svg
      viewBox="0 0 160 300"
      className="w-28 md:w-36"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
    >
      {/* Cape */}
      <motion.path
        d="M80,70 L140,100 Q155,160 140,240 L80,220 Z"
        fill="#FF0000"
        stroke="#2D2D2D"
        strokeWidth="2.5"
        className="cape-wave"
      />
      {/* Body */}
      <rect x="45" y="95" width="60" height="80" rx="6" fill="#7B68EE" stroke="#2D2D2D" strokeWidth="2.5" />
      {/* C on chest */}
      <text x="75" y="148" textAnchor="middle" fill="#FF0000" fontWeight="bold" fontSize="30" fontFamily="Arial">C</text>
      {/* Pants */}
      <rect x="45" y="170" width="25" height="65" rx="4" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2.5" />
      <rect x="80" y="170" width="25" height="65" rx="4" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2.5" />
      {/* Shoes */}
      <ellipse cx="58" cy="240" rx="14" ry="8" fill="#8B4513" stroke="#2D2D2D" strokeWidth="2" />
      <ellipse cx="92" cy="240" rx="14" ry="8" fill="#8B4513" stroke="#2D2D2D" strokeWidth="2" />
      {/* Head - alien green */}
      <circle cx="75" cy="50" r="35" fill="#22C55E" stroke="#2D2D2D" strokeWidth="2.5" />
      {/* Alien eyes */}
      <ellipse cx="62" cy="48" rx="8" ry="10" fill="#1A1A1A" />
      <ellipse cx="88" cy="48" rx="8" ry="10" fill="#1A1A1A" />
      {/* Eye shine */}
      <circle cx="65" cy="45" r="3" fill="#444" />
      <circle cx="91" cy="45" r="3" fill="#444" />
      {/* Smile */}
      <path d="M62,65 Q75,77 88,65" fill="none" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      {/* Purple pigtails */}
      <path d="M45,35 Q25,20 20,40 Q15,55 30,50" fill="none" stroke="#7B68EE" strokeWidth="5" strokeLinecap="round" />
      <path d="M105,35 Q125,20 130,40 Q135,55 120,50" fill="none" stroke="#7B68EE" strokeWidth="5" strokeLinecap="round" />
      {/* Arms - hands on hips */}
      <path d="M45,110 L20,130 L30,160" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
      <path d="M105,110 L130,130 L120,160" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
    </motion.svg>
  );
}

function SnoezySVG() {
  return (
    <motion.svg
      viewBox="0 0 140 240"
      className="w-20 md:w-28"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Cape */}
      <motion.path
        d="M70,55 L125,80 Q135,130 125,190 L70,175 Z"
        fill="#FF0000"
        stroke="#2D2D2D"
        strokeWidth="2"
        className="cape-wave"
      />
      {/* Body */}
      <rect x="35" y="75" width="50" height="65" rx="5" fill="#7B68EE" stroke="#2D2D2D" strokeWidth="2" />
      {/* S on chest */}
      <text x="60" y="118" textAnchor="middle" fill="#FF0000" fontWeight="bold" fontSize="24" fontFamily="Arial">S</text>
      {/* Pants */}
      <rect x="35" y="136" width="20" height="50" rx="4" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2" />
      <rect x="65" y="136" width="20" height="50" rx="4" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2" />
      {/* Shoes */}
      <ellipse cx="45" cy="190" rx="12" ry="7" fill="#8B4513" stroke="#2D2D2D" strokeWidth="2" />
      <ellipse cx="75" cy="190" rx="12" ry="7" fill="#8B4513" stroke="#2D2D2D" strokeWidth="2" />
      {/* Head - grey mouse */}
      <circle cx="60" cy="38" r="28" fill="#B0B0B0" stroke="#2D2D2D" strokeWidth="2" />
      {/* Mouse ears */}
      <circle cx="38" cy="12" r="16" fill="#B0B0B0" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="38" cy="12" r="10" fill="#FFB0B0" />
      <circle cx="82" cy="12" r="16" fill="#B0B0B0" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="82" cy="12" r="10" fill="#FFB0B0" />
      {/* Eyes */}
      <circle cx="50" cy="35" r="4" fill="#2D2D2D" />
      <circle cx="70" cy="35" r="4" fill="#2D2D2D" />
      {/* Nose */}
      <circle cx="60" cy="42" r="4" fill="#FF8888" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* Smile */}
      <path d="M52,49 Q60,56 68,49" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      {/* Arms */}
      <path d="M35,90 L15,105" fill="none" stroke="#B0B0B0" strokeWidth="8" strokeLinecap="round" />
      <path d="M85,90 L105,105" fill="none" stroke="#B0B0B0" strokeWidth="8" strokeLinecap="round" />
    </motion.svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 donut-bg pointer-events-none" />

      {/* Starburst behind title */}
      <motion.div
        className="absolute top-24 md:top-16 starburst opacity-20 rounded-full w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Title */}
      <motion.div
        className="relative z-10 text-center mb-8 md:mb-12"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
      >
        <div className="speech-bubble inline-block mb-8">
          <p className="font-heading text-lg md:text-xl text-karel-paars">
            Codewoord: &quot;Wil je er een koekje bij?&quot;
          </p>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-karel-paars drop-shadow-lg tracking-wider">
          De Show van
        </h1>
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-super-rood drop-shadow-lg tracking-wider mt-2">
          Karel Zonderling
        </h1>
        <motion.p
          className="font-body text-xl md:text-2xl mt-4 text-gray-700 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Welkom in het Geheime Hoofdkwartier!
        </motion.p>

        {/* Spotify Embed with Follow button */}
        <motion.div
          className="mt-8 w-full max-w-[352px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 120 }}
        >
          <iframe
            src="https://open.spotify.com/embed/show/7eL8rBY47fQNSBQ5F9zl3t?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: "12px" }}
          />
          <p className="font-body text-sm md:text-base mt-3 text-gray-500 font-bold text-center">
            Klik op &quot;Volgen&quot; hierboven en mis geen aflevering!
          </p>
        </motion.div>
      </motion.div>

      {/* Characters */}
      <div className="relative z-10 flex items-end justify-center gap-4 md:gap-8 mt-4">
        <ColibriSVG />
        <KarelSVG />
        <SnoezySVG />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-3 border-karel-paars rounded-full flex items-start justify-center p-2" style={{ border: "3px solid #7B68EE" }}>
          <motion.div
            className="w-2 h-2 bg-karel-paars rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
