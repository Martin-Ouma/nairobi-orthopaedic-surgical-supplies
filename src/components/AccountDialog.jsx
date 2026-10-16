import { Overlay } from './ui.jsx';
import { store } from '../storage.js';
import { money } from '../data.js';

export default function AccountDialog({ user, onClose, onSignOut }) {
  const all = store.get('ortho_orders', {});
  const orders = (all[user.email] || []).slice().reverse();

  return (
    <Overlay onClose={onClose} labelId="acct-title">
      <h2 id="acct-title">Hello, {user.name.split(' ')[0]}</h2>
      <p className="sub">{user.email}</p>
      <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Your orders</h3>
      {orders.length ? (
        <ul className="orders">
          {orders.map((o) => (
            <li key={o.id}>
              <div>
                <span className="mono">{o.id}</span>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {new Date(o.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' · '}
                  {o.count} {o.count === 1 ? 'item' : 'items'}
                </div>
              </div>
              <span className="mono">{money(o.total)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="note">No orders yet. Items you buy will appear here.</p>
      )}
      <div style={{ marginTop: 18 }}>
        <button className="btn" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </Overlay>
  );
}
