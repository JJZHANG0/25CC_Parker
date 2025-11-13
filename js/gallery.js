// ==========================================
// GALLERY PAGE - Image Filter & Modal
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');
    
    let currentIndex = 0;
    const allItems = Array.from(galleryItems);
    
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal(this);
        });
    });
    
    function openModal(item) {
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
        
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation buttons
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            openModal(allItems[currentIndex]);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % allItems.length;
            openModal(allItems[currentIndex]);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            openModal(allItems[currentIndex]);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % allItems.length;
            openModal(allItems[currentIndex]);
        }
    });
    
    // Download and share buttons
    const modalButtons = document.querySelectorAll('.modal-btn');
    modalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Download')) {
                alert('Downloading high-resolution image...');
            } else if (text.includes('Share')) {
                if (navigator.share) {
                    navigator.share({
                        title: modalTitle.textContent,
                        text: modalDesc.textContent,
                        url: window.location.href
                    }).catch(err => console.log('Share cancelled'));
                } else {
                    alert('Share functionality requires HTTPS or modern browser support');
                }
            }
        });
    });
    
    // Action buttons in filter section
    const actionButtons = document.querySelectorAll('.gallery-actions .action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Download Package')) {
                alert('Preparing complete image package for download...');
            } else if (text.includes('Request Original')) {
                alert('Redirecting to request form for original high-resolution images...');
            }
        });
    });
});
