'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ─── CONFIG — swap with real names, quotes, photos when client provides ─────
const CORE = [
  {
    tag: 'The Founders',
    quote: '"We got tired of talking about it."',
    body: 'The ones who started this with one garbage bag and a WhatsApp group. Same school. Same hills. Same rage.',
    img: 'Founders.jpeg',
    location: 'Darjeeling Town',
  },
  {
    tag: 'Weekend Warriors',
    quote: '"Every Sunday. No matter what."',
    body: 'Students, teachers, shopkeepers, chai-wallahs — all equal on cleanup day. That is the magic of this thing.',
    img: 'Weekend.jpeg',
    location: 'Tiger Hill Road',
    tall: true,
  },
  {
    tag: 'Next Generation',
    quote: '"This is our home. We stay and fight."',
    body: "They've found something most people search their whole lives for — a reason to stay, and protect where they came from.",
    img: 'Next.jpeg',
    location: 'Happy Valley',
  },
]

// Instagram-style community photo strip
const COMMUNITY = [
  '/Comment1.png',
  '/Comment2.png',
  '/Comment3.png',
  '/Comment4.png',
  '/Comment5.png',
  '/Comment6.png',
  '/Comment7.png',
  '/Comment8.png',
]

// ─── Portrait card ─────────────────────────────────────────────────────────
function PortraitCard({
  person,
  index,
}: {
  person: (typeof CORE)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.14,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--dark-earth)',
        // Middle card is taller — breaks the grid rhythm intentionally
        marginTop: person.tall ? '-3rem' : '0',
        cursor: 'default',
      }}
    >
      {/* Image */}
      <div style={{
        overflow: 'hidden',
        aspectRatio: person.tall ? '3/4' : '4/3',
        position: 'relative',
      }}>
        <motion.img
          src={person.img}
          alt={person.tag}
          animate={{
            scale: hovered ? 1.06 : 1,
            filter: hovered
              ? 'saturate(0.8) brightness(0.7)'
              : 'saturate(0.55) brightness(0.75)',
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Quote overlaid on image — slides up on hover */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'rgba(26,18,8,0.65)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <p style={{
            fontFamily: 'var(--ff-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            lineHeight: 1.4,
            color: 'var(--cream)',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}>
            {person.quote}
          </p>
        </motion.div>

        {/* Location tag — always visible */}
        <div style={{
          position: 'absolute',
          top: '1rem', left: '1rem',
          background: 'rgba(26,18,8,0.8)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.7rem',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--forest-brown)',
        }}>
          {person.location}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--tea-gold)', marginBottom: '0.6rem',
        }}>
          {person.tag}
        </div>
        <p style={{
          fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
          lineHeight: 1.7,
          color: 'var(--mist-green)',
        }}>
          {person.body}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────
export default function People() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)
  const inView     = useInView(headerRef, { once: true, margin: '-80px' })
  const stripInView = useInView(stripRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Community strip drifts left as you scroll
  const stripX = useTransform(scrollYProgress, [0.3, 1], ['0%', '-12%'])

  return (
    <section
      id="people"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--dark-earth)',
        overflow: 'hidden',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
      }}
    >
      {/* Subtle bg texture — noise-like gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(26,18,8,0.6) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(45,74,45,0.2) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--gutter)',
      }}>

        {/* ── HEADER ── */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto clamp(4rem, 8vw, 7rem)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
              Who They Are
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
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
              marginBottom: '1.4rem',
            }}
          >
            Same streets.{' '}
            <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>
              Same school.
            </em>
            <br />
            Same rage.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.8,
              color: 'var(--mist-green)',
            }}
          >
            Not environmentalists by training. People from Darjeeling who
            grew up hiking these trails, drinking this tea, breathing this
            air — and refuse to watch it go.
          </motion.p>
        </div>

        {/* ── PORTRAIT GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          alignItems: 'start',
          marginBottom: 'clamp(4rem, 8vw, 7rem)',
        }}>
          {CORE.map((person, i) => (
            <PortraitCard key={i} person={person} index={i} />
          ))}
        </div>

        {/* ── DIVIDER LINE ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(200,151,58,0.2), transparent)',
            transformOrigin: 'center',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}
        />

        {/* ── COMMUNITY STRIP — drifting photo row ── */}
        <div ref={stripRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stripInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <p style={{
              fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
              color: 'var(--forest-brown)',
              fontStyle: 'italic',
              maxWidth: '420px',
              lineHeight: 1.7,
            }}>
              1,702 people follow this movement on Instagram.
              Every one of them found it because someone showed up.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-amber)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--tea-gold)')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--tea-gold)',
                borderBottom: '1px solid rgba(200,151,58,0.3)',
                paddingBottom: '2px',
                transition: 'color 0.25s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @darjeelingfirst
            </a>
          </motion.div>

          {/* Drifting photo strip */}
          <div style={{
            overflow: 'hidden',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}>
            <motion.div
              style={{
                display: 'flex',
                gap: 'clamp(0.75rem, 1.5vw, 1rem)',
                x: stripX,
                willChange: 'transform',
              }}
            >
              {COMMUNITY.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={stripInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  style={{
                    flexShrink: 0,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={src}
                    alt="Community drive"
                    style={{
                      width: 'clamp(120px, 18vw, 220px)',
                      aspectRatio: i % 2 === 0 ? '1/1' : '4/5',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'saturate(0.6) brightness(0.8)',
                      transition: 'filter 0.4s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        'saturate(0.9) brightness(0.9)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        'saturate(0.6) brightness(0.8)'
                    }}
                  />
                  {/* Instagram-style corner indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem', right: '0.5rem',
                    opacity: 0.5,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="5"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 900px) {
          #people-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #people-grid > div:last-child {
            grid-column: 1 / -1;
            margin-top: 0 !important;
          }
        }

        @media (max-width: 560px) {
          #people-grid {
            grid-template-columns: 1fr !important;
          }
          #people-grid > div {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
