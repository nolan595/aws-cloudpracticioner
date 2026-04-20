"use client";

import { useEffect } from "react";
import { Sparkles, Award } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";

interface Props {
  xpGain: number;
  justEarned: string[];
  onClear: () => void;
}

export default function XPToast({ xpGain, justEarned, onClear }: Props) {
  useEffect(() => {
    if (xpGain <= 0 && justEarned.length === 0) return;
    const t = setTimeout(onClear, 2500);
    return () => clearTimeout(t);
  }, [xpGain, justEarned, onClear]);

  if (xpGain <= 0 && justEarned.length === 0) return null;

  const earnedDefs = justEarned
    .map((id) => ACHIEVEMENTS.find((a) => a.id === id))
    .filter(Boolean) as (typeof ACHIEVEMENTS)[number][];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      {xpGain > 0 && (
        <div className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5" />+{xpGain} XP
        </div>
      )}
      {earnedDefs.map((a) => (
        <div
          key={a.id}
          className="flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-100 px-3 py-2 rounded-xl text-xs backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <div>
            <div className="font-semibold">Achievement unlocked</div>
            <div className="text-amber-200/80">{a.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
