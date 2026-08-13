import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <header style={styles.header}>
      <motion.div
        style={styles.inner}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div style={styles.brand}>
          <span style={styles.flame} aria-hidden="true">
            <FlameIcon />
          </span>
          {/* brand name */}
          <span style={styles.brandName}>tadka</span>
        </div>
        {/* tagline */}
        <p style={styles.tagline}>home-style tiffin, delivered hot</p>
      </motion.div>
    </header>
  )
}

function FlameIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c1 3-2 4-2 7a4 4 0 108 0c0-1-.5-2-1-2 .5 2-1 3-2 2 1-2-1-3-1-5 0-1 .5-1.5-2-2z"
        fill="var(--color-turmeric)"
      />
      <path
        d="M12 22c-4 0-7-2.5-7-6.5C5 12 8 9 8.5 7c.7 2 .2 3.3-.3 4.6-1 2.3.4 4.9 3 4.9 2 0 3.3-1.4 3-3.3-.2-1.3-1-2-1-3.2 2 1 5 3 5 6.5 0 4-3 6.5-6.2 6.5z"
        fill="var(--color-chili)"
      />
    </svg>
  )
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
  },
  inner: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  flame: {
    display: 'inline-flex',
    transform: 'translateY(3px)',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 26,
    letterSpacing: '-0.02em',
    color: 'var(--color-cream)',
  },
  tagline: {
    fontSize: 12.5,
    color: 'rgba(251,243,231,0.65)',
    fontStyle: 'italic',
    fontFamily: 'var(--font-display)',
  },
}
