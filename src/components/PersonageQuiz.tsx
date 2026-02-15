"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Character = "karel" | "colibri" | "snoezy";

interface Question {
  question: string;
  options: { text: string; scores: Record<Character, number> }[];
}

const questions: Question[] = [
  {
    question: "Je vindt een geheime deur. Wat doe je?",
    options: [
      { text: "Meteen openmaken!", scores: { karel: 2, colibri: 1, snoezy: 0 } },
      { text: "Eerst goed onderzoeken", scores: { karel: 0, colibri: 2, snoezy: 1 } },
      { text: "Vragen of iemand mee wil", scores: { karel: 1, colibri: 0, snoezy: 2 } },
    ],
  },
  {
    question: "Wat is jouw favoriete snack?",
    options: [
      { text: "Donuts!", scores: { karel: 2, colibri: 0, snoezy: 1 } },
      { text: "Iets wat niemand kent", scores: { karel: 0, colibri: 2, snoezy: 0 } },
      { text: "Kaas! Altijd kaas!", scores: { karel: 0, colibri: 0, snoezy: 2 } },
    ],
  },
  {
    question: "Hoe zou je jezelf omschrijven?",
    options: [
      { text: "Dapper en avontuurlijk", scores: { karel: 2, colibri: 1, snoezy: 0 } },
      { text: "Slim en een beetje anders", scores: { karel: 0, colibri: 2, snoezy: 1 } },
      { text: "Lief en altijd honger", scores: { karel: 1, colibri: 0, snoezy: 2 } },
    ],
  },
  {
    question: "Je vriend is in gevaar! Wat doe je?",
    options: [
      { text: "Ik ren er meteen heen!", scores: { karel: 2, colibri: 0, snoezy: 1 } },
      { text: "Ik bedenk een slim plan", scores: { karel: 0, colibri: 2, snoezy: 0 } },
      { text: "Ik haal hulp en ga samen", scores: { karel: 0, colibri: 1, snoezy: 2 } },
    ],
  },
  {
    question: "Wat is jouw superkracht?",
    options: [
      { text: "Supersnelheid!", scores: { karel: 2, colibri: 0, snoezy: 1 } },
      { text: "Dingen laten zweven", scores: { karel: 0, colibri: 2, snoezy: 0 } },
      { text: "Onzichtbaar worden", scores: { karel: 0, colibri: 1, snoezy: 2 } },
    ],
  },
];

const results: Record<Character, { name: string; description: string; emoji: string; color: string; bgColor: string }> = {
  karel: {
    name: "Karel Zonderling",
    emoji: "K",
    description: "Je bent dapper, avontuurlijk en staat altijd vooraan! Net als Karel spring je er meteen in en help je iedereen. Superheld in hart en nieren!",
    color: "#7B68EE",
    bgColor: "bg-karel-paars",
  },
  colibri: {
    name: "Alien Colibri",
    emoji: "C",
    description: "Je bent slim, creatief en een beetje anders dan de rest — en dat is juist je kracht! Net als Colibri bedenk jij altijd de slimste oplossingen.",
    color: "#22C55E",
    bgColor: "bg-green-500",
  },
  snoezy: {
    name: "Snoezy de Muis",
    emoji: "S",
    description: "Je bent lief, trouw en altijd in voor een snack! Net als Snoezy ben jij de beste vriend die iedereen wil hebben. Klein maar dapper!",
    color: "#B0B0B0",
    bgColor: "bg-gray-400",
  },
};

function getResult(scores: Record<Character, number>): Character {
  return (Object.entries(scores) as [Character, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
}

export default function PersonageQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<Character, number>>({ karel: 0, colibri: 0, snoezy: 0 });
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const option = questions[currentQ].options[optionIndex];
    const newScores = { ...scores };
    (Object.entries(option.scores) as [Character, number][]).forEach(([char, score]) => {
      newScores[char] += score;
    });
    setScores(newScores);

    setTimeout(() => {
      setSelected(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setFinished(true);
      }
    }, 600);
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ karel: 0, colibri: 0, snoezy: 0 });
    setFinished(false);
    setSelected(null);
  };

  const result = results[getResult(scores)];

  return (
    <section id="quiz" className="py-20 px-4 bg-gradient-to-b from-transparent via-donut-goud/10 to-transparent">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-karel-paars tracking-wider mb-4">
            Welk personage ben jij?
          </h2>
          <p className="font-body text-lg text-gray-600 font-bold">
            Beantwoord 5 vragen en ontdek het!
          </p>
        </motion.div>

        <motion.div
          className="comic-panel bg-white p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="flex gap-1.5 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className="h-2 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: i <= currentQ ? "#7B68EE" : "#E5E7EB",
                      }}
                    />
                  ))}
                </div>

                <p className="font-body text-sm text-gray-400 font-bold mb-2">
                  Vraag {currentQ + 1} van {questions.length}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-gray-800 tracking-wide mb-6">
                  {questions[currentQ].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQ].options.map((option, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-xl font-body text-lg font-bold transition-colors ${
                        selected === i
                          ? "bg-karel-paars text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                      style={{ border: "2px solid #2D2D2D" }}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <motion.div
                  className={`w-24 h-24 ${result.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                  style={{ border: "4px solid #2D2D2D" }}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                >
                  <span className="font-heading text-5xl text-white">{result.emoji}</span>
                </motion.div>

                <p className="font-body text-lg text-gray-500 font-bold mb-1">Jij bent...</p>
                <h3 className="font-heading text-4xl md:text-5xl tracking-wider mb-4" style={{ color: result.color }}>
                  {result.name}!
                </h3>
                <p className="font-body text-lg text-gray-600 font-bold mb-8 max-w-md mx-auto">
                  {result.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Ik ben ${result.name}! 🦸 Doe de quiz en ontdek welk personage jij bent! ➡️ https://karelzonderling.nl#quiz`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading text-xl px-6 py-3 rounded-full hover:bg-[#20bd5a] transition-colors tracking-wide"
                    style={{ border: "3px solid #2D2D2D" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Deel je resultaat!
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-heading text-xl px-6 py-3 rounded-full hover:bg-gray-200 transition-colors tracking-wide"
                    style={{ border: "3px solid #2D2D2D" }}
                  >
                    <RotateCcw size={20} />
                    Opnieuw
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
