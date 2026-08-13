import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { b } from 'framer-motion/client'

export default function Order() {
    
  const { cartLines, addToCart, decreaseFromCart, removeFromCart, subtotal, deliveryFee, tax, total, setAddress, address,totalItems } =
    useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Kolkata',
    pincode: '',
    instructions: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!/^\d{10}$/.test(form.phone.trim())) next.phone = '10-digit number'
    if (!form.address.trim()) next.address = 'Required'
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = '6-digit pincode'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (totalItems === 0) return
   if (!address) return alert('Please add a delivery address first.')
    navigate('/payment')
  }

  // handle removing the saved address
  const handleRemoveAddress = () => {
    setAddress(null)
    localStorage.removeItem('tadka-address')
  }
  // handle save address to local storage
  const handleSaveAddress = () => {
    if (!validate()) return
    setAddress(form)
    localStorage.setItem('tadka-address', JSON.stringify(form))
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
        <Link to="/" style={styles.back}>
          ← Back to menu
        </Link>
        <h1 style={styles.title}>Your order</h1>
      </header>

      <div className="order-layout" style={styles.layout}>
        <section style={styles.cartSection}>
          <h2 style={styles.h2}>Cart ({totalItems})</h2>

          {cartLines.length === 0 ? (
            <div style={styles.empty}>
              <p>Your cart is empty.</p>
              <Link to="/" style={styles.emptyLink}>
                Browse the menu →
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {cartLines.map((line) => (
                <motion.div
                  key={line.FID}
                  style={styles.line}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <img src={line.F_URI} alt={line.FNAME} style={styles.lineImg} />
                  <div style={styles.lineInfo}>
                    <p style={styles.lineName}>{line.FNAME}</p>
                    <span className="price" style={styles.linePrice}>₹{line.PRICE}</span>
                  </div>
                  <div style={styles.stepper}>
                    <button style={styles.stepBtn} onClick={() => decreaseFromCart(line.FID)} aria-label={`Remove one ${line.FNAME}`}>
                      −
                    </button>
                    <span style={styles.qty}>{line.qty}</span>
                    <button style={styles.stepBtn} onClick={() => addToCart(line.FID)} aria-label={`Add one ${line.FNAME}`}>
                      +
                    </button>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(line.FID)} aria-label={`Remove ${line.FNAME} from cart`}>
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

{/* Order Summary */}
          {cartLines.length > 0 && (
            <>
            <div className="ticket-edge" style={styles.summary}>
              <Row label="Subtotal" value={`₹${subtotal}`} />
              <Row label="Delivery fee" value={`₹${deliveryFee}`} />
              <Row label="Taxes" value={`₹${tax}`} />
              <div style={styles.divider} />
            
              <motion.button
              type="submit"
              className='place-order-btn'
              style={{
                ...styles.placeBtn,
                opacity: totalItems > 0 ? 1 : 0.5,
                pointerEvents: totalItems > 0 ? 'auto' : 'none',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={(e)=>{handlePlaceOrder(e)}}
            >
              Place order · ₹{total}
            </motion.button>   </div>
            </>
          )}
        </section>

{/* Saved Address Section */}
          <section className='saved address'>
            <div>
           
              {address ? (   
               <> 
                <h2 style={styles.h2}>Saved address</h2>
                <div style={styles.savedAddress} > 
                  <button style={styles.addressRemoveBtn}  aria-label="Remove address" onClick={handleRemoveAddress}>
                    X
                  </button>
                  <p style={styles.addressLabel}>Delivering to</p>
                  <p style={styles.addressText}>
                    {address.name} · {address.phone}<br />
                    {address.address}, {address.city} {address.pincode}
                  </p>
                </div>
                 </>
              ) : 
              
        
              (
              <section style={styles.formSection}>
          <h2 style={styles.h2}>Delivery details</h2>
          <form onSubmit={handlePlaceOrder} style={styles.form} noValidate>
            <Field label="Full name" error={errors.name}>
              <input style={styles.input} value={form.name} onChange={update('name')} placeholder="Riya Sharma" />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input style={styles.input} value={form.phone} onChange={update('phone')} placeholder="98XXXXXXXX" inputMode="numeric" />
            </Field>
            <Field label="Delivery address" error={errors.address}>
              <textarea
                style={{ ...styles.input, resize: 'vertical', minHeight: 70 }}
                value={form.address}
                onChange={update('address')}
                placeholder="Flat / street / landmark"
              />
            </Field>
            <div style={styles.row2} className='city-pincode'>
              <Field label="City" style={{ flex: 1 }}>
                <input style={styles.input} value={form.city} onChange={update('city')} />
              </Field>
              <Field label="Pincode" error={errors.pincode} style={{ flex: 1 }}>
                <input style={styles.input} value={form.pincode} onChange={update('pincode')} placeholder="700001" inputMode="numeric" />
              </Field>
            </div>
            <Field label="Delivery instructions (optional)">
              <input style={styles.input} value={form.instructions} onChange={update('instructions')} placeholder="Ring the bell twice" />
            </Field>

           <motion.button
              type="button"
              style={{
                ...styles.placeBtn,
                opacity: totalItems > 0 ? 1 : 0.5
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSaveAddress}
            >
              Save address
            </motion.button>
          </form>
        </section>
              )} 
            </div>
          </section>
      </div>
    </motion.div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
      <span style={{ fontSize: bold ? 15 : 13.5, color: bold ? 'var(--color-charcoal)' : 'var(--color-ink-soft)', fontWeight: bold ? 700 : 400 }}>
        {label}
      </span>
      <span className="price" style={{ fontSize: bold ? 17 : 13.5, fontWeight: bold ? 700 : 500 }}>
        {value}
      </span>
    </div>
  )
}

function Field({ label, error, children, style }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <span style={styles.label}>{label}</span>
      {children}
      {error && <span style={styles.error}>{error}</span>}
    </label>
  )
}

const styles = {
  page: { maxWidth: 1080, margin: '0 auto', padding: '24px 20px 60px' },
  header: { marginBottom: 28 },
  back: { fontSize: 13.5, color: 'var(--color-chili)', fontWeight: 600 },
  title: { fontSize: 30, marginTop: 10 },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 36 },
  cartSection: {},
  formSection: {},
  h2: { fontSize: 19, marginBottom: 16 },
  empty: {
    background: '#fff',
    borderRadius: 'var(--radius-md)',
    padding: '30px 20px',
    textAlign: 'center',
    color: 'var(--color-ink-soft)',
    boxShadow: 'var(--shadow-card)',
  },
  emptyLink: { display: 'inline-block', marginTop: 10, color: 'var(--color-chili)', fontWeight: 600 },
  line: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#fff',
    borderRadius: 'var(--radius-md)',
    padding: 10,
    marginBottom: 10,
    boxShadow: 'var(--shadow-card)',
  },
  lineImg: { width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 },
  lineInfo: { flex: 1, minWidth: 0 },
  lineName: { fontSize: 14.5, fontWeight: 600, marginBottom: 2 },
  linePrice: { fontSize: 12.5, color: 'var(--color-ink-soft)' },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--color-cream-2)',
    borderRadius: 999,
    padding: '4px 8px',
  },
  stepBtn: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'var(--color-charcoal)',
    color: '#fff',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontSize: 13.5, fontWeight: 700, minWidth: 12, textAlign: 'center' },
  removeBtn: { color: 'var(--color-ink-soft)', fontSize: 14, padding: 6 },
  summary: {
    marginTop: 22,
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
    borderRadius: 'var(--radius-md)',
    padding: '20px 18px 16px',
  },
  divider: { borderTop: '1px dashed rgba(251,243,231,0.3)', margin: '8px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: 16, background: '#fff', padding: 20, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' },
  row2: { display: 'flex', gap: 12 },
  label: { fontSize: 12.5, fontWeight: 600, color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.03em' },
  input: {
    border: '1.5px solid var(--color-line)',
    borderRadius: 10,
    padding: '11px 12px',
    fontSize: 14.5,
    fontFamily: 'var(--font-body)',
    background: 'var(--color-cream)',
    color: 'var(--color-ink)',
  },
  error: { fontSize: 11.5, color: 'var(--color-chili)' },
  placeBtn: {
    marginTop: 0,
    background: 'var(--color-chili)',
    color: '#fff',
    padding: '15px 20px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15.5,
    transition: 'opacity 0.2s ease',
  },
  savedAddress: {
    border: '1.5px solid var(--color-line)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    background: 'var(--color-cream)',
    color: 'var(--color-charcoal)',
    position: 'relative',
    boxShadow: 'var(--shadow-card)',
   
  
  
  },

  addressLabel: { fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgba(24, 24, 23, 0.79)', marginBottom: 4 },
  addressText: { fontSize: 13.5, lineHeight: 1.5, color: 'rgba(26, 26, 25, 0.8)' },
  addressRemoveBtn: { position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: 'var(--color-chili)', fontSize: 16, cursor: 'pointer' },
}
