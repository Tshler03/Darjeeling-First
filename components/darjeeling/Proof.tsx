'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONFIG — update numbers as the movement grows ─────────────────────────
// suffix: shown after number | note: shown below label in smaller text
const STATS = [
  {
    num: 54,
    suffix: '',
    label: 'Sundays given back',
    note: 'to the hills.',
    color: 'var(--warm-amber)',
  },
  {
    num: 1702,
    suffix: '+',
    label: 'People who care',
    note: 'and counting.',
    color: 'var(--tea-gold)',
  },
  {
    num: 200,
    suffix: '+',
    label: 'Who showed up',
    note: 'when they didn\'t have to.',
    color: 'var(--warm-amber)',
  },
  {
    num: 0,
    suffix: '∞',
    label: 'Reasons to stop',
    note: 'Darjeeling always deserves better.',
    color: 'var(--mist-green)',
  },
]

// ─── Single animated count-up number ──────────────────────────────────────
function CountUp({
  target,
  suffix,
  color,
  duration = 2400,
}: {
  target: number
  suffix: string
  color: string
  duration?: number
}) {
  const [val, setVal]   = useState(0)
  const [done, setDone] = useState(false)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || target === 0) return
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(ease * target))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  if (target === 0) {
    return (
      <span ref={ref} style={{ color }}>
        ∞
      </span>
    )
  }

  return (
    <span ref={ref} style={{ color }}>
      {val.toLocaleString()}
      <span style={{
        fontSize: '0.55em',
        opacity: done ? 1 : 0,
        transition: 'opacity 0.4s',
      }}>
        {suffix}
      </span>
    </span>
  )
}

// ─── Single stat card ──────────────────────────────────────────────────────
function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[0]
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: 'relative',
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
        borderTop: '1px solid rgba(200,151,58,0.1)',
        borderLeft: index % 2 !== 0 ? '1px solid rgba(200,151,58,0.06)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'clamp(200px, 28vh, 280px)',
        overflow: 'hidden',
      }}
    >
      {/* Ghost index number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.5rem',
          right: '1rem',
          fontFamily: 'var(--ff-display)',
          fontWeight: 900,
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,151,58,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Top: big number */}
      <div style={{
        fontFamily: 'var(--ff-display)',
        fontWeight: 900,
        fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        <CountUp
          target={stat.num}
          suffix={stat.suffix}
          color={stat.color}
          duration={2200 + index * 150}
        />
      </div>

      {/* Bottom: label + note */}
      <div>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--tea-gold)',
          marginBottom: '0.4rem',
        }}>
          {stat.label}
        </div>
        <div style={{
          fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
          lineHeight: 1.6,
          color: 'var(--mist-green)',
          fontStyle: 'italic',
        }}>
          {stat.note}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────
export default function Proof() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const inView     = useInView(headerRef, { once: true, margin: '-80px' })

  // Parallax on background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY    = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const lineX  = useTransform(scrollYProgress, [0, 0.5], ['-100%', '0%'])

  return (
    <section
      id="proof"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--midnight)',
      }}
    >
      {/* ── FULL BLEED BG — Darjeeling hills, barely visible ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: bgY,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'saturate(0.3) brightness(0.25)',
          }}
        />
      </motion.div>

      {/* Gradient over bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background:
          'linear-gradient(135deg, rgba(26,18,8,0.95) 0%, rgba(45,74,45,0.4) 100%)',
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: 'clamp(5rem, 10vw, 10rem) var(--gutter)',
      }}>

        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center',
          marginBottom: 'clamp(4rem, 8vw, 8rem)',
        }}>
          {/* Animated line */}
          <div style={{
            width: '100%', height: '1px',
            overflow: 'hidden',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
          }}>
            <motion.div style={{
              height: '100%',
              background: 'linear-gradient(to right, transparent, var(--tea-gold), transparent)',
              x: lineX,
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.8rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)' }} />
            <span style={{
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)',
            }}>
              The Proof
            </span>
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
              marginBottom: '1.2rem',
            }}
          >
            Proof is in{' '}
            <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>
              the work.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              lineHeight: 1.75,
              color: 'var(--forest-brown)',
              fontStyle: 'italic',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Not a company. Not an NGO. Just friends
            who decided that love for a place
            means showing up for it.
          </motion.p>
        </div>

        {/* ── STATS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          background: 'rgba(200,151,58,0.04)',
          border: '1px solid rgba(200,151,58,0.08)',
          marginBottom: 'clamp(4rem, 8vw, 8rem)',
        }}>
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* ── PULL QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Quote mark */}
          <div style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: 'rgba(200,151,58,0.08)',
            lineHeight: 0.8,
            marginBottom: '-1rem',
            fontWeight: 900,
          }}>
            "
          </div>

          <blockquote style={{
            fontFamily: 'var(--ff-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
            lineHeight: 1.4,
            color: 'var(--cream)',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            Group of friends coming from same school of thought.
          </blockquote>

          <cite style={{
            fontStyle: 'normal',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--tea-gold)',
          }}>
            — Darjeeling First · Instagram Bio
          </cite>

          {/* Thin rule below */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--tea-gold)',
              margin: '2rem auto 0',
              transformOrigin: 'center',
            }}
          />
        </motion.div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 600px) {
          #proof-grid {
            grid-template-columns: 1fr !important;
          }
          #proof-grid > div:nth-child(even) {
            border-left: none !important;
            border-top: 1px solid rgba(200,151,58,0.1) !important;
          }
        }
      `}</style>
    </section>
  )
}
