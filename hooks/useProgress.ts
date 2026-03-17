"use client";

import { useState, useEffect } from "react";

export interface ExamAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  domainScores: Record<number, { correct: number; total: number }>;
  timeSpent: number; // seconds
  passed: boolean;
}

export interface Progress {
  questionsAnswered: Record<number, boolean>; // questionId → correct?
  examAttempts: ExamAttempt[];
  studyStreak: number;
  lastStudyDate: string | null;
  bookmarkedQuestions: number[];
  incorrectQuestions: number[];
}

const DEFAULT_PROGRESS: Progress = {
  questionsAnswered: {},
  examAttempts: [],
  studyStreak: 0,
  lastStudyDate: null,
  bookmarkedQuestions: [],
  incorrectQuestions: [],
};

const STORAGE_KEY = "aws-clf-c02-progress";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function save(updated: Progress) {
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  }

  function recordAnswer(questionId: number, correct: boolean) {
    const today = new Date().toDateString();
    const updated = { ...progress };

    updated.questionsAnswered = { ...updated.questionsAnswered, [questionId]: correct };

    if (!correct) {
      if (!updated.incorrectQuestions.includes(questionId)) {
        updated.incorrectQuestions = [...updated.incorrectQuestions, questionId];
      }
    } else {
      updated.incorrectQuestions = updated.incorrectQuestions.filter((id) => id !== questionId);
    }

    // streak logic
    if (updated.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (updated.lastStudyDate === yesterday.toDateString()) {
        updated.studyStreak += 1;
      } else {
        updated.studyStreak = 1;
      }
      updated.lastStudyDate = today;
    }

    save(updated);
  }

  function recordExamAttempt(attempt: Omit<ExamAttempt, "id" | "date">) {
    const updated = {
      ...progress,
      examAttempts: [
        ...progress.examAttempts,
        {
          ...attempt,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        },
      ],
    };
    save(updated);
  }

  function toggleBookmark(questionId: number) {
    const bookmarked = progress.bookmarkedQuestions.includes(questionId);
    save({
      ...progress,
      bookmarkedQuestions: bookmarked
        ? progress.bookmarkedQuestions.filter((id) => id !== questionId)
        : [...progress.bookmarkedQuestions, questionId],
    });
  }

  function resetProgress() {
    save(DEFAULT_PROGRESS);
  }

  const totalAnswered = Object.keys(progress.questionsAnswered).length;
  const totalCorrect = Object.values(progress.questionsAnswered).filter(Boolean).length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bestExamScore = progress.examAttempts.length > 0
    ? Math.max(...progress.examAttempts.map((a) => a.score))
    : null;
  const lastExamScore = progress.examAttempts.length > 0
    ? progress.examAttempts[progress.examAttempts.length - 1].score
    : null;

  return {
    progress,
    recordAnswer,
    recordExamAttempt,
    toggleBookmark,
    resetProgress,
    stats: { totalAnswered, totalCorrect, accuracy, bestExamScore, lastExamScore },
  };
}
