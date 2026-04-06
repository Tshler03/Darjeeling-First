'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── What they do every Sunday ─────────────────────────────────────────────
const ACTIVITIES = [
  {
    num: '01',
    title: 'Hill & Trail Cleanups',
    body: 'From Tiger Hill to Happy Valley — walking the trails tourists love and locals cherish, carrying back what should never have been left behind.',
    video: 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  },
  {
    num: '02',
    title: 'Street & Market Drives',
    body: 'The bazaars, the bus stands, the morning markets — the beating heart of Darjeeling. Keeping them breathing clean.',
    video: 'https://videos.pexels.com/video-files/5728904/5728904-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80',
  },
  {
    num: '03',
    title: 'Community Mobilisation',
    body: 'Knocking on doors, posting in groups, convincing one neighbour at a time. The hardest work — and the most important.',
    video: 'https://videos.pexels.com/video-files/4763821/4763821-uhd_2560_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
  {
    num: '04',
    title: 'Documenting the Truth',
    body: 'Before and after. Trash mountains and clean slopes. Evidence of what\'s been done is the strongest call to action there is.',
    video: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
]

// ─── Before/After Wipe ─────────────────────────────────────────────────────
function BeforeAfterWipe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pct, setPct]       = useState(42)
  const [dragging, setDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  // Auto-demo: slowly reveal on first enter, then stop
  useEffect(() => {
    if (!inView || hasInteracted) return
    let frame = 0
    const interval = setInterval(() => {
      frame++
      setPct(prev => {
        const next = prev + 0.4
        if (next >= 68) { clearInterval(interval); return 68 }
        return next
      })
    }, 16)
    return () => clearInterval(interval)
  }, [inView, hasInteracted])

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPct(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
    setHasInteracted(true)
  }, [])

  return (
    <div ref={containerRef}>
      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          textAlign: 'center',
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--forest-brown)',
          marginBottom: '1.2rem',
        }}
      >
        ← drag the handle to feel the difference →
      </motion.p>

      {/* Wipe container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        onMouseDown={e => { setDragging(true); updatePct(e.clientX) }}
        onMouseMove={e => { if (dragging) updatePct(e.clientX) }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={e => { setDragging(true); updatePct(e.touches[0].clientX); setHasInteracted(true) }}
        onTouchMove={e => { if (dragging) updatePct(e.touches[0].clientX) }}
        onTouchEnd={() => setDragging(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          cursor: dragging ? 'ew-resize' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
          maxWidth: '100%',
        }}
      >
        {/* AFTER — clean hill */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"
          alt="After cleanup — clean Darjeeling hillside"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        />

        {/* BEFORE — desaturated */}
        <div style={{
          position: 'absolute', inset: 0,
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
          zIndex: 2,
        }}>
          <img
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=85"
            alt="Before cleanup — waste on hill trail"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'saturate(0.1) sepia(0.4) brightness(0.6) contrast(1.1)',
            }}
          />
        </div>

        {/* Labels */}
        <div style={{
          position: 'absolute', bottom: '1.2rem', left: '1.2rem', zIndex: 4,
          background: 'rgba(26,18,8,0.85)', backdropFilter: 'blur(8px)',
          color: 'var(--warm-amber)', fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.3rem 0.8rem',
        }}>Before</div>
        <div style={{
          position: 'absolute', bottom: '1.2rem', right: '1.2rem', zIndex: 4,
          background: 'rgba(45,74,45,0.85)', backdropFilter: 'blur(8px)',
          color: 'var(--mist-green)', fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.3rem 0.8rem',
        }}>After</div>

        {/* Handle */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${pct}%`, zIndex: 3,
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ width: 2, height: '100%', background: 'rgba(245,237,216,0.9)' }} />
          <div style={{
            position: 'absolute', top: '50%',
            transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 4px rgba(245,237,216,0.15), 0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 11l-5 0M8 11L5 8M8 11L5 14" stroke="#1A1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11l5 0M14 11L17 8M14 11L17 14" stroke="#1A1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Single activity row ───────────────────────────────────────────────────
function ActivityRow({
  activity,
  index,
}: {
  activity: (typeof ACTIVITIES)[0]
  index: number
}) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (hovered) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [hovered])

  return (
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
        transition: 'padding 0.4s cubic-bezier(0.76,0,0.24,1)',
      }}
    >
      {/* Hover fill */}
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
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          fontWeight: 700,
          color: hovered ? 'var(--warm-amber)' : 'var(--cream)',
          marginBottom: '0.4rem',
          lineHeight: 1.1,
          transition: 'color 0.3s',
        }}>
          {activity.title}
        </h3>
        <p style={{
          fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
          lineHeight: 1.7,
          color: 'var(--mist-green)',
          maxWidth: '520px',
        }}>
          {activity.body}
        </p>
      </div>

      {/* Video thumbnail — plays on hover */}
      <div style={{
        position: 'relative', zIndex: 1,
        overflow: 'hidden',
        aspectRatio: '16/9',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.4s, transform 0.4s',
      }}>
        <video
          ref={videoRef}
          src={activity.video}
          poster={activity.poster}
          muted
          loop
          playsInline
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            filter: 'saturate(0.7) brightness(0.8)',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const inView     = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--midnight)',
        overflow: 'hidden',
      }}
    >
      {/* ── OPENING — full-bleed video moment ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px, 55vh, 600px)',
        overflow: 'hidden',
      }}>
        <motion.div style={{ position: 'absolute', inset: '-10%', y: bgY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&q=80"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              filter: 'saturate(0.5) brightness(0.5)',
            }}
          >
            <source src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.7) 100%)',
        }} />

        {/* Opening text over video */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', textAlign: 'center',
          padding: '0 var(--gutter)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p style={{
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)', marginBottom: '1.2rem',
            }}>
              Every Sunday
            </p>
            <h2 style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 6vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
            }}>
              This is what{' '}
              <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>
                showing up
              </em>{' '}
              looks like.
            </h2>
          </motion.div>
        </div>

        {/* Bottom fade into next content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to bottom, transparent, var(--midnight))',
        }} />
      </div>

      {/* ── ACTIVITIES LIST ── */}
      <div
        ref={headerRef}
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 var(--gutter)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 5rem)', paddingTop: 'clamp(1rem, 3vw, 3rem)' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span style={{
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)',
            }}>
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              lineHeight: 1.0,
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
            }}
          >
            Every corner.{' '}
            <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>
              Every Sunday.
            </em>
          </motion.h2>
        </div>

        {/* Activity rows */}
        <div style={{ marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
          {ACTIVITIES.map((a, i) => (
            <ActivityRow key={i} activity={a} index={i} />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(200,151,58,0.08)' }} />
        </div>

        {/* ── BEFORE / AFTER WIPE ── */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}
          >
            <p style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 700, fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              color: 'var(--forest-brown)',
              marginBottom: '0.6rem',
            }}>
              See the difference with your own hands.
            </p>
            <p style={{
              fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
              color: 'var(--mist-green)',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}>
              A few hours. A hundred pairs of hands.
              Drag to reveal what a Sunday drive does to a mountain trail
              buried in garbage.
            </p>
          </motion.div>

          <BeforeAfterWipe />
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .activity-row-grid {
            grid-template-columns: 48px 1fr !important;
          }
          .activity-row-video {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .activity-row-grid {
            grid-template-columns: 40px 1fr !important;
            gap: 1rem !important;
            padding: 1.5rem 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
