"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  Loader2,
  AlertCircle,
  LogOut,
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Facebook,
  Instagram,
  Send,
  Zap,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Bot,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────

interface ScheduledPost {
  id: string;
  content_type: string;
  content_type_label: string;
  episode_number: number;
  episode_title: string;
  text: string;
  hashtags: string[];
  image_prompt: string;
  scheduled_for: string;
  status: "queued" | "approved" | "posted" | "failed";
  platforms: string[];
  platform_results?: Record<string, unknown>;
  error_message?: string;
  posted_at?: string;
  created_at: string;
}

interface Stats {
  postsThisWeek: number;
  nextScheduled: string | null;
  totalQueued: number;
  totalPosted: number;
  totalFailed: number;
}

interface PlatformStatus {
  facebook: boolean;
  instagram: boolean;
}

interface ContentTypeOption {
  type: string;
  label: string;
}

interface EpisodeOption {
  number: number;
  title: string;
}

// ─── Status Badge Colors ──────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; bgColor: string; textColor: string }
> = {
  queued: {
    label: "In wachtrij",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  approved: {
    label: "Goedgekeurd",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  posted: {
    label: "Gepost",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  failed: {
    label: "Mislukt",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

const CONTENT_TYPE_COLORS: Record<string, string> = {
  opvoed_tip: "bg-purple-100 text-purple-700",
  behind_scenes: "bg-pink-100 text-pink-700",
  karakter_spotlight: "bg-terkwaas/20 text-teal-700",
  quote: "bg-yellow-100 text-yellow-700",
  vraag_aan_kids: "bg-orange-100 text-orange-700",
  fun_fact: "bg-indigo-100 text-indigo-700",
  luister_tip: "bg-green-100 text-green-700",
};

// ─── Login Screen ─────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(false);

    // Validate password by calling the autopilot API
    const res = await fetch("/api/autopilot", {
      headers: { "x-admin-password": pw },
    });

    setChecking(false);

    if (res.status === 401) {
      setError(true);
    } else {
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
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl text-gray-800 tracking-wider">
            Autopilot
          </h1>
          <p className="font-body text-gray-500 mt-2">
            AI Social Media Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="font-heading text-lg text-gray-700 block mb-2"
            >
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
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
          href="/dashboard"
          className="flex items-center justify-center gap-2 mt-6 text-gray-400 hover:text-karel-paars transition-colors font-body text-sm"
        >
          <ArrowLeft size={14} />
          Terug naar dashboard
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────

function PostCard({
  post,
  onApprove,
  onEdit,
  onDelete,
  isUpdating,
}: {
  post: ScheduledPost;
  onApprove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  isUpdating: string | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const statusConfig = STATUS_CONFIG[post.status] || STATUS_CONFIG.queued;
  const typeColor =
    CONTENT_TYPE_COLORS[post.content_type] || "bg-gray-100 text-gray-700";

  const scheduledDate = new Date(post.scheduled_for);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== post.text) {
      onEdit(post.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-white rounded-xl border-2 ${
        post.status === "failed"
          ? "border-red-200"
          : post.status === "posted"
          ? "border-green-200"
          : "border-gray-200"
      } shadow-sm overflow-hidden`}
    >
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Date and badges row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="flex items-center gap-1 text-sm font-body text-gray-500">
                <Calendar size={14} />
                {scheduledDate.toLocaleDateString("nl-NL", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="flex items-center gap-1 text-sm font-body text-gray-500">
                <Clock size={14} />
                {scheduledDate.toLocaleTimeString("nl-NL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Platform icons */}
              <div className="flex items-center gap-1">
                {(post.platforms || []).includes("facebook") && (
                  <Facebook size={14} className="text-blue-600" />
                )}
                {(post.platforms || []).includes("instagram") && (
                  <Instagram size={14} className="text-pink-600" />
                )}
              </div>
            </div>

            {/* Content type + status badges */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-body ${typeColor}`}
              >
                {post.content_type_label || post.content_type}
              </span>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-body ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                {statusConfig.label}
              </span>
              <span className="text-xs font-body text-gray-400">
                Afl. {post.episode_number}: {post.episode_title}
              </span>
            </div>

            {/* Text preview */}
            <p className="font-body text-sm text-gray-700 line-clamp-2">
              {post.text}
            </p>
          </div>

          {/* Expand icon */}
          <div className="flex-shrink-0 text-gray-400 mt-1">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              {/* Full text or edit mode */}
              {editing ? (
                <div className="mb-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 font-body text-sm border-2 border-karel-paars/50 rounded-lg focus:border-karel-paars focus:outline-none resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1 px-3 py-1.5 bg-karel-paars text-white font-body text-sm rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Check size={14} />
                      Opslaan
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditText(post.text);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 font-body text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X size={14} />
                      Annuleren
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <p className="font-body text-sm text-gray-700 whitespace-pre-wrap">
                    {post.text}
                  </p>
                  {post.hashtags && post.hashtags.length > 0 && (
                    <p className="font-body text-sm text-karel-paars mt-2">
                      {post.hashtags.join(" ")}
                    </p>
                  )}
                </div>
              )}

              {/* Image prompt */}
              {post.image_prompt && (
                <div className="mb-3 bg-gray-50 rounded-lg p-3">
                  <p className="font-body text-xs text-gray-500 mb-1">
                    Image prompt:
                  </p>
                  <p className="font-body text-xs text-gray-600">
                    {post.image_prompt}
                  </p>
                </div>
              )}

              {/* Error message */}
              {post.error_message && (
                <div className="mb-3 bg-red-50 rounded-lg p-3">
                  <p className="font-body text-xs text-red-600">
                    Fout: {post.error_message}
                  </p>
                </div>
              )}

              {/* Actions */}
              {(post.status === "queued" || post.status === "failed") && (
                <div className="flex items-center gap-2 flex-wrap">
                  {post.status === "queued" && (
                    <button
                      onClick={() => onApprove(post.id)}
                      disabled={isUpdating === post.id}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 font-body text-sm rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {isUpdating === post.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}
                      Goedkeuren
                    </button>
                  )}

                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 font-body text-sm rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit3 size={14} />
                      Bewerken
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Weet je zeker dat je deze post wilt verwijderen?"
                        )
                      ) {
                        onDelete(post.id);
                      }
                    }}
                    disabled={isUpdating === post.id}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 font-body text-sm rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    Verwijderen
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Generate Modal ───────────────────────────────────────────────

function GenerateModal({
  contentTypes,
  episodes,
  password,
  onClose,
  onGenerated,
}: {
  contentTypes: ContentTypeOption[];
  episodes: EpisodeOption[];
  password: string;
  onClose: () => void;
  onGenerated: () => void;
}) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<number | "">("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const body: Record<string, unknown> = {};
      if (selectedType) body.contentType = selectedType;
      if (selectedEpisode) body.episodeNumber = selectedEpisode;

      const res = await fetch("/api/autopilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generatie mislukt");
      }

      onGenerated();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Er ging iets mis"
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border-2 border-gray-200 p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-gray-800 tracking-wide">
            Genereer Content
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-heading text-sm text-gray-700 block mb-1">
              Content Type (optioneel)
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 font-body text-sm border-2 border-gray-300 rounded-lg focus:border-karel-paars focus:outline-none"
            >
              <option value="">Willekeurig</option>
              {contentTypes.map((ct) => (
                <option key={ct.type} value={ct.type}>
                  {ct.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-heading text-sm text-gray-700 block mb-1">
              Aflevering (optioneel)
            </label>
            <select
              value={selectedEpisode}
              onChange={(e) =>
                setSelectedEpisode(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              className="w-full px-3 py-2.5 font-body text-sm border-2 border-gray-300 rounded-lg focus:border-karel-paars focus:outline-none"
            >
              <option value="">Willekeurig</option>
              {episodes.map((ep) => (
                <option key={ep.number} value={ep.number}>
                  {ep.number}. {ep.title}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 font-body text-sm bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-karel-paars text-white font-heading text-lg py-3 rounded-xl border-2 border-black flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors disabled:opacity-50 tracking-wider"
          >
            {generating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Genereren...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Genereer Nu
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────

export default function AutopilotPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [platformStatus, setPlatformStatus] =
    useState<PlatformStatus | null>(null);
  const [contentTypes, setContentTypes] = useState<ContentTypeOption[]>([]);
  const [episodes, setEpisodes] = useState<EpisodeOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingPost, setUpdatingPost] = useState<string | null>(null);
  const [autoApprove, setAutoApprove] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch data
  const fetchData = useCallback(
    async (pw: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/autopilot", {
          headers: { "x-admin-password": pw },
        });

        if (res.status === 401) {
          setPassword(null);
          return;
        }

        if (!res.ok) throw new Error("Kon data niet ophalen");

        const data = await res.json();
        setPosts(data.posts || []);
        setStats(data.stats || null);
        setPlatformStatus(data.platformStatus || null);
        setContentTypes(data.contentTypes || []);
        setEpisodes(data.episodes || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Fout bij ophalen"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (password) fetchData(password);
  }, [password, fetchData]);

  // Actions
  const handleApprove = async (id: string) => {
    if (!password) return;
    setUpdatingPost(id);

    try {
      const res = await fetch("/api/autopilot", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id, action: "approve" }),
      });

      if (res.ok) {
        fetchData(password);
      }
    } finally {
      setUpdatingPost(null);
    }
  };

  const handleEdit = async (id: string, text: string) => {
    if (!password) return;
    setUpdatingPost(id);

    try {
      const res = await fetch("/api/autopilot", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id, action: "edit", text }),
      });

      if (res.ok) {
        fetchData(password);
      }
    } finally {
      setUpdatingPost(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!password) return;
    setUpdatingPost(id);

    try {
      const res = await fetch("/api/autopilot", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id, action: "delete" }),
      });

      if (res.ok) {
        fetchData(password);
      }
    } finally {
      setUpdatingPost(null);
    }
  };

  // Login
  if (!password) {
    return <LoginScreen onLogin={(pw) => setPassword(pw)} />;
  }

  // Filter posts
  const filteredPosts =
    statusFilter === "all"
      ? posts
      : posts.filter((p) => p.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-karel-paars border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-white hover:text-donut-goud transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-white tracking-wider">
                Autopilot
              </h1>
              <p className="text-white/70 text-sm font-body">
                AI Social Media Manager
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(password)}
              disabled={loading}
              className="text-white hover:text-donut-goud transition-colors"
              title="Vernieuwen"
            >
              <RefreshCw
                size={20}
                className={loading ? "animate-spin" : ""}
              />
            </button>
            <Bot size={28} className="text-donut-goud" />
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

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Bar */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center">
              <BarChart3
                size={22}
                className="text-karel-paars mx-auto mb-1"
              />
              <p className="font-heading text-2xl text-gray-800">
                {stats.postsThisWeek}
              </p>
              <p className="font-body text-xs text-gray-500">
                Gepost deze week
              </p>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center">
              <Send
                size={22}
                className="text-terkwaas mx-auto mb-1"
              />
              <p className="font-heading text-2xl text-gray-800">
                {stats.totalQueued}
              </p>
              <p className="font-body text-xs text-gray-500">
                In wachtrij
              </p>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center">
              <CheckCircle2
                size={22}
                className="text-green-500 mx-auto mb-1"
              />
              <p className="font-heading text-2xl text-gray-800">
                {stats.totalPosted}
              </p>
              <p className="font-body text-xs text-gray-500">
                Totaal gepost
              </p>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center">
              <Clock
                size={22}
                className="text-donut-goud mx-auto mb-1"
              />
              <p className="font-heading text-lg text-gray-800">
                {stats.nextScheduled
                  ? new Date(stats.nextScheduled).toLocaleDateString(
                      "nl-NL",
                      { weekday: "short", day: "numeric", month: "short" }
                    )
                  : "Geen"}
              </p>
              <p className="font-body text-xs text-gray-500">
                Volgende post
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Panel (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowGenerateModal(true)}
                className="w-full bg-karel-paars text-white font-heading text-lg py-3 rounded-xl border-2 border-black flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors tracking-wider"
              >
                <Sparkles size={18} />
                Genereer Nu
              </motion.button>

              {/* Auto-approve toggle */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading text-sm text-gray-800 tracking-wide">
                      Auto-approve
                    </p>
                    <p className="font-body text-xs text-gray-500">
                      Posts direct goedkeuren
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoApprove(!autoApprove)}
                    className="text-karel-paars"
                  >
                    {autoApprove ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-300" />
                    )}
                  </button>
                </div>
                {autoApprove && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs text-terkwaas mt-2"
                  >
                    Nieuwe posts worden automatisch goedgekeurd
                  </motion.p>
                )}
              </div>

              {/* Platform Status */}
              {platformStatus && (
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                  <p className="font-heading text-sm text-gray-800 tracking-wide mb-3">
                    Platforms
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Facebook size={16} className="text-blue-600" />
                        <span className="font-body text-sm text-gray-700">
                          Facebook
                        </span>
                      </div>
                      {platformStatus.facebook ? (
                        <span className="flex items-center gap-1 text-green-600 font-body text-xs">
                          <CheckCircle2 size={12} />
                          Verbonden
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 font-body text-xs">
                          <XCircle size={12} />
                          Niet verbonden
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram size={16} className="text-pink-600" />
                        <span className="font-body text-sm text-gray-700">
                          Instagram
                        </span>
                      </div>
                      {platformStatus.instagram ? (
                        <span className="flex items-center gap-1 text-green-600 font-body text-xs">
                          <CheckCircle2 size={12} />
                          Verbonden
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 font-body text-xs">
                          <XCircle size={12} />
                          Niet verbonden
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Filter */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <p className="font-heading text-sm text-gray-800 tracking-wide mb-3">
                  Filter
                </p>
                <div className="space-y-1">
                  {[
                    { value: "all", label: "Alles", count: posts.length },
                    {
                      value: "queued",
                      label: "Wachtrij",
                      count: posts.filter((p) => p.status === "queued")
                        .length,
                    },
                    {
                      value: "approved",
                      label: "Goedgekeurd",
                      count: posts.filter((p) => p.status === "approved")
                        .length,
                    },
                    {
                      value: "posted",
                      label: "Gepost",
                      count: posts.filter((p) => p.status === "posted")
                        .length,
                    },
                    {
                      value: "failed",
                      label: "Mislukt",
                      count: posts.filter((p) => p.status === "failed")
                        .length,
                    },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-body text-sm transition-colors ${
                        statusFilter === filter.value
                          ? "bg-karel-paars/10 text-karel-paars"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span
                        className={`text-xs ${
                          statusFilter === filter.value
                            ? "text-karel-paars"
                            : "text-gray-400"
                        }`}
                      >
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Back to Dashboard */}
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full py-2 text-gray-400 hover:text-karel-paars transition-colors font-body text-sm"
              >
                <ArrowLeft size={14} />
                Terug naar dashboard
              </Link>
            </div>
          </div>

          {/* Content Calendar */}
          <div className="lg:col-span-3">
            {loading && posts.length === 0 ? (
              <div className="text-center py-20">
                <Loader2
                  size={40}
                  className="animate-spin text-karel-paars mx-auto"
                />
                <p className="font-body text-gray-500 mt-4">
                  Content ophalen...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <AlertCircle size={40} className="text-red-400 mx-auto" />
                <p className="font-body text-red-600 mt-4">{error}</p>
                <button
                  onClick={() => fetchData(password)}
                  className="mt-4 font-body text-sm text-karel-paars hover:underline"
                >
                  Opnieuw proberen
                </button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center"
              >
                <Zap size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="font-heading text-2xl text-gray-400 tracking-wider">
                  {statusFilter === "all"
                    ? "Nog geen content"
                    : "Geen posts met deze status"}
                </p>
                <p className="font-body text-gray-400 mt-2">
                  Klik op &quot;Genereer Nu&quot; om AI-content te maken voor
                  social media.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGenerateModal(true)}
                  className="mt-6 bg-karel-paars text-white font-heading text-lg px-6 py-2.5 rounded-xl border-2 border-black inline-flex items-center gap-2 hover:bg-purple-600 transition-colors tracking-wider"
                >
                  <Sparkles size={16} />
                  Genereer Content
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-heading text-lg text-gray-700 tracking-wide">
                    Content Kalender
                  </p>
                  <p className="font-body text-sm text-gray-500">
                    {filteredPosts.length} post
                    {filteredPosts.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onApprove={handleApprove}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      isUpdating={updatingPost}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Generate Modal */}
      <AnimatePresence>
        {showGenerateModal && (
          <GenerateModal
            contentTypes={contentTypes}
            episodes={episodes}
            password={password}
            onClose={() => setShowGenerateModal(false)}
            onGenerated={() => fetchData(password)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
