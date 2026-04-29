'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ─── What they do every Sunday ─────────────────────────────────────────────
const ACTIVITIES = [
  {
    num: '01',
    title: 'Hill & Trail Cleanups',
    body: 'From Tiger Hill to Happy Valley — walking the trails tourists love and locals cherish, carrying back what should never have been left behind.',
    instaId: 'DVQzxy8ATT1',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  },
  {
    num: '02',
    title: 'Street & Market Drives',
    body: 'The bazaars, the bus stands, the morning markets — the beating heart of Darjeeling. Keeping them breathing clean.',
    instaId: 'DWg_WmMkrPo',
    poster: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80',
  },
  {
    num: '03',
    title: 'Community Mobilisation',
    body: 'Knocking on doors, posting in groups, convincing one neighbour at a time. The hardest work — and the most important.',
    instaId: 'DVJKXYBkub_',
    poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
  {
    num: '04',
    title: 'Documenting the Truth',
    body: "Before and after. Trash mountains and clean slopes. Evidence of what's been done is the strongest call to action there is.",
    instaId: 'DSU4m8pEgkN',
    poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
]

// ─── Before/After Wipe ─────────────────────────────────────────────────────
function BeforeAfterWipe() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const isDragging    = useRef(false)
  const [pct, setPct] = useState(50)
  const hasInteracted = useRef(false)
  const inView        = useInView(containerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView || hasInteracted.current) return
    let current = 50
    const target  = 30
    const target2 = 65

    const t1 = setInterval(() => {
      current -= 0.35
      setPct(current)
      if (current <= target) {
        clearInterval(t1)
        const t2 = setInterval(() => {
          current += 0.28
          setPct(current)
          if (current >= target2) clearInterval(t2)
        }, 16)
      }
    }, 16)

    return () => clearInterval(t1)
  }, [inView])

  const calcPct = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const raw  = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.max(2, Math.min(98, raw)))
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current    = true
    hasInteracted.current = true
    calcPct(e.clientX)
    const onMove = (ev: MouseEvent) => { if (isDragging.current) calcPct(ev.clientX) }
    const onUp   = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [calcPct])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current    = true
    hasInteracted.current = true
    calcPct(e.touches[0].clientX)
    const onMove = (ev: TouchEvent) => {
      ev.preventDefault()
      if (isDragging.current) calcPct(ev.touches[0].clientX)
    }
    const onEnd = () => {
      isDragging.current = false
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
  }, [calcPct])

  return (
    <div ref={containerRef}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          textAlign: 'center', fontSize: '0.62rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--forest-brown)',
          marginBottom: '1.2rem', userSelect: 'none',
        }}
      >
        ← drag to reveal the difference →
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'relative', width: '100%', aspectRatio: '16/9',
          overflow: 'hidden', cursor: 'ew-resize',
          userSelect: 'none', touchAction: 'none', borderRadius: '4px',
        }}
      >
        <img
          src="After.PNG"
          alt="After — clean Darjeeling"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pct}% 0 0)`, zIndex: 2, willChange: 'clip-path' }}>
          <img
            src="Before.PNG"
            alt="Before"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.65) contrast(1.15) sepia(0.08)', userSelect: 'none', pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,18,28,0.22)', pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, transform: 'translateX(-50%)', zIndex: 4, width: '2px', background: 'rgba(245,237,216,0.95)', boxShadow: '0 0 8px rgba(255,255,255,0.4)', pointerEvents: 'none', willChange: 'left' }} />
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', zIndex: 5, width: 52, height: 52, borderRadius: '50%', background: 'rgba(245,237,216,0.97)', boxShadow: '0 0 0 3px rgba(245,237,216,0.3), 0 6px 24px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', willChange: 'left' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l-6 0M9 12L6 9M9 12L6 15" stroke="#1A1208" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12l6 0M15 12L18 9M15 12L18 15" stroke="#1A1208" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 6, background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)', color: 'rgba(200,200,200,0.9)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '2px', opacity: pct > 12 ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}>Before</div>
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 6, background: 'rgba(45,74,45,0.82)', backdropFilter: 'blur(8px)', color: 'rgba(160,220,140,0.95)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '2px', opacity: pct < 88 ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}>After</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.08)', zIndex: 6, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: `${100 - pct}%`, height: '100%', background: 'linear-gradient(90deg, rgba(90,160,70,0.5), rgba(130,200,90,0.9))', transition: 'width 0.05s linear' }} />
        </div>
      </motion.div>
    </div>
  )
}

// ─── Single activity row ───────────────────────────────────────────────────
function ActivityRow({ activity, index }: { activity: typeof ACTIVITIES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .activity-body-${index} { display: none !important; }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr 200px',
          gap: '2rem',
          alignItems: 'center',
          padding: '2rem 0',
          borderTop: '1px solid rgba(200,151,58,0.08)',
          position: 'relative',
          cursor: 'default',
        }}
      >
        {/* Hover background sweep */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(61,43,14,0.3)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.5s cubic-bezier(0.76,0,0.24,1)',
          zIndex: 0,
        }} />

        {/* Number */}
        <div style={{
          position: 'relative', zIndex: 1,
          fontFamily: 'var(--ff-display)',
          fontSize: '0.9rem', fontWeight: 700,
          color: hovered ? 'var(--tea-gold)' : 'rgba(200,151,58,0.25)',
          letterSpacing: '0.08em',
          transition: 'color 0.3s',
        }}>
          {activity.num}
        </div>

        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700,
            color: hovered ? 'var(--warm-amber)' : 'var(--cream)',
            marginBottom: '0.4rem', lineHeight: 1.1,
            transition: 'color 0.3s',
          }}>{activity.title}</h3>
          <p
            className={`activity-body-${index}`}
            style={{
              fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', lineHeight: 1.7,
              color: 'var(--mist-green)', maxWidth: '520px',
            }}
          >{activity.body}</p>
        </div>

        {/* Instagram embed */}
        <div
          style={{
            position: 'relative', zIndex: 1,
            overflow: 'hidden',
            aspectRatio: '9/16',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.4s, transform 0.4s',
            borderRadius: '8px',
            background: '#000',
          }}>
          {hovered && (
            <iframe
              src={`https://www.instagram.com/p/${activity.instaId}/embed/`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allowFullScreen
              loading="lazy"
              title={activity.title}
            />
          )}
          <a
            href={`https://www.instagram.com/p/${activity.instaId}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'transparent' }}
            aria-label={`View ${activity.title} on Instagram`}
          />
        </div>
      </motion.div>
    </>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const inView     = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', background: 'var(--midnight)', overflow: 'hidden' }}>

      {/* Opening video moment */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(300px, 55vh, 600px)', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: '-10%', y: bgY }}>
          <video autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&q=80"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.5) brightness(0.5)' }}
          >
            <source src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 var(--gutter)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tea-gold)', marginBottom: '1.2rem' }}>Every Sunday</p>
            <h2 style={{ fontFamily: 'var(--ff-display)', fontWeight: 900, fontSize: 'clamp(2.4rem, 6vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--cream)' }}>
              This is what{' '}
              <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>showing up</em>{' '}
              looks like.
            </h2>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, var(--midnight))' }} />
      </div>

      {/* Activities + wipe */}
      <div ref={headerRef} style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>

        <div style={{ marginBottom: 'clamp(2rem, 5vw, 5rem)', paddingTop: 'clamp(1rem, 3vw, 3rem)' }}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>What We Do</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontFamily: 'var(--ff-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.0, color: 'var(--cream)', letterSpacing: '-0.02em' }}>
            Every corner.{' '}<em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>Every Sunday.</em>
          </motion.h2>
        </div>

        <div style={{ marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
          {ACTIVITIES.map((a, i) => <ActivityRow key={i} activity={a} index={i} />)}
          <div style={{ borderTop: '1px solid rgba(200,151,58,0.08)' }} />
        </div>

        {/* Before/After */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9 }}
            style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <p style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: 'var(--forest-brown)', marginBottom: '0.6rem' }}>
              See the difference with your own hands.
            </p>
            <p style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', color: 'var(--mist-green)', lineHeight: 1.7, maxWidth: '480px' }}>
              A few hours. A hundred pairs of hands. Drag to reveal what a Sunday drive does to a mountain trail.
            </p>
          </motion.div>
          <BeforeAfterWipe />
        </div>
      </div>
    </section>
  )
}
