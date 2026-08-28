/**
 * Daud Fabrics - Core Application Controller (js/app.js)
 */

const CART_STORAGE_KEY = 'daud_fabrics_cart';
const RECENTLY_VIEWED_KEY = 'daud_fabrics_recently_viewed';

function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading cart from localStorage:", e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadge();
    } catch (e) {
        console.error("Error saving cart to localStorage:", e);
    }
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        console.error("Cannot add to cart: Product not found for ID", productId);
        return;
    }

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast("Added to Cart!", product.name, 4000);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    if (typeof renderCartPage === 'function') {
        renderCartPage();
    }
}

function updateCartQuantity(productId, newQty) {
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQty;
        saveCart(cart);
        if (typeof renderCartPage === 'function') {
            renderCartPage();
        }
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.dz-cart-count-badge, .js-cart-count, #CartCount');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-flex' : 'inline-flex';
    });
}

function showToast(title, message, duration = 4000) {
    let container = document.getElementById('dz-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dz-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'dz-toast';
    toast.innerHTML = `
        <div class="dz-toast-icon">✓</div>
        <div class="dz-toast-content">
            <div class="dz-toast-title">${escapeHTML(title)}</div>
            <div class="dz-toast-msg">${escapeHTML(message)}</div>
        </div>
        <div class="dz-toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function createProductCardHTML(product) {
    if (!product) return '';
    const detailUrl = `product-detail.html?id=${product.id}`;

    return `
        <div class="dz-card" data-product-id="${product.id}">
            <a href="${detailUrl}" class="dz-card-image-wrapper">
                <span class="dz-badge-discount">-${product.discount}%</span>
                <img src="${product.image}" alt="${escapeHTML(product.name)}" class="dz-card-image" loading="lazy">
            </a>
            <div class="dz-card-body">
                <div class="dz-card-category">${escapeHTML(product.category)}</div>
                <h3 class="dz-card-title">
                    <a href="${detailUrl}">${escapeHTML(product.name)}</a>
                </h3>
                <div class="dz-card-rating">
                    ${'★'.repeat(Math.floor(product.rating || 5))}${'☆'.repeat(5 - Math.floor(product.rating || 5))}
                    <span>(${product.reviewCount || 0})</span>
                </div>
                <div class="dz-card-price-row">
                    <span class="dz-card-price-current">${formatPrice(product.price)}</span>
                    <span class="dz-card-price-old">${formatPrice(product.oldPrice)}</span>
                </div>
                <button type="button" class="dz-btn-add-cart" onclick="addToCart('${product.id}')">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

/* ============================================================================
   INTERACTIVE LIVE SEARCH ENGINE (Multi-word search & Modal Controller)
   ============================================================================ */

function initSearchModal() {
    if (document.getElementById('dzSearchModal')) return;

    const modalHTML = `
        <div class="dz-search-modal-overlay" id="dzSearchModal" onclick="handleSearchBackdropClick(event)">
            <div class="dz-search-modal-container">
                <button type="button" class="dz-search-modal-close" onclick="closeSearchModal()" aria-label="Close search">✕</button>
                <div class="dz-search-input-wrapper">
                    <svg class="dz-search-input-icon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input type="text" id="dzSearchInput" class="dz-search-input" placeholder="Search for lawn suits, gents boski, velvet shawls, cotton..." oninput="handleSearchInput(this.value)" onkeydown="handleSearchKeyDown(event)" autocomplete="off">
                </div>
                
                <div class="dz-search-tags">
                    <span class="dz-search-tag-label">Quick Filters:</span>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Boski')">Gents Boski</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Velvet')">Velvet Shawl</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Crimson')">Crimson Bloom</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Lawn')">Summer Lawn</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Wash')">Wash & Wear</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Gents')">All Gents</button>
                    <button type="button" class="dz-search-tag-btn" onclick="quickSearch('Women')">All Women</button>
                </div>

                <div class="dz-search-results-container" id="dzSearchResultsContainer">
                    <div style="text-align: center; color: var(--dz-secondary); padding: 30px 0;">
                        Type a product name, fabric type, or category to start searching...
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearchModal();
    });
}

function openSearchModal(initialQuery = '') {
    initSearchModal();
    const modal = document.getElementById('dzSearchModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const input = document.getElementById('dzSearchInput');
            if (input) {
                if (initialQuery) input.value = initialQuery;
                input.focus();
                handleSearchInput(input.value);
            }
        }, 100);
    }
}

function closeSearchModal() {
    const modal = document.getElementById('dzSearchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSearchBackdropClick(e) {
    if (e.target.id === 'dzSearchModal') {
        closeSearchModal();
    }
}

function quickSearch(tag) {
    const input = document.getElementById('dzSearchInput');
    if (input) {
        input.value = tag;
        handleSearchInput(tag);
        input.focus();
    }
}

function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            closeSearchModal();
            window.location.href = `gents.html?search=${encodeURIComponent(query)}`;
        }
    }
}

function handleSearchInput(query) {
    const container = document.getElementById('dzSearchResultsContainer');
    if (!container) return;

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--dz-secondary); padding: 30px 0;">
                Type a product name, fabric type, or category to start searching...
            </div>
        `;
        return;
    }

    const keywords = trimmed.split(/\s+/).filter(k => k.length > 0);
    const all = typeof getAllProducts === 'function' ? getAllProducts() : [];

    // Filter products matching ALL search keywords flexible
    const results = all.filter(p => {
        const fullContent = `${p.name} ${p.category} ${p.description || ''} ${(p.details || []).join(' ')}`.toLowerCase();
        return keywords.every(kw => fullContent.includes(kw));
    });

    if (results.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--dz-secondary); padding: 40px 20px;">
                <p style="font-size: 1.1rem; font-weight: 700; color: var(--dz-primary); margin-bottom: 6px;">No products found for "${escapeHTML(query)}"</p>
                <p style="font-size: 0.9rem; margin: 0;">Try searching for "Lawn", "Boski", "Velvet", "Gents", "Navy", or "Suit"</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--dz-secondary); text-transform: uppercase;">
                Found ${results.length} product${results.length > 1 ? 's' : ''} matching "${escapeHTML(query)}":
            </span>
            <a href="gents.html?search=${encodeURIComponent(query)}" onclick="closeSearchModal()" style="font-size:0.8rem; font-weight:700; color:var(--dz-accent); text-decoration:underline;">View All &rarr;</a>
        </div>
        <div class="dz-search-results-grid">
            ${results.map(p => `
                <div class="dz-search-result-item">
                    <a href="product-detail.html?id=${p.id}" onclick="closeSearchModal()" style="display:flex; align-items:center; gap:12px; flex-grow:1; text-decoration:none;">
                        <img src="${p.image}" alt="${escapeHTML(p.name)}" class="dz-search-result-thumb">
                        <div class="dz-search-result-info">
                            <div class="dz-search-result-cat">${escapeHTML(p.category)}</div>
                            <div class="dz-search-result-title" title="${escapeHTML(p.name)}">${escapeHTML(p.name)}</div>
                            <div class="dz-search-result-price">${formatPrice(p.price)}</div>
                        </div>
                    </a>
                    <button type="button" onclick="addToCart('${p.id}'); closeSearchModal();" class="dz-btn-primary" style="padding:6px 12px; font-size:0.75rem; border-radius:6px; flex-shrink:0;">
                        Add
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

/* ============================================================================
   FLOATING WHATSAPP CHAT WIDGET INJECTOR (+92 349 5302487)
   ============================================================================ */
function initWhatsAppWidget() {
    if (document.getElementById('dzWhatsAppFloat')) return;

    const phoneNumber = "923495302487";
    const message = encodeURIComponent("Hello Daud Fabrics, I would like to inquire about your products.");
    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    const widgetHTML = `
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="dz-whatsapp-float" id="dzWhatsAppFloat" title="Chat with Daud Fabrics on WhatsApp">
            <svg class="dz-whatsapp-icon" viewBox="0 0 32 32">
                <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 8.165-2.137c2.378 1.3 5.065 1.987 7.835 1.987 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.333c-2.454 0-4.85-0.655-6.953-1.897l-0.499-0.296-5.176 1.353 1.38-5.044-0.327-0.521c-1.365-2.179-2.092-4.697-2.092-7.262 0-7.355 5.978-13.333 13.333-13.333s13.333 5.978 13.333 13.333-5.978 13.333-13.333 13.333zM22.587 19.345c-0.36-0.18-2.129-1.051-2.459-1.171s-0.57-0.18-0.81 0.18c-0.24 0.36-0.93 1.171-1.14 1.411s-0.42 0.27-0.78 0.09c-0.36-0.18-1.52-0.56-2.895-1.786-1.070-0.954-1.792-2.132-2.002-2.492s-0.022-0.555 0.158-0.734c0.162-0.162 0.36-0.42 0.54-0.63s0.24-0.36 0.36-0.6c0.12-0.24 0.06-0.45-0.03-0.63s-0.81-1.95-1.11-2.67c-0.3-0.702-0.605-0.605-0.825-0.615s-0.45-0.01-0.69-0.01c-0.24 0-0.63 0.09-0.96 0.45s-1.26 1.23-1.26 3.001c0 1.77 1.29 3.48 1.47 3.72s2.536 3.874 6.142 5.433c0.858 0.371 1.528 0.593 2.05 0.759 0.862 0.274 1.646 0.235 2.266 0.143 0.692-0.103 2.129-0.87 2.429-1.71s0.3-1.56 0.21-1.71c-0.09-0.15-0.33-0.24-0.69-0.42z"/>
            </svg>
            <span>Chat on WhatsApp</span>
        </a>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    document.title = document.title.replace(/Shaan Fabrics/gi, "Daud Fabrics");
    initSearchModal();
    initWhatsAppWidget();

    // Check URL for search parameter (e.g., gents.html?search=velvet)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        setTimeout(() => openSearchModal(searchQuery), 300);
    }
});
