import { useState } from 'react';
import { Bone } from './ui.jsx';
import { store } from '../storage.js';
import { byId, money, waLink, BIZ, CATKEY, FREE_OVER, FEE } from '../data.js';

export default function CartDrawer({ cart, setCart, user, onClose, onNeedAuth }) {
  const [step, setStep] = useState('cart');
  const [placed, setPlaced] = useState(null);
  const [form, setForm] = useState({ phone: '', address: '', town: '', pay: 'mpesa' });
  const [err, setErr] = useState('');

  const lines = cart.map((c) => ({ c, p: byId(c.id) })).filter((x) => x.p);
  const subtotal = lines.reduce((s, x) => s + x.p.price * x.c.qty, 0);
  const fee = subtotal === 0 || subtotal >= FREE_OVER ? 0 : FEE;
  const total = subtotal + fee;
  const count = lines.reduce((s, x) => s + x.c.qty, 0);
  const firstName = user ? user.name.split(' ')[0] : '';

  const setQty = (key, q) =>
    setCart(cart.map((c) => (c.key === key ? { ...c, qty: Math.max(1, Math.min(10, q)) } : c)));
  const remove = (key) => setCart(cart.filter((c) => c.key !== key));
  const field = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function toCheckout() {
    if (!user) return onNeedAuth();
    setStep('checkout');
  }

  function placeOrder(e) {
    e.preventDefault();
    if (form.phone.trim().length < 9 || form.address.trim().length < 4 || form.town.trim().length < 2) {
      setErr('Fill in phone, street address and town so we can deliver.');
      return;
    }
    const order = {
      id: 'NO-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      count,
      total,
      items: lines.map((x) => ({ name: x.p.name, size: x.c.size, qty: x.c.qty, price: x.p.price })),
      address: form.address + ', ' + form.town,
      pay: form.pay,
    };
    const all = store.get('ortho_orders', {});
    all[user.email] = (all[user.email] || []).concat([order]);
    store.set('ortho_orders', all);
    setCart([]);
    setPlaced(order);
    setStep('done');
  }

  let title = 'Your cart';
  let body;
  let foot = null;

  if (step === 'done' && placed) {
    title = 'Order placed';
    body = (
      <div className="done">
        <div className="tick">✓</div>
        <h3 style={{ margin: '0 0 6px', fontSize: 20, fontFamily: 'var(--display)' }}>Thank you, {firstName}</h3>
        <p style={{ margin: '0 0 4px' }}>
          Order <b>{placed.id}</b> for <b>{money(placed.total)}</b>
        </p>
        <p className="note" style={{ marginBottom: 18 }}>
          Pay on delivery by {placed.pay === 'mpesa' ? 'M-Pesa' : 'card'}. This is a demo shop, so nothing was
          charged and no delivery is scheduled.
        </p>
        <button className="btn primary" onClick={onClose}>
          Keep browsing
        </button>
      </div>
    );
  } else if (step === 'checkout') {
    title = 'Delivery';
    body = (
      <form id="co-form" className="stack" onSubmit={placeOrder} noValidate style={{ paddingTop: 12 }}>
        <div className="field">
          <label htmlFor="co-phone">Phone number</label>
          <input id="co-phone" className="input" type="tel" autoComplete="tel" value={form.phone} onChange={field('phone')} />
        </div>
        <div className="field">
          <label htmlFor="co-addr">Street address</label>
          <input id="co-addr" className="input" autoComplete="street-address" value={form.address} onChange={field('address')} />
        </div>
        <div className="field">
          <label htmlFor="co-town">Town</label>
          <input id="co-town" className="input" autoComplete="address-level2" value={form.town} onChange={field('town')} />
        </div>
        <div className="stack" style={{ gap: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>Payment on delivery</span>
          <label className="radio">
            <input type="radio" name="pay" checked={form.pay === 'mpesa'} onChange={() => setForm({ ...form, pay: 'mpesa' })} />
            <span>
              <b>M-Pesa</b>
              <small style={{ display: 'block', color: 'var(--muted)' }}>Pay the rider from your phone</small>
            </span>
          </label>
          <label className="radio">
            <input type="radio" name="pay" checked={form.pay === 'card'} onChange={() => setForm({ ...form, pay: 'card' })} />
            <span>
              <b>Card</b>
              <small style={{ display: 'block', color: 'var(--muted)' }}>Rider brings a card machine</small>
            </span>
          </label>
        </div>
        {err && (
          <p className="err" role="alert">
            {err}
          </p>
        )}
      </form>
    );
    foot = (
      <div className="sums">
        <div>
          <span>Total</span>
          <span className="num">{money(total)}</span>
        </div>
        <button type="submit" form="co-form" className="btn primary block">
          Place order
        </button>
        <button className="btn block" onClick={() => setStep('cart')}>
          Back to cart
        </button>
      </div>
    );
  } else if (!lines.length) {
    body = (
      <div className="done">
        <p style={{ margin: '0 0 14px', color: 'var(--muted)' }}>
          Your cart is empty. Pick a joint above to see what supports it.
        </p>
        <button className="btn primary" onClick={onClose}>
          Browse products
        </button>
      </div>
    );
  } else {
    body = (
      <div>
        {lines.map(({ c, p }) => (
          <div className="line" key={c.key}>
            <div className={'mini t-' + CATKEY[p.cat]}>
              <Bone />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3>{p.name}</h3>
              <div className="meta">
                {c.size ? `Size ${c.size} · ` : ''}
                {money(p.price)}
              </div>
              <div className="stepper">
                <button onClick={() => setQty(c.key, c.qty - 1)} aria-label={'Decrease quantity of ' + p.name}>
                  −
                </button>
                <span>{c.qty}</span>
                <button onClick={() => setQty(c.key, c.qty + 1)} aria-label={'Increase quantity of ' + p.name}>
                  +
                </button>
              </div>
            </div>
            <div className="right">
              <span className="price">{money(p.price * c.qty)}</span>
              <button className="rm" onClick={() => remove(c.key)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
    const cartMsg =
      `Hello ${BIZ}, I would like to order:\n` +
      lines.map((x) => `- ${x.p.name}${x.c.size ? ` (${x.c.size})` : ''} x ${x.c.qty}: ${money(x.p.price * x.c.qty)}`).join('\n') +
      `\nTotal: ${money(total)}. Please confirm availability and delivery.`;
    foot = (
      <div className="sums">
        <div>
          <span>Subtotal</span>
          <span className="num">{money(subtotal)}</span>
        </div>
        <div>
          <span>Delivery</span>
          <span className="num">{fee === 0 ? 'Free' : money(fee)}</span>
        </div>
        {subtotal < FREE_OVER && <p className="note">Add {money(FREE_OVER - subtotal)} more for free delivery.</p>}
        <div className="total">
          <span>Total</span>
          <span className="num">{money(total)}</span>
        </div>
        <button className="btn primary block" onClick={toCheckout}>
          {user ? 'Checkout' : 'Sign in to checkout'}
        </button>
        <p className="note">
          Prefer to order by chat?{' '}
          <a className="linkish" href={waLink(cartMsg)} target="_blank" rel="noopener noreferrer">
            Send this cart on WhatsApp
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      className="drawer-wrap"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <h2>
            {title}
            {step === 'cart' && count ? ` (${count})` : ''}
          </h2>
          <button className="x" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </header>
        <div className="drawer-body">{body}</div>
        {foot}
      </div>
    </div>
  );
}
