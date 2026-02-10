"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Tijdcapsule() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/tijdcapsule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), wish: wish.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Kon de wens niet opslaan");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis. Probeer opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tijdcapsule" className="py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-6xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Clock size={60} className="text-karel-paars" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-6xl opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={60} className="text-donut-goud" />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-karel-paars tracking-wider mb-4">
            De Tijdcapsule
          </h2>
          <p className="font-body text-lg text-gray-600 font-bold">
            Wat wil jij zien in Seizoen 2? Schrijf je wens op en stop het in de capsule!
          </p>
        </motion.div>

        <motion.div
          className="comic-panel bg-white p-8 md:p-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-heading text-xl text-gray-800 block mb-2 tracking-wide">
                  Jouw Naam
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Hoe heet je?"
                  className="w-full px-4 py-3 font-body text-lg border-3 border-gray-800 rounded-xl focus:border-karel-paars focus:outline-none focus:ring-2 focus:ring-karel-paars/30 transition-all"
                  style={{ border: "3px solid #2D2D2D" }}
                  required
                />
              </div>

              <div>
                <label htmlFor="wish" className="font-heading text-xl text-gray-800 block mb-2 tracking-wide">
                  Jouw Wens voor Seizoen 2
                </label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Wat moet Karel doen in het volgende seizoen? Welk avontuur wil je meemaken?"
                  rows={4}
                  className="w-full px-4 py-3 font-body text-lg border-3 border-gray-800 rounded-xl focus:border-karel-paars focus:outline-none focus:ring-2 focus:ring-karel-paars/30 transition-all resize-none"
                  style={{ border: "3px solid #2D2D2D" }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-super-rood text-white font-heading text-2xl py-4 rounded-xl border-3 border-black flex items-center justify-center gap-3 hover:bg-red-600 transition-colors disabled:opacity-70 tracking-wider"
                style={{ border: "3px solid black" }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                ) : (
                  <>
                    <Send size={22} />
                    Stop in de Capsule!
                  </>
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 font-body text-sm bg-red-50 px-4 py-3 rounded-lg"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-7xl mb-6"
              >
                <Sparkles size={70} className="mx-auto text-donut-goud" />
              </motion.div>
              <h3 className="font-heading text-3xl text-karel-paars mb-3 tracking-wider">
                Bedankt, {name}!
              </h3>
              <p className="font-body text-lg text-gray-600 font-bold">
                Jouw wens zit veilig in de tijdcapsule. Karel, Colibri en Snoezy gaan ermee aan de slag!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setWish("");
                }}
                className="mt-6 font-heading text-lg text-karel-paars underline hover:text-super-rood transition-colors"
              >
                Nog een wens?
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
