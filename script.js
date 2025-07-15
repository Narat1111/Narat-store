// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
});

// Product Data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        category: "smartphones",
        price: 1299,
        oldPrice: 1399,
        image: "assets/images/iphone14.jpg",
        rating: 5,
        badge: "កាត់ថ្លៃ 7%"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        category: "smartphones",
        price: 1199,
        oldPrice: 1299,
        image: "assets/images/s23ultra.jpg",
        rating: 5,
        badge: "កាត់ថ្លៃ 8%"
    },
    {
        id: 3,
        name: "MacBook Pro M2 14-inch",
        category: "laptops",
        price: 1999,
        image: "assets/images/macbookpro.jpg",
        rating: 5
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "laptops",
        price: 1599,
        image: "assets/images/dellxps.jpg",
        rating: 4
    },
    {
        id: 5,
        name: "AirPods Pro 2",
        category: "accessories",
        price: 249,
        image: "assets/images/airpodspro.jpg",
        rating: 4
    },
    {
        id: 6,
        name: "Apple Watch Series 8",
        category: "accessories",
        price: 399,
        oldPrice: 429,
        image: "assets/images/applewatch.jpg",
        rating: 4,
        badge: "កាត់ថ្លៃ 7%"
    },
    {
        id: 7,
        name: "Samsung Galaxy Tab S8",
        category: "tablets",
        price: 699,
        image: "assets/images/galaxytab.jpg",
        rating: 4
    },
    {
        id: 8,
        name: "iPad Pro 11-inch M2",
        category: "tablets",
        price: 799,
        image: "assets/images/ipadpro.jpg",
        rating: 5
    }
];

// Display Featured Products
function displayFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products');
    productsContainer.innerHTML = '';
    
    // Get 6 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 6);
    
    selectedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Product image with optional badge
        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<span class="product-badge">${product.badge}</span>`;
        }
        
        const productImage = document.createElement('div');
        productImage.className = 'product-image';
        productImage.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            ${badgeHTML}
        `;
        
        // Product info
        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';
        
        // Rating stars
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                ratingStars += '<i class="fas fa-star"></i>';
            } else {
                ratingStars += '<i class="far fa-star"></i>';
            }
        }
        
        // Price display
        let priceHTML = `<div class="current-price">$${product.price.toFixed(2)}</div>`;
        if (product.oldPrice) {
            priceHTML += `<div class="old-price">$${product.oldPrice.toFixed(2)}</div>`;
        }
        
        productInfo.innerHTML = `
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${priceHTML}</div>
            <div class="product-rating">${ratingStars}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> បញ្ចូលទំនិញ
            </button>
        `;
        
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);
        productsContainer.appendChild(productCard);
    });
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get current cart from localStorage or initialize
    let cart = JSON.parse(localStorage.getItem('naratstore-cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('naratstore-cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    alert(`បានបញ្ចូល ${product.name} ទៅកន្ត្រក!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('naratstore-cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Show first slide initially
    showSlide(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    initHeroSlider();
    updateCartCount();
    
    // Add smooth scroll to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});