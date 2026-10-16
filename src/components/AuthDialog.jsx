import { useState } from 'react';
import { Overlay } from './ui.jsx';
import { store } from '../storage.js';
import { hashPw, rnd, validEmail } from '../auth.js';

const DEMO = { name: 'Demo Customer', email: 'demo@nairobiortho.example', pw: 'demo1234' };

export default function AuthDialog({ reason, onClose, onDone }) {
  const [mode, setMode] = useState('in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function signIn(em, pass) {
    const users = store.get('ortho_users', []);
    const found = users.find((u) => u.email === em);
    if (!found) {
      setErr('No account found for this email. Create one first.');
      return;
    }
    const hash = await hashPw(pass, found.salt);
    if (hash !== found.hash) {
      setErr('Incorrect password. Check it and try again.');
      return;
    }
    store.set('ortho_session', em);
    onDone({ name: found.name, email: found.email });
  }

  async function register(nm, em, pass) {
    const users = store.get('ortho_users', []);
    if (users.find((u) => u.email === em)) {
      setErr('An account with this email already exists. Sign in instead.');
      return;
    }
    const salt = rnd();
    const hash = await hashPw(pass, salt);
    users.push({ name: nm, email: em, salt, hash });
    store.set('ortho_users', users);
    store.set('ortho_session', em);
    onDone({ name: nm, email: em });
  }

  async function submit(e) {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    const nm = name.trim();
    setErr('');
    if (mode === 'up' && nm.length < 2) return setErr('Enter your full name.');
    if (!validEmail(em)) return setErr('Enter a valid email address, like name@example.com.');
    if (pw.length < 8) return setErr('Password must be at least 8 characters.');
    setBusy(true);
    try {
      if (mode === 'up') await register(nm, em, pw);
      else await signIn(em, pw);
    } finally {
      setBusy(false);
    }
  }

  async function useDemo() {
    setBusy(true);
    const users = store.get('ortho_users', []);
    if (!users.find((u) => u.email === DEMO.email)) {
      const salt = rnd();
      const hash = await hashPw(DEMO.pw, salt);
      users.push({ name: DEMO.name, email: DEMO.email, salt, hash });
      store.set('ortho_users', users);
    }
    await signIn(DEMO.email, DEMO.pw);
    setBusy(false);
  }

  function switchMode(m) {
    setMode(m);
    setErr('');
  }

  return (
    <Overlay onClose={onClose} labelId="auth-title">
      <h2 id="auth-title">{mode === 'in' ? 'Sign in' : 'Create account'}</h2>
      <p className="sub" style={{ marginBottom: 0 }}>
        {reason || 'Save your cart, track orders and check out faster.'}
      </p>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={mode === 'in'} onClick={() => switchMode('in')}>
          Sign in
        </button>
        <button role="tab" aria-selected={mode === 'up'} onClick={() => switchMode('up')}>
          Create account
        </button>
      </div>
      <form className="stack" onSubmit={submit} noValidate>
        {mode === 'up' && (
          <div className="field">
            <label htmlFor="au-name">Full name</label>
            <input id="au-name" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="field">
          <label htmlFor="au-email">Email</label>
          <input id="au-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="au-pw">Password</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="au-pw"
              className="input"
              type={show ? 'text' : 'password'}
              autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button type="button" className="btn small" aria-pressed={show} onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {err && (
          <p className="err" role="alert">
            {err}
          </p>
        )}
        <button type="submit" className="btn primary block" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}
        </button>
        <p className="note">
          Accounts are stored in this browser only, so you will not see them on another device.{' '}
          <button type="button" className="linkish" onClick={useDemo}>
            Use a demo account
          </button>
        </p>
      </form>
    </Overlay>
  );
}
