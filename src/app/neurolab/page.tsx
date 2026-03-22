"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Brain, MessageCircle, ClipboardCheck, Map, Sparkles, ArrowLeft, Send, X, ChevronRight, ChevronLeft, Activity, Dna, Zap, Shield } from "lucide-react";

type ModalView = null | "chat" | "assessment" | "atlas";
type Message = { role: "user" | "assistant"; content: string };

const diseases = [
  { id: "alzheimer", icon: <Dna className="w-6 h-6" />, emoji: "🧩", name: "Alzheimer-kor", color: "from-purple to-magenta", prevalence: "55+ millio erintett vilagszerte",
    mechanism: "Beta-amiloid plakkok es tau-feherje kuszalodas (tangles) vezet az idegsejtek pusztulasahoz. Az amiloid kaszkad hipotezis szerint a toxikus oligomerek karositjak a szinapszisokat.",
    symptoms: "Rovid tavu memoria romlasa, dezorientaltsag, nyelvi nehezsegek, szemelyisegvaltozas, vegul a mindennapos mukodesek elvesztese.",
    research: "Lecanemab es donanemab anti-amiloid antitest terapiak igeretes eredmenyeket mutatnak. Korai diagnozis verplazma biomarkerekkel.",
    prevention: "Rendszeres aerob mozgas, mediterran etrend, szellemi aktivitas, tarsas kapcsolatok, megfelelo alvas (7-8 ora)." },
  { id: "huntington", icon: <Activity className="w-6 h-6" />, emoji: "🎯", name: "Huntington-kor", color: "from-magenta to-coral", prevalence: "~30 000 erintett az USA-ban, 150 000+ elofokon",
    mechanism: "A HTT gen CAG ismetlodesek szamavaltozo mutacioja. 36+ ismetlodes betegseget okoz. A mutans huntingtin-feherje aggregatumokat kepez. Ez Anna kutatasi terulete!",
    symptoms: "Korea (akaratlan mozgasok), kognitiv hanyatlas, pszichiatriai tunetek (depresszio, irritaltsag). Altalaban 30-50 eves korban jelentkezik.",
    research: "Gencsendesitest (ASO), HTT-csokkento terapiak, autofagia-modulatorok — ezen dolgozik a BrainToBrain csapat is!",
    prevention: "Orokletes betegseg, megelozni nem lehet, de a korai diagnozis es eletmod valtozasok lassithatjak a progressziot." },
  { id: "parkinson", icon: <Shield className="w-6 h-6" />, emoji: "🫠", name: "Parkinson-kor", color: "from-cyan to-blue", prevalence: "10+ millio erintett vilagszerte",
    mechanism: "Dopaminerg neuronok pusztulasa a substantia nigraban. Alfa-szinuklein feherje Lewy-testek formajaban halmozodik fel.",
    symptoms: "Tremor (remeges), merevseg (rigiditas), lassusag (bradikinezia), egyensulyzavar, szokvaltozas, alvasproblomak.",
    research: "GLP-1 agonistak (pl. liraglutid) neuroprotektiv hatasanak vizsgalata. Bel-agy tengely kutatas, alfa-szinuklein ellenanyagok.",
    prevention: "Rendszeres mozgas (kulonosen tanc, tai chi), kaffefogyasztas, megfelelo D-vitamin szint, belmikrobiom egyensuly." },
  { id: "als", icon: <Zap className="w-6 h-6" />, emoji: "⚡", name: "ALS (Amiotrofias Lateralszklerzis)", color: "from-green to-cyan", prevalence: "~30 000 erintett az USA-ban barmelyik pillanatban",
    mechanism: "Motorikus neuronok progressziv pusztulasa az agyban es a gerincveloben. TDP-43, SOD1 es C9orf72 genek mutacioi.",
    symptoms: "Izomgyengeseg, izomsorvadas, nyelesi- es beszednehezseg, vegul legzesi elegtelenseg. A kognitiv funkciok gyakran megmaradnak.",
    research: "Tofersen (SOD1 ASO) FDA jovahagyas. Genterapiak, ossejt-terapiak es neuroinflammmacio-gatlok fejlesztese.",
    prevention: "Nincs ismert megelozes, de a korai felismeres es multidiszciplinaris gondozas jelentosen javit az eletminosegen." },
];

const questions = [
  { category: "Alvas", icon: "🌙", question: "Atlagosan mennyit alszol egy ejszaka?",
    answers: [{ text: "Kevesebb mint 5 ora", score: 1 }, { text: "5-6 ora", score: 2 }, { text: "7-8 ora", score: 4 }, { text: "Tobb mint 8 ora", score: 3 }] },
  { category: "Mozgas", icon: "🏃", question: "Milyen gyakran vegzel legalabb 30 perces aerob mozgast?",
    answers: [{ text: "Soha", score: 1 }, { text: "Heti 1-2 alkalommal", score: 2 }, { text: "Heti 3-5 alkalommal", score: 3 }, { text: "Minden nap", score: 4 }] },
  { category: "Taplalkozas", icon: "🥗", question: "Mennyire jellemzo az etrendedre a mediterran tipusu taplalkozas?",
    answers: [{ text: "Egyaltalan nem", score: 1 }, { text: "Ritkan", score: 2 }, { text: "Gyakran", score: 3 }, { text: "Az etrendem alapja", score: 4 }] },
  { category: "Tarsas elet", icon: "👥", question: "Milyen gyakran vannak ertelmes tarsas interakcioid?",
    answers: [{ text: "Szinte soha", score: 1 }, { text: "Havonta par alkalommal", score: 2 }, { text: "Hetente tobbszor", score: 3 }, { text: "Minden nap", score: 4 }] },
  { category: "Szellemi aktivitas", icon: "📚", question: "Tanulsz-e aktivan valami ujat?",
    answers: [{ text: "Nem igazan", score: 1 }, { text: "Neha elkezdem, de abbahagyom", score: 2 }, { text: "Rendszeresen tanulok", score: 3 }, { text: "Tobb teruleten is aktivan", score: 4 }] },
  { category: "Stressz", icon: "😤", question: "Hogyan jellemzed a stresszszintedet?",
    answers: [{ text: "Kronikusan magas", score: 1 }, { text: "Gyakran stresszes vagyok", score: 2 }, { text: "Mersekelt, kezelni tudom", score: 3 }, { text: "Alacsony, tudatos stresszkezeles", score: 4 }] },
  { category: "Alkohol & dohanyzas", icon: "🚭", question: "Milyen a kapcsolatod az alkohollal/dohanyzassal?",
    answers: [{ text: "Rendszeresen mindketto", score: 1 }, { text: "Rendszeres alkoholfogyasztas", score: 2 }, { text: "Alkalmanként, mersekelten", score: 3 }, { text: "Minimalis vagy semmilyen", score: 4 }] },
  { category: "Mentalis egeszseg", icon: "🧘", question: "Foglalkozol-e tudatosan a mentalis egeszs egeddel?",
    answers: [{ text: "Nem igazan", score: 1 }, { text: "Neha gondolok ra", score: 2 }, { text: "Rendszeresen (meditacio, naplo)", score: 3 }, { text: "Eletem fontos resze", score: 4 }] },
];

const chatSuggestions = ["Hogyan oregszik az agy?", "Mi az a Huntington-kor?", "Hogyan vedjem az agyam?", "Mi az autofagia?", "Alvas es agy kapcsolata"];

const features: { title: string; desc: string; icon: React.ReactNode; gradient: string; modal: ModalView }[] = [
  { title: "NeuroAI Asszisztens", desc: "AI-alapu beszelgetes az agy tudomanyarol", icon: <MessageCircle className="w-7 h-7" />, gradient: "from-magenta to-purple", modal: "chat" },
  { title: "Agyi Egeszseg Felmeres", desc: "8 kerdessel merjuk fel az agyi egeszseg ed", icon: <ClipboardCheck className="w-7 h-7" />, gradient: "from-cyan to-blue", modal: "assessment" },
  { title: "Betegseg Atlasz", desc: "Interaktiv neurodegenerativ betegseg-terkep", icon: <Map className="w-7 h-7" />, gradient: "from-purple to-cyan", modal: "atlas" },
  { title: "Kerdezd a Kutatot", desc: "Kutatas-fokuszu kerdesek az AI-nek", icon: <Sparkles className="w-7 h-7" />, gradient: "from-green to-cyan", modal: "chat" },
];

const dotFeatures = [
  { label: "AI Asszisztens", color: "bg-magenta" },
  { label: "Agyi Egeszseg Felmeres", color: "bg-cyan" },
  { label: "Betegseg Atlasz", color: "bg-purple" },
  { label: "Szemelyre szabott tippek", color: "bg-green" },
];

function LoadingDots() {
  return (
    <span className="inline-flex gap-1 items-center h-5">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-2 h-2 rounded-full bg-magenta"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </span>
  );
}

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full max-w-3xl max-h-[90vh] bg-bg rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl"
        initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/60 hover:bg-surface-2 transition text-text-dim hover:text-text">
          <X className="w-5 h-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Chat Modal ── */
function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Szia! En vagyok a BrainToBrain AI Asszisztens. Kerdezz barmit az agy mukodeserol, neurodegenerativ betegsegekrol vagy az agyi egeszsegrol! 🧠" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: apiMessages }) });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text || data.error || "Hiba tortent." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sajnos nem sikerult kapcsolodni a szerverhez." }]);
    } finally { setLoading(false); }
  }, [messages, loading]);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-magenta to-purple flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">NeuroAI Asszisztens</h2>
          <p className="text-xs text-text-dim">Kerdezz az agyrol barmit</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[50vh]">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" ? "bg-magenta/20 text-text border border-magenta/20 rounded-br-md" : "bg-surface text-text border border-border rounded-bl-md"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-md"><LoadingDots /></div></div>}
      </div>
      {messages.length <= 1 && (
        <div className="px-6 pb-2 flex flex-wrap gap-2">
          {chatSuggestions.map((s) => (
            <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full border border-magenta/20 text-magenta-light hover:bg-magenta/10 transition">{s}</button>
          ))}
        </div>
      )}
      <div className="p-4 border-t border-border flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ird be a kerdesedet..." className="flex-1 bg-surface rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-magenta/30 border border-border" />
        <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-magenta to-purple text-white font-semibold disabled:opacity-40 hover:shadow-lg hover:shadow-magenta/20 transition">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </ModalOverlay>
  );
}

/* ── Assessment Modal ── */
function AssessmentModal({ onOpenChat, onClose }: { onOpenChat: () => void; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const totalMax = questions.length * 4;
  const score = answers.reduce((a, b) => a + b, 0);
  const pct = Math.round((score / totalMax) * 100);
  const circ = 2 * Math.PI * 42;

  const handleAnswer = (s: number) => {
    const next = [...answers, s];
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else { setDone(true); fetchAnalysis(next); }
  };

  const fetchAnalysis = async (ans: number[]) => {
    setAnalyzing(true);
    const summary = questions.map((q, i) => `${q.category}: ${q.answers.find((a) => a.score === ans[i])?.text} (${ans[i]}/4)`).join("\n");
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "Te a BrainToBrain agyi egeszseg elemzo asszisztens vagy. Kapott felmeres eredmenyek alapjan adj szemelyre szabott, tudomanyos alapu elemzest. Irj: 1) Erossegek (2-3 pont), 2) Fejlesztendo teruletek (2-3 pont konkretan), 3) Egy meglepo tudomanyos teny. Magyarul, roviden, baratsagosan.",
          messages: [{ role: "user", content: `Agyi egeszseg felmeres eredmenyeim (${score}/${totalMax}, ${pct}%):\n${summary}\n\nKerlek elemezd az eredmenyeimet!` }],
        }) });
      const data = await res.json();
      setAnalysis(data.text || "Nem sikerult elemezni.");
    } catch { setAnalysis("Sajnos nem sikerult az AI elemzes. Probald ujra kesobb!"); }
    finally { setAnalyzing(false); }
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); setAnalysis(""); };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6 border-b border-border">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">Agyi Egeszseg Felmeres</h2>
        <p className="text-xs text-text-dim mt-1">{done ? "Eredmenyed" : `${step + 1} / ${questions.length} kerdes`}</p>
        {!done && (
          <div className="mt-3 h-1.5 bg-surface rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-cyan to-magenta rounded-full"
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 25 }} />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <div className="text-3xl mb-3">{questions[step].icon}</div>
              <p className="text-xs text-magenta-light font-semibold uppercase tracking-wider mb-2">{questions[step].category}</p>
              <h3 className="text-lg font-semibold mb-6">{questions[step].question}</h3>
              <div className="space-y-3">
                {questions[step].answers.map((a, i) => (
                  <button key={i} onClick={() => handleAnswer(a.score)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-2 hover:border-magenta/30 transition text-sm group">
                    <span className="group-hover:text-magenta-light transition">{a.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${circ}`} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }} />
                  <defs><linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#d946ef" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span className="text-3xl font-bold font-[family-name:var(--font-heading)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>{pct}%</motion.span>
                  <span className="text-xs text-text-dim">{score}/{totalMax} pont</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">
                {pct >= 80 ? "Kivalo agyi egeszseg!" : pct >= 60 ? "Jo uton jarsz!" : pct >= 40 ? "Van mit fejleszteni" : "Ideje valtoztatni!"}
              </h3>
              {analyzing ? (
                <div className="mt-6 p-4 bg-surface rounded-xl border border-border"><p className="text-sm text-text-dim mb-2">AI elemzes keszul...</p><LoadingDots /></div>
              ) : analysis ? (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-surface rounded-xl border border-border text-left text-sm leading-relaxed whitespace-pre-wrap">{analysis}</motion.div>
              ) : null}
              <div className="mt-6 flex gap-3 justify-center flex-wrap">
                <button onClick={reset} className="px-5 py-2.5 rounded-xl border border-border text-sm hover:bg-surface transition">Ujra kitoltom</button>
                <button onClick={() => { onClose(); onOpenChat(); }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-magenta to-purple text-white text-sm font-semibold hover:shadow-lg hover:shadow-magenta/20 transition">Kerdezd az AI-t</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!done && step > 0 && (
        <div className="p-4 border-t border-border">
          <button onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }} className="flex items-center gap-1 text-sm text-text-dim hover:text-text transition">
            <ChevronLeft className="w-4 h-4" /> Vissza
          </button>
        </div>
      )}
    </ModalOverlay>
  );
}

/* ── Atlas Modal ── */
function AtlasModal({ onOpenChat, onClose }: { onOpenChat: () => void; onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = diseases.find((d) => d.id === selected);
  const sections = active ? [
    { label: "Mechanizmus", value: active.mechanism, icon: "🔬" },
    { label: "Tunetek", value: active.symptoms, icon: "🩺" },
    { label: "Kutatas", value: active.research, icon: "🧪" },
    { label: "Megelozes", value: active.prevention, icon: "🛡️" },
  ] : [];

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6 border-b border-border">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">Betegseg Atlasz</h2>
        <p className="text-xs text-text-dim mt-1">Neurodegenerativ betegsegek interaktiv terkepe</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {diseases.map((d) => (
                <motion.button key={d.id} onClick={() => setSelected(d.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="text-left p-5 rounded-xl border border-border bg-surface hover:bg-surface-2 transition group">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{d.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-magenta-light transition">{d.name}</h3>
                      <p className="text-xs text-text-dim mt-1">{d.prevalence}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-dim group-hover:text-magenta-light transition mt-1" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : active ? (
            <motion.div key={active.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-text-dim hover:text-text transition mb-5">
                <ChevronLeft className="w-4 h-4" /> Vissza az atlaszhoz
              </button>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{active.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">{active.name}</h3>
                  <p className="text-xs text-text-dim">{active.prevalence}</p>
                </div>
              </div>
              {sections.map((s) => (
                <div key={s.label} className="mb-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-magenta-light mb-2 flex items-center gap-2"><span>{s.icon}</span> {s.label}</h4>
                  <p className="text-sm text-text-mid leading-relaxed">{s.value}</p>
                </div>
              ))}
              <button onClick={() => { onClose(); onOpenChat(); }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-magenta to-purple text-white text-sm font-semibold hover:shadow-lg hover:shadow-magenta/20 transition">
                Kerdezd az AI-t errol
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ModalOverlay>
  );
}

/* ══ MAIN PAGE ══ */
export default function NeuroLabPage() {
  const [modal, setModal] = useState<ModalView>(null);
  return (
    <main className="min-h-screen bg-bg-deep relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-magenta/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px]" />
      </div>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-sm text-text-dim hover:text-text transition">
          <ArrowLeft className="w-4 h-4" /> Vissza a folodalra
        </Link>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-magenta" />
          <span className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wide">NeuroLab</span>
        </div>
      </nav>
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-magenta/20 bg-magenta/5 text-xs text-magenta-light mb-6">
            <Sparkles className="w-3.5 h-3.5" /> AI-alapu interaktiv platform
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Ismerd meg az agyad{" "}
            <span className="bg-gradient-to-r from-magenta via-purple to-cyan bg-clip-text text-transparent">titkait</span>
          </h1>
          <p className="text-text-mid text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Mesterseges intelligenciaval segitett, interaktiv platform a neurotudomanyi ismeretekert
          </p>
        </motion.div>
        <motion.div className="flex flex-wrap items-center justify-center gap-6 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {dotFeatures.map((f) => (
            <div key={f.label} className="flex items-center gap-2 text-sm text-text-dim">
              <span className={`w-2 h-2 rounded-full ${f.color}`} /> {f.label}
            </div>
          ))}
        </motion.div>
      </section>
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.button key={f.title} onClick={() => setModal(f.modal)}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i + 0.3 }}
              whileHover={{ y: -6 }} className="relative group text-left p-6 rounded-2xl bg-surface border border-border hover:border-magenta/20 transition-all">
              <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 text-white`}>{f.icon}</div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold mb-1.5 group-hover:text-magenta-light transition">{f.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-magenta-light opacity-0 group-hover:opacity-100 transition">
                Megnyitas <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>
      <footer className="relative z-10 text-center pb-8 text-xs text-text-dim">
        <p>BrainToBrain NeuroLab &middot; Abbas Anna Anoir &middot; Powered by AI</p>
      </footer>
      <AnimatePresence>
        {modal === "chat" && <ChatModal onClose={() => setModal(null)} />}
        {modal === "assessment" && <AssessmentModal onClose={() => setModal(null)} onOpenChat={() => setModal("chat")} />}
        {modal === "atlas" && <AtlasModal onClose={() => setModal(null)} onOpenChat={() => setModal("chat")} />}
      </AnimatePresence>
    </main>
  );
}
