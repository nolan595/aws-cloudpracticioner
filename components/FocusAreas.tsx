"use client";

import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";
import type { Progress } from "@/hooks/useProgress";

const MIN_ATTEMPTS = 3;
const TOP_N = 3;

export default function FocusAreas({ progress }: { progress: Progress }) {
  const entries = Object.entries(progress.servicePerformance)
    .filter(([, s]) => s.total >= MIN_ATTEMPTS)
    .map(([service, s]) => ({
      service,
      correct: s.correct,
      total: s.total,
      accuracy: s.correct / s.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, TOP_N);

  if (entries.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-white">Focus Areas</h2>
        <span className="text-xs text-zinc-500 ml-auto">Weakest services</span>
      </div>
      <div className="space-y-2">
        {entries.map((e) => {
          const pct = Math.round(e.accuracy * 100);
          const barColor = pct < 50 ? "bg-red-500" : pct < 70 ? "bg-amber-500" : "bg-emerald-500";
          return (
            <Link
              key={e.service}
              href={`/practice?mode=smart&service=${encodeURIComponent(e.service)}`}
              className="group flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-zinc-950/40 hover:bg-zinc-800/60 hover:border-white/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white truncate">{e.service}</span>
                  <span className="text-xs text-zinc-400">
                    {e.correct}/{e.total} · <span className={pct < 60 ? "text-red-400" : pct < 80 ? "text-amber-400" : "text-emerald-400"}>{pct}%</span>
                  </span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-indigo-300 transition-colors">
                Drill it
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
