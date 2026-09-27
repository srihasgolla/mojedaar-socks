(function(){
  const KEY='mojedaarCart';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
  const count=c=>c.reduce((n,i)=>n+(Number(i.qty)||0),0);
  const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
  function scrollFix(){
    document.documentElement.style.overflowY='auto';
    document.documentElement.style.overscrollBehavior='auto';
    document.body.style.overflowY='auto';
    document.body.style.overscrollBehavior='auto';
    document.body.style.touchAction='auto';
    const s=document.createElement('style');
    s.textContent='.shop-filter-controls,.filter-controls{display:flex!important;flex-wrap:wrap!important;gap:12px!important;align-items:center!important}.shop-filter-controls>*,.filter-controls>*{min-width:0!important;flex:1 1 220px!important}#product-grid{clear:both!important}@media(max-width:899px){.shop-filter-controls>*,.filter-controls>*{flex-basis:100%!important;width:100%!important}.fixed{max-width:100vw!important}}';
    document.head.appendChild(s);
  }
  function removeBundles(){
    const bad=/bundle|bundles|chaos pack|starter pack|special bundle|bundle booster|save extra/i;
    document.querySelectorAll('button,a,span,p,h1,h2,h3,h4,div,section').forEach(el=>{
      if(el.children.length===0 && bad.test((el.textContent||'').trim())){
        const parent=el.closest('button,a')||el.closest('[class*="card"],section,article')||el;
        if(parent && parent!==document.body) parent.remove();
      }
    });
  }
  function badge(){
    const n=count(get());
    document.querySelectorAll('[data-cart-count],a[data-path="cart"] span.absolute').forEach(el=>{el.textContent=n;el.style.display=n?'flex':'none';});
  }
  function checkout(){
    if(!/Checkout\.html$/i.test(location.pathname)) return;
    const c=get();
    const subtotal=c.reduce((s,i)=>s+(Number(i.price)||0)*(Number(i.qty)||0),0);
    const shipping=subtotal>=999||subtotal===0?0:79;
    const total=subtotal+shipping;
    const stack=document.getElementById('product-stack');
    if(!stack) return;
    stack.innerHTML=c.length?c.map(i=>`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fff;padding:12px;border:2px solid #0f0d5a;border-radius:16px;box-shadow:2px 2px 0 #0f0d5a"><div style="min-width:0"><div style="font-weight:900;color:#0f0d5a">${i.name}</div><div style="font-size:12px;color:#5c3f45">Free Size (UK 6-11) • Qty: ${Number(i.qty)||0}</div></div><strong style="color:#0f0d5a">${money((Number(i.price)||0)*(Number(i.qty)||0))}</strong></div>`).join(''):'<div style="padding:24px;text-align:center;font-weight:900">Your bag is empty. <a href="Shop.html">Shop the sox →</a></div>';
    const card=stack.parentElement;
    [...card.children].forEach((el,idx)=>{ if(idx>1) el.remove(); });
    const calc=document.createElement('div');
    calc.style.cssText='display:flex;flex-direction:column;gap:12px;padding-top:14px;border-top:2px solid rgba(15,13,90,.2);margin-top:14px;color:#0f0d5a;font-weight:800';
    calc.innerHTML=`<div style="display:flex;justify-content:space-between"><span>Item Subtotal (${count(c)} pair${count(c)===1?'':'s'})</span><span>${money(subtotal)}</span></div><div style="display:flex;justify-content:space-between;color:#5c3f45"><span>Discount</span><span>₹0</span></div><div style="display:flex;justify-content:space-between"><span>All-India Express Delivery</span><span style="font-weight:900">${shipping?money(shipping):'FREE'}</span></div><div style="border-top:2px solid #0f0d5a;padding-top:14px;display:flex;justify-content:space-between;font-size:24px;font-weight:900"><span>TOTAL</span><span style="color:#e4006c">${money(total)}</span></div>`;
    card.appendChild(calc);
    const btn=document.createElement('button');
    btn.type='button'; btn.textContent=`PAY ${money(total)} SECURELY NOW 🔒`;
    btn.style.cssText='width:100%;margin-top:16px;padding:16px 20px;border-radius:999px;background:#e4006c;color:#fff;border:3px solid #0f0d5a;box-shadow:4px 4px 0 #0f0d5a;font-weight:900;font-size:18px;cursor:pointer';
    btn.onclick=()=>alert('Payment gateway is not connected yet. Your order total is '+money(total)+'.');
    card.appendChild(btn);
    if(!c.length) btn.disabled=true;
  }
  function run(){scrollFix();badge();removeBundles();checkout();}
  document.addEventListener('DOMContentLoaded',run);
  window.addEventListener('pageshow',run);
})();
