import { useEffect, useRef } from 'react';
import { CATKEY, LEVELS } from '../data.js';

function Icon({ d }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const PhoneIcon = () => (
  <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
);

export const ChatIcon = () => (
  <Icon d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
);

export function Bone({ style }) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true" style={style}>
      <g fill="currentColor">
        <rect x="22" y="14" width="76" height="12" rx="6" />
        <circle cx="18" cy="12" r="10" />
        <circle cx="18" cy="28" r="10" />
        <circle cx="102" cy="12" r="10" />
        <circle cx="102" cy="28" r="10" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <rect x="1" y="1" width="32" height="32" rx="9" fill="currentColor" />
      <g fill="var(--surface)" transform="rotate(-45 17 17)">
        <rect x="8" y="15" width="18" height="4" rx="2" />
        <circle cx="8" cy="14" r="3.2" />
        <circle cx="8" cy="20" r="3.2" />
        <circle cx="26" cy="14" r="3.2" />
        <circle cx="26" cy="20" r="3.2" />
      </g>
    </svg>
  );
}

export function Meter({ level, big }) {
  return (
    <span
      className={'meter' + (big ? ' big' : '')}
      role="img"
      aria-label={`Support level ${level} of 4, ${LEVELS[level][0]}`}
    >
      {[1, 2, 3, 4].map((n) => (
        <i key={n} className={n <= level ? 'on' : ''} />
      ))}
    </span>
  );
}

export function Tile({ p, onClick, label }) {
  const inner = (
    <>
      <Bone />
      <span className="region">{p.region}</span>
      {p.level ? (
        <span className="lvl">
          <Meter level={p.level} />
        </span>
      ) : (
        <span className="spec-chip">{p.cat}</span>
      )}
    </>
  );
  const cls = 'tile t-' + CATKEY[p.cat];
  if (onClick) {
    return (
      <button className={cls} onClick={onClick} aria-label={label}>
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function Overlay({ onClose, children, wide, labelId }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);
  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={'dialog' + (wide ? ' wide' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        ref={ref}
      >
        <button className="x" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
