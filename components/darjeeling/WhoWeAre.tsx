'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    tag: 'The Core Group',
    title: 'School friends who never really left',
    body: 'The ones who started this with one garbage bag and a WhatsApp group. Same school of thought, always.',
    img: 'https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=700&q=80',
  },
  {
    tag: 'Weekend Warriors',
    title: 'Every Saturday, they show up',
    body: 'Students, teachers, shopkeepers, chai-wallahs — all equal on cleanup day. That is the magic.',
    img: 'https://images.unsplash.com/photo-1593113630400-ea4288922559?w=700&q=80',
    tall: true,
  },
  {
    tag: 'Next Generation',
    title: 'Young Darjeeling — ready to fight',
    body: "They've found something most people search their whole lives for: a reason to stay and protect home.",
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80',
  },
]

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="who"
      style={{
        background: 'var(--dark-earth)',
        padding: '8rem 3rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={ref} style={{ maxWidth: 700, margin: '0 auto 5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.8rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>
              Who We Are
            </span>
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--cream)',
              marginBottom: '1.5rem',
            }}
          >
            Friends first.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--warm-amber)' }}>
              Activists by necessity.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--mist-green)' }}
          >
            We are not environmentalists by training. We are people from
            Darjeeling who grew up hiking these trails, drinking this tea,
            breathing this air — and refuse to let it go.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1.5rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'var(--midnight)',
                overflow: 'hidden',
                marginTop: card.tall ? '-3rem' : '0',
              }}
            >
              {/* Image */}
              <div style={{ overflow: 'hidden' }}>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    display: 'block',
                    filter: hovered === i ? 'saturate(1) brightness(.9)' : 'saturate(.8) brightness(.8)',
                    transform: hovered === i ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform .7s ease, filter .7s',
                  }}
                />
              </div>
              {/* Body */}
              <div style={{ padding: '1.6rem' }}>
                <div style={{
                  fontSize: '.62rem', fontWeight: 700, letterSpacing: '.18em',
                  textTransform: 'uppercase', color: 'var(--tea-gold)', marginBottom: '.7rem',
                }}>
                  {card.tag}
                </div>
                <h3 style={{
                  fontFamily: 'var(--ff-display)', fontSize: '1.3rem', fontWeight: 700,
                  color: 'var(--cream)', marginBottom: '.7rem', lineHeight: 1.2,
                }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '.87rem', lineHeight: 1.75, color: 'var(--mist-green)' }}>
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(200,151,58,.1)',
            paddingTop: '3rem',
          }}
        >
          <p style={{ fontSize: '.85rem', color: 'var(--forest-brown)', fontStyle: 'italic' }}>
            1,702 people follow this movement on Instagram — and counting.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              fontSize: '.75rem', fontWeight: 600, letterSpacing: '.12em',
              textTransform: 'uppercase', color: 'var(--tea-gold)',
              textDecoration: 'none', borderBottom: '1px solid rgba(200,151,58,.3)',
              paddingBottom: 2,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            @darjeelingfirst
          </a>
        </motion.div>

      </div>
    </section>
  )
}
