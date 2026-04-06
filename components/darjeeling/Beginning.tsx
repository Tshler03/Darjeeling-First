'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Story beats — swap copy with real client story when available ──────────
const BEATS = [
  {
    num: '01',
    year: '2024',
    headline: 'It started with\none message.',
    body: 'No plan. No funding. No name yet. Just a WhatsApp message from someone who had enough of watching the hills they grew up on disappear under plastic.',
    media: {
      type: 'video' as const,
      // Pexels free video — mountain/nature cleanup feel
      src: 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4',
      poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      label: 'The first drive',
    },
  },
  {
    num: '02',
    year: 'Drive 01',
    headline: 'One Sunday.\nSixteen bags.\nZero plan.',
    body: 'They picked a road. They showed up. By the time the sun was fully up over Kanchenjunga, the first stretch of trail was clear. They came back the next Sunday.',
    media: {
      type: 'video' as const,
      src: 'https://videos.pexels.com/video-files/5728904/5728904-uhd_2560_1440_25fps.mp4',
      poster: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      label: 'Tiger Hill Road · Drive 01',
    },
  },
  {
    num: '03',
    year: 'Today',
    headline: 'That was\ndrive one.\nThere have been\n53 more.',
    body: '"Group of friends coming from same school of thought." — That\'s still the whole story. No corporation. No committee. Just the same people, the same hills, every Sunday.',
    media: {
      type: 'video' as const,
      src: 'https://videos.pexels.com/video-files/4763821/4763821-uhd_2560_1440_24fps.mp4',
      poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      label: 'Still going · Every Sunday',
    },
  },
]

export default function Beginning() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const stickyRef     = useRef<HTMLDivElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const labelInView   = useInView(containerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>('.beat-panel')
      const mediaEls = gsap.utils.toArray<HTMLElement>('.beat-media')
      const textEls  = gsap.utils.toArray<HTMLElement>('.beat-text')
      const total    = beats.length

      // ── Main timeline: scrubs through all beats ──────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          // Pin for (beats.length * 100vh) of scroll
          end: `+=${total * 100}%`,
          scrub: 1,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })

      // Each beat: current media out + next in, current text out + next in
      beats.forEach((_, i) => {
        if (i === total - 1) return // last beat stays

        // Outgoing text
        tl.to(textEls[i], {
          opacity: 0,
          y: -40,
          duration: 0.3,
          ease: 'power2.in',
        }, i)

        // Outgoing media
        tl.to(mediaEls[i], {
          opacity: 0,
          scale: 0.94,
          duration: 0.3,
          ease: 'power2.in',
        }, i)

        // Incoming media
        tl.fromTo(mediaEls[i + 1],
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
          i + 0.35
        )

        // Incoming text
        tl.fromTo(textEls[i + 1],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          i + 0.4
        )
      })

      // Number counter scrub
      gsap.to('.beat-num-track', {
        y: `-${((total - 1) / total) * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${total * 100}%`,
          scrub: 1,
        },
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="beginning"
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      {/* ── STICKY VIEWPORT ── */}
      <div
        ref={stickyRef}
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '600px',
          overflow: 'hidden',
          background: 'var(--midnight)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
        }}
      >

        {/* ── LEFT: TEXT SIDE ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
            borderRight: '1px solid rgba(200,151,58,0.08)',
          }}
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={labelInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: 'clamp(2rem, 5vh, 4rem)',
            }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--tea-gold)', flexShrink: 0 }} />
            <span style={{
              fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--tea-gold)',
            }}>
              How It Started
            </span>
          </motion.div>

          {/* Beat counter — sliding number track */}
          <div style={{
            position: 'absolute',
            top: 'clamp(2rem, 5vw, 5rem)',
            right: 'clamp(1.5rem, 4vw, 4rem)',
            overflow: 'hidden',
            height: '1.2rem',
          }}>
            <div className="beat-num-track" style={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'none',
            }}>
              {BEATS.map((b, i) => (
                <span key={i} style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--forest-brown)',
                  height: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'uppercase',
                }}>
                  {b.year}
                </span>
              ))}
            </div>
          </div>

          {/* Text panels — stacked, shown/hidden by GSAP */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            {BEATS.map((beat, i) => (
              <div
                key={i}
                className="beat-text"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {/* Beat number */}
                <div style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(200,151,58,0.1)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  marginBottom: '-1rem',
                }}>
                  {beat.num}
                </div>

                {/* Headline */}
                <h2 style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: 'var(--cream)',
                  whiteSpace: 'pre-line',
                  marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
                }}>
                  {beat.headline.split('\n').map((line, li) => (
                    <span key={li}>
                      {li === 0
                        ? line
                        : <em style={{ color: 'var(--warm-amber)', fontStyle: 'italic' }}>{line}</em>
                      }
                      {li < beat.headline.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h2>

                {/* Body */}
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                  lineHeight: 1.8,
                  color: 'var(--mist-green)',
                  maxWidth: '420px',
                  marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                }}>
                  {beat.body}
                </p>

                {/* Beat divider */}
                <div style={{
                  width: 40, height: 2,
                  background: 'linear-gradient(to right, var(--tea-gold), transparent)',
                }} />
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: 'clamp(1.5rem, 3vh, 3rem)',
          }}>
            {BEATS.map((_, i) => (
              <div key={i} style={{
                width: i === 0 ? 24 : 8,
                height: 2,
                background: i === 0 ? 'var(--tea-gold)' : 'rgba(200,151,58,0.2)',
                transition: 'all 0.4s',
              }} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: MEDIA SIDE ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {BEATS.map((beat, i) => (
            <div
              key={i}
              className="beat-media"
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: i === 0 ? 1 : 0,
              }}
            >
              {beat.media.type === 'video' ? (
                <>
                  <video
                    src={beat.media.src}
                    poster={beat.media.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'saturate(0.7) brightness(0.75)',
                    }}
                  />
                  {/* Dark gradient over video */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, rgba(26,18,8,0.4) 0%, transparent 40%)',
                  }} />
                </>
              ) : (
                <img
                  src={beat.media.src}
                  alt={beat.headline}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    filter: 'saturate(0.7) brightness(0.75)',
                  }}
                />
              )}

              {/* Media label */}
              <div style={{
                position: 'absolute',
                bottom: 'clamp(1rem, 2vw, 2rem)',
                right: 'clamp(1rem, 2vw, 2rem)',
                background: 'rgba(26,18,8,0.75)',
                backdropFilter: 'blur(12px)',
                padding: '0.4rem 1rem',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--forest-brown)',
              }}>
                {beat.media.label}
              </div>
            </div>
          ))}

          {/* Right edge: scroll progress bar */}
          <div style={{
            position: 'absolute',
            right: 0, top: 0, bottom: 0,
            width: 2,
            background: 'rgba(200,151,58,0.06)',
            zIndex: 10,
          }}>
            <div
              ref={progressRef}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '100%',
                background: 'var(--tea-gold)',
                transformOrigin: 'top',
                transform: 'scaleY(0)',
              }}
            />
          </div>
        </div>

        {/* ── PROGRESS BAR — bottom ── */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'rgba(200,151,58,0.06)',
          zIndex: 10,
        }}>
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(to right, var(--tea-gold), var(--warm-amber))',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              transition: 'none',
              // GSAP controls this via inline style
            }}
            className="bottom-progress"
          />
        </div>

        {/* Scroll hint — fades out after first beat */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--dark-earth)',
          }}>
            Keep scrolling
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 8l5 5 5-5"
                stroke="var(--tea-gold)" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        /* Tablet */
        @media (max-width: 900px) {
          #beginning-sticky {
            grid-template-columns: 1fr !important;
            grid-template-rows: 1fr 1fr !important;
          }
        }

        /* Mobile: stack vertically, no pin — just scroll through */
        @media (max-width: 600px) {
          #beginning [data-sticky] {
            position: relative !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
