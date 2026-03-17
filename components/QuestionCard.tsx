"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Bookmark, BookmarkCheck, ChevronRight } from "lucide-react";
import type { Question } from "@/data/questions";
import { DOMAIN_NAMES } from "@/data/questions";

interface Props {
  question: Question;
  onAnswer: (correct: boolean) => void;
  bookmarked: boolean;
  onBookmark: () => void;
  showNext?: boolean;
  onNext?: () => void;
  questionNumber?: number;
  totalQuestions?: number;
}

const DOMAIN_COLORS: Record<number, string> = {
  1: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  2: "bg-red-500/15 text-red-300 border-red-500/30",
  3: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  4: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export default function QuestionCard({
  question,
  onAnswer,
  bookmarked,
  onBookmark,
  showNext,
  onNext,
  questionNumber,
  totalQuestions,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isMulti = question.type === "multi";
  const isCorrect =
    submitted &&
    selected.length === question.correct.length &&
    selected.every((s) => question.correct.includes(s));

  function toggleOption(index: number) {
    if (submitted) return;
    if (isMulti) {
      setSelected((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelected([index]);
    }
  }

  function handleSubmit() {
    if (selected.length === 0) return;
    setSubmitted(true);
    const correct =
      selected.length === question.correct.length &&
      selected.every((s) => question.correct.includes(s));
    onAnswer(correct);
  }

  function getOptionStyle(index: number) {
    const base =
      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-start gap-3 ";

    if (!submitted) {
      if (selected.includes(index)) {
        return base + "border-indigo-500 bg-indigo-500/10 text-white";
      }
      return base + "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:bg-white/8 cursor-pointer";
    }

    // submitted state
    if (question.correct.includes(index)) {
      return base + "border-emerald-500 bg-emerald-500/10 text-emerald-200";
    }
    if (selected.includes(index) && !question.correct.includes(index)) {
      return base + "border-red-500 bg-red-500/10 text-red-200";
    }
    return base + "border-white/5 bg-white/3 text-zinc-500";
  }

  function getOptionIcon(index: number) {
    if (!submitted) {
      const letter = String.fromCharCode(65 + index); // A, B, C, D
      return (
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center
            ${selected.includes(index) ? "border-indigo-400 bg-indigo-500/20 text-indigo-300" : "border-zinc-600 text-zinc-400"}`}
        >
          {letter}
        </span>
      );
    }
    if (question.correct.includes(index)) {
      return <CheckCircle className="flex-shrink-0 w-5 h-5 text-emerald-400 mt-0.5" />;
    }
    if (selected.includes(index)) {
      return <XCircle className="flex-shrink-0 w-5 h-5 text-red-400 mt-0.5" />;
    }
    const letter = String.fromCharCode(65 + index);
    return (
      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-zinc-700 text-xs font-bold flex items-center justify-center text-zinc-600">
        {letter}
      </span>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${DOMAIN_COLORS[question.domain]}`}>
              Domain {question.domain}: {DOMAIN_NAMES[question.domain]}
            </span>
            {isMulti && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Select multiple
              </span>
            )}
            {question.service && (
              <span className="text-xs text-zinc-500">
                {question.service}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {questionNumber && totalQuestions && (
              <span className="text-xs text-zinc-500">
                {questionNumber}/{totalQuestions}
              </span>
            )}
            <button
              onClick={onBookmark}
              className="text-zinc-500 hover:text-amber-400 transition-colors"
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Bookmark className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>
        <p className="mt-3 text-[15px] text-zinc-100 leading-relaxed font-medium">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="p-5 space-y-2.5">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleOption(index)}
            className={getOptionStyle(index)}
            disabled={submitted}
          >
            {getOptionIcon(index)}
            <span className="leading-relaxed">{option}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {isMulti ? `Confirm Selection (${selected.length} chosen)` : "Confirm Answer"}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Result banner */}
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium ${
                isCorrect
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-300 border border-red-500/20"
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-4.5 h-4.5 flex-shrink-0" />
              )}
              {isCorrect ? "Correct!" : "Incorrect"}
            </div>

            {/* Explanation */}
            <div className="bg-zinc-800/60 rounded-xl px-4 py-3 text-sm text-zinc-300 leading-relaxed border border-white/5">
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5">Explanation</p>
              {question.explanation}
            </div>

            {showNext && onNext && (
              <button
                onClick={onNext}
                className="w-full py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
