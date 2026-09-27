(()=>{
if(window.__MOJEDAAR_STORE_V6__)return;window.__MOJEDAAR_STORE_V6__=1;
const KEY='mojedaarCart',SHIP=79,FREE=999;
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const cart=()=>{try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch{return[]}};
const totalQty=()=>cart().reduce((n,i)=>n+(Number(i.qty)||0),0);
const money=n=>'₹'+Math.round(Number(n)||0).toLocaleString('en-IN');
function save(c){localStorage.setItem(KEY,JSON.stringify(c));updateBadge();window.dispatchEvent(new CustomEvent('mojedaar-cart-updated'))}
function updateBadge(){const n=totalQty();qsa('[data-cart-count],.cart-count,.cart-badge,a[data-path="cart"] .absolute').forEach(el=>{el.textContent=n;el.style.display=n?'flex':'none'})}
function toast(text){let el=qs('#moj-toast');if(!el){el=document.createElement('div');el.id='moj-toast';el.style.cssText='position:fixed;right:20px;bottom:20px;z-index:999999;background:#e4006c;color:#fff;border:3px solid #0f0d5a;border-radius:18px;padding:14px 18px;font:800 15px Rubik,Fredoka,sans-serif;box-shadow:5px 5px 0 #0f0d5a';document.body.appendChild(el)}el.textContent=text;el.style.display='block';clearTimeout(el._timer);el._timer=setTimeout(()=>el.style.display='none',1700)}
function numberFromText(text){const m=String(text||'').replace(/,/g,'').match(/₹\s*([0-9]+(?:\.[0-9]+)?)/);return m?Number(m[1]):0}
function productFromButton(btn){
 let node=btn, candidate=null;
 for(let i=0;i<12&&node;i++,node=node.parentElement){
   const txt=node.innerText||'';
   if(node.querySelector?.('img') && /₹\s*\d/.test(txt)) {candidate=node;break}
 }
 const root=candidate||btn.closest('article')||btn.parentElement||document.body;
 const headings=qsa('h1,h2,h3,h4,h5',root).map(x=>(x.textContent||'').replace(/\s+/g,' ').trim()).filter(x=>x&&!/^(SHOP|FILTER|SORT|ADD|NEW)$/i.test(x));
 const img=qs('img',root);
 let name=(btn.dataset.product||root.dataset?.product||headings[headings.length-1]||img?.alt||document.title||'Mojedaar Sox').replace(/\s+/g,' ').trim();
 if(/^(Mojadaar|Mojedaar)\s*[—-]/i.test(name))name=name.replace(/^.*?[—-]\s*/,'').trim();
 const price=Number(btn.dataset.price||root.dataset?.price)||numberFromText(root.innerText)||numberFromText(document.body.innerText)||449;
 return {id:name+'|'+price,name,price,img:img?.src||''};
}
function add(item,qty){const c=cart(),found=c.find(x=>x.id===item.id);qty=Math.max(1,Number(qty)||1);if(found)found.qty=Math.min(99,(Number(found.qty)||0)+qty);else c.push({...item,qty});save(c);toast(item.name+' added to bag 🧦')}
function looksLikeAdd(btn){const t=(btn.innerText||btn.textContent||'').replace(/\s+/g,' ').trim().toUpperCase();return /^(ADD|ADD TO BAG|ADD TO CART|ADD ALL 3 TO BAG)(\b|\s)/.test(t)||t==='ADD'}
function installAddInterceptor(){
 document.addEventListener('click',e=>{
   const btn=e.target.closest('button,a');if(!btn||!looksLikeAdd(btn))return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const qty=/ADD ALL 3/i.test(btn.textContent||'')?3:1;
   const item=productFromButton(btn);add(item,qty);
   const old=btn.innerHTML;btn.innerHTML='✓ ADDED!';btn.disabled=true;
   setTimeout(()=>{btn.innerHTML=old;btn.disabled=false},1100);
 },true);
}
function renderCart(){
 if(!/\/Cart\.html$/i.test(location.pathname))return;
 const main=qs('main');if(!main)return;
 const draw=()=>{
  const c=cart(),sub=c.reduce((s,i)=>s+(Number(i.price)||0)*(Number(i.qty)||0),0),ship=sub===0?0:(sub>=FREE?0:SHIP),grand=sub+ship;
  main.innerHTML=`<section class="moj-cart-page"><div class="moj-cart-head"><div><span class="moj-pill">YOUR SOX BAG 🛒</span><h1>${c.length?'SOCKS READY TO ROLL.':'YOUR BAG IS EMPTY.'}</h1><p>${c.length?'Your selected socks are waiting for you.':'Go pick some ridiculous socks first.'}</p></div><a class="moj-back" href="Shop.html">← CONTINUE SHOPPING</a></div>${c.length?`<div class="moj-cart-layout"><div class="moj-items">${c.map((i,index)=>`<article class="moj-item"><div class="moj-item-info"><div class="moj-img-wrap">${i.img?`<img src="${i.img}" alt="${i.name.replace(/"/g,'&quot;')}">`:''}</div><div><h2>${i.name}</h2><p>${money(i.price)} each</p></div></div><div class="moj-item-actions"><div class="moj-qty"><button data-dec="${index}" aria-label="Decrease">−</button><strong>${i.qty}</strong><button data-inc="${index}" aria-label="Increase">+</button></div><button class="moj-remove" data-remove="${index}">REMOVE</button><strong class="moj-line-total">${money((Number(i.price)||0)*(Number(i.qty)||0))}</strong></div></article>`).join('')}</div><aside class="moj-summary"><span class="moj-pill">ORDER TOTAL</span><div class="moj-row"><span>Subtotal</span><strong>${money(sub)}</strong></div><div class="moj-row"><span>Shipping</span><strong>${ship?'₹'+ship:'FREE'}</strong></div>${sub>0&&sub<FREE?`<div class="moj-free">Add ${money(FREE-sub)} more for FREE shipping.</div>`:''}<div class="moj-total"><span>TOTAL</span><strong>${money(grand)}</strong></div><a class="moj-checkout" href="Checkout.html">CHECKOUT →</a><p class="moj-secure">🔒 Secure checkout · Made in India</p></aside></div>`:`<div class="moj-empty"><div>🧦</div><h2>NO SOX, NO GLORY.</h2><p>Your bag is waiting for some personality.</p><a class="moj-checkout moj-shop" href="Shop.html">SHOP THE SOX</a></div>`}</section>`;
  qsa('[data-inc]',main).forEach(b=>b.onclick=()=>{const a=cart(),i=a[+b.dataset.inc];if(i){i.qty=Math.min(99,(Number(i.qty)||0)+1);save(a);draw()}});
  qsa('[data-dec]',main).forEach(b=>b.onclick=()=>{const a=cart(),idx=+b.dataset.dec,i=a[idx];if(i){i.qty=(Number(i.qty)||0)-1;if(i.qty<=0)a.splice(idx,1);save(a);draw()}});
  qsa('[data-remove]',main).forEach(b=>b.onclick=()=>{const a=cart();a.splice(+b.dataset.remove,1);save(a);draw()});
 };
 if(!qs('#moj-cart-css')){const s=document.createElement('style');s.id='moj-cart-css';s.textContent=`.moj-cart-page{max-width:1180px;margin:0 auto;padding:48px 20px 90px;color:#0f0d5a;font-family:Rubik,Fredoka,sans-serif}.moj-cart-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:30px}.moj-pill{display:inline-flex;background:#ffd928;border:3px solid #0f0d5a;border-radius:999px;padding:8px 15px;font-weight:900;letter-spacing:.03em}.moj-cart-head h1{font-family:'Archivo Black',sans-serif;font-size:clamp(38px,6vw,68px);line-height:.95;margin:15px 0 8px;text-transform:uppercase}.moj-cart-head p{font-size:18px;font-weight:600;margin:0}.moj-back{border:3px solid #0f0d5a;border-radius:999px;padding:12px 18px;font-weight:900;color:#0f0d5a;text-decoration:none;background:#fff}.moj-cart-layout{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:26px;align-items:start}.moj-items{display:flex;flex-direction:column;gap:16px}.moj-item{background:#fff;border:3px solid #0f0d5a;border-radius:22px;padding:18px;box-shadow:5px 5px 0 #0f0d5a;display:flex;align-items:center;justify-content:space-between;gap:20px}.moj-item-info{display:flex;align-items:center;gap:16px;min-width:0}.moj-img-wrap{width:92px;height:92px;flex:0 0 92px;border-radius:16px;background:#fff7d6;border:2px solid #0f0d5a;display:grid;place-items:center;overflow:hidden}.moj-img-wrap img{width:100%;height:100%;object-fit:contain}.moj-item h2{font-family:'Archivo Black',sans-serif;font-size:20px;line-height:1.05;text-transform:uppercase;margin:0 0 7px}.moj-item p{margin:0;font-weight:800}.moj-item-actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end}.moj-qty{display:flex;align-items:center;border:3px solid #0f0d5a;border-radius:999px;overflow:hidden;background:#fff}.moj-qty button{border:0;background:#ffd928;width:38px;height:38px;font-size:23px;font-weight:900;cursor:pointer}.moj-qty strong{min-width:38px;text-align:center}.moj-remove{border:2px solid #0f0d5a;border-radius:999px;background:#e4006c;color:#fff;padding:9px 13px;font-weight:900;cursor:pointer}.moj-line-total{min-width:80px;text-align:right;font-size:18px}.moj-summary{background:#fff7d6;border:3px solid #0f0d5a;border-radius:22px;padding:24px;box-shadow:5px 5px 0 #0f0d5a;position:sticky;top:150px}.moj-row,.moj-total{display:flex;justify-content:space-between;gap:15px}.moj-row{margin:17px 0;font-weight:700}.moj-total{border-top:2px solid #0f0d5a;margin-top:20px;padding-top:20px;font-size:25px;font-weight:900}.moj-free{background:#fff;border:2px dashed #0f0d5a;border-radius:12px;padding:10px;margin:14px 0;font-weight:800}.moj-checkout{display:block;text-align:center;background:#e4006c;color:#fff;border:3px solid #0f0d5a;border-radius:999px;padding:15px 18px;margin-top:20px;text-decoration:none;font-weight:900;font-size:17px;box-shadow:3px 3px 0 #0f0d5a}.moj-secure{text-align:center;font-size:12px;font-weight:700;margin:14px 0 0}.moj-empty{max-width:700px;margin:30px auto;background:#fff;border:3px solid #0f0d5a;border-radius:25px;box-shadow:6px 6px 0 #0f0d5a;padding:55px 25px;text-align:center}.moj-empty>div{font-size:70px}.moj-empty h2{font-family:'Archivo Black',sans-serif;font-size:34px;margin:12px 0}.moj-empty p{font-size:18px;font-weight:600}.moj-shop{max-width:260px;margin:22px auto 0}@media(max-width:850px){.moj-cart-layout{grid-template-columns:1fr}.moj-summary{position:static}.moj-item{align-items:flex-start;flex-direction:column}.moj-item-actions{width:100%;justify-content:flex-start}.moj-line-total{margin-left:auto}.moj-cart-page{padding-top:30px}}@media(max-width:520px){.moj-item-info{align-items:flex-start}.moj-img-wrap{width:70px;height:70px;flex-basis:70px}.moj-item h2{font-size:16px}.moj-item-actions{gap:8px}.moj-line-total{width:100%;text-align:left}.moj-cart-head h1{font-size:40px}}`;document.head.appendChild(s)}
 draw();window.addEventListener('mojedaar-cart-updated',draw)
}
function fixLinks(){const routes={home:'index.html',shop:'Shop.html','new-drops':'Shop.html',ankle:'Shop.html',crew:'Shop.html','no-show':'Shop.html',cart:'Cart.html',checkout:'Checkout.html'};qsa('[data-path]').forEach(a=>{const p=a.getAttribute('data-path');if(routes[p])a.setAttribute('href',routes[p])})}
function boot(){fixLinks();updateBadge();installAddInterceptor();renderCart()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();window.addEventListener('storage',updateBadge);window.addEventListener('pageshow',updateBadge);
})();