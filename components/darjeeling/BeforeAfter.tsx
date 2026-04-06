'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const containerRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const newPct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPct(newPct)
  }, [])

  return (
    <section
      id="wipe"
      style={{ background: 'var(--midnight)', padding: '8rem 3rem' }}
    >
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>
              The Difference We Make
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-display)', fontWeight: 900,
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              lineHeight: 1.05, color: 'var(--cream)', marginBottom: '.8rem',
            }}
          >
            See the{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--warm-amber)' }}>transformation.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '.92rem', lineHeight: 1.75, color: 'var(--mist-green)', maxWidth: 480 }}
          >
            Drag to reveal what a few hours and a hundred pairs of hands
            can do to a mountain trail buried in garbage.
          </motion.p>
        </div>

        {/* Wipe container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div
            ref={containerRef}
            onMouseDown={e => { setDragging(true); updatePct(e.clientX) }}
            onMouseMove={e => { if (dragging) updatePct(e.clientX) }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchStart={e => { setDragging(true); updatePct(e.touches[0].clientX) }}
            onTouchMove={e => { if (dragging) updatePct(e.touches[0].clientX) }}
            onTouchEnd={() => setDragging(false)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
              aspectRatio: '16/9',
              overflow: 'hidden',
              userSelect: 'none',
              touchAction: 'none',
              cursor: dragging ? 'ew-resize' : 'grab',
            }}
          >
            {/* AFTER (right side — clean) */}
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
              alt="After cleanup"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* BEFORE (left side — desaturated) */}
            <div
              style={{
                position: 'absolute', inset: 0,
                clipPath: `inset(0 ${100 - pct}% 0 0)`,
                zIndex: 2,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
                alt="Before cleanup"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'saturate(.15) sepia(.5) brightness(.65)',
                }}
              />
            </div>

            {/* Labels */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 4,
              background: 'rgba(26,18,8,.8)', color: 'var(--warm-amber)',
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.15em',
              textTransform: 'uppercase', padding: '.35rem .9rem',
            }}>
              Before
            </div>
            <div style={{
              position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 4,
              background: 'rgba(45,74,45,.8)', color: 'var(--mist-green)',
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.15em',
              textTransform: 'uppercase', padding: '.35rem .9rem',
            }}>
              After
            </div>

            {/* Handle */}
            <div
              style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `${pct}%`, zIndex: 3,
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <div style={{ width: 2, height: '100%', background: 'rgba(245,237,216,.8)' }} />
              <div style={{
                position: 'absolute', top: '50%',
                transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 4px rgba(245,237,216,.2)',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10l-4 0M7 10L4 7M7 10L4 13" stroke="#1A1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 10l4 0M13 10L16 7M13 10L16 13" stroke="#1A1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center', marginTop: '1.2rem',
            fontSize: '.65rem', letterSpacing: '.15em',
            textTransform: 'uppercase', color: 'var(--forest-brown)',
          }}>
            ← drag the handle →
          </p>
        </motion.div>
      </div>
    </section>
  )
}
