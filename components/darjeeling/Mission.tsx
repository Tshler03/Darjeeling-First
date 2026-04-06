'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const lines = [
  { text: "We didn't wait", indent: false },
  { text: 'for someone to', indent: true, accent: false },
  { text: 'save our hills.', indent: false, accent: true },
]

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const imgRef = useRef<HTMLDivElement>(null)
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' })

  return (
    <section
      id="mission"
      style={{
        position: 'relative',
        background: 'var(--midnight)',
        padding: '10rem 3rem 8rem',
        overflow: 'hidden',
      }}
    >
      {/* BIG BG TEXT */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--ff-display)',
          fontWeight: 900,
          fontSize: 'clamp(6rem, 18vw, 18rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,151,58,.05)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-.04em',
        }}
      >
        DARJEELING
      </div>

      {/* GRID */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div ref={ref}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.8rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ width: 36, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span
              style={{
                fontSize: '.68rem',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--tea-gold)',
              }}
            >
              Our Mission
            </span>
          </motion.div>

          {/* Quote lines */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            style={{ marginBottom: '2.5rem' }}
          >
            {lines.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.div
                  variants={fadeUp}
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-.02em',
                    color: line.accent ? 'var(--warm-amber)' : 'var(--cream)',
                    fontStyle: line.accent ? 'italic' : 'normal',
                    paddingLeft: line.indent ? '3rem' : '0',
                  }}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--mist-green)',
              maxWidth: 500,
              marginBottom: '2rem',
            }}
          >
            Most people love Darjeeling. We decided to do something about it.
            What started as one group chat became a movement on the streets
            every single weekend. No funding, no fanfare — just love for the
            place that made us.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              width: 60,
              height: 2,
              background: 'linear-gradient(to right, var(--tea-gold), transparent)',
              transformOrigin: 'left',
              marginBottom: '2rem',
            }}
          />

          {/* Secondary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              fontSize: '.95rem',
              lineHeight: 1.7,
              color: 'var(--forest-brown)',
              fontStyle: 'italic',
              maxWidth: 480,
            }}
          >
            Darjeeling First is not an organisation. It&apos;s a promise —
            made by ordinary people who believe that the most extraordinary
            thing you can do is care for where you come from.
          </motion.p>
        </div>

        {/* RIGHT — IMAGE */}
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: 40 }}
          animate={imgInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative' }}
        >
          {/* Gold offset border */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: -12,
              bottom: -12,
              border: '1px solid rgba(200,151,58,.25)',
              zIndex: 0,
            }}
          />
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
              alt="Volunteers cleaning Darjeeling hills"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(.85) brightness(.9)',
              }}
            />
            {/* Caption */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '.8rem 1rem',
                background: 'linear-gradient(to top, rgba(26,18,8,.9), transparent)',
                fontSize: '.68rem',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--mist-green)',
              }}
            >
              Weekend cleanup drive · Tiger Hill Road
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
