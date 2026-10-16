import { Tile } from './ui.jsx';
import { money } from '../data.js';

export default function Card({ p, onOpen, onAdd }) {
  return (
    <article className="card">
      <Tile p={p} onClick={() => onOpen(p.id)} label={'View ' + p.name} />
      <div className="card-body">
        <h3>
          <button onClick={() => onOpen(p.id)}>{p.name}</button>
        </h3>
        <p>{p.desc}</p>
        <div className="card-foot">
          <span className="price">{money(p.price)}</span>
          {p.sizes ? (
            <button className="btn small" onClick={() => onOpen(p.id)}>
              Choose size
            </button>
          ) : (
            <button className="btn small primary" onClick={() => onAdd(p, null, 1)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
