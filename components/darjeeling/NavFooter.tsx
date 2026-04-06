'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Reality',    href: '#reality' },
  { label: 'The Story',  href: '#beginning' },
  { label: 'The Work',   href: '#work' },
  { label: 'The People', href: '#people' },
]

// ─── NAV ───────────────────────────────────────────────────────────────────
export function Nav() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '1rem var(--gutter)' : '1.6rem var(--gutter)',
          background: scrolled ? 'rgba(26,18,8,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,151,58,0.07)' : 'none',
          transition: 'padding 0.5s, background 0.5s, backdrop-filter 0.5s, border 0.5s',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            fontFamily: 'var(--ff-display)', fontWeight: 900,
            fontSize: '0.95rem', letterSpacing: '0.03em',
            color: 'var(--cream)', textDecoration: 'none',
          }}
        >
          {/* Animated diamond */}
          <motion.div
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 18, height: 18,
              background: 'var(--tea-gold)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
          Darjeeling First
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: '2.5rem',
          listStyle: 'none', margin: 0, padding: 0,
        }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontSize: '0.68rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: activeSection === link.href.slice(1)
                    ? 'var(--warm-amber)'
                    : 'rgba(200,216,192,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  borderBottom: activeSection === link.href.slice(1)
                    ? '1px solid rgba(232,199,122,0.4)' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-amber)')}
                onMouseLeave={e => {
                  e.currentTarget.style.color =
                    activeSection === link.href.slice(1)
                      ? 'var(--warm-amber)'
                      : 'rgba(200,216,192,0.55)'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <a
            href="#invitation"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--warm-amber)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--tea-gold)')}
            style={{
              fontFamily: 'var(--ff-body)', fontSize: '0.68rem',
              fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--midnight)', background: 'var(--tea-gold)',
              padding: '0.6rem 1.3rem',
              transition: 'background 0.25s',
            }}
            className="nav-cta"
          >
            Join a Sunday
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            className="nav-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column', gap: '5px',
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  display: 'block', width: 22, height: 1.5,
                  background: 'var(--cream)', borderRadius: 1,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 490,
              background: 'rgba(26,18,8,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                  fontWeight: 900, letterSpacing: '-0.02em',
                  color: 'var(--cream)', textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-amber)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream)')}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#invitation"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontFamily: 'var(--ff-body)', fontSize: '0.78rem',
                fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--midnight)', background: 'var(--tea-gold)',
                padding: '0.9rem 2.2rem', marginTop: '1rem',
              }}
            >
              Join a Sunday
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{
      background: 'var(--midnight)',
      borderTop: '1px solid rgba(200,151,58,0.08)',
      padding: 'clamp(4rem, 8vw, 6rem) var(--gutter) clamp(2rem, 4vw, 2.5rem)',
    }}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr auto',
        gap: 'clamp(2rem, 5vw, 5rem)',
        marginBottom: 'clamp(3rem, 6vw, 4rem)',
        alignItems: 'start',
      }}>

        {/* Brand */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            fontFamily: 'var(--ff-display)', fontWeight: 900,
            fontSize: '1.05rem', color: 'var(--cream)',
            marginBottom: '0.9rem',
          }}>
            <div style={{
              width: 18, height: 18, background: 'var(--tea-gold)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }} />
            Darjeeling First
          </div>
          <p style={{
            fontSize: '0.85rem', fontStyle: 'italic',
            color: 'var(--forest-brown)', lineHeight: 1.65,
            marginBottom: '1.2rem', maxWidth: '320px',
          }}>
            &ldquo;Group of friends coming from same school of thought!&rdquo;
          </p>
          <a
            href="https://instagram.com/darjeelingfirst"
            target="_blank" rel="noreferrer"
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--tea-gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest-brown)')}
            style={{ color: 'var(--forest-brown)', transition: 'color 0.25s' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Nav columns */}
        <div style={{ display: 'flex', gap: 'clamp(2rem, 4vw, 4rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <h4 style={{
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--tea-gold)', marginBottom: '0.3rem',
            }}>
              Navigate
            </h4>
            {['Reality', 'The Story', 'The Work', 'The Proof', 'The People', 'Join'].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, '-').replace('the-', '')}`}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mist-green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest-brown)')}
                style={{
                  fontSize: '0.83rem', color: 'var(--forest-brown)',
                  textDecoration: 'none', transition: 'color 0.25s',
                }}
              >
                {l}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <h4 style={{
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--tea-gold)', marginBottom: '0.3rem',
            }}>
              Connect
            </h4>
            <a href="https://instagram.com/darjeelingfirst" target="_blank" rel="noreferrer"
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--mist-green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest-brown)')}
              style={{ fontSize: '0.83rem', color: 'var(--forest-brown)', textDecoration: 'none', transition: 'color 0.25s' }}
            >
              Instagram
            </a>
            <a href="mailto:hello@darjeelingfirst.org"
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--mist-green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest-brown)')}
              style={{ fontSize: '0.83rem', color: 'var(--forest-brown)', textDecoration: 'none', transition: 'color 0.25s' }}
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--mist-green)' }}>
            Ready to show up?
          </p>
          <a
            href="#invitation"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--warm-amber)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--tea-gold)')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--ff-body)', fontSize: '0.72rem',
              fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--midnight)', background: 'var(--tea-gold)',
              padding: '0.85rem 1.6rem', transition: 'background 0.25s',
            }}
          >
            Join a Sunday
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        borderTop: '1px solid rgba(200,151,58,0.05)',
        paddingTop: '1.8rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem',
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--dark-earth)', letterSpacing: '0.03em' }}>
          © 2024 Darjeeling First. A community initiative — not a company.
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--dark-earth)' }}>
          Made with love for the hills. 🌿
        </p>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
          footer > div:first-child > div:last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
