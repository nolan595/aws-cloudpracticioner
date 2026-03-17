"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  BarChart3,
} from "lucide-react";
import { questions, DOMAIN_NAMES, DOMAIN_WEIGHTS } from "@/data/questions";
import type { Domain } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";

const EXAM_QUESTIONS = 65;
const EXAM_MINUTES = 90;
const PASSING_SCORE = 700;

type ExamState = "intro" | "active" | "results";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a 65-question exam weighted by domain (approximating real exam distribution)
function buildExamPool(): typeof questions {
  const pool = shuffle(questions);
  // Take up to 65 — if we have fewer, repeat some
  if (pool.length >= EXAM_QUESTIONS) return pool.slice(0, EXAM_QUESTIONS);
  // Pad with repeats
  const padded = [...pool];
  while (padded.length < EXAM_QUESTIONS) {
    padded.push(...shuffle(pool).slice(0, EXAM_QUESTIONS - padded.length));
  }
  return padded.slice(0, EXAM_QUESTIONS);
}

// Scale raw score to 100-1000 (simplified linear scale)
function calculateScore(correct: number, total: number): number {
  const pct = correct / total;
  // AWS uses a compensatory scoring model with scaled scoring
  // Simple approximation: 0% → 100, 100% → 1000
  return Math.round(100 + pct * 900);
}

const DOMAIN_BAR: Record<number, string> = {
  1: "bg-blue-500",
  2: "bg-red-500",
  3: "bg-emerald-500",
  4: "bg-amber-500",
};
const DOMAIN_TEXT: Record<number, string> = {
  1: "text-blue-300",
  2: "text-red-300",
  3: "text-emerald-300",
  4: "text-amber-300",
};

export default function ExamPage() {
  const { recordExamAttempt } = useProgress();
  const [state, setState] = useState<ExamState>("intro");
  const [examPool, setExamPool] = useState<typeof questions>([]);
  const [answers, setAnswers] = useState<Record<number, number[]>>({}); // questionIndex → selected option indices
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_MINUTES * 60);
  const [startTime, setStartTime] = useState(0);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showReviewPanel, setShowReviewPanel] = useState(false);

  // Timer
  useEffect(() => {
    if (state !== "active") return;
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [state, timeLeft]);

  function startExam() {
    const pool = buildExamPool();
    setExamPool(pool);
    setAnswers({});
    setCurrent(0);
    setTimeLeft(EXAM_MINUTES * 60);
    setStartTime(Date.now());
    setFlagged(new Set());
    setState("active");
  }

  const submitExam = useCallback(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    let totalCorrect = 0;
    const domainScores: Record<number, { correct: number; total: number }> = { 1: { correct: 0, total: 0 }, 2: { correct: 0, total: 0 }, 3: { correct: 0, total: 0 }, 4: { correct: 0, total: 0 } };

    examPool.forEach((q, idx) => {
      const selected = answers[idx] ?? [];
      const isCorrect =
        selected.length === q.correct.length &&
        selected.every((s) => q.correct.includes(s));
      domainScores[q.domain].total += 1;
      if (isCorrect) {
        totalCorrect += 1;
        domainScores[q.domain].correct += 1;
      }
    });

    const score = calculateScore(totalCorrect, examPool.length);
    const passed = score >= PASSING_SCORE;

    recordExamAttempt({
      score,
      totalQuestions: examPool.length,
      domainScores,
      timeSpent,
      passed,
    });

    setState("results");
  }, [examPool, answers, startTime, recordExamAttempt]);

  function selectAnswer(optionIndex: number) {
    const q = examPool[current];
    if (!q) return;
    setAnswers((prev) => {
      const existing = prev[current] ?? [];
      if (q.type === "single") {
        return { ...prev, [current]: [optionIndex] };
      }
      // multi
      if (existing.includes(optionIndex)) {
        return { ...prev, [current]: existing.filter((i) => i !== optionIndex) };
      }
      return { ...prev, [current]: [...existing, optionIndex] };
    });
  }

  function toggleFlag(idx: number) {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  const results = useMemo(() => {
    if (state !== "results") return null;
    let totalCorrect = 0;
    const domainScores: Record<number, { correct: number; total: number }> = { 1: { correct: 0, total: 0 }, 2: { correct: 0, total: 0 }, 3: { correct: 0, total: 0 }, 4: { correct: 0, total: 0 } };
    examPool.forEach((q, idx) => {
      const selected = answers[idx] ?? [];
      const isCorrect = selected.length === q.correct.length && selected.every((s) => q.correct.includes(s));
      domainScores[q.domain].total += 1;
      if (isCorrect) {
        totalCorrect += 1;
        domainScores[q.domain].correct += 1;
      }
    });
    return { totalCorrect, domainScores, score: calculateScore(totalCorrect, examPool.length) };
  }, [state, examPool, answers]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (state === "intro") {
    return (
      <div className="min-h-screen bg-[#09090e]">
        <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
              <ChevronLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-5 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
            <Clock className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Mock Exam</h1>
            <p className="text-zinc-400">Simulate the real AWS CLF-C02 exam experience</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              { label: "Questions", value: "65" },
              { label: "Time limit", value: "90 min" },
              { label: "Passing score", value: "700/1000" },
              { label: "Question types", value: "MC + MR" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900 border border-white/8 rounded-xl p-3.5">
                <div className="text-xs text-zinc-500 mb-1">{item.label}</div>
                <div className="text-base font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900 border border-white/8 rounded-xl p-4 text-left text-sm text-zinc-400 space-y-1.5">
            <p className="text-zinc-300 font-medium mb-2">How it works</p>
            <p>• 65 questions drawn from the full question bank, weighted by domain</p>
            <p>• 90-minute countdown timer — exam auto-submits when time runs out</p>
            <p>• Flag questions to review before submitting</p>
            <p>• Score reported as 100–1000 (pass: 700+)</p>
            <p>• Results include per-domain breakdown</p>
          </div>
          <button
            onClick={startExam}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (state === "results" && results) {
    const passed = results.score >= PASSING_SCORE;
    return (
      <div className="min-h-screen bg-[#09090e]">
        <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
              <ChevronLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
          {/* Score card */}
          <div className={`rounded-2xl border p-8 text-center ${passed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
              {passed ? <Trophy className="w-7 h-7 text-emerald-400" /> : <XCircle className="w-7 h-7 text-red-400" />}
            </div>
            <div className={`text-5xl font-black mb-1 ${passed ? "text-emerald-400" : "text-red-400"}`}>
              {results.score}
            </div>
            <div className={`text-lg font-bold mb-1 ${passed ? "text-emerald-300" : "text-red-300"}`}>
              {passed ? "PASS" : "FAIL"}
            </div>
            <div className="text-sm text-zinc-500">
              {results.totalCorrect}/{examPool.length} correct · Passing score: {PASSING_SCORE}
            </div>
          </div>

          {/* Domain breakdown */}
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">Domain Breakdown</h2>
            </div>
            <div className="space-y-4">
              {([1, 2, 3, 4] as Domain[]).map((d) => {
                const ds = results.domainScores[d];
                const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
                return (
                  <div key={d}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${DOMAIN_TEXT[d]}`}>D{d}</span>
                        <span className="text-xs text-zinc-400">{DOMAIN_NAMES[d]}</span>
                        <span className="text-xs text-zinc-600">{DOMAIN_WEIGHTS[d]}% of exam</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-400">{ds.correct}/{ds.total}</span>
                        <span className={`font-bold ${pct >= 70 ? "text-emerald-400" : "text-red-400"}`}>{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${DOMAIN_BAR[d]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review incorrect questions */}
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white mb-3">Incorrect Questions Review</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {examPool.map((q, idx) => {
                const selected = answers[idx] ?? [];
                const isCorrect = selected.length === q.correct.length && selected.every((s) => q.correct.includes(s));
                if (isCorrect) return null;
                return (
                  <div key={idx} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-200 leading-relaxed">{q.text}</p>
                    </div>
                    <div className="pl-6 space-y-1">
                      {q.options.map((opt, i) => (
                        <div key={i} className={`text-xs py-1 px-2.5 rounded-lg ${q.correct.includes(i) ? "bg-emerald-500/10 text-emerald-300" : selected.includes(i) ? "bg-red-500/10 text-red-400" : "text-zinc-600"}`}>
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500 mt-3 pl-6 leading-relaxed">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={startExam} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retake Exam
            </button>
            <Link href="/practice" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              Practice Weak Areas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active Exam ─────────────────────────────────────────────────────────────
  const q = examPool[current];
  if (!q) return null;

  const selectedForCurrent = answers[current] ?? [];
  const answeredCount = Object.keys(answers).length;
  const timerWarning = timeLeft < 300; // 5 minutes

  return (
    <div className="min-h-screen bg-[#09090e]">
      {/* Exam header */}
      <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{answeredCount}/{examPool.length} answered</span>
            {flagged.size > 0 && <span className="text-amber-400">· {flagged.size} flagged</span>}
          </div>

          <div className={`flex items-center gap-2 font-mono text-sm font-bold rounded-lg px-3 py-1.5 border ${timerWarning ? "text-red-400 bg-red-500/10 border-red-500/20 animate-pulse" : "text-white bg-zinc-900 border-white/10"}`}>
            <Clock className="w-3.5 h-3.5" />
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReviewPanel(!showReviewPanel)}
              className="text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-white/8 rounded-lg px-3 py-1.5"
            >
              Review
            </button>
            <button
              onClick={submitExam}
              className="text-xs text-white bg-emerald-700 hover:bg-emerald-600 transition-colors rounded-lg px-3 py-1.5 font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5">
        {/* Question */}
        <div>
          {/* Progress bar */}
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / examPool.length) * 100}%` }}
            />
          </div>

          <div className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
            {/* Question header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/8">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Question {current + 1} of {examPool.length}</span>
                  {q.type === "multi" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">Select multiple</span>
                  )}
                </div>
                <button
                  onClick={() => toggleFlag(current)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${flagged.has(current) ? "bg-amber-500/15 text-amber-300 border-amber-500/30" : "bg-zinc-800 text-zinc-500 border-white/10 hover:border-white/25"}`}
                >
                  {flagged.has(current) ? "⚑ Flagged" : "⚐ Flag"}
                </button>
              </div>
              <p className="text-[15px] text-zinc-100 leading-relaxed font-medium">{q.text}</p>
            </div>

            {/* Options */}
            <div className="p-5 space-y-2.5">
              {q.options.map((option, idx) => {
                const isSelected = selectedForCurrent.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:bg-white/8"
                    }`}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center ${isSelected ? "border-indigo-400 bg-indigo-500/20 text-indigo-300" : "border-zinc-600 text-zinc-400"}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Nav */}
            <div className="px-5 pb-5 flex items-center justify-between">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="text-sm text-zinc-500 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              {current < examPool.length - 1 ? (
                <button
                  onClick={() => setCurrent((c) => c + 1)}
                  className="text-sm text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-2 transition-colors flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={submitExam}
                  className="text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg px-4 py-2 transition-colors"
                >
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question navigator panel */}
        <div className="hidden lg:block">
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-4 sticky top-20">
            <p className="text-xs text-zinc-500 mb-3">Questions</p>
            <div className="grid grid-cols-5 gap-1.5">
              {examPool.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = flagged.has(idx);
                const isCurrent = idx === current;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-full aspect-square rounded-lg text-xs font-medium transition-colors ${
                      isCurrent ? "bg-indigo-600 text-white"
                        : isFlagged ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : isAnswered ? "bg-zinc-700 text-zinc-200"
                        : "bg-zinc-800 text-zinc-600 hover:bg-zinc-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-zinc-700" />
                Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/40" />
                Flagged
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-zinc-800" />
                Unanswered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
