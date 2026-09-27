class GlobalHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <!-- Logo -->
          <a href="index.html" class="logo">Mojedaar</a>

          <!-- Navigation Links -->
          <nav class="nav-menu">
            <a href="index.html">Home</a>
            <a href="Shop.html">Shop</a>
            <a href="Cart.html">Cart</a>
            <a href="Checkout.html">Checkout</a>
          </nav>

          <!-- Cart Icon / Total (Optional) -->
          <div class="header-actions">
            <a href="Cart.html" class="cart-link">
              🛒 Cart (<span id="global-cart-count">0</span>)
            </a>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('global-header', GlobalHeader);
