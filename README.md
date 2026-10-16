# Nairobi Orthopaedic & Surgical Supplies

A React (JSX) storefront for orthopaedic care products: 34 items across seven body regions and five product groups, a cart, a demo checkout, and sign in / create account.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  main.jsx                   entry point
  App.jsx                    page layout, filters, cart and modal state
  data.js                    product catalogue, regions, support levels, pricing helpers
  storage.js                 localStorage wrapper with in-memory fallback
  auth.js                    password hashing and email validation
  styles.css                 design tokens (light and dark) and all styles
  components/
    ui.jsx                   Bone, Logo, Meter, Tile, Overlay
    Card.jsx                 product card
    ProductDialog.jsx        product detail, size and quantity
    AuthDialog.jsx           sign in / create account
    AccountDialog.jsx        account and order history
    CartDrawer.jsx           cart, delivery form, order confirmation
```

## Notes

- Accounts, carts and orders are saved in the browser (localStorage) only. This is a front-end demo, not a real login system.
- No payment is taken. To go live, add a backend for accounts and orders and a payment provider (for example M-Pesa Daraja).
- Demo account: `demo@nairobiortho.example` / `demo1234` (also available from the sign-in dialog).
- Prices are in Kenya shillings (KES). Edit `src/data.js` to change products or currency.
