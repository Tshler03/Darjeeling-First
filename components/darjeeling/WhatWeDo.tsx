'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    num: '01',
    title: 'Hill & Trail Cleanups',
    body: 'From Tiger Hill to Happy Valley — we walk the trails that tourists love and locals cherish, and carry back what should never have been left behind.',
  },
  {
    num: '02',
    title: 'Street & Marketplace Drives',
    body: 'The bazaars, the bus stands, the morning markets — the beating heart of Darjeeling life. We keep them breathing clean.',
  },
  {
    num: '03',
    title: 'Community Mobilisation',
    body: 'Knocking on doors, posting in groups, convincing one neighbour at a time that this is everyone\'s responsibility. The hardest work — and the most important.',
  },
  {
    num: '04',
    title: 'Documenting the Truth',
    body: 'Before and after. Trash mountains and clean slopes. We document it all — because evidence of what we\'ve done is the strongest call to action there is.',
  },
]

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="what"
      style={{
        background: 'var(--midnight)',
        padding: '10rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big bg number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--ff-display)',
          fontWeight: 900,
          fontSize: 'clamp(12rem, 30vw, 32rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,151,58,.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          transition: 'all .3s',
        }}
      >
        {hovered !== null ? items[hovered].num : '01'}
      </div>

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--tea-gold)' }}>
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
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              color: 'var(--cream)',
            }}
          >
            Every weekend.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--warm-amber)' }}>
              Every corner.
            </em>
          </motion.h2>
        </div>

        {/* List */}
        <div>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 40px',
                gap: '2rem',
                alignItems: 'center',
                padding: hovered === i ? '2.5rem 2.5rem 2.5rem 1.5rem' : '2.5rem 0',
                borderTop: '1px solid rgba(200,151,58,.08)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'padding .4s cubic-bezier(.76,0,.24,1)',
                cursor: 'default',
              }}
            >
              {/* Hover bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--dark-earth)',
                transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform .6s cubic-bezier(.76,0,.24,1)',
                zIndex: 0,
              }} />

              {/* Number */}
              <div style={{
                position: 'relative', zIndex: 1,
                fontFamily: 'var(--ff-display)',
                fontSize: '1rem', fontWeight: 700,
                color: hovered === i ? 'var(--tea-gold)' : 'rgba(200,151,58,.35)',
                letterSpacing: '.05em',
                transition: 'color .4s',
              }}>
                {item.num}
              </div>

              {/* Body */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: '1.6rem', fontWeight: 700,
                  color: hovered === i ? 'var(--warm-amber)' : 'var(--cream)',
                  marginBottom: '.4rem',
                  transition: 'color .3s',
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '.88rem', lineHeight: 1.7, color: 'var(--mist-green)' }}>
                  {item.body}
                </p>
              </div>

              {/* Arrow */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: 40, height: 40,
                border: `1px solid ${hovered === i ? 'var(--tea-gold)' : 'rgba(200,151,58,.2)'}`,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                color: hovered === i ? 'var(--midnight)' : 'var(--tea-gold)',
                background: hovered === i ? 'var(--tea-gold)' : 'transparent',
                transform: hovered === i ? 'rotate(0deg)' : 'rotate(-45deg)',
                transition: 'all .4s',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(200,151,58,.08)' }} />
        </div>
      </div>
    </section>
  )
}
