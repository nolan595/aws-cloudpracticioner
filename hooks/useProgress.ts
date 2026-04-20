"use client";

import { useState, useEffect, useCallback } from "react";
import { questions } from "@/data/questions";
import { xpForAnswer, XP_EXAM_COMPLETED, XP_EXAM_PASSED } from "@/lib/levels";
import { evaluateAchievements, newlyEarned } from "@/lib/achievements";

export interface ExamAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  domainScores: Record<number, { correct: number; total: number }>;
  timeSpent: number; // seconds
  passed: boolean;
}

export interface ServiceStat {
  correct: number;
  total: number;
}

export interface Progress {
  questionsAnswered: Record<number, boolean>;
  examAttempts: ExamAttempt[];
  studyStreak: number;
  lastStudyDate: string | null;
  bookmarkedQuestions: number[];
  incorrectQuestions: number[];
  servicePerformance: Record<string, ServiceStat>;
  xp: number;
  achievements: string[];
}

const DEFAULT_PROGRESS: Progress = {
  questionsAnswered: {},
  examAttempts: [],
  studyStreak: 0,
  lastStudyDate: null,
  bookmarkedQuestions: [],
  incorrectQuestions: [],
  servicePerformance: {},
  xp: 0,
  achievements: [],
};

const STORAGE_KEY = "aws-clf-c02-progress";

function mergeStored(stored: unknown): Progress {
  if (!stored || typeof stored !== "object") return DEFAULT_PROGRESS;
  return { ...DEFAULT_PROGRESS, ...(stored as Partial<Progress>) };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [justEarned, setJustEarned] = useState<string[]>([]);
  const [lastXPGain, setLastXPGain] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(mergeStored(JSON.parse(stored)));
    } catch {
      // ignore
    }
  }, []);

  const save = useCallback((updated: Progress) => {
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  const recordAnswer = useCallback(
    (questionId: number, correct: boolean) => {
      const today = new Date().toDateString();
      const updated: Progress = {
        ...progress,
        questionsAnswered: { ...progress.questionsAnswered, [questionId]: correct },
        incorrectQuestions: correct
          ? progress.incorrectQuestions.filter((id) => id !== questionId)
          : progress.incorrectQuestions.includes(questionId)
            ? progress.incorrectQuestions
            : [...progress.incorrectQuestions, questionId],
      };

      if (updated.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        updated.studyStreak =
          updated.lastStudyDate === yesterday.toDateString()
            ? updated.studyStreak + 1
            : 1;
        updated.lastStudyDate = today;
      }

      const question = questions.find((q) => q.id === questionId);
      if (question?.service) {
        const prev = updated.servicePerformance[question.service] ?? { correct: 0, total: 0 };
        updated.servicePerformance = {
          ...updated.servicePerformance,
          [question.service]: {
            correct: prev.correct + (correct ? 1 : 0),
            total: prev.total + 1,
          },
        };
      }

      const gained = xpForAnswer(correct, updated.studyStreak);
      updated.xp = progress.xp + gained;
      if (gained > 0) setLastXPGain(gained);

      const earned = evaluateAchievements(updated);
      const fresh = newlyEarned(progress.achievements, earned);
      updated.achievements = earned;
      if (fresh.length > 0) setJustEarned(fresh);

      save(updated);
    },
    [progress, save],
  );

  const recordExamAttempt = useCallback(
    (attempt: Omit<ExamAttempt, "id" | "date">) => {
      const newAttempt: ExamAttempt = {
        ...attempt,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      const xpGain = XP_EXAM_COMPLETED + (attempt.passed ? XP_EXAM_PASSED : 0);
      const updated: Progress = {
        ...progress,
        examAttempts: [...progress.examAttempts, newAttempt],
        xp: progress.xp + xpGain,
      };
      const earned = evaluateAchievements(updated);
      const fresh = newlyEarned(progress.achievements, earned);
      updated.achievements = earned;
      if (fresh.length > 0) setJustEarned(fresh);
      setLastXPGain(xpGain);
      save(updated);
    },
    [progress, save],
  );

  const toggleBookmark = useCallback(
    (questionId: number) => {
      const bookmarked = progress.bookmarkedQuestions.includes(questionId);
      save({
        ...progress,
        bookmarkedQuestions: bookmarked
          ? progress.bookmarkedQuestions.filter((id) => id !== questionId)
          : [...progress.bookmarkedQuestions, questionId],
      });
    },
    [progress, save],
  );

  const resetProgress = useCallback(() => save(DEFAULT_PROGRESS), [save]);
  const clearJustEarned = useCallback(() => setJustEarned([]), []);
  const clearLastXPGain = useCallback(() => setLastXPGain(0), []);

  const totalAnswered = Object.keys(progress.questionsAnswered).length;
  const totalCorrect = Object.values(progress.questionsAnswered).filter(Boolean).length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bestExamScore =
    progress.examAttempts.length > 0
      ? Math.max(...progress.examAttempts.map((a) => a.score))
      : null;
  const lastExamScore =
    progress.examAttempts.length > 0
      ? progress.examAttempts[progress.examAttempts.length - 1].score
      : null;

  return {
    progress,
    recordAnswer,
    recordExamAttempt,
    toggleBookmark,
    resetProgress,
    justEarned,
    clearJustEarned,
    lastXPGain,
    clearLastXPGain,
    stats: { totalAnswered, totalCorrect, accuracy, bestExamScore, lastExamScore },
  };
}
