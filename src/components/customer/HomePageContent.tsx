'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Leaf, CheckCircle2, CalendarCheck, Star, Wheat, HeartPulse } from 'lucide-react'
import EditableText from '@/components/EditableText'

/* ─── Animation Variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Hero stat pills ────────────────────────────────────────── */
const STATS = [
  { icon: <Leaf size={14} className="text-[#7D8E74]" />, label: 'Farm-Fresh Daily' },
  { icon: <CheckCircle2 size={14} className="text-[#7D8E74]" />, label: '100% Natural' },
  { icon: <Star size={14} className="text-[#7D8E74]" />, label: 'No Additives' },
]

/* ─── Types ──────────────────────────────────────────────────── */
type Content = {
  tagline: string
  heroTitle: string
  heroSubtitle: string
  ctaButton: string
  ourStoryBtn: string
  featuresHeading: string
  featuresSubtitle: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  ctaTitle: string
  ctaSubtitle: string
  startOrderBtn: string
}

type Props = { content: Content; isEditable?: boolean }

/* ─── Component ──────────────────────────────────────────────── */
export default function HomePageContent({ content: c, isEditable = false }: Props) {
  return (
    <div className="flex flex-col w-full bg-[#F9F7F2]">

      {/* ══════════════════════════════════════════════════════
                HERO — Image Overlap
            ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop')",
          }}
        />
        {/* Gradient overlay — more opaque on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/80 via-[#2D2D2D]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/60 via-transparent to-transparent" />

        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-start gap-6"
        >
          {/* Tagline pill */}
          <motion.span
            variants={fadeUp}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7D8E74]/30 text-[#F9F7F2] text-sm font-semibold border border-[#7D8E74]/40 backdrop-blur-sm"
          >
            <Leaf size={13} />
            <EditableText
              settingKey="cafe_tagline"
              initialValue={c.tagline}
              className="text-[#F9F7F2] text-sm font-semibold"
              isEditable={isEditable}
            />
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight max-w-2xl"
          >
            <EditableText
              settingKey="home_hero_title"
              initialValue={c.heroTitle}
              className="font-serif text-white leading-[1.05] tracking-tight"
              wrapperClassName="w-full"
              isEditable={isEditable}
            />
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} className="text-base md:text-lg text-white/80 max-w-md leading-relaxed font-medium">
            <EditableText
              settingKey="home_hero_subtitle"
              initialValue={c.heroSubtitle}
              as="textarea"
              className="text-white/80 leading-relaxed"
              wrapperClassName="max-w-md w-full"
              isEditable={isEditable}
            />
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/menu"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7D8E74] text-white font-bold text-sm hover:bg-[#5a6b52] transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <EditableText
                settingKey="home_cta_button"
                initialValue={c.ctaButton}
                className="font-bold text-white text-sm"
                isEditable={isEditable}
              />
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 text-white font-bold text-sm hover:bg-white/25 transition-all border border-white/30 backdrop-blur-sm"
            >
              <CalendarCheck size={16} />
              <EditableText
                settingKey="home_our_story_btn"
                initialValue={c.ourStoryBtn}
                className="font-bold text-white text-sm"
                isEditable={isEditable}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Overlap card — floats at hero bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8 md:left-12 md:right-auto md:max-w-xl translate-y-1/2 z-20 bg-[#F9F7F2] rounded-3xl px-6 py-6 shadow-2xl shadow-black/20 flex flex-wrap gap-4 justify-around"
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-[#2D2D2D]">
              <span className="w-7 h-7 rounded-full bg-[#7D8E74]/12 flex items-center justify-center">
                {s.icon}
              </span>
              <EditableText
                settingKey={`home_stat_${i}`}
                initialValue={s.label}
                className="text-[#2D2D2D] text-sm font-semibold"
                isEditable={isEditable}
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Spacer to compensate overlap card */}
      <div className="h-20 bg-[#F9F7F2]" />

      {/* ══════════════════════════════════════════════════════
                HEALTH HUB — Bento Grid
            ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-[#7D8E74] mb-3">
              <EditableText
                settingKey="home_features_tag"
                initialValue="Our Philosophy"
                className="text-[#7D8E74] text-xs font-bold tracking-[0.2em] uppercase"
                isEditable={isEditable}
              />
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] tracking-tight max-w-xl">
              <EditableText
                settingKey="home_features_heading"
                initialValue={c.featuresHeading}
                className="font-serif text-[#2D2D2D] tracking-tight"
                wrapperClassName="w-full"
                isEditable={isEditable}
              />
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-[#2D2D2D]/60 text-lg font-medium max-w-lg">
              <EditableText
                settingKey="home_features_subtitle"
                initialValue={c.featuresSubtitle}
                as="textarea"
                className="text-[#2D2D2D]/60 text-lg font-medium"
                wrapperClassName="w-full"
                isEditable={isEditable}
              />
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto"
          >
            {/* Card 1 — Farm-to-Table (tall, spans 2 rows on md) */}
            <motion.div
              variants={cardVariant}
              className="md:row-span-2 bg-white rounded-3xl p-8 border border-stone-200/80 flex flex-col gap-5 hover:shadow-xl hover:shadow-[#7D8E74]/10 transition-shadow group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7D8E74]/10 flex items-center justify-center group-hover:bg-[#7D8E74]/20 transition-colors">
                <Wheat size={24} className="text-[#7D8E74]" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#7D8E74] mb-2">
                  <EditableText
                    settingKey="home_feature1_tag"
                    initialValue="Sourcing"
                    className="text-[#7D8E74] text-xs font-bold tracking-[0.15em] uppercase"
                    isEditable={isEditable}
                  />
                </p>
                <h3 className="font-serif text-2xl text-[#2D2D2D] leading-snug mb-3">
                  <EditableText
                    settingKey="home_feature1_title"
                    initialValue={c.feature1Title}
                    className="font-serif text-2xl text-[#2D2D2D]"
                    wrapperClassName="w-full"
                    isEditable={isEditable}
                  />
                </h3>
                <p className="text-[#2D2D2D]/60 text-sm leading-relaxed">
                  <EditableText
                    settingKey="home_feature1_desc"
                    initialValue={c.feature1Desc}
                    as="textarea"
                    className="text-[#2D2D2D]/60 text-sm leading-relaxed"
                    wrapperClassName="w-full"
                    isEditable={isEditable}
                  />
                </p>
              </div>
              {/* Visual accent */}
              <div className="mt-auto grid grid-cols-2 gap-3">
                {['Local Farms', 'Seasonal Picks', 'Zero Preservatives', 'Daily Fresh'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-xl bg-[#7D8E74]/8 text-[#5a6b52] text-xs font-semibold text-center">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card 2 — Image card (large) */}
            <motion.div
              variants={cardVariant}
              className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[300px]"
              style={{ aspectRatio: '16/9' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop')",
                }}
              />
              {/* Gradient + text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/75 via-[#2D2D2D]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-serif text-2xl text-white leading-snug max-w-xs">
                  &ldquo;Eat food that was alive once.&rdquo;
                </p>
                <p className="text-white/60 text-xs mt-1.5 font-medium">— Nette&apos;s Nutritional Creed</p>
              </div>
            </motion.div>

            {/* Card 3 — Dish of the Day */}
            <motion.div
              variants={cardVariant}
              className="md:col-span-2 bg-[#2D2D2D] rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-xl hover:shadow-black/20 transition-shadow group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7D8E74]/20 flex items-center justify-center shrink-0 group-hover:bg-[#7D8E74]/30 transition-colors">
                <HeartPulse size={24} className="text-[#a3b39b]" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#7D8E74]">
                  <EditableText
                    settingKey="home_feature2_tag"
                    initialValue="Nutrition"
                    className="text-[#7D8E74] text-xs font-bold tracking-[0.15em] uppercase"
                    isEditable={isEditable}
                  />
                </p>
                <h3 className="font-serif text-2xl text-white leading-snug">
                  <EditableText
                    settingKey="home_feature2_title"
                    initialValue={c.feature2Title}
                    className="font-serif text-2xl text-white"
                    wrapperClassName="w-full"
                    isEditable={isEditable}
                  />
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  <EditableText
                    settingKey="home_feature2_desc"
                    initialValue={c.feature2Desc}
                    as="textarea"
                    className="text-stone-400 text-sm leading-relaxed"
                    wrapperClassName="w-full"
                    isEditable={isEditable}
                  />
                </p>
                <Link
                  href="/menu"
                  className="mt-3 w-fit flex items-center gap-1.5 text-[#7D8E74] text-sm font-semibold hover:text-[#a3b39b] transition group/link"
                >
                  <EditableText
                    settingKey="home_feature2_link"
                    initialValue="See Today's Menu"
                    className="text-[#7D8E74] text-sm font-semibold"
                    isEditable={isEditable}
                  />
                  <ArrowRight size={14} className="-translate-x-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
                BOTTOM CTA STRIP
            ══════════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden bg-[#F9F7F2]">
        {/* Organic blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #7D8E7430 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, #7D8E7420 0%, transparent 70%)' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-[#7D8E74] mb-4">
            <EditableText
              settingKey="home_bottom_cta_tag"
              initialValue="Get Started"
              className="text-[#7D8E74] text-xs font-bold tracking-[0.2em] uppercase"
              isEditable={isEditable}
            />
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-[#2D2D2D] tracking-tight mb-5">
            <EditableText
              settingKey="home_cta_title"
              initialValue={c.ctaTitle}
              className="font-serif text-[#2D2D2D] tracking-tight"
              wrapperClassName="inline-block"
              isEditable={isEditable}
            />
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#2D2D2D]/60 text-lg mb-8 font-medium max-w-md mx-auto">
            <EditableText
              settingKey="home_cta_subtitle"
              initialValue={c.ctaSubtitle}
              as="textarea"
              className="text-[#2D2D2D]/60 text-lg font-medium"
              wrapperClassName="w-full"
              isEditable={isEditable}
            />
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-full bg-[#2D2D2D] text-white font-bold text-sm hover:bg-[#7D8E74] transition-all shadow-lg shadow-black/15 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <EditableText
                settingKey="home_start_order_btn"
                initialValue={c.startOrderBtn}
                className="font-bold text-white text-sm"
                isEditable={isEditable}
              />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#7D8E74]/12 text-[#5a6b52] font-bold text-sm hover:bg-[#7D8E74]/20 transition-all border border-[#7D8E74]/25"
            >
              <CalendarCheck size={16} />
              <EditableText
                settingKey="home_book_table_btn"
                initialValue="Book a Table"
                className="text-[#5a6b52] font-bold text-sm"
                isEditable={isEditable}
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
