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