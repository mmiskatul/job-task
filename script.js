// Color selection functionality
document.addEventListener('DOMContentLoaded', function() {
    // Color buttons
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainImage = document.getElementById('main-product-img');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            colorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change main image
            const newImage = this.getAttribute('data-image');
            mainImage.src = newImage;
            
            // Optional: Change product title based on color
            const color = this.getAttribute('data-color');
            document.querySelector('.product-title h1').textContent = 
                `Noseclip (${color.charAt(0).toUpperCase() + color.slice(1)})`;
        });
    });
    
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
        });
    });
    
    // Add to cart functionality
    const cartButton = document.querySelector('.cart-btn');
    
    cartButton.addEventListener('click', function() {
        // Get selected color
        const selectedColor = document.querySelector('.color-btn.active').getAttribute('data-color');
        
        // Animation effect
        this.textContent = 'Added to Cart!';
        this.style.backgroundColor = '#2ed573';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart →';
            this.style.backgroundColor = '';
        }, 2000);
        
        // In a real application, you would add the product to a cart here
        console.log(`Added ${selectedColor} noseclip to cart`);
    });
    
    // Star rating interaction (optional enhancement)
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // Reset all stars
            stars.forEach(s => s.classList.remove('filled'));
            
            // Fill stars up to the clicked one
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('filled');
            }
            
            // Update rating text (in a real app, this would submit a rating)
            const ratingCount = document.querySelector('.rating-text');
            ratingCount.textContent = `(${index + 1}/5 rating submitted)`;
        });
    });
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDots = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        updateButtons();
    }
    
    // Update button states
    function updateButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Auto slide (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize slider
    function initSlider() {
        createDots();
        updateButtons();
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Pause auto-slide on hover
        sliderTrack.addEventListener('mouseenter', stopAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Start auto-slide
        startAutoSlide();
    }
    
    // Initialize the slider
    initSlider();
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    sliderTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
});



