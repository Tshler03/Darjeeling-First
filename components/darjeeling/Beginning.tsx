'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    number: '01',
    label: 'The Intent',
    heading: 'A place worth fighting for.',
    body: 'Darjeeling was losing itself. Not dramatically — quietly. One plastic bag at a time, one ignored corner at a time. The hills that raised us were disappearing under the weight of our own carelessness. Someone had to decide it was worth saving.',
    detail: 'The question wasn\'t whether to act. It was who would go first.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    number: '02',
    label: 'The Organisation',
    heading: 'One message. No plan.',
    body: 'It started with a WhatsApp message to a group of friends from the same school. No NGO, no funding, no structure — just a shared rage at what was happening to their town. They picked a Sunday. They said show up.',
    detail: 'Six people responded. That was enough.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  },
  {
    number: '03',
    label: 'The First Drive',
    heading: 'Sunday. March. Sixteen bags.',
    body: 'The first drive was messy, cold, and completely unplanned. They brought garbage bags and gloves and showed up at Mall Road at 7am. By 10am they had collected sixteen bags of waste from three streets. Nobody paid them. Nobody asked them to.',
    detail: 'They came back the next Sunday. And the one after that.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
  },
]

// Slot columns — each card fills top-to-bottom in its column
const SLOT_COLUMNS = [
  { left: '2%',   rotate: -1.5 },
  { left: '35%',  rotate:  0.8 },
  { left: '68%',  rotate: -1   },
]

export default function Beginning() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const stickyRef   = useRef<HTMLDivElement>(null)
  const activeRef   = useRef<HTMLDivElement>(null)
  const slotRefs    = useRef<(HTMLDivElement | null)[]>([])
  const glowRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const sticky  = stickyRef.current
    const active  = activeRef.current
    if (!section || !sticky || !active) return

    const SCROLL_PER_CARD = window.innerHeight * 2
    const GLOW_SCROLL     = window.innerHeight * 1.2
    const totalScroll     = SCROLL_PER_CARD * 3 + GLOW_SCROLL
    section.style.height  = `${totalScroll}px`

    gsap.set(active, { opacity: 0, y: 60, scale: 0.96 })
    slotRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scale: 0.94 }))
    glowRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }))

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: sticky,
        onUpdate(self) {
          const p   = self.progress
          const pos = p * totalScroll

          const cardUnit  = SCROLL_PER_CARD
          const glowStart = cardUnit * 3

          const cardIndex    = Math.min(Math.floor(pos / cardUnit), 2)
          const cardProgress = (pos % cardUnit) / cardUnit

          // Update active card content
          const titleEl  = active.querySelector('.ac-number')  as HTMLElement
          const labelEl  = active.querySelector('.ac-label')   as HTMLElement
          const headEl   = active.querySelector('.ac-heading') as HTMLElement
          const bodyEl   = active.querySelector('.ac-body')    as HTMLElement
          const detailEl = active.querySelector('.ac-detail')  as HTMLElement
          const imgEl    = active.querySelector('.ac-img')     as HTMLImageElement

          if (titleEl && pos < glowStart) {
            const c = CARDS[cardIndex]
            if (titleEl.textContent !== c.number) {
              titleEl.textContent  = c.number
              labelEl!.textContent = c.label
              headEl!.textContent  = c.heading
              bodyEl!.textContent  = c.body
              detailEl!.textContent = c.detail
              if (imgEl) imgEl.src = c.image
            }
          }

          if (pos < glowStart) {
            const enterP = Math.min(cardProgress / 0.25, 1)
            const exitP  = cardProgress > 0.72
              ? Math.min((cardProgress - 0.72) / 0.28, 1)
              : 0

            if (exitP === 0) {
              gsap.set(active, {
                opacity: enterP,
                y:       60 * (1 - enterP),
                scale:   0.96 + 0.04 * enterP,
              })
            } else {
              gsap.set(active, {
                opacity: 1 - exitP,
                y:       -30 * exitP,
                scale:   1 - 0.04 * exitP,
              })
              const slot = slotRefs.current[cardIndex]
              if (slot) gsap.set(slot, { opacity: exitP, scale: 0.94 + 0.06 * exitP })
            }

            for (let i = 0; i < cardIndex; i++) {
              const slot = slotRefs.current[i]
              if (slot) gsap.set(slot, { opacity: 1, scale: 1 })
            }
          }

          if (pos >= glowStart) {
            slotRefs.current.forEach(el => el && gsap.set(el, { opacity: 1, scale: 1 }))
            gsap.set(active, { opacity: 0 })

            const glowP = (pos - glowStart) / GLOW_SCROLL

            glowRefs.current.forEach((el, i) => {
              if (!el) return
              const start = i / 3
              const end   = (i + 0.8) / 3
              const gp    = Math.max(0, Math.min((glowP - start) / (end - start), 1))
              gsap.set(el, { opacity: gp })
            })
          } else {
            glowRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }))
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-story"
      style={{ position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#0d0d0b',
        }}
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
            alt=""
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'grayscale(40%) brightness(0.22)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)',
          }} />
        </div>

        {/* Section label */}
        <div style={{
          position: 'absolute', top: '1.6rem', left: '2.5rem', zIndex: 10,
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: '0.62rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <div style={{ width: '1.5rem', height: '1px', background: '#c9a84c', opacity: 0.5 }} />
          The Story
        </div>

        {/* ── Full-height filed slot cards ─────────────────────────────── */}
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={el => { slotRefs.current[i] = el }}
            style={{
              position: 'absolute',
              left: SLOT_COLUMNS[i].left,
              top: '5vh',
              bottom: '5vh',
              width: 'calc(31% - 1rem)',
              zIndex: 2,
              transform: `rotate(${SLOT_COLUMNS[i].rotate}deg)`,
              willChange: 'opacity, transform',
            }}
          >
            <div style={{
              height: '100%',
              background: 'rgba(12,11,8,0.85)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '8px',
              overflow: 'hidden',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Image — fixed height at top */}
              <div style={{ height: '38%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={card.image}
                  alt=""
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'brightness(0.55) saturate(0.85)',
                  }}
                />
                {/* Number */}
                <div style={{
                  position: 'absolute', top: '1rem', left: '1.2rem',
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 900,
                  color: 'rgba(201,168,76,0.95)',
                  lineHeight: 1,
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}>
                  {card.number}
                </div>
              </div>

              {/* Content — fills remaining height */}
              <div style={{
                flex: 1,
                padding: 'clamp(1rem, 2vw, 1.6rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}>
                <div>
                  {/* Label */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    marginBottom: '0.7rem',
                  }}>
                    <div style={{ width: '1.2rem', height: '1px', background: '#c9a84c', opacity: 0.6 }} />
                    <span style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.58rem', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(201,168,76,0.8)',
                    }}>
                      {card.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
                    fontWeight: 800, color: '#ffffff',
                    lineHeight: 1.2, margin: '0 0 0.9rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {card.heading}
                  </h3>

                  {/* Body */}
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)',
                    color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.75, margin: 0,
                  }}>
                    {card.body}
                  </p>
                </div>

                {/* Bottom detail */}
                <div>
                  <div style={{
                    width: '1.8rem', height: '1px',
                    background: '#c9a84c', opacity: 0.35,
                    marginBottom: '0.75rem',
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: 'clamp(0.68rem, 1vw, 0.78rem)',
                    color: 'rgba(201,168,76,0.65)',
                    lineHeight: 1.55, margin: 0,
                    fontStyle: 'italic',
                  }}>
                    {card.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Glow border overlay */}
            <div
              ref={el => { glowRefs.current[i] = el }}
              style={{
                position: 'absolute', inset: '-2px',
                borderRadius: '9px',
                border: '2px solid rgba(201,168,76,0.9)',
                boxShadow: '0 0 20px rgba(201,168,76,0.55), 0 0 50px rgba(201,168,76,0.2), inset 0 0 24px rgba(201,168,76,0.06)',
                pointerEvents: 'none',
                willChange: 'opacity',
              }}
            />
          </div>
        ))}

        {/* ── Active reading card ───────────────────────────────────────── */}
        <div
          ref={activeRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 8,
            width: 'clamp(300px, 38vw, 480px)',
            willChange: 'opacity, transform',
          }}
        >
          <div style={{
            background: 'rgba(12,11,8,0.9)',
            border: '1px solid rgba(201,168,76,0.22)',
            borderRadius: '8px',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.08)',
          }}>
            <div style={{ height: 'clamp(160px, 20vh, 220px)', overflow: 'hidden', position: 'relative' }}>
              <img
                className="ac-img"
                src={CARDS[0].image}
                alt=""
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'brightness(0.55) saturate(0.9)',
                }}
              />
              <div style={{
                position: 'absolute', bottom: '0.8rem', right: '1rem',
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900,
                color: 'rgba(201,168,76,0.3)', lineHeight: 1, userSelect: 'none',
              }}>
                <span className="ac-number">01</span>
              </div>
            </div>

            <div style={{ padding: 'clamp(1.2rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem' }}>
                <div style={{ width: '1.5rem', height: '1px', background: '#c9a84c', opacity: 0.6 }} />
                <span className="ac-label" style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.6rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'rgba(201,168,76,0.8)',
                }}>
                  {CARDS[0].label}
                </span>
              </div>

              <h3 className="ac-heading" style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                fontWeight: 800, color: '#ffffff',
                lineHeight: 1.15, margin: '0 0 1rem',
                letterSpacing: '-0.01em',
              }}>
                {CARDS[0].heading}
              </h3>

              <p className="ac-body" style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75, margin: '0 0 1.2rem',
              }}>
                {CARDS[0].body}
              </p>

              <div style={{ width: '2rem', height: '1px', background: '#c9a84c', opacity: 0.4, marginBottom: '0.9rem' }} />

              <p className="ac-detail" style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
                color: 'rgba(201,168,76,0.7)',
                lineHeight: 1.6, margin: 0, fontStyle: 'italic',
              }}>
                {CARDS[0].detail}
              </p>
            </div>
          </div>

          <div style={{
            textAlign: 'center', marginTop: '1.2rem',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.58rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)',
          }}>
            scroll to continue
          </div>
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute', bottom: '1.8rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '0.5rem', zIndex: 10,
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: 'rgba(201,168,76,0.35)',
              border: '1px solid rgba(201,168,76,0.3)',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
