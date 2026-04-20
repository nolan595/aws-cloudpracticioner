export interface LevelInfo {
  level: number;
  title: string;
  currentXP: number;
  currentThreshold: number;
  nextThreshold: number | null;
  progress: number; // 0..1, 1 when maxed out
}

const TIERS: Array<{ level: number; title: string; threshold: number }> = [
  { level: 1, title: "Cloud Curious", threshold: 0 },
  { level: 2, title: "Cloud Explorer", threshold: 250 },
  { level: 3, title: "Cloud Practitioner", threshold: 750 },
  { level: 4, title: "Cloud Engineer", threshold: 1500 },
  { level: 5, title: "Cloud Architect", threshold: 3000 },
  { level: 6, title: "Cloud Expert", threshold: 5000 },
];

export function getLevel(xp: number): LevelInfo {
  let current = TIERS[0];
  for (const tier of TIERS) {
    if (xp >= tier.threshold) current = tier;
    else break;
  }
  const next = TIERS.find((t) => t.threshold > current.threshold);
  const nextThreshold = next?.threshold ?? null;
  const span = nextThreshold !== null ? nextThreshold - current.threshold : 1;
  const into = xp - current.threshold;
  return {
    level: current.level,
    title: current.title,
    currentXP: xp,
    currentThreshold: current.threshold,
    nextThreshold,
    progress: nextThreshold === null ? 1 : Math.min(1, into / span),
  };
}

export function xpForAnswer(correct: boolean, streak: number): number {
  if (!correct) return 0;
  return streak >= 3 ? 15 : 10;
}

export const XP_EXAM_COMPLETED = 50;
export const XP_EXAM_PASSED = 200;
