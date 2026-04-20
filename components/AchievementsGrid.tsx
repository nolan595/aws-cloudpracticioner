"use client";

import { Award, Footprints, Target, Flame, Zap, Clock, Trophy, Sword, CheckCheck, Lock } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Target,
  Flame,
  Zap,
  Clock,
  Trophy,
  Sword,
  CheckCheck,
  Award,
};

export default function AchievementsGrid({ earned }: { earned: string[] }) {
  const set = new Set(earned);
  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-white">Achievements</h2>
        <span className="text-xs text-zinc-500 ml-auto">
          {earned.length}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {ACHIEVEMENTS.map((a) => {
          const isEarned = set.has(a.id);
          const Icon = ICONS[a.icon] ?? Award;
          return (
            <div
              key={a.id}
              className={`p-3 rounded-xl border transition-colors ${
                isEarned
                  ? "bg-amber-500/10 border-amber-400/30"
                  : "bg-zinc-950/40 border-white/8"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isEarned ? "bg-amber-500/20 text-amber-300" : "bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {isEarned ? <Icon className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3" />}
                </div>
                <span
                  className={`text-xs font-semibold ${isEarned ? "text-white" : "text-zinc-500"}`}
                >
                  {a.title}
                </span>
              </div>
              <p className={`text-[11px] leading-snug ${isEarned ? "text-zinc-300" : "text-zinc-600"}`}>
                {a.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
