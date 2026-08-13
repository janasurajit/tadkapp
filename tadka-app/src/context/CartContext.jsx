import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import{useFood} from '../hooks/useFood.js'

const CartContext = createContext(null)

const DELIVERY_FEE = 30
const TAX_RATE = 0.05

export function CartProvider({ children }) {
  const { foodItem, handlegetFoodItems,setfoodItem } = useFood()


  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tadka-cart')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [address, setAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('tadka-address')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem('tadka-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (address) localStorage.setItem('tadka-address', JSON.stringify(address))
  }, [address])

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const decreaseFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev }
      if (!next[id]) return prev
      next[id] -= 1
      if (next[id] <= 0) delete next[id]
      return next
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }


  const clearCart = () => setCart({})

  const cartLines = useMemo(() => {
     return Object.entries(cart)
      .map(([id, qty]) => {
        const item = foodItem.find((f) => f.FID == id)
        if (!item) return null
        const price = item.PRICE 
        const name = item.FNAME
        return { ...item, qty, price,name }
      })
      .filter(Boolean)
  }, [cart])

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  )


  const subtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cartLines]
  )

  const deliveryFee = totalItems > 0 ? DELIVERY_FEE : 0
  const tax = Math.round(subtotal * TAX_RATE)
  const total = subtotal + deliveryFee + tax

  const value = {
    cart,
    cartLines,
    totalItems,
    subtotal,
    deliveryFee,
    tax,
    total,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    clearCart,
    address,
    setAddress,
    lastOrder,
    setLastOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
