import type { Progress } from "@/hooks/useProgress";
import { questions } from "@/data/questions";

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name; mapped in the grid component
  check: (p: Progress) => boolean;
}

function currentCorrectStreak(p: Progress): number {
  // Walks recent answers via examAttempts-less heuristic:
  // we don't have an ordered answer log, so approximate with "last N answers correct".
  // Since questionsAnswered is keyed by id (no order), we use incorrectQuestions:
  // if incorrectQuestions is empty and totalAnswered >= N, streak is satisfied.
  const total = Object.keys(p.questionsAnswered).length;
  const correct = Object.values(p.questionsAnswered).filter(Boolean).length;
  // A conservative proxy for "10 correct in a row": 10 correct and < 1 incorrect in most recent answers.
  return correct >= 10 && p.incorrectQuestions.length === 0 ? 10 : 0;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Answer your first question",
    icon: "Footprints",
    check: (p) => Object.keys(p.questionsAnswered).length >= 1,
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Get 10 correct with zero incorrect",
    icon: "Target",
    check: (p) => currentCorrectStreak(p) >= 10,
  },
  {
    id: "streak-week",
    title: "Week Warrior",
    description: "Study 7 days in a row",
    icon: "Flame",
    check: (p) => p.studyStreak >= 7,
  },
  {
    id: "streak-fortnight",
    title: "Fortnight Fighter",
    description: "Study 14 days in a row",
    icon: "Zap",
    check: (p) => p.studyStreak >= 14,
  },
  {
    id: "mock-runner",
    title: "Mock Runner",
    description: "Complete 3 mock exams",
    icon: "Clock",
    check: (p) => p.examAttempts.length >= 3,
  },
  {
    id: "passed",
    title: "Passed!",
    description: "Score 700+ on a mock exam",
    icon: "Trophy",
    check: (p) => p.examAttempts.some((a) => a.passed),
  },
  {
    id: "cloud-ninja",
    title: "Cloud Ninja",
    description: "Score 900+ on a mock exam",
    icon: "Sword",
    check: (p) => p.examAttempts.some((a) => a.score >= 900),
  },
  {
    id: "completionist",
    title: "Completionist",
    description: "Answer every question in the bank",
    icon: "CheckCheck",
    check: (p) => Object.keys(p.questionsAnswered).length >= questions.length,
  },
  {
    id: "service-master",
    title: "Service Master",
    description: "Reach 90%+ on any service (10+ attempts)",
    icon: "Award",
    check: (p) =>
      Object.values(p.servicePerformance).some(
        (s) => s.total >= 10 && s.correct / s.total >= 0.9,
      ),
  },
];

export function evaluateAchievements(p: Progress): string[] {
  return ACHIEVEMENTS.filter((a) => a.check(p)).map((a) => a.id);
}

export function newlyEarned(before: string[], after: string[]): string[] {
  const prev = new Set(before);
  return after.filter((id) => !prev.has(id));
}
