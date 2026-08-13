import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'

export default function FoodCard({ item }) {
  const { cart, addToCart, decreaseFromCart } = useCart()
  const qty = cart[item.FID] || 0

  return (
    <motion.article
      style={styles.card}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      {/* food image  */}
      <div style={styles.imgWrap}>
        <img src={item.F_URI} alt={item.FNAME} style={styles.img} loading="lazy" />
      </div>

      {/* veg/non-veg indicator */}
      <div style={styles.body}>
        <div style={styles.titleRow}>
          <span className={`diet-flag ${(item.VEG == 1) ? 'veg' : 'nonveg'}`} title={(item.VEG == 1 )? 'Veg' : 'Non-veg'} />
          {/* food name */}
          <h3 style={styles.name}>{item.FNAME}</h3>
        </div>
          {/* food description */}
        <p style={styles.desc}>{item.FDESC}</p>

        {/* price and add/stepper */}
        <div style={styles.footer}>
          <span className="price" style={styles.price}>₹{item.PRICE}</span>

          <AnimatePresence mode="wait" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                style={styles.addBtn}
                onClick={() => addToCart(item.FID)}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                Add
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                style={styles.stepper}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button style={styles.stepBtn} onClick={() => decreaseFromCart(item.FID)} aria-label={`Remove one ${item.FNAME}`}>
                  −
                </button>
                <motion.span
                  key={qty}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={styles.qty}
                >
                  {qty}
                </motion.span>
                <button style={styles.stepBtn} onClick={() => addToCart(item.FID)} aria-label={`Add one more ${item.FNAME}`}>
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrap: {
    height: 150,
    overflow: 'hidden',
    background: 'var(--color-cream-2)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  body: {
    padding: '14px 16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: 600,
  },
  desc: {
    fontSize: 13,
    color: 'var(--color-ink-soft)',
    lineHeight: 1.45,
    flex: 1,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: 'var(--color-charcoal)',
  },
  addBtn: {
    padding: '8px 18px',
    borderRadius: 999,
    border: '1.5px solid var(--color-chili)',
    color: 'var(--color-chili)',
    fontWeight: 700,
    fontSize: 13.5,
    background: 'transparent',
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'var(--color-chili)',
    borderRadius: 999,
    padding: '4px 6px',
  },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.18)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },
  qty: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    minWidth: 14,
    textAlign: 'center',
    display: 'inline-block',
  },
}
