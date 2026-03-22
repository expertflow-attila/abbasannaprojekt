'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from 'motion/react';
import {
  FlaskConical,
  BookOpen,
  Mic2,
  Brain,
  Bot,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61577872302727' },
  { label: 'LinkedIn', href: 'https://hu.linkedin.com/in/anna-anoir-abbas-8b0462267' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@anna.anoir' },
  { label: 'Instagram', href: 'https://www.instagram.com/@anna.anoir' },
] as const;

const PUBLICATIONS = [
  {
    year: '2025',
    title: "CMA-autophagy related LAMP2A serves as a potential target for Huntington's disease treatment",
    journal: 'Autophagy',
  },
  {
    year: '2024',
    title: "iPSC-derived Huntington's disease neurons display cellular and transcriptomic defects and autophagy impairment",
    journal: 'Molecular Psychiatry',
  },
  {
    year: '2024',
    title: 'Neuronal direct conversion generates functional neurons that match cortical neuron subtypes',
    journal: 'Cell Reports',
  },
  {
    year: '2023',
    title: 'Disease modeling by directly converting patient fibroblasts into neurons — an emerging approach',
    journal: 'Stem Cell Reviews and Reports',
  },
  {
    year: '2022',
    title: "Advanced Approach for Stem Cell Transplantation in Huntington's Disease",
    journal: 'European Neuropsychopharmacology',
  },
] as const;

const TALKS = [
  {
    title: 'Brain Bar 2025',
    subtitle: 'Fesztivál előadás',
    description: 'Agykutatás és a jövő neurobiológiája',
    tag: '2025',
  },
  {
    title: 'AIPM Konferencia',
    subtitle: 'Meghívott előadó',
    description: 'MI és neurobiológia: hogyan tanítjuk a gépeket az agyról',
    tag: '2025',
  },
  {
    title: 'Nők a tudományban',
    subtitle: 'Science Expo panel',
    description: 'Kutatónők láthatósága a STEM területeken',
    tag: '2025',
  },
  {
    title: 'Hivatásból egészség',
    subtitle: 'Semmelweis Egyetem',
    description: 'A neurodegeneráció elleni küzdelem új eszközei',
    tag: '2024',
  },
] as const;

/* ─────────────────────────── ANIMATION HELPERS ─────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────── NOISE OVERLAY ─────────────────────── */

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────── AMBIENT ORBS ─────────────────────── */

function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-48 h-[600px] w-[600px] rounded-full bg-cyan-500/8 blur-[160px]" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/8 blur-[120px]" />
    </div>
  );
}

/* ─────────────────────────── HERO ORB (CSS) ─────────────────────── */

function BrainOrb() {
  return (
    <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
      {/* Core glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-8 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 blur-xl"
      />
      {/* Outer ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-fuchsia-500/20"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(217,70,239,0.15) 25%, transparent 50%, rgba(34,211,238,0.15) 75%, transparent 100%)',
        }}
      />
      {/* Outer ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-4 rounded-full border border-cyan-400/10"
        style={{
          background:
            'conic-gradient(from 180deg, transparent 0%, rgba(167,139,250,0.1) 30%, transparent 60%, rgba(217,70,239,0.08) 80%, transparent 100%)',
        }}
      />
      {/* Inner sphere */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-fuchsia-600/60 via-purple-700/40 to-cyan-500/30 backdrop-blur-sm" />
      {/* Synaptic dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{
            top: `${30 + Math.sin(i * 1.05) * 25}%`,
            left: `${30 + Math.cos(i * 1.05) * 25}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── HERO ─────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  return (
    <div ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <motion.div style={{ opacity, y }} className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrainOrb />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-fuchsia-400/80 uppercase"
        >
          Neurobiológus kutató &middot; Tudományos Nagykövet
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          Abbas Anna
          <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Anoir
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mt-6 max-w-lg font-[family-name:var(--font-body)] text-base leading-relaxed text-white/50 md:text-lg"
        >
          &ldquo;A k&iacute;v&aacute;ncsis&aacute;g az első l&eacute;p&eacute;s a meg&eacute;rt&eacute;s fel&eacute;.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#kutatas"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-8 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-fuchsia-500/25"
          >
            <FlaskConical className="h-4 w-4" />
            Kutat&aacute;saim
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#kapcsolat"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            Kapcsolat
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border border-white/15 p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-fuchsia-400/60"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────────── */

const stats = [
  { value: '9', label: 'Publikáció' },
  { value: '13', label: 'Hivatkozás' },
  { value: '2022', label: 'PhD kezdet' },
  { value: '\u221E', label: 'Kíváncsiság' },
] as const;

function About() {
  return (
    <Section id="rolam" className="px-6 py-32 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        {/* Left — text */}
        <div>
          <motion.p
            variants={fadeUp}
            className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-fuchsia-400/70 uppercase"
          >
            Rólam
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
          >
            A labor&oacute;rium &eacute;s a sz&iacute;npad k&ouml;z&ouml;tt
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-1 h-px w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400"
          />
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-8 max-w-xl font-[family-name:var(--font-body)] text-base leading-[1.85] text-white/55"
          >
            A BME biom&eacute;rn&ouml;k MSc diplom&aacute;j&aacute;val (2021) a zseb&eacute;ben &eacute;rkezett a Semmelweis Egyetem Transzl&aacute;ci&oacute;s Orvostudom&aacute;nyi Int&eacute;zet&eacute;be,
            ahol Dr. Karolina Pircs laborj&aacute;ban a HCEMM-SU Neurobiol&oacute;giai &eacute;s Neurodegerat&iacute;v Betegs&eacute;gek Kutat&oacute;csoportj&aacute;ban dolgozik.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-[1.85] text-white/55"
          >
            2025&ndash;2026 k&ouml;z&ouml;tt a Magyar Tudom&aacute;ny &Eacute;ve Tudom&aacute;nyos Nagyk&ouml;vete.
            A Brain Bar fesztiv&aacute;l visszat&eacute;rő előad&oacute;ja, a Mindenseg&iacute;t! podcast #155 epiz&oacute;dj&aacute;nak vend&eacute;ge
            &mdash; &bdquo;Kutat&oacute;l&aacute;ny, aki meghekkeli az &ouml;reged&eacute;st&rdquo;.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={5}
            className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-[1.85] text-white/55"
          >
            C&eacute;lja, hogy a neurobiol&oacute;giai kutat&aacute;st k&ouml;zelebb hozza az emberekhez
            &mdash; &eacute;rthető nyelven, l&aacute;tv&aacute;nyos form&aacute;ban, a tudom&aacute;nyos szigor megőrz&eacute;s&eacute;vel.
          </motion.p>
        </div>

        {/* Right — stats */}
        <motion.div variants={stagger} className="grid grid-cols-2 gap-4 pt-4 lg:pt-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-white/40">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── RESEARCH ─────────────────────────── */

const researchAreas = [
  {
    icon: '🧬',
    title: 'Neurodegeneratív betegségek',
    body: 'Huntington-kór modellezés iPSC-eredetű és direkt konvertált neuronokkal. Autofágia-útvonalak feltérképezése, LAMP2A mint terápiás célpont.',
  },
  {
    icon: '🔬',
    title: 'Indukált neuronok',
    body: 'Bőrsejtek közvetlen átprogramozása neuronokká — megkerülve a pluripotens állapotot. Kéregszintű neuronális altípusok generálása gyógyszerteszteléshez.',
  },
  {
    icon: '🧠',
    title: 'Az agy öregedése',
    body: 'Sejttípus-specifikus öregedési órák vizsgálata. Hogyan öregszik az agy molekuláris szinten, és hogyan lassítható a folyamat?',
  },
] as const;

function Research() {
  return (
    <Section id="kutatas" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-cyan-400/70 uppercase"
        >
          Kutatási területek
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
        >
          Amire a labor&oacute;rium &eacute;p&uuml;l
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-1 h-px w-16 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
        />

        <motion.div variants={stagger} className="mt-14 grid gap-6 md:grid-cols-3">
          {researchAreas.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="text-3xl">{r.icon}</span>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-[1.8] text-white/45">
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── PUBLICATIONS ─────────────────────── */

function Publications() {
  return (
    <Section id="publikaciok" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-purple-400/70 uppercase"
        >
          Publikációk
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
        >
          V&aacute;logatott k&ouml;zlem&eacute;nyek
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-1 h-px w-16 bg-gradient-to-r from-purple-400 to-fuchsia-500"
        />

        <motion.ul variants={stagger} className="mt-12 space-y-0 divide-y divide-white/[0.04]">
          {PUBLICATIONS.map((p, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              custom={i}
              className="group flex items-start gap-5 py-6"
            >
              <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-white/25">
                {p.year}
              </span>
              <div className="flex-1">
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white">
                  {p.title}
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-fuchsia-400/50">
                  {p.journal}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 -translate-x-2 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-fuchsia-400" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

/* ─────────────────────────── TALKS ─────────────────────────────── */

function Talks() {
  return (
    <Section id="eloadasok" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-fuchsia-400/70 uppercase"
        >
          Előadások
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
        >
          Sz&iacute;npadon &eacute;s azon t&uacute;l
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-1 h-px w-16 bg-gradient-to-r from-fuchsia-500 to-purple-400"
        />

        <motion.div variants={stagger} className="mt-14 grid gap-6 sm:grid-cols-2">
          {TALKS.map((t, i) => (
            <motion.div
              key={t.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm"
            >
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-white">
                    {t.title}
                  </h3>
                  <p className="mt-0.5 font-[family-name:var(--font-body)] text-xs text-white/35">
                    {t.subtitle}
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.08] px-3 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-white/30">
                  {t.tag}
                </span>
              </div>
              <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/45">
                {t.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── INTERACTIVE TOOLS ─────────────────── */

const tools = [
  {
    href: '/kviz',
    icon: <Brain className="h-7 w-7" />,
    title: 'Agyi Kvíz',
    description: 'Teszteld a tudásod az agyról — 10 kérdés, amit kevesen tudnak megválaszolni.',
    accent: 'from-fuchsia-500 to-purple-500',
    iconColor: 'text-fuchsia-400',
  },
  {
    href: '/neurolab',
    icon: <Bot className="h-7 w-7" />,
    title: 'NeuroLab AI',
    description: 'AI-alapú agytudományi platform — kérdezz bármit az agyról.',
    accent: 'from-cyan-400 to-purple-500',
    iconColor: 'text-cyan-400',
  },
] as const;

function InteractiveTools() {
  return (
    <Section id="eszkozok" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.p
          variants={fadeUp}
          className="text-center font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-cyan-400/70 uppercase"
        >
          Interaktív eszközök
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
        >
          Fedezd fel az agyat
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-1 h-px w-16 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
        />

        <motion.div variants={stagger} className="mt-14 grid gap-6 md:grid-cols-2">
          {tools.map((t, i) => (
            <motion.a
              key={t.title}
              href={t.href}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              {/* Top gradient line on hover */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${t.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-60`} />
              <div className={`${t.iconColor}`}>{t.icon}</div>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                {t.title}
              </h3>
              <p className="mt-2 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/45">
                {t.description}
              </p>
              <div className="mt-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-white/30 transition-colors group-hover:text-fuchsia-400">
                Megnyitás
                <ExternalLink className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── CONTACT ─────────────────────────── */

function Contact() {
  return (
    <Section id="kapcsolat" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-fuchsia-400/70 uppercase"
        >
          Kapcsolat
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl"
        >
          Keress b&aacute;tran
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-1 h-px w-16 bg-gradient-to-r from-fuchsia-500 to-cyan-400"
        />

        <motion.a
          variants={fadeUp}
          custom={3}
          href="mailto:abbas.anna@semmelweis.hu"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/[0.08] px-8 py-4 font-[family-name:var(--font-body)] text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          <Mail className="h-4 w-4 text-fuchsia-400" />
          abbas.anna@semmelweis.hu
        </motion.a>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <motion.div variants={stagger} className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
              className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-white/30 transition-colors hover:text-fuchsia-400"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-[family-name:var(--font-mono)] text-xs text-white/20">
          &copy; 2026 Abbas Anna Anoir &middot; BrainToBrain
        </p>
        <nav className="flex gap-6">
          {['Rólam', 'Kutatás', 'Publikációk', 'Előadások'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
              className="font-[family-name:var(--font-body)] text-xs text-white/20 transition-colors hover:text-white/50"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────────── */

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0e0520] text-white selection:bg-fuchsia-500/30 selection:text-white">
      <NoiseOverlay />
      <AmbientOrbs />
      <Hero />
      <About />
      <Research />
      <Publications />
      <Talks />
      <InteractiveTools />
      <Contact />
      <Footer />
    </main>
  );
}
