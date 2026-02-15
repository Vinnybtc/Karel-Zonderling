"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  FileText,
  Users,
  TrendingUp,
  Palette,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  Loader2,
  Lock,
  LogOut,
  AlertCircle,
  Inbox,
  Zap,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface GeneratedContent {
  opvoedHack: string;
  spotifyTitle: string;
  spotifyDescription: string;
  coloringPrompt: string;
  socialPost: string;
}

const exampleScript = `Tante Loesy had het grootste feest ooit georganiseerd. De muren waren gemaakt van marshmallows — echte marshmallows! — en ze waren terkwaas-kleurig. Karel keek met grote ogen naar de plafonds die druipten van de slagroom.

"Dit is het mooiste dat ik ooit heb gezien!" riep Colibri, terwijl ze een marshmallow van de muur trok en in haar mond stopte.

Snoezy rende rondjes over de grond, zijn kleine muizenpootjes glibberdend over de zoete vloer. "Pas op Snoezy!" riep Karel, maar het was al te laat — Snoezy gleed dwars door een muur van marshmallows en kwam aan de andere kant terecht in een berg snoep.

"Oeps," piepte Snoezy met een glimlach vol suiker.

Dylan de Badeend zat in de hoek, zijn zonnebril glinsterde in het licht. "Cool feest, man. Echt cool."`;

// ─── Login Screen ────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(false);

    // Quick validation call to the API
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script: "test-login-check-only", password: pw }),
    });

    setChecking(false);

    if (res.status === 401) {
      setError(true);
    } else {
      // 400 = password is correct but script too short, that's fine
      onLogin(pw);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-8 w-full max-w-md shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-karel-paars rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl text-gray-800 tracking-wider">
            Beheerder Login
          </h1>
          <p className="font-body text-gray-500 mt-2">
            Dit dashboard is alleen voor de beheerder.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="font-heading text-lg text-gray-700 block mb-2">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Voer het beheerderswachtwoord in"
              className="w-full px-4 py-3 font-body border-2 border-gray-300 rounded-xl focus:border-karel-paars focus:outline-none focus:ring-2 focus:ring-karel-paars/20 transition-all"
              autoFocus
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-600 font-body text-sm bg-red-50 px-4 py-2 rounded-lg"
            >
              <AlertCircle size={16} />
              Ongeldig wachtwoord. Probeer opnieuw.
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={!pw || checking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-karel-paars text-white font-heading text-xl py-3 rounded-xl border-2 border-black flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors disabled:opacity-50 tracking-wider"
          >
            {checking ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                Inloggen
              </>
            )}
          </motion.button>
        </form>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-6 text-gray-400 hover:text-karel-paars transition-colors font-body text-sm"
        >
          <ArrowLeft size={14} />
          Terug naar de website
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────
export default function Dashboard() {
  const [password, setPassword] = useState<string | null>(null);
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Not logged in → show login
  if (!password) {
    return <LoginScreen onLogin={(pw) => setPassword(pw)} />;
  }

  const handleGenerate = async () => {
    if (!script.trim()) return;
    setIsGenerating(true);
    setError(null);
    setGenerated(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setPassword(null); // session expired
          return;
        }
        throw new Error(data.error || "Onbekende fout");
      }

      setGenerated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis. Probeer opnieuw.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fillExample = () => {
    setScript(exampleScript);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-karel-paars border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white hover:text-donut-goud transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-white tracking-wider">
                AI Marketing Machine
              </h1>
              <p className="text-white/70 text-sm font-body">
                Beheerder Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/autopilot"
              className="flex items-center gap-2 bg-donut-goud/90 hover:bg-donut-goud text-black font-heading text-sm px-4 py-2 rounded-full transition-colors tracking-wide"
            >
              <Zap size={16} />
              Autopilot
            </Link>
            <Link
              href="/dashboard/wensen"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-heading text-sm px-4 py-2 rounded-full transition-colors tracking-wide"
            >
              <Inbox size={16} />
              Wensen Inbox
            </Link>
            <a
              href="https://analytics.google.com/analytics/web/#/p**/realtime/overview?params=_u..nav%3Dmaui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-heading text-sm px-4 py-2 rounded-full transition-colors tracking-wide"
            >
              <BarChart3 size={16} />
              Analytics
              <ExternalLink size={12} />
            </a>
            <Wand2 size={28} className="text-donut-goud" />
            <button
              onClick={() => setPassword(null)}
              className="text-white/60 hover:text-white transition-colors"
              title="Uitloggen"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-karel-paars" />
                <h2 className="font-heading text-2xl text-gray-800 tracking-wide">
                  Script Input
                </h2>
              </div>
              <p className="font-body text-gray-600 mb-4">
                Plak een afleveringsscript hieronder. De AI analyseert het en genereert marketing content.
              </p>

              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Plak hier het script van een aflevering..."
                rows={12}
                className="w-full px-4 py-3 font-body text-sm border-2 border-gray-300 rounded-lg focus:border-karel-paars focus:outline-none focus:ring-2 focus:ring-karel-paars/20 transition-all resize-none"
              />

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={!script.trim() || isGenerating}
                  className="flex-1 bg-karel-paars text-white font-heading text-xl py-3 rounded-lg border-2 border-black flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors disabled:opacity-50 tracking-wider"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Genereren...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Genereer Content
                    </>
                  )}
                </motion.button>

                <button
                  onClick={fillExample}
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg font-body text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Voorbeeld
                </button>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-4 text-red-600 font-body text-sm bg-red-50 px-4 py-3 rounded-lg"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Users, label: "Karakters", value: "20+", color: "text-karel-paars" },
                { icon: FileText, label: "Afleveringen", value: "10", color: "text-super-rood" },
                { icon: TrendingUp, label: "Seizoenen", value: "1", color: "text-terkwaas" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center"
                >
                  <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
                  <p className="font-heading text-2xl text-gray-800">{stat.value}</p>
                  <p className="font-body text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Output panel */}
          <div>
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Wand2 size={48} className="text-karel-paars" />
                  </motion.div>
                  <p className="font-heading text-2xl text-karel-paars mt-6 tracking-wider">
                    AI is aan het werk...
                  </p>
                  <p className="font-body text-gray-500 mt-2">
                    Even geduld, de magie gebeurt!
                  </p>
                </motion.div>
              ) : generated ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <OutputCard
                    icon={<Users size={20} className="text-terkwaas" />}
                    title="Opvoed-hack voor Ouders"
                    content={generated.opvoedHack}
                    field="opvoedHack"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                  <OutputCard
                    icon={<TrendingUp size={20} className="text-[#1DB954]" />}
                    title="SEO Spotify Titel"
                    content={generated.spotifyTitle}
                    field="spotifyTitle"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                  <OutputCard
                    icon={<FileText size={20} className="text-karel-paars" />}
                    title="Spotify Omschrijving"
                    content={generated.spotifyDescription}
                    field="spotifyDescription"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                  <OutputCard
                    icon={<Palette size={20} className="text-donut-goud" />}
                    title="AI Kleurplaat Prompt"
                    content={generated.coloringPrompt}
                    field="coloringPrompt"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                  <OutputCard
                    icon={<Sparkles size={20} className="text-super-rood" />}
                    title="Social Media Post"
                    content={generated.socialPost}
                    field="socialPost"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <Wand2 size={48} className="text-gray-300 mb-4" />
                  <p className="font-heading text-2xl text-gray-400 tracking-wider">
                    Wacht op Input
                  </p>
                  <p className="font-body text-gray-400 mt-2 text-center">
                    Plak een script en klik op &quot;Genereer Content&quot; om te beginnen.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Output Card ─────────────────────────────────────────────────
function OutputCard({
  icon,
  title,
  content,
  field,
  copiedField,
  onCopy,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  field: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-heading text-lg text-gray-800 tracking-wide">{title}</h3>
        </div>
        <button
          onClick={() => onCopy(content, field)}
          className="flex items-center gap-1 text-sm font-body text-gray-500 hover:text-karel-paars transition-colors"
        >
          {copiedField === field ? (
            <>
              <Check size={16} className="text-green-500" />
              <span className="text-green-500">Gekopieerd!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              Kopieer
            </>
          )}
        </button>
      </div>
      <p className="font-body text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}
