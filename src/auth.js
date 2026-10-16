/* ---------- auth helpers ---------- */
export async function hashPw(pw,salt){
  try{
    if(window.crypto && crypto.subtle){
      const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+pw));
      return Array.from(new Uint8Array(buf)).map(x=>x.toString(16).padStart(2,'0')).join('');
    }
  }catch(e){}
  return 'b64:'+btoa(unescape(encodeURIComponent(salt+':'+pw)));
}
export const rnd = () => Math.random().toString(36).slice(2,10);
export const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
