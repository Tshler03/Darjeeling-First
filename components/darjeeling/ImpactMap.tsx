'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Cleaned locations — swap/add real ones as drives happen ─────────────────
const LOCATIONS = [
  { name: 'Chowrasta',          lat: 27.0425,  lng: 88.2634, drives: 12, desc: 'The heart of Darjeeling town' },
  { name: 'Mall Road',          lat: 27.0418,  lng: 88.2628, drives: 9,  desc: 'Main promenade, cleaned top to bottom' },
  { name: 'Tiger Hill',         lat: 26.9987,  lng: 88.2623, drives: 4,  desc: 'Summit trail & sunrise point' },
  { name: 'Batasia Loop',       lat: 27.0156,  lng: 88.2590, drives: 6,  desc: 'Railway loop & war memorial area' },
  { name: 'Happy Valley',       lat: 27.0489,  lng: 88.2521, drives: 5,  desc: 'Tea estate roads & pathways' },
  { name: 'Ghoom Monastery',    lat: 27.0089,  lng: 88.2578, drives: 3,  desc: 'Road leading to the monastery' },
  { name: 'Lebong',             lat: 27.0512,  lng: 88.2701, drives: 4,  desc: 'Lebong cart road & surroundings' },
  { name: 'Chowk Bazaar',       lat: 27.0378,  lng: 88.2612, drives: 8,  desc: 'Main market area & bus stand' },
  { name: 'Darjeeling Zoo',     lat: 27.0401,  lng: 88.2598, drives: 2,  desc: 'Padmaja Naidu Zoo access road' },
  { name: 'Singamari',          lat: 27.0556,  lng: 88.2489, drives: 3,  desc: 'Forest trail cleanup' },
  { name: 'Jalapahar',          lat: 27.0334,  lng: 88.2556, drives: 2,  desc: 'Hill road & viewpoint' },
  { name: 'Himalayan Railway',  lat: 27.0445,  lng: 88.2667, drives: 5,  desc: 'Tracks & station surrounds' },
]
// ────────────────────────────────────────────────────────────────────────────

export default function ImpactMap() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const mapRef      = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-100px' })
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    if (!inView || !mapRef.current || mapInstance.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const goldPin = L.divIcon({
        className: '',
        iconAnchor: [10, 28],
        popupAnchor: [0, -30],
        html: `
          <div style="position:relative;width:20px;height:28px;cursor:pointer;">
            <div style="
              width:20px;height:20px;
              border-radius:50% 50% 50% 0;
              background:linear-gradient(135deg,#e8c96a 0%,#c9a84c 50%,#a07828 100%);
              transform:rotate(-45deg);
              border:2px solid rgba(255,255,255,0.3);
              box-shadow:0 2px 8px rgba(0,0,0,0.5),0 0 0 2px rgba(201,168,76,0.3);
            "></div>
            <div style="
              position:absolute;bottom:0;left:50%;
              transform:translateX(-50%);
              width:4px;height:4px;
              border-radius:50%;
              background:rgba(201,168,76,0.6);
            "></div>
            <div style="
              position:absolute;top:-4px;left:-4px;
              width:28px;height:28px;
              border-radius:50%;
              border:1.5px solid rgba(201,168,76,0.4);
              animation:mapPulse 2s ease-out infinite;
            "></div>
          </div>
        `,
      })

      const map = L.map(mapRef.current!, {
        center:          [27.028, 88.263],
        zoom:            14,
        zoomControl:     false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      mapInstance.current = map

      L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  { maxZoom: 19, attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd' }
).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      LOCATIONS.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], { icon: goldPin })
        marker.addTo(map)
        marker.bindPopup(`
          <div style="
            background:rgba(26,18,8,0.97);
            border:1px solid rgba(201,168,76,0.3);
            border-radius:6px;
            padding:0.9rem 1.1rem;
            min-width:160px;
            font-family:sans-serif;
            box-shadow:0 8px 32px rgba(0,0,0,0.6);
          ">
            <div style="font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(201,168,76,0.8);margin-bottom:0.35rem;">Cleaned</div>
            <div style="font-size:1rem;font-weight:700;color:#F5EDD8;margin-bottom:0.3rem;line-height:1.2;">${loc.name}</div>
            <div style="font-size:0.72rem;color:rgba(245,237,216,0.4);line-height:1.5;margin-bottom:0.6rem;">${loc.desc}</div>
            <div style="display:flex;align-items:center;gap:0.4rem;">
              <div style="width:1rem;height:1px;background:#c9a84c;opacity:0.6;"></div>
              <span style="font-size:0.6rem;color:rgba(201,168,76,0.7);letter-spacing:0.1em;">${loc.drives} drive${loc.drives > 1 ? 's' : ''}</span>
            </div>
          </div>
        `, { closeButton: false, className: 'df-popup' })
      })

      const bounds = L.latLngBounds(LOCATIONS.map(l => [l.lat, l.lng]))
      map.fitBounds(bounds, { padding: [40, 40] })
    }

    initMap()

    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
    }
  }, [inView])

  const totalDrives    = LOCATIONS.reduce((a, l) => a + l.drives, 0)
  const totalLocations = LOCATIONS.length

  return (
    <section
      ref={sectionRef}
      id="impact-map"
      style={{
        position:   'relative',
        background: '#1A1208',
        padding:    'clamp(5rem, 10vw, 9rem) 0',
        overflow:   'hidden',
      }}
    >
      {/* Subtle top border */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
      }} />

      <div style={{
        maxWidth: 'var(--container, 1200px)',
        margin:   '0 auto',
        padding:  '0 clamp(1.5rem, 5vw, 4rem)',
      }}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '0.8rem', marginBottom: '1.2rem',
          }}>
            <div style={{ width: 28, height: 1, background: '#c9a84c', opacity: 0.6 }} />
            <span style={{
              fontFamily:    'var(--font-body, sans-serif)',
              fontSize:      '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(201,168,76,0.8)',
            }}>
              Every place we showed up
            </span>
          </div>

          <h2 style={{
            fontFamily:    'var(--font-display, Georgia, serif)',
            fontSize:      'clamp(2rem, 5vw, 4rem)',
            fontWeight:    900,
            color:         '#F5EDD8',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            margin:        0,
          }}>
            Darjeeling,{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>
              reclaimed.
            </em>
          </h2>

          <div style={{
            display:   'flex',
            gap:       'clamp(2rem, 5vw, 4rem)',
            marginTop: '1.8rem',
          }}>
            {[
              { val: totalLocations, label: 'Areas cleaned' },
              { val: totalDrives,    label: 'Total drives'  },
              { val: 54,             label: 'Sundays'       },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              >
                <div style={{
                  fontFamily:   'var(--font-display, Georgia, serif)',
                  fontSize:     'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight:   900,
                  color:        '#c9a84c',
                  lineHeight:   1,
                  marginBottom: '0.3rem',
                }}>
                  {s.val}+
                </div>
                <div style={{
                  fontFamily:    'var(--font-body, sans-serif)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,237,216,0.35)',
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Map container ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position:     'relative',
            borderRadius: '8px',
            overflow:     'hidden',
            border:       '1px solid rgba(201,168,76,0.15)',
            boxShadow:    '0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
          <div
            ref={mapRef}
            style={{
              width:      '100%',
              height:     'clamp(400px, 60vh, 620px)',
              background: '#1A1208',
            }}
          />

          {/* Legend overlay */}
          <div style={{
            position:       'absolute',
            bottom:         '1.2rem',
            left:           '1.2rem',
            zIndex:         1000,
            background:     'rgba(26,18,8,0.92)',
            backdropFilter: 'blur(12px)',
            border:         '1px solid rgba(201,168,76,0.15)',
            borderRadius:   '6px',
            padding:        '0.7rem 1rem',
            display:        'flex',
            alignItems:     'center',
            gap:            '0.6rem',
          }}>
            <div style={{
              width:        10,
              height:       10,
              borderRadius: '50% 50% 50% 0',
              background:   '#c9a84c',
              transform:    'rotate(-45deg)',
              flexShrink:   0,
            }} />
            <span style={{
              fontFamily:    'var(--font-body, sans-serif)',
              fontSize:      '0.58rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'rgba(245,237,216,0.45)',
            }}>
              Cleaned location
            </span>
          </div>

          {/* Hint */}
          <div style={{
            position:       'absolute',
            top:            '1rem',
            right:          '1rem',
            zIndex:         1000,
            background:     'rgba(26,18,8,0.78)',
            backdropFilter: 'blur(8px)',
            border:         '1px solid rgba(201,168,76,0.08)',
            borderRadius:   '4px',
            padding:        '0.4rem 0.75rem',
            fontFamily:     'var(--font-body, sans-serif)',
            fontSize:       '0.55rem',
            letterSpacing:  '0.15em',
            textTransform:  'uppercase',
            color:          'rgba(245,237,216,0.22)',
          }}>
            Click pins to explore
          </div>
        </motion.div>

        {/* ── Bottom note ─────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily:    'var(--font-body, sans-serif)',
            fontSize:      '0.68rem',
            color:         'rgba(245,237,216,0.2)',
            letterSpacing: '0.05em',
            marginTop:     '1.2rem',
            textAlign:     'center',
            fontStyle:     'italic',
          }}
        >
          Map updates every Sunday. More locations added as drives happen.
        </motion.p>
      </div>

      {/* ── Popup & pulse styles ─────────────────────────────────────── */}
      <style>{`
        .df-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .df-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .df-popup .leaflet-popup-tip-container {
          display: none !important;
        }
        .leaflet-control-zoom a {
          background: rgba(26,18,8,0.92) !important;
          border-color: rgba(201,168,76,0.2) !important;
          color: rgba(201,168,76,0.8) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(61,43,14,0.95) !important;
          color: #c9a84c !important;
        }
        .leaflet-control-attribution {
          background: rgba(26,18,8,0.6) !important;
          color: rgba(245,237,216,0.2) !important;
          font-size: 9px !important;
        }
        @keyframes mapPulse {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
