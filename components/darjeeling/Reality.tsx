'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Raw evidence photos — swap with real Instagram photos when available ──
// All Darjeeling / hill station / mountain environment imagery
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    alt: 'Plastic waste on Darjeeling hillside trail',
    location: 'Tiger Hill Road',
  },
  {
    src: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&q=80',
    alt: 'Overflowing waste bins on mountain path',
    location: 'Chowrasta',
  },
  {
    src: 'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?w=800&q=80',
    alt: 'Garbage on tea garden slopes',
    location: 'Happy Valley',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Pristine Darjeeling hills — what we fight for',
    location: 'Kanchenjunga view point',
  },
  {
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    alt: 'Litter on forest trail near Darjeeling',
    location: 'Senchal Wildlife Sanctuary',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    alt: 'Waste dumped near mountain stream',
    location: 'Rangeet Valley',
  },
]

// Individual photo card
function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof PHOTOS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 1.1,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      style={{
        position: 'relative',
        flexShrink: 0,
        cursor: 'default',
        transition: 'box-shadow 0.4s',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          width: 'clamp(200px, 28vw, 340px)',
          aspectRatio: index % 3 === 0 ? '3/4' : index % 3 === 1 ? '4/3' : '1/1',
        }}
      >
        <motion.img
          src={photo.src}
          alt={photo.alt}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            // Desaturated — these are evidence, not postcards
            filter: 'saturate(0.3) brightness(0.75) contrast(1.1)',
          }}
        />
      </div>

      {/* Location tag */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.8rem',
          left: '0.8rem',
          background: 'rgba(26,18,8,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.3rem 0.75rem',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--forest-brown)',
        }}
      >
        {photo.location}
      </div>
    </motion.div>
  )
}

export default function Reality() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const stripRef     = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const lineInView   = useInView(lineRef, { once: true, margin: '-80px' })

  // Scroll-driven horizontal drift for the photo strip
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Photos drift left as you scroll through the section
  const stripX = useTransform(scrollYProgress, [0, 1], ['4%', '-18%'])

  // GSAP: the single line reveal — letters that materialise from nothing
  useEffect(() => {
    if (!lineRef.current) return

    const ctx = gsap.context(() => {
      const chars = lineRef.current!.querySelectorAll('.char')

      gsap.fromTo(
        chars,
        { opacity: 0, y: 12, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, lineRef)

    return () => ctx.revert()
  }, [])

  // Split the line text into individual character spans for the GSAP animation
  const lineText = 'The place you love is disappearing.'
  const chars = lineText.split('').map((char, i) => (
    <span
      key={i}
      className="char"
      style={{
        display: 'inline-block',
        whiteSpace: char === ' ' ? 'pre' : 'normal',
      }}
    >
      {char}
    </span>
  ))

  return (
    <section
      id="reality"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--midnight)',
        overflow: 'hidden',
        // Tall enough to scroll through and feel the weight
        paddingBottom: 'clamp(6rem, 12vw, 12rem)',
      }}
    >
      {/* ── SECTION LABEL ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          paddingTop: 'clamp(5rem, 10vw, 10rem)',
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          marginBottom: '3.5rem',
        }}
      >
        <div
          style={{
            width: 28,
            height: 1,
            background: 'var(--tea-gold)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--tea-gold)',
          }}
        >
          The Reality
        </span>
      </motion.div>

      {/* ── OPENING LINE — sets tone before photos ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
          maxWidth: '820px',
          marginBottom: 'clamp(3rem, 6vw, 6rem)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
            lineHeight: 1.3,
            color: 'var(--forest-brown)',
            letterSpacing: '-0.01em',
          }}
        >
          This is what Darjeeling looks like{' '}
          <em style={{ color: 'var(--warm-amber)', fontStyle: 'normal' }}>
            when nobody shows up.
          </em>
        </p>
      </motion.div>

      {/* ── PHOTO STRIP — horizontal drift on scroll ── */}
      <div
        style={{
          overflow: 'visible',
          marginBottom: 'clamp(4rem, 8vw, 8rem)',
          // Clip so photos don't overflow the page width
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <motion.div
          ref={stripRef}
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'flex-end',
            paddingLeft: 'var(--gutter)',
            paddingRight: 'var(--gutter)',
            x: stripX,
            willChange: 'transform',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── THE LINE — the gut punch ── */}
      <div
        ref={lineRef}
        style={{
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Thin gold rule above */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            height: 1,
            background:
              'linear-gradient(to right, var(--tea-gold), transparent)',
            transformOrigin: 'left',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
          }}
        />

        {/* The line — char by char reveal */}
        <p
          style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.025em',
            color: 'var(--cream)',
            marginBottom: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {chars}
        </p>

        {/* Sub-line — arrives after the main line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: lineInView ? 1 : 0, y: lineInView ? 0 : 16 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: lineText.length * 0.04 + 0.2 }}
          style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            lineHeight: 1.75,
            color: 'var(--forest-brown)',
            fontStyle: 'italic',
            maxWidth: '480px',
          }}
        >
          One plastic bag at a time. One Sunday at a time, we take it back.
        </motion.p>
      </div>

      {/* ── SCROLL INDICATOR — arrow pointing down ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 'var(--gutter)',
          paddingTop: 'clamp(3rem, 5vw, 5rem)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--dark-earth)',
            }}
          >
            The story
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ opacity: 0.4 }}
          >
            <path
              d="M8 3v10M3 9l5 5 5-5"
              stroke="var(--tea-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── MOBILE: responsive overrides ── */}
      <style>{`
        @media (max-width: 768px) {
          #reality-strip {
            padding-left: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          /* On mobile, photos are slightly smaller */
          #reality-strip > div {
            width: clamp(150px, 60vw, 220px) !important;
          }
        }
      `}</style>
    </section>
  )
}
