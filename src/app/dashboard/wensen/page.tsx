"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RefreshCw,
  Clock,
  User,
  MessageSquare,
  Lock,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";
import Link from "next/link";

interface Wens {
  id: string;
  name: string;
  wish: string;
  created_at: string;
}

export default function WensenPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [pw, setPw] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [wensen, setWensen] = useState<Wens[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWensen = useCallback(async (adminPw: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wensen", {
        headers: { "x-admin-password": adminPw },
      });
      if (res.status === 401) {
        setPassword(null);
        setLoginError(true);
        return;
      }
      if (!res.ok) throw new Error("Kon wensen niet ophalen");
      const data = await res.json();
      setWensen(data.wensen || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fout bij ophalen");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (password) fetchWensen(password);
  }, [password, fetchWensen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw) return;
    setLoginError(false);
    setPassword(pw);
  };

  // Login screen
  if (!password) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 w-full max-w-md shadow-lg">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-karel-paars rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="font-heading text-2xl text-gray-800 tracking-wider">Wensen Inbox</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4" action="/dashboard/wensen">
            <input type="hidden" name="username" autoComplete="username" value="admin" />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setLoginError(false); }}
              placeholder="Beheerderswachtwoord"
              className="w-full px-4 py-3 font-body border-2 border-gray-300 rounded-xl focus:border-karel-paars focus:outline-none"
              autoFocus
            />
            {loginError && (
              <p className="text-red-600 text-sm font-body flex items-center gap-1">
                <AlertCircle size={14} /> Ongeldig wachtwoord
              </p>
            )}
            <button className="w-full bg-karel-paars text-white font-heading text-lg py-3 rounded-xl border-2 border-black tracking-wider">
              Bekijk Wensen
            </button>
          </form>
          <Link href="/dashboard" className="flex items-center justify-center gap-2 mt-4 text-gray-400 hover:text-karel-paars transition-colors font-body text-sm">
            <ArrowLeft size={14} /> Terug naar dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-karel-paars border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-white hover:text-donut-goud transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="font-heading text-2xl text-white tracking-wider">
                Wensen Inbox
              </h1>
              <p className="text-white/70 text-sm font-body">
                {wensen.length} wens{wensen.length !== 1 ? "en" : ""} ontvangen
              </p>
            </div>
          </div>
          <button
            onClick={() => fetchWensen(password)}
            disabled={loading}
            className="text-white hover:text-donut-goud transition-colors"
            title="Vernieuwen"
          >
            <RefreshCw size={22} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading && wensen.length === 0 ? (
          <div className="text-center py-20">
            <Loader2 size={40} className="animate-spin text-karel-paars mx-auto" />
            <p className="font-body text-gray-500 mt-4">Wensen ophalen...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle size={40} className="text-red-400 mx-auto" />
            <p className="font-body text-red-600 mt-4">{error}</p>
          </div>
        ) : wensen.length === 0 ? (
          <div className="text-center py-20">
            <Inbox size={48} className="text-gray-300 mx-auto" />
            <p className="font-heading text-2xl text-gray-400 mt-4 tracking-wider">
              Nog geen wensen
            </p>
            <p className="font-body text-gray-400 mt-2">
              Zodra kinderen het formulier invullen, verschijnen hun wensen hier.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {wensen.map((wens, i) => (
              <motion.div
                key={wens.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-karel-paars" />
                    <span className="font-heading text-lg text-gray-800 tracking-wide">
                      {wens.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-body">
                    <Clock size={12} />
                    {new Date(wens.created_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <MessageSquare size={16} className="text-terkwaas flex-shrink-0 mt-0.5" />
                  <p className="font-body text-gray-700">{wens.wish}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
