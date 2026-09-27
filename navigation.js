class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-[#FFFDF5] border-b-2 border-on-surface select-none">
        <div class="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          <!-- Brand Logo Left -->
          <a class="flex items-center gap-2 group bg-transparent" data-path="home" href="index.html">
            <img alt="Mojadaar Logo" class="h-14 w-auto object-contain logo-blend-multiply bg-transparent transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2HQ0kKsCeKNkCX_0fJUZmAskngivCrgbK5VyP2nYak61NkCELkXDKEb9beyHPLNrruuPqJoz7x8Gp25f8EuGKoDeLeNNYJhed7HivC3MmxUcbeTlxmtf3gFAaRL1zfQTUvD47kpzzA8wJnmIGUeR3hjtRNUtZ8dhBtS-373Z9ETH_B9T3D97DcRf0vrPuq0hO5dg4RY9xvXl2NCUvDpcBwkom-VinObNVHCrRSSmlfsYkYjSK7Y4eLHjxPPzw1AIP8oU" style="mix-blend-mode: multiply;">
          </a>
          <!-- Center Navigation Links -->
          <nav class="hidden md:flex items-center gap-6 lg:gap-8 font-black uppercase text-sm tracking-wider text-on-surface">
            <a class="hover:text-primary transition-colors cursor-pointer" data-path="shop" href="Shop.html">Shop</a>
            <a class="hover:text-primary transition-colors cursor-pointer" data-path="about" href="index.html#about">About</a>
          </nav>
          <!-- Right Utility Action Circles -->
          <div class="flex items-center gap-3">
            <button aria-label="Search" class="icon-bounce w-11 h-11 rounded-full border-2 border-on-surface bg-[#FFE043] flex items-center justify-center text-on-surface shadow-[2px_2px_0_#0f0d5a]">
              <span class="material-symbols-outlined text-[20px] font-black">search</span>
            </button>
            <button aria-label="Fun Mood" class="icon-bounce w-11 h-11 rounded-full border-2 border-on-surface bg-[#FF7F29] flex items-center justify-center text-xl shadow-[2px_2px_0_#0f0d5a]">
              <span>😎</span>
            </button>
            <a aria-label="Shopping Cart" class="icon-bounce relative w-11 h-11 rounded-full border-2 border-on-surface bg-[#D8005A] flex items-center justify-center text-sticker-white shadow-[2px_2px_0_#0f0d5a] cursor-pointer" data-path="cart" href="Cart.html">
              <span class="material-symbols-outlined text-[20px]">shopping_cart</span>
              <span class="absolute -top-1.5 -right-1.5 bg-[#FFDE00] text-on-surface font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-on-surface shadow-[1px_1px_0_#0f0d5a]">3</span>
            </a>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);
