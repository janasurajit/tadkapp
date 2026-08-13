import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import CategoryTabs from '../components/CategoryTabs.jsx'
import FoodCard from '../components/FoodCard.jsx'
import CartBar from '../components/CartBar.jsx'
import { categories} from '../data/foodData.js'
import { useCart } from '../context/CartContext.jsx'
import { useFood } from '../hooks/useFood.js'

export default function Home() {
  const [active, setActive] = useState(categories[0].id)
  const { totalItems, subtotal } = useCart()
  const navigate = useNavigate()
  const {handlegetFoodItems,foodItem,setfoodItem}= useFood()

useEffect(() => {
 ;(async () => {
    await handlegetFoodItems();

  })();
},[setfoodItem]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ paddingBottom: totalItems > 0 ? 96 : 0 }}
    >
      {/* navbar */}
      <Navbar />
      {/* category tabs */}
      <CategoryTabs categories={categories} active={active} onSelect={setActive} />


      {/* hero section */}
      <section style={styles.hero}>
        
         {/* top text section */}
        <motion.h1
          style={styles.heroTitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
         
          Everyday tiffin,
          <br />
          cooked like home.
        </motion.h1>
        {/* top section paragraph */}
        <motion.p
          style={styles.heroSub}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Fresh dabbas from our kitchen to your door, in under 40 minutes.
        </motion.p>
      </section>

        {/* food items section */}
      
        <main style={styles.main}>
        {categories.map((cat) => {
          const items = foodItem.filter((f) => f.CATAGORY === cat.id)
          return (
            <section id={`section-${cat.id}`} key={cat.id} style={styles.section}>
              <h2 style={styles.sectionTitle}>{cat.label}</h2>
              <div style={styles.grid}>
                {items.map((item) => (
                  <FoodCard key={item.FID} item={item} />
                ))}
              </div>
            </section>
          )
        })}

      {/* checkout block */}
        <motion.div
          style={styles.checkoutBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 style={styles.checkoutTitle}>Ready to eat?</h3>
            <p style={styles.checkoutSub}>
              {totalItems > 0
                ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart · ₹${subtotal}`
                : 'Your cart is empty — add a dish above to get started.'}
            </p>
          </div>
          <button
            style={{
              ...styles.checkoutBtn,
              opacity: totalItems > 0 ? 1 : 0.4,
              pointerEvents: totalItems > 0 ? 'auto' : 'none',
            }}
            onClick={() => navigate('/order')}
          >
            Go to cart →
          </button>
        </motion.div>
      </main> 
      
    

      <CartBar />
    </motion.div>
  )
}

const styles = {
  hero: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '40px 20px 20px',
  },
  heroTitle: {
    fontSize: 'clamp(30px, 6vw, 46px)',
    lineHeight: 1.08,
    fontWeight: 700,
  },
  heroSub: {
    marginTop: 12,
    fontSize: 15.5,
    color: 'var(--color-ink-soft)',
    maxWidth: 420,
  },
  main: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '10px 20px 40px',
  },
  section: {
    marginTop: 34,
    scrollMarginTop: 120,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '2px solid var(--color-charcoal)',
    display: 'inline-block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: 18,
  },
  checkoutBlock: {
    marginTop: 48,
    background: 'var(--color-charcoal)',
    color: 'var(--color-cream)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 26px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutTitle: {
    color: 'var(--color-cream)',
    fontSize: 22,
  },
  checkoutSub: {
    marginTop: 6,
    fontSize: 13.5,
    color: 'rgba(251,243,231,0.7)',
  },
  checkoutBtn: {
    background: 'var(--color-chili)',
    color: '#fff',
    padding: '14px 26px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
    transition: 'opacity 0.2s ease',
  },
}
