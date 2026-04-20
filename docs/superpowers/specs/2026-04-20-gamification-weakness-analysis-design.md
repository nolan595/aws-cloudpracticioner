# AWS Study App — Gamification, Weakness Analysis & Question Bank Expansion

**Date:** 2026-04-20
**Status:** Approved
**Scope:** Single implementation plan

---

## 1. Problem & Goals

Mark is studying for AWS CLF-C02. The current app (230 questions, plain progress tracking) has three gaps:

1. **Thin question bank** — 230 questions means ~3.5x coverage for a 65-question mock. Patterns repeat quickly.
2. **No reward loop** — correct answers and streaks feel the same as incorrect ones after the moment passes. Motivation decays.
3. **No weakness awareness** — the dashboard shows domain totals but can't say *"you're weak on KMS, drill it"*. Users self-diagnose.

**Goals:**
- Expand bank to ~500 questions for richer mock variety.
- Add a lightweight XP/level/achievement system that rewards the behaviours we want (consistency, accuracy, mock-taking, passing).
- Track per-service accuracy and surface the top 3 weak services on the dashboard with a one-click "drill it" flow.

**Non-goals:**
- Multiplayer, leaderboards, social features.
- Backend/auth — everything stays in `localStorage`.
- Spaced repetition scheduling (future work).

---

## 2. Data Model

Extends the existing `Progress` interface in `hooks/useProgress.ts`. All new fields are additive — existing data loads cleanly via default-merge on read.

```ts
interface Progress {
  // existing
  questionsAnswered: Record<number, boolean>;
  examAttempts: ExamAttempt[];
  studyStreak: number;
  lastStudyDate: string | null;
  bookmarkedQuestions: number[];
  incorrectQuestions: number[];

  // NEW
  servicePerformance: Record<string, { correct: number; total: number }>;
  xp: number;
  achievements: string[]; // achievement IDs user has earned
}
```

**Why these three fields:**
- `servicePerformance` — keyed by `question.service` (e.g. `"IAM"`, `"KMS"`, `"VPC"`). Keeps per-service counts lean; accuracy is derived.
- `xp` — single cumulative number. Level is **derived** at render time from XP thresholds (no stored level field to drift out of sync).
- `achievements` — array of earned IDs. Achievement definitions live in code, not storage, so we can add/rename without migrations.

**Backwards compatibility:** on `useProgress` load, merge stored state with `DEFAULT_PROGRESS` so old users get the new fields initialised to `{}, 0, []`.

---

## 3. Gamification System

### XP Rules
| Event | XP |
|---|---|
| Correct answer in Practice | +10 |
| Correct answer while on a streak ≥3 | +15 (base 10 + 5 streak bonus) |
| Mock exam completed | +50 |
| Mock exam passed (≥700) | +200 |
| Incorrect answer | 0 (no penalty) |

XP is awarded inside `recordAnswer()` and `recordExamAttempt()`. A small floating `+10 XP` toast fires on the answer explanation screen.

### Levels (derived from XP)
| Level | Title | XP threshold |
|---|---|---|
| 1 | Cloud Curious | 0 |
| 2 | Cloud Explorer | 250 |
| 3 | Cloud Practitioner | 750 |
| 4 | Cloud Engineer | 1500 |
| 5 | Cloud Architect | 3000 |
| 6 | Cloud Expert | 5000 |

Helper `getLevel(xp)` returns `{ level, title, currentXP, nextThreshold, progress }` for the progress bar.

### Achievements
Defined in `lib/achievements.ts` as a static array. Each has `{ id, title, description, icon, check(progress, stats) => boolean }`.

| ID | Title | Trigger |
|---|---|---|
| `first-steps` | First Steps | Answer 1 question |
| `perfectionist` | Perfectionist | 10 correct in a row |
| `streak-week` | Week Warrior | 7-day study streak |
| `streak-fortnight` | Fortnight Fighter | 14-day study streak |
| `mock-runner` | Mock Runner | Complete 3 mock exams |
| `passed` | Passed! | Score ≥700 on a mock |
| `cloud-ninja` | Cloud Ninja | Score ≥900 on a mock |
| `completionist` | Completionist | Answer every question in the bank |
| `service-master` | Service Master | 90%+ accuracy on any service with ≥10 attempts |

Achievement check runs after every `recordAnswer` and `recordExamAttempt`. Newly earned ones fire a celebratory toast.

---

## 4. Weakness Analysis

### Tracking
Inside `recordAnswer(questionId, correct)`:
1. Look up the question by id to get `question.service`.
2. If `service` is defined, increment `servicePerformance[service].total` and `.correct` (if correct).
3. Questions without a `service` field are tracked only at domain level (existing behaviour).

### Surfacing — Focus Areas card
New dashboard component ranks services by **weakness score** = `1 - (correct/total)`, filtered to services with `total >= 3` (avoid noise from one-off misses).

Top 3 weak services render as rows:
```
KMS            2/7 (29%)    Drill it →
VPC            4/11 (36%)   Drill it →
CloudWatch     5/12 (42%)   Drill it →
```

Each "Drill it →" links to `/practice?mode=smart&service=KMS`.

### Smart Practice Mode
`/practice?mode=smart` filters the question pool to:
- Questions in the user's bottom-3 weak services (if `service` param omitted), OR
- Questions for the specified service (if `service=KMS` passed).

Respects existing domain filter if also present. Falls back to the full bank if the user has no qualifying weak services yet (e.g. brand new user).

---

## 5. Dashboard Restructure

New section order in `app/page.tsx`:

1. **Header** — existing + level badge (`Lv 3 · Cloud Practitioner`) and XP progress bar (`780 / 1500 XP`)
2. **Stats grid** — existing 4 cards (Questions, Accuracy, Streak, Best Score)
3. **Readiness** — existing gauge
4. **Focus Areas** — NEW, only renders if there are ≥3 answered questions across ≥1 service
5. **Domain Progress** — existing, with accuracy colour coding: red <60%, amber 60–79%, green 80%+
6. **Achievements** — NEW grid, 3 columns on desktop / 2 on mobile. Earned = coloured, unearned = greyed out with lock icon
7. **Nav cards** — existing 4 cards
8. **Exam history** — existing

---

## 6. Question Bank Expansion (230 → ~500)

Target distribution matches exam weighting plus some padding in the largest domains:

| Domain | Current | Add | Target |
|---|---|---|---|
| D1 — Cloud Concepts (24%) | ~55 | +65 | ~120 |
| D2 — Security (30%) | ~70 | +80 | ~150 |
| D3 — Cloud Technology (34%) | ~80 | +90 | ~170 |
| D4 — Billing (12%) | ~25 | +35 | ~60 |
| **Total** | **230** | **+270** | **~500** |

Each new question must include a `service` field where applicable (IAM, KMS, VPC, S3, EC2, Lambda, CloudWatch, Trusted Advisor, Organizations, etc.) — this powers the weakness analysis.

Mix of `single` and `multi` type questions matching exam format. Explanations should name the correct service(s) and briefly say *why* the alternatives are wrong.

---

## 7. File-level Changes Summary

| File | Change |
|---|---|
| `hooks/useProgress.ts` | Add 3 fields, XP/achievement logic, service tracking in `recordAnswer`, default-merge on load |
| `lib/achievements.ts` | NEW — achievement definitions + check runner |
| `lib/levels.ts` | NEW — `getLevel(xp)` helper |
| `components/FocusAreas.tsx` | NEW — weak services card |
| `components/AchievementsGrid.tsx` | NEW — earned/unearned grid |
| `components/LevelBadge.tsx` | NEW — header badge + XP bar |
| `components/XPToast.tsx` | NEW — floating +XP feedback |
| `app/page.tsx` | Restructured section order, add new components, domain colour coding |
| `app/practice/page.tsx` | Support `?mode=smart` and `?service=X` URL params |
| `data/questions.ts` | +270 questions with `service` fields |

---

## 8. Testing Approach

- Build must pass cleanly (`pnpm run build`).
- Manual: fresh localStorage → verify XP starts at 0, level 1, no achievements visible.
- Manual: answer 10 questions correctly → verify XP = 100+, streak bonus kicks in, `perfectionist` unlocks.
- Manual: deliberately get KMS questions wrong 3+ times → verify Focus Areas surfaces KMS, "Drill it" filters correctly.
- Manual: existing user with stored progress → verify no data loss, new fields default correctly.

---

## 9. Risks & Mitigations

- **localStorage size** — ~500 questions of state is still <50KB. Fine.
- **Achievement spam** — only toast newly-earned achievements, not every check. Use set diff.
- **Service field drift** — a typo in `data/questions.ts` creates a new service bucket. Mitigation: add a dev-only console warning for services that don't match a known list.
- **Stale level on XP change** — mitigated by deriving level at render time, never storing it.
