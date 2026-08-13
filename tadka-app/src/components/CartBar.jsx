import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function CartBar() {
  const { totalItems, subtotal } = useCart()
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          className="ticket-edge"
          style={styles.bar}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        >
          <div style={styles.inner}>
            <div style={styles.info}>
              <span style={styles.count}>
                {totalItems} item{totalItems > 1 ? 's' : ''}
              </span>
              <span className="price" style={styles.total}>₹{subtotal}</span>
            </div>
            <motion.button
              style={styles.cta}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/order')}
            >
              View cart →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const styles = {
  bar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    boxShadow: '0 -10px 30px rgba(0,0,0,0.25)',
  },
  inner: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  count: {
    fontSize: 12.5,
    color: 'rgba(251,243,231,0.65)',
  },
  total: {
    fontSize: 19,
    fontWeight: 700,
  },
  cta: {
    background: 'var(--color-chili)',
    color: '#fff',
    padding: '12px 22px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14.5,
  },
}
