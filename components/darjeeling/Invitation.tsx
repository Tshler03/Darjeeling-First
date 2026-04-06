'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ─── CONFIG ────────────────────────────────────────────────────────────────
const WAYS = [
  {
    icon: '🧤',
    num: '01',
    title: 'Show Up',
    sub: 'Volunteer',
    body: 'Join a Sunday cleanup drive. Gloves provided. Just bring yourself and whoever you can drag along.',
    cta: 'DM us on Instagram',
    href: 'https://instagram.com/darjeelingfirst',
    external: true,
    primary: true,
  },
  {
    icon: '📣',
    num: '02',
    title: 'Spread It',
    sub: 'Share the story',
    body: 'Share our posts. Tell your people. Every share puts Darjeeling in front of someone who might just show up next Sunday.',
    cta: 'Follow @darjeelingfirst',
    href: 'https://instagram.com/darjeelingfirst',
    external: true,
    primary: false,
  },
  {
    icon: '🌿',
    num: '03',
    title: 'Start One',
    sub: 'Organise locally',
    body: "Start a cleanup in your neighbourhood, school, or college. You don't need permission — just a group chat and a Sunday morning.",
    cta: 'Get in touch',
    href: 'mailto:hello@darjeelingfirst.org',
    external: false,
    primary: false,
  },
]

// ─── Way card ──────────────────────────────────────────────────────────────
function WayCard({ way, index }: { way: typeof WAYS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
        border: `1px solid ${
          way.primary ? 'rgba(200,151,58,0.5)'
          : hovered    ? 'rgba(200,151,58,0.25)'
          :              'rgba(200,151,58,0.1)'
        }`,
        background: way.primary
          ? hovered ? 'rgba(61,43,14,0.65)' : 'rgba(61,43,14,0.45)'
          : hovered ? 'rgba(26,18,8,0.75)'  : 'rgba(26,18,8,0.55)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        transition: 'border-color 0.4s, background 0.4s',
      }}
    >
      {/* "Start here" badge on primary */}
      {way.primary && (
        <div style={{
          position: 'absolute', top: -1, left: '1.5rem',
          background: 'var(--tea-gold)', color: 'var(--midnight)',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '0.22rem 0.8rem',
        }}>
          Start here
        </div>
      )}

      {/* Number + icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--ff-display)', fontSize: '0.85rem', fontWeight: 700,
          color: 'rgba(200,151,58,0.28)', letterSpacing: '0.08em',
        }}>
          {way.num}
        </span>
        <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{way.icon}</span>
      </div>

      {/* Label + title */}
      <div>
        <div style={{
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--tea-gold)', marginBottom: '0.35rem',
        }}>
          {way.sub}
        </div>
        <h3 style={{
          fontFamily: 'var(--ff-display)',
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight: 700, lineHeight: 1.05,
          color: hovered ? 'var(--warm-amber)' : 'var(--cream)',
          transition: 'color 0.3s',
        }}>
          {way.title}
        </h3>
      </div>

      {/* Body */}
      <p style={{
        fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
        lineHeight: 1.75, color: 'var(--mist-green)', flex: 1,
      }}>
        {way.body}
      </p>

      {/* CTA */}
      <a
        href={way.href}
        target={way.external ? '_blank' : undefined}
        rel={way.external ? 'noreferrer' : undefined}
        onMouseEnter={e => {
          e.currentTarget.style.background = way.primary ? 'var(--warm-amber)' : 'transparent'
          e.currentTarget.style.color = way.primary ? 'var(--midnight)' : 'var(--warm-amber)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = way.primary ? 'var(--tea-gold)' : 'transparent'
          e.currentTarget.style.color = way.primary ? 'var(--midnight)' : 'var(--tea-gold)'
        }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: way.primary ? 'var(--midnight)' : 'var(--tea-gold)',
          background: way.primary ? 'var(--tea-gold)' : 'transparent',
          padding: way.primary ? '0.75rem 1.4rem' : '0',
          borderBottom: way.primary ? 'none' : '1px solid rgba(200,151,58,0.3)',
          paddingBottom: way.primary ? undefined : '2px',
          alignSelf: 'flex-start',
          transition: 'background 0.25s, color 0.25s',
        }}
      >
        {way.cta}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3"
            stroke="currentColor" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function Invitation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(headRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="invitation"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── BACKGROUND — warmest, most hopeful ── */}
      <motion.div style={{ position: 'absolute', inset: '-10%', y: bgY, zIndex: 0 }}>
        <video
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(0.5) brightness(0.35)',
          }}
        >
          <source src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlays — slightly warmer than other sections */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(26,18,8,0.82) 0%, rgba(26,18,8,0.45) 45%, rgba(26,18,8,0.88) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 55% at 50% 40%, rgba(45,74,45,0.18) 0%, transparent 70%)',
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 'var(--container)',
        margin: '0 auto', width: '100%',
        padding: 'clamp(5rem, 10vw, 10rem) var(--gutter)',
      }}>

        {/* ── HEADLINE ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.8rem', marginBottom: '2rem',
            }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)' }} />
            <span style={{
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)',
            }}>
              Join The Movement
            </span>
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)' }} />
          </motion.div>

          {/* Main line — largest text after the bleed */}
          <div style={{ overflow: 'hidden', marginBottom: '0.6rem' }}>
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'var(--cream)',
              }}
            >
              The story continues
            </motion.h2>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '1.8rem' }}>
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                fontStyle: 'italic',
                color: 'var(--warm-amber)',
              }}
            >
              every Sunday.
            </motion.h2>
          </div>

          {/* Sub-question */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.55 }}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              lineHeight: 1.6,
              color: 'var(--mist-green)',
              fontStyle: 'italic',
              fontFamily: 'var(--ff-display)',
              marginBottom: '0.5rem',
            }}
          >
            Are you in the next chapter?
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{
              fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
              color: 'var(--forest-brown)',
              lineHeight: 1.7,
            }}
          >
            No experience needed. No equipment needed. Just show up.
          </motion.p>
        </div>

        {/* ── THREE WAYS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(4rem, 8vw, 6rem)',
        }}>
          {WAYS.map((way, i) => (
            <WayCard key={i} way={way} index={i} />
          ))}
        </div>

        {/* ── BOTTOM — Instagram + closing line ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            borderTop: '1px solid rgba(200,151,58,0.08)',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
            color: 'var(--forest-brown)',
            fontStyle: 'italic',
            maxWidth: '440px',
            lineHeight: 1.7,
          }}>
            Darjeeling First is not an organisation. It&apos;s a promise —
            made by ordinary people who believe that the most extraordinary
            thing you can do is care for where you come from.
          </p>

          <a
            href="https://instagram.com/darjeelingfirst"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--warm-amber)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--tea-gold)')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontFamily: 'var(--ff-body)', fontSize: '0.75rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--midnight)', background: 'var(--tea-gold)',
              padding: '0.9rem 1.8rem',
              transition: 'background 0.25s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Find us on Instagram
          </a>
        </motion.div>
      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 900px) {
          #invitation-ways {
            grid-template-columns: 1fr 1fr !important;
          }
          #invitation-ways > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          #invitation-ways {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
