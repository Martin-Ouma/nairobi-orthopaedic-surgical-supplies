/* ---------- storage (per browser) ---------- */
const mem = {};
export const store = {
  get(k,d){ try{ const v=localStorage.getItem(k); if(v!==null) return JSON.parse(v); }catch(e){} return (k in mem)?mem[k]:d; },
  set(k,v){ mem[k]=v; try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
};
