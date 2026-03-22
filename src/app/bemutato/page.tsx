"use client";

import { motion } from "motion/react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const tools = [
  {
    icon: "🧠",
    name: "Személyes Weboldal",
    path: "/",
    color: "#d946ef",
    audience: "Média, szervezők, kutatók",
    description:
      "Prémium landing page, ami bemutatja Anna kutatási munkáját, publikációit, előadásait és tudományos nagyköveti szerepét. Egyetlen helyen minden információ, amit egy konferenciaszervező, újságíró vagy potenciális együttműködő partner keres.",
    benefits: [
      "Professzionális online jelenlét — nem csak egy LinkedIn profil",
      "Publikációk és előadások strukturált bemutatása",
      "Közvetlen kapcsolatfelvétel social linkekkel",
      "Interaktív eszközökhöz vezető linkek — a látogató itt marad",
      "SEO optimalizált — Google-ből is megtalálják",
    ],
    useCase:
      "Amikor Anna megosztja a linkjét egy podcast-házigazdával, konferenciaszervezővel vagy médiával, azonnal látják ki ő, mit kutat, és hogyan érhetik el.",
  },
  {
    icon: "🎯",
    name: "Agyi Kvíz",
    path: "/kviz",
    color: "#22d3ee",
    audience: "TikTok/Instagram követők, diákok, érdeklődők",
    description:
      "10 kérdéses interaktív kvíz az agy működéséről, öregedéséről és védelméről. Minden kérdés után tudományos magyarázat — szórakoztató formában tanít. Megosztható eredmény.",
    benefits: [
      "Virális potenciál — 'Mennyit tudsz az agyadról?' megosztás TikTok/Instagram Stories-ban",
      "Edukáció szórakoztatva — a tudományos nagyköveti szerep lényege",
      "Lead generálás — a kvíz végén irányítás a weboldalra és NeuroLab-ra",
      "Adatgyűjtés lehetőség — hányan oldják meg, átlag pontszám",
      "Branding — minden interakció erősíti a BrainToBrain márkát",
    ],
    useCase:
      "Anna megosztja Instagram Stories-ban: 'Teszteld, mennyit tudsz az agyadról!' — a követők kitöltik, megosztják az eredményüket, új követők jönnek.",
  },
  {
    icon: "🤖",
    name: "NeuroLab AI Platform",
    path: "/neurolab",
    color: "#a78bfa",
    audience: "Egyetemisták, egészségtudatos emberek, kutatás iránt érdeklődők",
    description:
      "AI-alapú agytudományi platform 4 interaktív eszközzel: NeuroAI chatbot, agyi egészség felmérés személyre szabott AI elemzéssel, betegség atlasz, és kutatói Q&A. Claude AI hajtja.",
    benefits: [
      "24/7 elérhető tudományos asszisztens — Anna tudása skálázva",
      "Személyre szabott agyi egészség elemzés — egyedi érték minden látogatónak",
      "Betegség atlasz — interaktív tanulás neurodegeneratív betegségekről",
      "Anna kutatási területeinek népszerűsítése — a chatbot folyamatosan hivatkozik rá",
      "Innovatív — kevés magyar kutató kínál ilyet",
    ],
    useCase:
      "Egy egyetemista beírja: 'Mi az autofágia?' — a chatbot közérthetően elmagyarázza és megemlíti, hogy ez Anna kutatási területe. Az agyi felmérés kitöltése után személyes tippeket kap.",
  },
];

const strategy = [
  {
    icon: "📱",
    title: "Social Media Integráció",
    text: "A kvíz és a NeuroLab tökéletes tartalmat ad TikTok, Instagram és Facebook posztokhoz. A megosztható eredmények organikus növekedést hoznak.",
  },
  {
    icon: "🎤",
    title: "Konferencia & Média",
    text: "A weboldal professzionális referenciapont. Előadások után a QR kód a kvízre vagy NeuroLab-ra irányít — a közönség tovább kapcsolódik.",
  },
  {
    icon: "🎓",
    title: "Tudományos Nagykövet Program",
    text: "Az interaktív eszközök tökéletesen illeszkednek a Magyar Tudomány Éve céljaihoz: a tudomány közelebb hozása a fiatalokhoz, digitális csatornákon.",
  },
  {
    icon: "📈",
    title: "Személyes Márkaépítés",
    text: "Anna nem csak kutató — a BrainToBrain brand egy felismerhető, modern tudománykommunikációs platform lesz, ami megkülönbözteti a mezőnytől.",
  },
];

export default function BemutaroPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0e0520", fontFamily: "var(--font-body)" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: "rgba(217,70,239,0.05)",
            filter: "blur(120px)",
            top: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background: "rgba(34,211,238,0.04)",
            filter: "blur(120px)",
            bottom: "-10%",
            right: "-5%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-16">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-20">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.15em] uppercase"
            style={{
              color: "#e879f9",
              background: "rgba(217,70,239,0.08)",
              border: "1px solid rgba(217,70,239,0.15)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d946ef] animate-pulse" />
            Prémium Digitális Csomag
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-extrabold text-white leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BrainToBrain
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #e879f9, #a78bfa, #67e8f9)" }}
            >
              Digital Suite
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg max-w-[540px] mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
          >
            Három prémium digitális eszköz, amelyek{" "}
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>Abbas Anna Anoir</strong> tudományos
            kommunikációját, online jelenlétét és közönségépítését támogatják.
          </motion.p>
        </motion.div>

        {/* Tools */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              variants={fadeUp}
              className="mb-6 p-8 relative overflow-hidden"
              style={{
                background: "#1a0a2e",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Gradient top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, #d946ef, #8b5cf6, #22d3ee)" }}
              />

              <div className="flex items-start gap-4 mb-5">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {tool.name}
                    </h2>
                    <Link
                      href={tool.path}
                      className="text-xs font-bold tracking-[0.06em] uppercase px-3 py-1"
                      style={{
                        background: "linear-gradient(135deg, #d946ef, #8b5cf6, #22d3ee)",
                        color: "white",
                      }}
                    >
                      Megnyitás →
                    </Link>
                  </div>
                  <p
                    className="text-xs font-bold tracking-[0.1em] uppercase"
                    style={{ color: tool.color }}
                  >
                    Célközönség: {tool.audience}
                  </p>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
              >
                {tool.description}
              </p>

              <div className="mb-5">
                <h3
                  className="text-xs font-bold tracking-[0.12em] uppercase mb-3"
                  style={{ color: "#e879f9" }}
                >
                  Hogyan segít Annának?
                </h3>
                <ul className="space-y-2">
                  {tool.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      <span style={{ color: "#34d399", flexShrink: 0 }}>✓</span>
                      <span style={{ fontWeight: 300 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="p-4"
                style={{
                  background: "rgba(34,211,238,0.04)",
                  borderLeft: "3px solid #22d3ee",
                }}
              >
                <p className="text-xs font-bold tracking-[0.1em] uppercase mb-1" style={{ color: "#67e8f9" }}>
                  Használati példa
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  {tool.useCase}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Strategy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16"
        >
          <motion.div variants={fadeUp} className="text-center mb-8">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "#e879f9" }}
            >
              Stratégia
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Hogyan használja Anna
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #e879f9, #a78bfa, #67e8f9)" }}
              >
                a három eszközt együtt?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="p-6"
                style={{
                  background: "#1a0a2e",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-2xl block mb-3">{s.icon}</span>
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 p-8 text-center"
          style={{
            background: "rgba(217,70,239,0.04)",
            border: "1px solid rgba(217,70,239,0.1)",
          }}
        >
          <h3
            className="text-xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ez a csomag Annának készült
          </h3>
          <p
            className="text-sm leading-relaxed max-w-[500px] mx-auto mb-6"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
          >
            Három eszköz, egy cél: hogy Abbas Anna Anoir tudományos munkája a lehető legtöbb emberhez
            eljusson — professzionálisan, interaktívan, és a BrainToBrain brand erejével.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-[0.04em] uppercase text-white"
              style={{ background: "linear-gradient(135deg, #d946ef, #8b5cf6, #22d3ee)" }}
            >
              Weboldal →
            </Link>
            <Link
              href="/kviz"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-[0.04em] uppercase"
              style={{
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Kvíz →
            </Link>
            <Link
              href="/neurolab"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-[0.04em] uppercase"
              style={{
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              NeuroLab →
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-12 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <p>
            Készítette az{" "}
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #e879f9, #a78bfa, #67e8f9)" }}
            >
              Expert Flow AI Team
            </span>{" "}
            · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
