import { useEffect, useMemo, useRef, useState } from 'react';
import Card from './components/Card.jsx';
import ProductDialog from './components/ProductDialog.jsx';
import AuthDialog from './components/AuthDialog.jsx';
import AccountDialog from './components/AccountDialog.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { Logo, Meter, PhoneIcon, ChatIcon } from './components/ui.jsx';
import { store } from './storage.js';
import { PRODUCTS, REGIONS, CATS, LEVELS, FREE_OVER, CONTACT, BIZ, waLink, money, byId } from './data.js';

function loadUser() {
  const email = store.get('ortho_session', null);
  const u = store.get('ortho_users', []).find((x) => x.email === email);
  return u ? { name: u.name, email: u.email } : null;
}

export default function App() {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('All');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(() => store.get('ortho_cart', []).filter((c) => byId(c.id)));
  const [user, setUser] = useState(loadUser);
  const [modal, setModal] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => {
    store.set('ortho_cart', cart);
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = modal || cartOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (modal) setModal(null);
      else setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, cartOpen]);

  function say(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  }

  function addToCart(p, size, qty) {
    const key = p.id + '|' + (size || '');
    setCart((cur) => {
      const hit = cur.find((c) => c.key === key);
      if (hit) return cur.map((c) => (c.key === key ? { ...c, qty: Math.min(10, c.qty + qty) } : c));
      return cur.concat([{ key, id: p.id, size, qty }]);
    });
    say(p.name + ' added to cart');
  }

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = PRODUCTS.filter(
      (p) =>
        (region === 'All' || p.region === region) &&
        (cat === 'All' || p.cat === cat) &&
        (!s || (p.name + ' ' + p.desc + ' ' + p.region + ' ' + p.cat).toLowerCase().includes(s))
    );
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'support') r = [...r].sort((a, b) => (b.level || 0) - (a.level || 0));
    return r;
  }, [q, region, cat, sort]);

  const count = cart.reduce((s, c) => s + c.qty, 0);
  const openProduct = modal && modal.type === 'product' ? byId(modal.id) : null;

  return (
    <div>
      <header className="top">
        <div className="wrap">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Nairobi Orthopaedic and Surgical Supplies, back to top"
          >
            <Logo />
            <div>
              <b>Nairobi Orthopaedic</b>
              <small>&amp; Surgical Supplies</small>
            </div>
          </button>
          <a className="btn contact" href={'tel:' + CONTACT.tel} title={'Call ' + CONTACT.display} aria-label={'Call ' + CONTACT.display}>
            <PhoneIcon />
            <span className="lbl">Call</span>
          </a>
          <a
            className="btn wa"
            href={waLink('Hello ' + BIZ + ', I would like some help with an order.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <ChatIcon />
            <span className="lbl">WhatsApp</span>
          </a>
          {user ? (
            <button className="btn" onClick={() => setModal({ type: 'account' })}>
              Hi, {user.name.split(' ')[0]}
            </button>
          ) : (
            <button className="btn" onClick={() => setModal({ type: 'auth' })}>
              Sign in
            </button>
          )}
          <button className="btn primary" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}>
            Cart <span className="badge">{count}</span>
          </button>
        </div>
      </header>

      <section className="wrap hero">
        <div className="hero-row">
          <div className="hero-copy">
            <h1>Orthopaedic care, joint by joint.</h1>
            <p>
              Braces, mobility aids, insoles and recovery tools for every stage of an injury, from the first week
              to getting back to normal.
            </p>
          </div>
          <div className="levels">
            <h2>Support level guide</h2>
            <ol>
              {[1, 2, 3, 4].map((n) => (
                <li key={n}>
                  <Meter level={n} />
                  <span>
                    <b>{LEVELS[n][0]} </b>
                    {LEVELS[n][1]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap filters">
        <div className="chips" role="group" aria-label="Filter by body region">
          {['All', ...REGIONS].map((r) => (
            <button key={r} className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
              {r}
            </button>
          ))}
        </div>
        <div className="controls">
          <div className="field grow">
            <label htmlFor="f-q">Search</label>
            <input
              id="f-q"
              className="input"
              type="search"
              placeholder="Knee brace, crutches, insoles…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="f-cat">Category</label>
            <select id="f-cat" className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="All">All categories</option>
              {CATS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-sort">Sort by</label>
            <select id="f-sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="support">Support level: firmest first</option>
            </select>
          </div>
        </div>
      </section>

      <main className="wrap">
        <div className="count" aria-live="polite">
          {list.length} {list.length === 1 ? 'product' : 'products'}
        </div>
        <div className="grid">
          {list.length ? (
            list.map((p) => <Card key={p.id} p={p} onOpen={(id) => setModal({ type: 'product', id })} onAdd={addToCart} />)
          ) : (
            <div className="empty">
              Nothing matches those filters.{' '}
              <button
                className="linkish"
                onClick={() => {
                  setQ('');
                  setRegion('All');
                  setCat('All');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="wrap">
          <p style={{ margin: 0 }}>
            <b>Nairobi Orthopaedic &amp; Surgical Supplies</b> is a demo storefront. Prices are shown in Kenya shillings, free delivery over{' '}
            {money(FREE_OVER)}.
          </p>
          <p style={{ margin: 0 }}>
            Call or WhatsApp:{' '}
            <a href={'tel:' + CONTACT.tel} style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {CONTACT.display}
            </a>
            {' · '}
            <a
              href={waLink('Hello ' + BIZ + ', I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 600 }}
            >
              Open WhatsApp chat
            </a>
          </p>
          <p style={{ margin: 0 }}>
            Supports and braces do not replace a diagnosis. Ask your physiotherapist or orthopaedic surgeon which
            support level suits your injury.
          </p>
        </div>
      </footer>

      {openProduct && <ProductDialog p={openProduct} onClose={() => setModal(null)} onAdd={addToCart} />}

      {modal && modal.type === 'auth' && (
        <AuthDialog
          reason={modal.reason}
          onClose={() => setModal(null)}
          onDone={(u) => {
            const resume = modal.resume;
            setUser(u);
            setModal(null);
            say('Signed in as ' + u.name.split(' ')[0]);
            if (resume) setCartOpen(true);
          }}
        />
      )}

      {modal && modal.type === 'account' && user && (
        <AccountDialog
          user={user}
          onClose={() => setModal(null)}
          onSignOut={() => {
            store.set('ortho_session', null);
            setUser(null);
            setModal(null);
            say('Signed out');
          }}
        />
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          user={user}
          onClose={() => setCartOpen(false)}
          onNeedAuth={() => {
            setCartOpen(false);
            setModal({
              type: 'auth',
              reason: 'Sign in or create an account to place your order. Your cart is kept.',
              resume: true,
            });
          }}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
