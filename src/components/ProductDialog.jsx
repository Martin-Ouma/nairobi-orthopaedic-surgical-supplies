import { useState } from 'react';
import { Overlay, Tile, Meter, ChatIcon } from './ui.jsx';
import { LEVELS, FOOT, SIDE, BIZ, waLink, money } from '../data.js';

export default function ProductDialog({ p, onClose, onAdd }) {
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [needSize, setNeedSize] = useState(false);

  function add() {
    if (p.sizes && !size) {
      setNeedSize(true);
      return;
    }
    onAdd(p, size, qty);
    onClose();
  }

  const waMsg = `Hello ${BIZ}, I would like to ask about the ${p.name} (${money(p.price)})${size ? ', size ' + size : ''}.`;
  const sizeLabel = p.sizes === FOOT ? 'Shoe size (EU)' : p.sizes === SIDE ? 'Side' : 'Size';
  const showMeasureHint = p.sizes && p.sizes !== FOOT && p.sizes !== SIDE;

  return (
    <Overlay onClose={onClose} wide labelId="pd-title">
      <div className="pd">
        <Tile p={p} />
        <div className="pd-main">
          <h2 id="pd-title">{p.name}</h2>
          <span className="price" style={{ fontSize: 20 }}>
            {money(p.price)}
          </span>
          <p>{p.desc}</p>
          <dl className="facts">
            <dt>Region</dt>
            <dd>{p.region}</dd>
            <dt>Category</dt>
            <dd>{p.cat}</dd>
            <dt>Details</dt>
            <dd>{p.spec}</dd>
            {p.level && (
              <>
                <dt>Support</dt>
                <dd>
                  <Meter level={p.level} big /> {LEVELS[p.level][0]} · {LEVELS[p.level][1]}
                </dd>
              </>
            )}
          </dl>

          {p.sizes && (
            <div className="stack" style={{ gap: 8 }}>
              <span id="size-l" style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
                {sizeLabel}
              </span>
              <div className="sizes" role="radiogroup" aria-labelledby="size-l">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    className="size"
                    role="radio"
                    aria-checked={size === s}
                    onClick={() => {
                      setSize(s);
                      setNeedSize(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {needSize && <p className="err">Choose a size to continue.</p>}
              {showMeasureHint && (
                <p className="note">
                  Measure around the joint with a soft tape and compare with the size guide on the pack.
                </p>
              )}
            </div>
          )}

          <div className="buyrow">
            <div className="stepper">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button className="btn primary" onClick={add}>
              Add to cart · {money(p.price * qty)}
            </button>
            <a className="btn" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer">
              <ChatIcon />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
