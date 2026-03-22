'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

/* ───────────────────────── TYPES ───────────────────────── */
type Screen = 'intro' | 'quiz' | 'results';

interface Question {
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

/* ───────────────────────── DATA ───────────────────────── */
const QUESTIONS: Question[] = [
  {
    category: 'Alapok',
    question: 'Hány idegsejt (neuron) található átlagosan egy felnőtt ember agyában?',
    options: ['~10 millió', '~86 milliárd', '~1 billió', '~500 millió'],
    correct: 1,
    explanation: 'Az emberi agy körülbelül 86 milliárd idegsejtet tartalmaz, amelyek összetett hálózatot alkotnak.',
  },
  {
    category: 'Agy & Energia',
    question: 'A testtömeg hány százalékát teszi ki az agy, és a test energiájának mekkora részét használja fel?',
    options: ['2% testtömeg, ~20% energia', '5% testtömeg, ~10% energia', '10% testtömeg, ~50% energia', '1% testtömeg, ~5% energia'],
    correct: 0,
    explanation: 'Bár az agy a testtömegnek mindössze ~2%-a, az összes felhasznált energia ~20%-át igényli.',
  },
  {
    category: 'Neuroplaszticitás',
    question: 'Mi az a neuroplaszticitás?',
    options: [
      'Az agy képessége új idegsejteket növeszteni',
      'Az agy ruganyos fizikai szerkezete',
      'Az idegsejtek közötti kapcsolatok átszerveződésének képessége',
      'Az agy ellenállóképessége sérülésekkel szemben',
    ],
    correct: 2,
    explanation: 'A neuroplaszticitás az agy azon képessége, hogy a szinaptikus kapcsolatokat folyamatosan átszervezi tapasztalatok, tanulás és sérülések hatására.',
  },
  {
    category: 'Öregedés',
    question: 'Mikor kezd el természetesen zsugorodni az emberi agy?',
    options: ['60 éves kor körül', '50 éves kor körül', 'Már 30-40 éves kortól', 'Csak betegség esetén'],
    correct: 2,
    explanation: 'Az agy térfogata már a 30-as évektől kezdve lassan csökkenni kezd, évente ~0.5%-kal.',
  },
  {
    category: 'Huntington-kór',
    question: 'A Huntington-kór milyen típusú betegség?',
    options: ['Fertőző idegrendszeri betegség', 'Örökletes neurodegeneratív betegség', 'Autoimmun betegség', 'Környezeti ártalom okozta betegség'],
    correct: 1,
    explanation: 'A Huntington-kór egy autoszomális domináns öröklődésű neurodegeneratív betegség, amely a HTT gén mutációja okozza.',
  },
  {
    category: 'Alvás & Agy',
    question: 'Mi történik az agyban alvás közben?',
    options: [
      'Az agy gyakorlatilag leáll és pihen',
      'A glimfatikus rendszer megtisztítja az agyat a méreganyagoktól',
      'Csak az álmodás fázisában aktív',
      'Az idegsejtek regenerálódnak osztódás által',
    ],
    correct: 1,
    explanation: 'Alvás közben a glimfatikus rendszer eltávolítja a napközben felgyülemlett toxikus anyagokat, köztük a béta-amiloid fehérjéket.',
  },
  {
    category: 'Kutatás',
    question: 'Hogyan lehetséges, hogy egy páciens bőrsejtjeiből idegsejtek legyenek?',
    options: [
      'Nem lehetséges',
      'Őssejtekké alakítják vissza, majd idegsejtté érlelik',
      'Közvetlen átprogramozással (direkt reprogramozás)',
      'Génterápiával aktiválja az idegsejtgéneket',
    ],
    correct: 2,
    explanation: 'A direkt reprogramozás során a bőrsejteket specifikus transzkripciós faktorok segítségével közvetlenül idegsejtekké alakítják, őssejtfázis nélkül.',
  },
  {
    category: 'Védelem',
    question: 'A következők közül melyik szokás NEM bizonyítottan jó az agy egészségére?',
    options: ['Rendszeres testmozgás', 'Agytrénig alkalmazások használata', 'Társas kapcsolatok ápolása', 'Megfelelő mennyiségű alvás'],
    correct: 1,
    explanation: 'A brain training appok hatékonysága nem bizonyított tudományosan — a fejlődés általában csak az adott feladatban mutatható ki, nem transzferálódik.',
  },
  {
    category: 'Memória',
    question: 'Mekkora az emberi agy becsült tárolókapacitása?',
    options: ['~100 gigabájt', '~1 terabájt', '~1 petabájt (1 millió gigabájt)', '~10 gigabájt'],
    correct: 2,
    explanation: 'A Salk Institute kutatói szerint az emberi agy tárolókapacitása elérheti az 1 petabájtot, ami 1 millió gigabájtnak felel meg.',
  },
  {
    category: 'Autofágia',
    question: 'Mi az autofágia és miért fontos az agy számára?',
    options: [
      'Az idegsejtek önpusztítási mechanizmusa',
      'A sejtek önmegtisztító folyamata, amely eltávolítja a hibás fehérjéket',
      'Az agy automatikus válaszreakciója stresszre',
      'A neurotranszmitterek automatikus felszabadulása',
    ],
    correct: 1,
    explanation: 'Az autofágia a sejtek létfontosságú tisztítómechanizmusa, amely eltávolítja a sérült organellumokat és hibás fehérjéket — kulcsszerepet játszik a neurodegeneratív betegségek megelőzésében.',
  },
];

const TIPS = [
  { icon: '🏃', text: 'Mozogj rendszeresen — a kardió fokozza az agyi véráramlást és az BDNF termelést.' },
  { icon: '😴', text: 'Aludj eleget — alvás közben az agy megtisztítja magát a toxikus anyagoktól.' },
  { icon: '🥗', text: 'Étkezz tudatosan — az omega-3 zsírsavak és antioxidánsok védik az idegsejteket.' },
  { icon: '🧠', text: 'Tanulj újat — az új készségek erősítik a szinaptikus kapcsolatokat.' },
  { icon: '🤝', text: 'Ápold a kapcsolataidat — a társas interakciók csökkentik a demencia kockázatát.' },
];

const LETTERS = ['A', 'B', 'C', 'D'];

/* ───────────────────────── HELPERS ─────────────────────── */
const transition = { type: 'spring' as const, stiffness: 300, damping: 28 };
const fadeSlide = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

/* ───────────────────── ANIMATED RING ───────────────────── */
function ScoreRing({ percentage }: { percentage: number }) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, ...transition }}
      >
        <span className="text-4xl font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[#d946ef] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
          {percentage}%
        </span>
      </motion.div>
    </div>
  );
}

/* ───────────────────── MAIN COMPONENT ─────────────────── */
export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  const correctCount = useMemo(() => answers.filter(Boolean).length, [answers]);
  const percentage = useMemo(() => Math.round((correctCount / QUESTIONS.length) * 100), [correctCount]);

  const handleStart = useCallback(() => {
    setScreen('quiz');
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
  }, []);

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      setAnswers((prev) => [...prev, idx === q.correct]);
      setShowExplanation(true);
    },
    [selected, q.correct],
  );

  const handleNext = useCallback(() => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setScreen('results');
    }
  }, [current]);

  const handleRestart = useCallback(() => {
    setScreen('intro');
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
  }, []);

  const handleShare = useCallback(() => {
    const text = `Agy kvíz eredményem: ${correctCount}/${QUESTIONS.length} (${percentage}%) 🧠\nTeszteld te is a tudásod!\n${typeof window !== 'undefined' ? window.location.href : ''}`;
    if (navigator.share) {
      navigator.share({ title: 'BrainToBrain Kvíz', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [correctCount, percentage]);

  /* ─── Option style logic ─── */
  const optionClasses = (idx: number) => {
    const base =
      'relative flex items-center gap-4 p-4 rounded-2xl border text-left transition-colors duration-200 cursor-pointer w-full';
    if (selected === null) return `${base} border-white/10 bg-white/[0.03] hover:border-[#a78bfa]/50 hover:bg-white/[0.06]`;
    if (idx === q.correct) return `${base} border-emerald-400/60 bg-emerald-500/15`;
    if (idx === selected) return `${base} border-rose-400/60 bg-rose-500/15`;
    return `${base} border-white/5 bg-white/[0.02] opacity-50`;
  };

  /* ─────────────── RENDER ─────────────── */
  return (
    <main className="min-h-screen bg-[#0e0520] text-white font-[family-name:var(--font-body)] selection:bg-[#d946ef]/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#d946ef]/[0.07] blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#22d3ee]/[0.05] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-12">
        <AnimatePresence mode="wait">
          {/* ════════════════ INTRO ════════════════ */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              {...fadeSlide}
              transition={transition}
              className="flex flex-col items-center text-center gap-8 w-full"
            >
              {/* Brain icon */}
              <motion.div
                className="text-7xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🧠
              </motion.div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[#d946ef] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                  Mennyit tudsz az agyadról?
                </h1>
                <p className="text-white/50 text-lg max-w-md mx-auto">
                  Teszteld a tudásod a neurobiológia világából — 10 kérdés, tudományos alapon.
                </p>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: '📋', label: '10 kérdés' },
                  { icon: '⏱️', label: '~3 perc' },
                  { icon: '🔬', label: 'Tudományos alapú' },
                ].map((m) => (
                  <span
                    key={m.label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60"
                  >
                    <span>{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Start button */}
              <motion.button
                onClick={handleStart}
                className="mt-2 rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#a78bfa] px-10 py-4 text-lg font-semibold font-[family-name:var(--font-heading)] text-white shadow-lg shadow-[#d946ef]/20"
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(217,70,239,0.35)' }}
                whileTap={{ scale: 0.97 }}
                transition={transition}
              >
                Kvíz indítása
              </motion.button>

              <Link href="/" className="mt-4 text-sm text-white/30 hover:text-white/60 transition-colors">
                &larr; Vissza a főoldalra
              </Link>
            </motion.div>
          )}

          {/* ════════════════ QUIZ ════════════════ */}
          {screen === 'quiz' && (
            <motion.div key="quiz" {...fadeSlide} transition={transition} className="w-full space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/40 font-[family-name:var(--font-mono)]">
                  <span>
                    Kérdés {current + 1}/{QUESTIONS.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#d946ef] to-[#22d3ee]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={transition}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 space-y-6"
                >
                  {/* Category */}
                  <span className="inline-block rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-3 py-1 text-xs font-semibold text-[#a78bfa] font-[family-name:var(--font-mono)] tracking-wide uppercase">
                    {q.category}
                  </span>

                  {/* Question */}
                  <h2 className="text-xl sm:text-2xl font-semibold font-[family-name:var(--font-heading)] leading-snug">
                    {q.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={optionClasses(idx)}
                        whileHover={selected === null ? { scale: 1.015 } : {}}
                        whileTap={selected === null ? { scale: 0.985 } : {}}
                        transition={transition}
                        disabled={selected !== null}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold font-[family-name:var(--font-mono)] ${
                            selected !== null && idx === q.correct
                              ? 'bg-emerald-500/25 text-emerald-300'
                              : selected === idx && idx !== q.correct
                                ? 'bg-rose-500/25 text-rose-300'
                                : 'bg-white/[0.06] text-white/50'
                          }`}
                        >
                          {LETTERS[idx]}
                        </span>
                        <span className="text-[15px] sm:text-base leading-snug">{opt}</span>

                        {/* Feedback icons */}
                        {selected !== null && idx === q.correct && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={transition}
                            className="ml-auto text-emerald-400 text-lg"
                          >
                            ✓
                          </motion.span>
                        )}
                        {selected === idx && idx !== q.correct && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={transition}
                            className="ml-auto text-rose-400 text-lg"
                          >
                            ✗
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#22d3ee]/[0.06] p-5 text-sm leading-relaxed text-white/70">
                          <span className="mr-2 text-[#22d3ee] font-semibold">Tudtad?</span>
                          {q.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Next button */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="flex justify-end">
                    <motion.button
                      onClick={handleNext}
                      className="rounded-2xl bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] px-8 py-3 font-semibold font-[family-name:var(--font-heading)] text-white shadow-lg shadow-[#a78bfa]/15"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      transition={transition}
                    >
                      {current < QUESTIONS.length - 1 ? 'Következő' : 'Eredmények'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ════════════════ RESULTS ════════════════ */}
          {screen === 'results' && (
            <motion.div key="results" {...fadeSlide} transition={transition} className="w-full space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[#d946ef] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                  Kvíz eredmény
                </h2>
                <p className="text-white/40 text-sm">Így teljesítettél a neurobiológia kvízben</p>
              </div>

              {/* Score ring */}
              <div className="flex justify-center">
                <ScoreRing percentage={percentage} />
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Helyes', value: correctCount, color: 'text-emerald-400' },
                  { label: 'Hibás', value: QUESTIONS.length - correctCount, color: 'text-rose-400' },
                  { label: 'Összesen', value: QUESTIONS.length, color: 'text-[#a78bfa]' },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, ...transition }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-white/40 mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Brain health tips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, ...transition }}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-4"
              >
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-white/80">
                  5 tipp az agyadnak
                </h3>
                <div className="space-y-3">
                  {TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, ...transition }}
                      className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                    >
                      <span className="text-lg mt-0.5">{tip.icon}</span>
                      <span>{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <motion.button
                  onClick={handleRestart}
                  className="rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#a78bfa] px-8 py-3.5 font-semibold font-[family-name:var(--font-heading)] text-white shadow-lg shadow-[#d946ef]/20"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(217,70,239,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={transition}
                >
                  Újra próbálom
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-8 py-3.5 font-semibold font-[family-name:var(--font-heading)] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={transition}
                >
                  Megosztás
                </motion.button>
              </motion.div>

              <div className="text-center">
                <Link href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                  &larr; Vissza a főoldalra
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
