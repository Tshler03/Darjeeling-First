// ─── IMPACT ──────────────────────────────────────────────────────
// components/darjeeling/Impact.tsx

'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { target: 54, suffix: '', label: 'Weekend Drives', desc: 'documented cleanup missions across Darjeeling' },
  { target: 1702, suffix: '', label: 'Community Followers', desc: 'and a movement that keeps catching' },
  { target: 200, suffix: '+', label: 'Volunteers', desc: 'who have shown up, picked up, and kept coming back' },
  { target: 0, suffix: '∞', label: 'Reasons to Keep Going', desc: 'because Darjeeling always deserves better' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView || target === 0) return
    const duration = 2200
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  if (target === 0) return <span ref={ref}>∞</span>
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="impact"
      style={{ position: 'relative', padding: '10rem 3rem', overflow: 'hidden' }}
    >
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
          alt="Darjeeling hills"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.4) brightness(.35)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,18,8,.92) 0%, rgba(45,74,45,.55) 100%)',
        }} />
      </div>

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.8rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>
              The Numbers
            </span>
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-display)', fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1, color: 'var(--cream)',
            }}
          >
            Proof is in{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--warm-amber)' }}>the work.</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', background: 'rgba(200,151,58,.08)',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              style={{
                background: 'rgba(26,18,8,.6)',
                padding: '3rem 2rem',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{
                fontFamily: 'var(--ff-display)', fontWeight: 900,
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                color: 'var(--warm-amber)', lineHeight: 1, marginBottom: '.6rem',
              }}>
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div style={{
                fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase', color: 'var(--tea-gold)', marginBottom: '.5rem',
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: '.82rem', lineHeight: 1.6, color: 'var(--mist-green)' }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
