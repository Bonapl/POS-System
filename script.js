// Menu Data
const menuItems = [
    // Coffee Items
    {
        id: 'coffee-1',
        name: 'Espresso',
        category: 'coffee',
        price: 3.50,
        description: 'Rich and bold Italian espresso',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop'
    },
    {
        id: 'coffee-2',
        name: 'Cappuccino',
        category: 'coffee',
        price: 4.50,
        description: 'Classic espresso with steamed milk foam',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop'
    },
    {
        id: 'coffee-3',
        name: 'Latte',
        category: 'coffee',
        price: 4.75,
        description: 'Smooth espresso with steamed milk',
        image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop'
    },
    {
        id: 'coffee-4',
        name: 'Americano',
        category: 'coffee',
        price: 3.75,
        description: 'Espresso diluted with hot water',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop'
    },
    {
        id: 'coffee-5',
        name: 'Mocha',
        category: 'coffee',
        price: 5.25,
        description: 'Chocolate and espresso blend',
        image: 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=400&h=300&fit=crop'
    },
    {
        id: 'coffee-6',
        name: 'Caramel Macchiato',
        category: 'coffee',
        price: 5.50,
        description: 'Espresso with vanilla and caramel',
        image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?w=400&h=300&fit=crop'
    },
    // Milk Tea Items
    {
        id: 'tea-1',
        name: 'Classic Milk Tea',
        category: 'milk-tea',
        price: 4.00,
        description: 'Traditional black tea with milk',
        image: 'https://images.unsplash.com/photo-1558857563-b406f7a1e37b?w=400&h=300&fit=crop'
    },
    {
        id: 'tea-2',
        name: 'Taro Milk Tea',
        category: 'milk-tea',
        price: 4.50,
        description: 'Sweet taro flavor with creamy milk',
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop'
    },
    {
        id: 'tea-3',
        name: 'Matcha Milk Tea',
        category: 'milk-tea',
        price: 4.75,
        description: 'Japanese green tea with milk',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop'
    },
    {
        id: 'tea-4',
        name: 'Brown Sugar Milk Tea',
        category: 'milk-tea',
        price: 5.00,
        description: 'Sweet brown sugar with fresh milk',
        image: 'https://images.unsplash.com/photo-1525385444278-7020c85d323b?w=400&h=300&fit=crop'
    },
    {
        id: 'tea-5',
        name: 'Thai Milk Tea',
        category: 'milk-tea',
        price: 4.25,
        description: 'Traditional Thai tea with condensed milk',
        image: 'https://images.unsplash.com/photo-1577968897966-3d61b4a1b85e?w=400&h=300&fit=crop'
    },
    {
        id: 'tea-6',
        name: 'Honeydew Milk Tea',
        category: 'milk-tea',
        price: 4.50,
        description: 'Refreshing melon flavor with milk',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop'
    }
];

// Cart State
let cart = [];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupTabs();
    setupCheckout();
});

// Render Menu
function renderMenu(category = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-card">
            <img src="${item.image}" alt="${item.name}" class="menu-card-image">
            <div class="menu-card-content">
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-description">${item.description}</p>
                <p class="menu-card-price">$${item.price.toFixed(2)}</p>
                <button class="btn btn-primary btn-lg" onclick="addToCart('${item.id}')">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup Tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            currentCategory = category;
            renderMenu(category);
        });
    });
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    renderCart();
    showToast(`${item.name} added to cart!`);
}

// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            renderCart();
        }
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    renderCart();
    showToast('Item removed from cart');
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartFooter = document.getElementById('cartFooter');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = `(${totalItems})`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="btn btn-outline btn-sm btn-icon" onclick="updateQuantity('${item.id}', -1)">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="btn btn-outline btn-sm btn-icon" onclick="updateQuantity('${item.id}', 1)">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <button class="btn btn-outline btn-sm btn-icon btn-destructive" onclick="removeFromCart('${item.id}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
    }
}

// Setup Checkout
function setupCheckout() {
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const date = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    generateInvoice(orderNumber, date, cart, total);
    
    cart = [];
    renderCart();
    showToast('Order placed successfully!');
}

// Generate Invoice
function generateInvoice(orderNumber, date, items, total) {
    const invoiceContent = document.getElementById('invoiceContent');
    const tax = total * 0.1;
    const finalTotal = total + tax;
    
    invoiceContent.innerHTML = `
        <div class="invoice-header">
            <h1 class="invoice-title">Café & Tea House</h1>
            <p class="invoice-info">123 Coffee Street, Bean City</p>
            <p class="invoice-info">Phone: (555) 123-4567</p>
        </div>
        
        <div class="invoice-separator"></div>
        
        <div class="invoice-details">
            <div>
                <p class="invoice-label">Order Number</p>
                <p class="invoice-value">${orderNumber}</p>
            </div>
            <div style="text-align: right;">
                <p class="invoice-label">Date</p>
                <p class="invoice-value">${date}</p>
            </div>
        </div>
        
        <div class="invoice-separator"></div>
        
        <div class="invoice-table">
            <div class="invoice-table-header">
                <div>Item</div>
                <div class="text-center">Qty</div>
                <div class="text-right">Price</div>
                <div class="text-right">Total</div>
            </div>
            ${items.map(item => `
                <div class="invoice-table-row">
                    <div>
                        <div class="invoice-item-name">${item.name}</div>
                        <div class="invoice-item-desc">${item.description}</div>
                    </div>
                    <div class="text-center">${item.quantity}</div>
                    <div class="text-right">$${item.price.toFixed(2)}</div>
                    <div class="text-right">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="invoice-separator"></div>
        
        <div class="invoice-totals">
            <div class="invoice-total-row">
                <span>Subtotal:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="invoice-total-row">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="invoice-separator"></div>
            <div class="invoice-total-row invoice-total-final">
                <span>Total:</span>
                <span>$${finalTotal.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="invoice-footer">
            <p>Thank you for your order!</p>
            <p>Please come again</p>
        </div>
    `;
    
    document.getElementById('invoiceModal').classList.add('active');
}

// Close Invoice
function closeInvoice() {
    document.getElementById('invoiceModal').classList.remove('active');
}

// Print Invoice
function printInvoice() {
    window.print();
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Close modal when clicking outside
document.getElementById('invoiceModal').addEventListener('click', (e) => {
    if (e.target.id === 'invoiceModal') {
        closeInvoice();
    }
});
