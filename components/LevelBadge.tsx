"use client";

import { Sparkles } from "lucide-react";
import { getLevel } from "@/lib/levels";

export default function LevelBadge({ xp }: { xp: number }) {
  const info = getLevel(xp);
  const pct = Math.round(info.progress * 100);
  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-500 leading-none mb-1">Level {info.level}</div>
            <div className="text-sm font-semibold text-white leading-none">{info.title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500 leading-none mb-1">XP</div>
          <div className="text-sm font-semibold text-white leading-none">
            {info.currentXP}
            {info.nextThreshold !== null && (
              <span className="text-zinc-600"> / {info.nextThreshold}</span>
            )}
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
