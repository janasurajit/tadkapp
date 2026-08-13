export default function CategoryTabs({ categories, active, onSelect }) {
  const handleClick = (id) => {
    onSelect(id)
    const el = document.getElementById(`section-${id}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 116
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav style={styles.wrap} aria-label="Food categories">
      <div className="scroll-x" style={styles.scroller}>
        {categories.map((c) => {
          const isActive = c.id === active
          return (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              style={{
                ...styles.chip,
                background: isActive ? 'var(--color-chili)' : 'transparent',
                color: isActive ? 'var(--color-cream)' : 'var(--color-ink)',
                borderColor: isActive ? 'var(--color-chili)' : 'var(--color-line)',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

const styles = {
  wrap: {
    position: 'sticky',
    top: 58,
    zIndex: 30,
    background: 'var(--color-cream)',
    borderBottom: '1px solid var(--color-line)',
  },
  scroller: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'flex',
    gap: 10,
    padding: '12px 20px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  chip: {
    flexShrink: 0,
    padding: '8px 16px',
    borderRadius: 999,
    border: '1.5px solid var(--color-line)',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: 'all 0.25s ease',
  },
}
