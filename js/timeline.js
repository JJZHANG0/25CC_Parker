// ==========================================
// TIMELINE PAGE - Scroll Animation
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate marker dot
                const markerDot = entry.target.querySelector('.marker-dot');
                if (markerDot) {
                    markerDot.style.transform = 'scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // Set initial state and observe
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const markerDot = item.querySelector('.marker-dot');
        if (markerDot) {
            markerDot.style.transform = 'scale(0)';
            markerDot.style.transition = 'transform 0.4s ease 0.2s';
        }
        
        observer.observe(item);
    });
    
    // Animate achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    });
    
    // Animate roadmap items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        const roadmapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.2 });
        
        roadmapObserver.observe(item);
    });
    
    // Counter animation for achievement numbers
    function animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            // Format number
            if (element.textContent.includes('%')) {
                element.textContent = current + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = current.toLocaleString() + '+';
            } else {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Set final value
                if (element.dataset.original) {
                    element.textContent = element.dataset.original;
                }
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Start counter animation when achievement cards are visible
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    achievementNumbers.forEach(numEl => {
        const text = numEl.textContent;
        numEl.dataset.original = text;
        
        // Extract number
        const numberMatch = text.match(/[\d,]+/);
        if (numberMatch) {
            const targetNumber = parseInt(numberMatch[0].replace(/,/g, ''));
            
            const numberObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(numEl, targetNumber);
                        numberObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            numberObserver.observe(numEl);
        }
    });
});
