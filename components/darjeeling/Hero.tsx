'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONFIG — update these numbers as the movement grows ───────────────────
const STATS = [
  { num: '54',    suffix: '',   label: 'Sundays given back' },
  { num: '1,702', suffix: '+',  label: 'People following' },
  { num: '200',   suffix: '+',  label: 'Who showed up' },
]
// ───────────────────────────────────────────────────────────────────────────

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.1,
      delay: 0.6 + i * 0.14,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  }),
}

export default function Hero() {
  const bgRef    = useRef<HTMLDivElement>(null)
  const bleedRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background image
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Bleeding DARJEELING text parallax (slower than bg)
      gsap.to(bleedRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Ambient breathing pulse on background
      gsap.to(pulseRef.current, {
        scale: 1.04,
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* ── BACKGROUND ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div
          ref={pulseRef}
          style={{ position: 'absolute', inset: '-10%', willChange: 'transform' }}
        >
          <div
            ref={bgRef}
            style={{
              position: 'absolute',
              inset: '-15%',
              backgroundImage:
                'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Mist overlay — fog, not shadow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,18,8,0.1) 0%, rgba(26,18,8,0.45) 40%, rgba(26,18,8,0.92) 100%)',
        }} />
        {/* Left atmospheric vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(26,18,8,0.55) 0%, transparent 55%)',
        }} />
        {/* Mist layer — the fog effect */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 120% 60% at 50% 30%, rgba(200,216,192,0.04) 0%, transparent 70%)',
        }} />
      </div>

      {/* ── BLEEDING "DARJEELING" ── */}
      <motion.div
        ref={bleedRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--ff-display)',
          fontWeight: 900,
          // Intentionally bleeds off viewport — that's the design
          fontSize: 'clamp(8rem, 28vw, 28rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,151,58,0.12)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        DARJEELING
      </motion.div>

      {/* ── MOUNTAIN SILHOUETTE SVG ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 2, pointerEvents: 'none',
      }}>
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          style={{ width: '100%', display: 'block' }}
        >
          <path
            d="M0 180 L0 120 L90 95 L170 115 L260 65 L340 88 L420 42 L500 68 L580 28 L660 55 L740 18 L820 46 L900 70 L980 38 L1060 62 L1150 82 L1240 58 L1330 88 L1400 108 L1440 95 L1440 180 Z"
            fill="#1A1208"
          />
          <path
            d="M0 180 L0 148 L130 132 L280 142 L400 115 L530 128 L650 100 L770 115 L890 105 L1010 120 L1140 134 L1270 112 L1380 138 L1440 125 L1440 180 Z"
            fill="#3D2B0E"
            opacity="0.65"
          />
          <path
            d="M0 180 L0 165 L220 155 L440 163 L660 152 L880 161 L1100 155 L1320 163 L1440 158 L1440 180 Z"
            fill="#2D4A2D"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div
        style={{
          position: 'relative', zIndex: 3,
          width: '100%', maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 var(--gutter) clamp(4rem, 8vh, 7rem)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'end',
        }}
      >
        {/* LEFT */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              marginBottom: '1.8rem',
            }}
          >
            <div style={{
              width: 32, height: 1,
              background: 'var(--tea-gold)', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)',
            }}>
              Darjeeling, West Bengal · Est. 2024
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <h1 style={{
            fontFamily: 'var(--ff-display)', fontWeight: 900,
            fontSize: 'clamp(3.8rem, 9vw, 9rem)',
            lineHeight: 0.9, letterSpacing: '-0.025em',
            marginBottom: '1.8rem',
            overflow: 'hidden',
          }}>
            {['We', 'show', 'up.'].map((word, i) => (
              <span
                key={word}
                style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.2em' }}
              >
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  style={{
                    display: 'inline-block',
                    color: i === 1 ? 'var(--warm-amber)' : 'var(--cream)',
                    fontStyle: i === 1 ? 'italic' : 'normal',
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            style={{
              fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
              lineHeight: 1.75, color: 'var(--mist-green)',
              maxWidth: 420, marginBottom: '2.5rem',
            }}
          >
            A group of friends from the same hills, the same school of
            thought — who got tired of waiting for someone else to clean
            up what they love most.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            <a
              href="#invitation"
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--warm-amber)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--tea-gold)')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--ff-body)', fontSize: '0.75rem',
                fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--midnight)', background: 'var(--tea-gold)',
                padding: '0.9rem 2rem', transition: 'background 0.25s',
              }}
            >
              Join a Sunday
            </a>
            <a
              href="#beginning"
              style={{
                fontSize: '0.82rem', fontWeight: 400,
                color: 'rgba(245,237,216,0.6)',
                borderBottom: '1px solid rgba(245,237,216,0.2)',
                paddingBottom: '2px', transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,216,0.6)')}
            >
              Our story
            </a>
          </motion.div>
        </div>

        {/* RIGHT — STATS */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          style={{
            display: 'flex', flexDirection: 'column',
            gap: '1.8rem', paddingBottom: '0.5rem',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                borderLeft: '2px solid var(--tea-gold)',
                paddingLeft: '1.2rem',
              }}
            >
              <div style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 700, color: 'var(--warm-amber)', lineHeight: 1,
              }}>
                {s.num}<span style={{ fontSize: '0.7em' }}>{s.suffix}</span>
              </div>
              <div style={{
                fontSize: '0.62rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--mist-green)', marginTop: '0.3rem',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── SCROLL CUE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--forest-brown)',
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 48, background: 'var(--dark-earth)',
          position: 'relative', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent, var(--tea-gold))',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
