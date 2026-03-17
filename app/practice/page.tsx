"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Shuffle, Filter, RefreshCw, Bookmark, AlertTriangle } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import { questions, DOMAIN_NAMES, DOMAIN_WEIGHTS } from "@/data/questions";
import type { Domain } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

type FilterMode = "all" | "domain" | "bookmarked" | "incorrect";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DOMAIN_COLORS: Record<number, string> = {
  1: "bg-blue-500/10 text-blue-300 border-blue-500/20 data-[active=true]:bg-blue-500/20 data-[active=true]:border-blue-400",
  2: "bg-red-500/10 text-red-300 border-red-500/20 data-[active=true]:bg-red-500/20 data-[active=true]:border-red-400",
  3: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 data-[active=true]:bg-emerald-500/20 data-[active=true]:border-emerald-400",
  4: "bg-amber-500/10 text-amber-300 border-amber-500/20 data-[active=true]:bg-amber-500/20 data-[active=true]:border-amber-400",
};

export default function PracticePage() {
  const { progress, recordAnswer, toggleBookmark } = useProgress();
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [shuffled, setShuffled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0); // forces QuestionCard remount

  const filteredQuestions = useMemo(() => {
    let pool = [...questions];

    if (filterMode === "domain" && selectedDomain) {
      pool = pool.filter((q) => q.domain === selectedDomain);
    } else if (filterMode === "bookmarked") {
      pool = pool.filter((q) => progress.bookmarkedQuestions.includes(q.id));
    } else if (filterMode === "incorrect") {
      pool = pool.filter((q) => progress.incorrectQuestions.includes(q.id));
    }

    return shuffled ? shuffle(pool) : pool;
  }, [filterMode, selectedDomain, shuffled, progress.bookmarkedQuestions, progress.incorrectQuestions]);

  const currentQuestion = filteredQuestions[currentIndex];

  function handleAnswer(correct: boolean) {
    if (!currentQuestion) return;
    recordAnswer(currentQuestion.id, correct);
  }

  function nextQuestion() {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSessionKey((k) => k + 1);
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSessionKey((k) => k + 1);
    }
  }

  function restartSession() {
    setCurrentIndex(0);
    setSessionKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-[#09090e]">
      <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-sm font-medium text-white">Practice Questions</span>
          <div className="text-xs text-zinc-500">
            {currentIndex + 1}/{filteredQuestions.length}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-6 space-y-5">
        {/* Filters */}
        <div className="bg-zinc-900 border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400">
            <Filter className="w-3.5 h-3.5" />
            Filter questions
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => { setFilterMode("all"); setSelectedDomain(null); setCurrentIndex(0); setSessionKey(k => k + 1); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filterMode === "all" ? "bg-indigo-500/20 text-indigo-300 border-indigo-400" : "bg-zinc-800 text-zinc-400 border-white/10 hover:border-white/25"}`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => { setFilterMode("bookmarked"); setCurrentIndex(0); setSessionKey(k => k + 1); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${filterMode === "bookmarked" ? "bg-amber-500/20 text-amber-300 border-amber-400" : "bg-zinc-800 text-zinc-400 border-white/10 hover:border-white/25"}`}
            >
              <Bookmark className="w-3 h-3" />
              Bookmarked ({progress.bookmarkedQuestions.length})
            </button>
            <button
              onClick={() => { setFilterMode("incorrect"); setCurrentIndex(0); setSessionKey(k => k + 1); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${filterMode === "incorrect" ? "bg-red-500/20 text-red-300 border-red-400" : "bg-zinc-800 text-zinc-400 border-white/10 hover:border-white/25"}`}
            >
              <AlertTriangle className="w-3 h-3" />
              Incorrect ({progress.incorrectQuestions.length})
            </button>
          </div>

          {/* Domain filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            {([1, 2, 3, 4] as Domain[]).map((d) => {
              const count = questions.filter((q) => q.domain === d).length;
              const isActive = filterMode === "domain" && selectedDomain === d;
              return (
                <button
                  key={d}
                  data-active={isActive}
                  onClick={() => {
                    setFilterMode("domain");
                    setSelectedDomain(d);
                    setCurrentIndex(0);
                    setSessionKey(k => k + 1);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${DOMAIN_COLORS[d]} ${isActive ? "opacity-100" : "opacity-70 hover:opacity-90"}`}
                >
                  D{d}: {DOMAIN_NAMES[d]} ({count}) · {DOMAIN_WEIGHTS[d]}%
                </button>
              );
            })}
          </div>

          {/* Shuffle toggle */}
          <button
            onClick={() => { setShuffled(!shuffled); setCurrentIndex(0); setSessionKey(k => k + 1); }}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${shuffled ? "bg-purple-500/20 text-purple-300 border-purple-400" : "bg-zinc-800 text-zinc-400 border-white/10 hover:border-white/25"}`}
          >
            <Shuffle className="w-3 h-3" />
            {shuffled ? "Shuffled" : "In order"} — click to toggle
          </button>
        </div>

        {/* Question */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-10 text-center">
            <p className="text-zinc-400 text-sm">No questions match this filter.</p>
          </div>
        ) : (
          <QuestionCard
            key={`${currentQuestion.id}-${sessionKey}`}
            question={currentQuestion}
            onAnswer={handleAnswer}
            bookmarked={progress.bookmarkedQuestions.includes(currentQuestion.id)}
            onBookmark={() => toggleBookmark(currentQuestion.id)}
            showNext={currentIndex < filteredQuestions.length - 1}
            onNext={nextQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={filteredQuestions.length}
          />
        )}

        {/* Navigation */}
        {filteredQuestions.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="text-xs text-zinc-500 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            <button
              onClick={restartSession}
              className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restart
            </button>

            <div className="text-xs text-zinc-600">
              {currentIndex + 1} of {filteredQuestions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
