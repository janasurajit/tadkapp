# Tadka — food ordering app

A React + Vite food-ordering front end: browse by category, add dishes to
cart, review your order, enter a delivery address, and pay with Google Pay
(or card).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173) — resize
your browser or open dev tools' device toolbar to see the mobile layout.

## Pages

- **`/`** — Home: sticky nav with category chips, food grid (image, name,
  description, price, add-to-cart), sticky ticket-style cart bar + a
  "Go to cart" block at the bottom of the page.
- **`/order`** — Cart review, quantity editing, and a delivery-details form
  (name, phone, address, city, pincode, instructions). "Place order"
  validates the form and moves to payment.
- **`/payment`** — Order summary + delivery address recap, a real **Google
  Pay button** (via Google's official Payments Web API, `environment:
  'TEST'`) plus a card fallback, and an animated order-confirmation screen.

## About the Google Pay integration

`src/components/GooglePayButton.jsx` uses Google's actual Payments API
(`pay.js`, loaded in `index.html`) wired to Google's `TEST` environment and
the `example` tokenization gateway that Google publishes specifically for
integration testing — so the button renders and the payment sheet opens for
real, with test card data.

To accept real payments in production:
1. [Register as a Google Pay merchant](https://pay.google.com/business/console) and get a `merchantId`.
2. Get a `gatewayMerchantId` from your payment processor (Stripe, Razorpay, etc. all support Google Pay).
3. In `GooglePayButton.jsx`, set `environment: 'PRODUCTION'` and replace the placeholder `merchantId` / `gatewayMerchantId`.
4. Send the returned payment token to your backend to actually charge it — this demo only simulates a successful charge client-side.

## Stack

- React 18 + React Router
- Vite
- Framer Motion (page transitions, scroll reveals, cart micro-interactions)
- Plain CSS with design tokens in `src/index.css` (no UI framework)

## Project structure

```
src/
  components/   Navbar, CategoryTabs, FoodCard, CartBar, GooglePayButton
  context/      CartContext.jsx — cart + address global state
  data/         foodData.js — menu items & categories
  pages/        Home.jsx, Order.jsx, Payment.jsx
  index.css     design tokens, base styles, animations
```
