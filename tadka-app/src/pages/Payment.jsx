import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import GooglePayButton from '../components/GooglePayButton.jsx'

export default function Payment() {
  const { cartLines, subtotal, deliveryFee, tax, total, address, clearCart, setLastOrder, totalItems } = useCart()
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (totalItems === 0 && !done) {
    return (
      <div style={styles.emptyPage}>
        <p>There's nothing to pay for yet.</p>
        <Link to="/" style={styles.link}>← Back to menu</Link>
      </div>
    )
  }

  if (!address && !done) {
    return (
      <div style={styles.emptyPage}>
        <p>We need a delivery address first.</p>
        <Link to="/order" style={styles.link}>← Add delivery details</Link>
      </div>
    )
  }

  const completeOrder = (method) => {
    const id = 'TDK-' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(id)
    setLastOrder({ id, method, total, address, cartLines })
    setDone(true)
    clearCart()
  }

  const handleGooglePaySuccess = () => {
    setPaying(true)
    setTimeout(() => completeOrder('Google Pay'), 900)
  }

  const handleCardPay = () => {
    setPaying(true)
    setTimeout(() => completeOrder('Card'), 1100)
  }

  if (done) {
    return <Confirmation orderId={orderId} total={total} address={address} onDone={() => navigate('/')} />
  }

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header style={styles.header}>
        <Link to="/order" style={styles.back}>← Back to order</Link>
        <h1 style={styles.title}>Payment</h1>
      </header>
{/* order list */}
      <div className="ticket-edge" style={styles.summary}>
        <h2 style={styles.summaryTitle}>Order summary</h2>
        {cartLines.map((l) => (
          <div key={l.id} style={styles.sumRow}>
            <span>{l.qty} × {l.name}</span>
            <span className="price">₹{l.price * l.qty}</span>
          </div>
        ))}
        <div style={styles.divider} />
        <div style={styles.sumRow}><span>Subtotal</span><span className="price">₹{subtotal}</span></div>
        <div style={styles.sumRow}><span>Delivery fee</span><span className="price">₹{deliveryFee}</span></div>
        <div style={styles.sumRow}><span>Taxes</span><span className="price">₹{tax}</span></div>
        <div style={styles.divider} />
        <div style={{ ...styles.sumRow, fontWeight: 700, fontSize: 18 }}>
          <span>Total due</span><span className="price">₹{total}</span>
        </div>

        {address && (
          <div style={styles.addressBlock}>
            <p style={styles.addressLabel}>Delivering to</p>
            <p style={styles.addressText}>
              {address.name} · {address.phone}<br />
              {address.address}, {address.city} {address.pincode}
            </p>
          </div>
        )}
      </div>

{/* payment section */}
      <section style={styles.payMethods}>
        <h2 style={styles.h2}>Pay with</h2>

        <AnimatePresence mode="wait">
          {paying ? (
            <motion.div
              key="paying"
              style={styles.payingBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner />
              <p>Confirming your payment…</p>
            </motion.div>
          ) : (
            <motion.div key="methods" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={styles.gpayWrap}>
                <GooglePayButton amount={total} onSuccess={handleGooglePaySuccess} onError={() => setPaying(false)} />
              </div>

              <div style={styles.orDivider}>
                <span style={styles.orLine} /> or <span style={styles.orLine} />
              </div>

              <motion.button style={styles.cardBtn} whileTap={{ scale: 0.97 }} onClick={handleCardPay}>
                Pay ₹{total} with card
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  )
}

function Confirmation({ orderId, total, address, onDone }) {
  return (
    <motion.div
      style={styles.confirmPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        style={styles.checkCircle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
      >
        <motion.svg width="46" height="46" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M4 12.5 9.5 18 20 6"
            stroke="var(--color-cream)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h1 style={styles.confirmTitle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        Order placed!
      </motion.h1>
      <motion.p style={styles.confirmSub} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        Your tiffin is being packed. It'll reach {address?.city || 'you'} soon.
      </motion.p>

      <motion.div className="ticket-edge" style={styles.confirmCard} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div style={styles.sumRow}><span>Order ID</span><span className="price">{orderId}</span></div>
        <div style={styles.sumRow}><span>Amount paid</span><span className="price">₹{total}</span></div>
      </motion.div>

      <motion.button style={styles.doneBtn} onClick={onDone} whileTap={{ scale: 0.97 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
        Back to menu
      </motion.button>
    </motion.div>
  )
}

function Spinner() {
  return (
    <motion.div
      style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--color-line)', borderTopColor: 'var(--color-chili)' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
    />
  )
}

const styles = {
  page: { maxWidth: 640, margin: '0 auto', padding: '24px 20px 60px' },
  header: { marginBottom: 24 },
  back: { fontSize: 13.5, color: 'var(--color-chili)', fontWeight: 600 },
  title: { fontSize: 28, marginTop: 10 },
  summary: {
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
    borderRadius: 'var(--radius-md)',
    padding: '22px 20px 18px',
  },
  summaryTitle: { color: 'var(--color-cream)', fontSize: 17, marginBottom: 12 },
  sumRow: { display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '5px 0', color: 'rgba(251,243,231,0.9)' },
  divider: { borderTop: '1px dashed rgba(251,243,231,0.3)', margin: '8px 0' },
  addressBlock: { marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(251,243,231,0.15)' },
  addressLabel: { fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgba(251,243,231,0.55)', marginBottom: 4 },
  addressText: { fontSize: 13.5, lineHeight: 1.5, color: 'rgba(251,243,231,0.9)' },
  payMethods: { marginTop: 30 },
  h2: { fontSize: 18, marginBottom: 14 },
  gpayWrap: { minHeight: 48 },
  orDivider: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--color-ink-soft)', justifyContent: 'center' },
  orLine: { flex: 1, height: 1, background: 'var(--color-line)' },
  cardBtn: {
    background: '#fff',
    border: '1.5px solid var(--color-charcoal)',
    color: 'var(--color-charcoal)',
    padding: '14px 20px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
  },
  payingBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '30px 0', color: 'var(--color-ink-soft)' },
  emptyPage: { maxWidth: 480, margin: '80px auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 },
  link: { color: 'var(--color-chili)', fontWeight: 600 },
  confirmPage: {
    maxWidth: 480,
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px',
    gap: 6,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: '50%',
    background: 'var(--color-leaf)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  confirmTitle: { fontSize: 28 },
  confirmSub: { fontSize: 14.5, color: 'var(--color-ink-soft)', maxWidth: 320, marginTop: 4 },
  confirmCard: {
    marginTop: 26,
    width: '100%',
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
    borderRadius: 'var(--radius-md)',
    padding: '20px 18px 16px',
  },
  doneBtn: {
    marginTop: 26,
    background: 'var(--color-chili)',
    color: '#fff',
    padding: '14px 30px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
  },
}
