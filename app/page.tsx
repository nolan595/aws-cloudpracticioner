"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Clock,
  Layers,
  BookOpen,
  TrendingUp,
  Flame,
  Target,
  Trophy,
  ChevronRight,
  CheckCircle,
  BarChart3,
  Zap,
  FileText,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { questions, DOMAIN_NAMES, DOMAIN_WEIGHTS } from "@/data/questions";
import type { Domain } from "@/data/questions";

const PASSING_SCORE = 700;

const DOMAIN_COLORS: Record<number, { bar: string; text: string }> = {
  1: { bar: "bg-blue-500", text: "text-blue-300" },
  2: { bar: "bg-red-500", text: "text-red-300" },
  3: { bar: "bg-emerald-500", text: "text-emerald-300" },
  4: { bar: "bg-amber-500", text: "text-amber-300" },
};

export default function Dashboard() {
  const { progress, stats } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090e] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const domainStats = ([1, 2, 3, 4] as Domain[]).map((d) => {
    const qs = questions.filter((q) => q.domain === d);
    const answered = qs.filter((q) => progress.questionsAnswered[q.id] !== undefined);
    const correct = qs.filter((q) => progress.questionsAnswered[q.id] === true);
    return {
      domain: d,
      total: qs.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: answered.length > 0 ? Math.round((correct.length / answered.length) * 100) : null,
    };
  });

  const lastAttempt = progress.examAttempts[progress.examAttempts.length - 1] ?? null;
  const estimatedReadiness = stats.accuracy === 0
    ? 0
    : Math.min(100, Math.round(stats.accuracy * 0.85 + (stats.totalAnswered / questions.length) * 15));

  return (
    <div className="min-h-screen bg-[#09090e]">
      <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">CLF-C02 Prep</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-white/8 rounded-full px-3 py-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            AWS Cloud Practitioner
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Study Dashboard</h1>
          <p className="text-zinc-400 text-sm">65 questions · 90 minutes · Passing score 700/1000</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Questions Answered",
              value: `${stats.totalAnswered}/${questions.length}`,
              icon: <CheckCircle className="w-[18px] h-[18px] text-emerald-400" />,
              sub: `${Math.round((stats.totalAnswered / questions.length) * 100)}% complete`,
            },
            {
              label: "Accuracy",
              value: stats.totalAnswered > 0 ? `${stats.accuracy}%` : "—",
              icon: <Target className="w-[18px] h-[18px] text-indigo-400" />,
              sub: stats.accuracy >= 70 ? "On track" : stats.totalAnswered > 0 ? "Needs work" : "Start practising",
            },
            {
              label: "Study Streak",
              value: `${progress.studyStreak}d`,
              icon: <Flame className="w-[18px] h-[18px] text-orange-400" />,
              sub: progress.studyStreak > 0 ? "Keep it up!" : "Start today",
            },
            {
              label: "Best Exam Score",
              value: stats.bestExamScore !== null ? `${stats.bestExamScore}` : "—",
              icon: <Trophy className="w-[18px] h-[18px] text-amber-400" />,
              sub: stats.bestExamScore !== null
                ? stats.bestExamScore >= PASSING_SCORE ? "PASS" : `Need ${PASSING_SCORE}`
                : "Take a mock exam",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-white/8 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                {stat.icon}
                <span className="text-xs text-zinc-500">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Readiness */}
        {stats.totalAnswered > 0 && (
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">Estimated Readiness</span>
              </div>
              <span className="text-sm font-bold text-white">{estimatedReadiness}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-700"
                style={{ width: `${estimatedReadiness}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              {estimatedReadiness < 40 ? "Keep studying — focus on weak domains first."
                : estimatedReadiness < 70 ? "Good progress. Take a mock exam to benchmark yourself."
                : estimatedReadiness < 85 ? "Getting close. Review incorrect questions and keep taking mocks."
                : "Looking strong! Schedule your exam when you're consistently scoring 750+."}
            </p>
          </div>
        )}

        {/* Domain breakdown */}
        <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white">Domain Progress</h2>
          </div>
          <div className="space-y-4">
            {domainStats.map((ds) => {
              const c = DOMAIN_COLORS[ds.domain];
              return (
                <div key={ds.domain}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${c.text}`}>D{ds.domain}</span>
                      <span className="text-xs text-zinc-400">{DOMAIN_NAMES[ds.domain as Domain]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-zinc-500">{DOMAIN_WEIGHTS[ds.domain as Domain]}% of exam</span>
                      {ds.accuracy !== null && (
                        <span className={`font-semibold ${ds.accuracy >= 70 ? "text-emerald-400" : "text-red-400"}`}>
                          {ds.accuracy}%
                        </span>
                      )}
                      <span className="text-zinc-600">{ds.answered}/{ds.total}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                      style={{ width: `${(ds.answered / ds.total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/practice",
              title: "Practice Questions",
              description: "Filter by domain, practise at your own pace with instant explanations after each answer.",
              icon: <FlaskConical className="w-5 h-5" />,
              color: "indigo",
              badge: `${questions.length} questions`,
            },
            {
              href: "/exam",
              title: "Mock Exam",
              description: "Full 65-question timed simulation. Scored 100–1000. See domain-level breakdown.",
              icon: <Clock className="w-5 h-5" />,
              color: "emerald",
              badge: lastAttempt ? `Last: ${lastAttempt.score}` : "Not attempted",
            },
            {
              href: "/services",
              title: "Service Reference",
              description: "Every AWS service on the exam with key facts, use cases, and exam tips.",
              icon: <Layers className="w-5 h-5" />,
              color: "purple",
              badge: "50+ services",
            },
            {
              href: "/exam-guide",
              title: "Exam Guide",
              description: "Domain weights, task statements, support plans, Well-Architected pillars, and more.",
              icon: <BookOpen className="w-5 h-5" />,
              color: "amber",
              badge: "CLF-C02",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-zinc-900 border border-white/8 rounded-2xl p-5 hover:border-white/20 hover:bg-zinc-800/80 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-xl ${
                  card.color === "indigo" ? "bg-indigo-500/10 text-indigo-400"
                    : card.color === "emerald" ? "bg-emerald-500/10 text-emerald-400"
                    : card.color === "purple" ? "bg-purple-500/10 text-purple-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}>
                  {card.icon}
                </div>
                <span className="text-xs text-zinc-500 bg-zinc-800 border border-white/8 px-2 py-1 rounded-full">
                  {card.badge}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                Open <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Exam history */}
        {progress.examAttempts.length > 0 && (
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-400" />
              Exam History
            </h2>
            <div className="space-y-1">
              {[...progress.examAttempts].reverse().slice(0, 5).map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${attempt.passed ? "bg-emerald-500" : "bg-red-500"}`} />
                    <div>
                      <div className="text-sm text-zinc-200 font-medium">
                        {attempt.passed ? "PASS" : "FAIL"} · {attempt.score}/1000
                      </div>
                      <div className="text-xs text-zinc-500">
                        {new Date(attempt.date).toLocaleDateString()} · {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600">{attempt.totalQuestions}q</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
