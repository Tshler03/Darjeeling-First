'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    icon: '🧤',
    title: 'Volunteer',
    body: 'Join a weekend cleanup drive. Show up, get your gloves, and become part of something real that makes Darjeeling cleaner with every drive.',
    link: 'https://instagram.com',
    linkText: 'DM us on Instagram',
    external: true,
  },
  {
    icon: '📣',
    title: 'Spread the Word',
    body: 'Share our posts. Tell your people. Every share puts Darjeeling in front of someone who might just show up next Saturday with a garbage bag.',
    link: 'https://instagram.com',
    linkText: 'Follow @darjeelingfirst',
    external: true,
    featured: true,
  },
  {
    icon: '🌿',
    title: 'Organise Locally',
    body: "Start a cleanup in your neighbourhood, school, or college. You don't need permission. You need a group chat and a Saturday morning.",
    link: 'mailto:hello@darjeelingfirst.org',
    linkText: 'Get in touch',
    external: false,
  },
]

export default function Join() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="join"
      style={{ position: 'relative', padding: '12rem 3rem', overflow: 'hidden' }}
    >
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&q=80"
          alt="Volunteers"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.35) brightness(.28)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,18,8,.8) 0%, rgba(45,74,45,.45) 50%, rgba(26,18,8,.9) 100%)',
        }} />
      </div>

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.8rem', marginBottom: '1.5rem' }}
        >
          <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
          <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>
            Join The Movement
          </span>
          <div style={{ width: 36, height: 1, background: 'var(--tea-gold)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: 'var(--ff-display)', fontWeight: 900,
            fontSize: 'clamp(3.5rem, 8vw, 8rem)',
            lineHeight: .92, letterSpacing: '-.03em',
            color: 'var(--cream)', margin: '0 0 1.5rem',
          }}
        >
          Darjeeling needs{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--warm-amber)' }}>you.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: '1rem', lineHeight: 1.8, color: 'var(--mist-green)',
            maxWidth: 500, margin: '0 auto 5rem',
          }}
        >
          You don&apos;t need experience. You don&apos;t need equipment.
          Just show up. Bring a friend. We&apos;ll handle the rest.
        </motion.p>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'rgba(26,18,8,.9)' : 'rgba(26,18,8,.7)',
                border: `1px solid ${card.featured ? 'rgba(200,151,58,.4)' : hovered === i ? 'rgba(200,151,58,.35)' : 'rgba(200,151,58,.12)'}`,
                backdropFilter: 'blur(16px)',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'border-color .4s, background .4s',
              }}
            >
              {card.featured && (
                <div style={{
                  position: 'absolute', top: -1, left: '2rem',
                  background: 'var(--tea-gold)', color: 'var(--midnight)',
                  fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em',
                  textTransform: 'uppercase', padding: '.25rem .9rem',
                }}>
                  Most Impactful
                </div>
              )}
              <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: 'var(--ff-display)', fontSize: '1.35rem', fontWeight: 700,
                color: 'var(--cream)', marginBottom: '.7rem',
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '.87rem', lineHeight: 1.75, color: 'var(--mist-green)', marginBottom: '1.5rem' }}>
                {card.body}
              </p>
              <a
                href={card.link}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                style={{
                  fontSize: '.72rem', fontWeight: 600, letterSpacing: '.1em',
                  textTransform: 'uppercase', color: 'var(--tea-gold)',
                  textDecoration: 'none', borderBottom: '1px solid rgba(200,151,58,.3)',
                  paddingBottom: 2,
                }}
              >
                {card.linkText} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
