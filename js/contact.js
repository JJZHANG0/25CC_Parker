// ==========================================
// CONTACT PAGE - Form Handling
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form submission
    const pilotForm = document.getElementById('pilotForm');
    if (pilotForm) {
        pilotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('Pilot Form Submitted:', data);
            
            // Show success message
            showNotification('Thank you for your application! Our business manager will contact you within 1-2 business days.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            showNotification(`Downloading ${text}...`, 'info');
        });
    });
    
    // Media kit buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Download')) {
                showNotification('Preparing media kit download...', 'info');
            } else if (text.includes('Interview')) {
                showNotification('Redirecting to interview request form...', 'info');
            }
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1.5rem 2rem;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 400px;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.success {
                border-left: 4px solid #4CAF50;
            }
            .notification.info {
                border-left: 4px solid #0A74DA;
            }
            .notification.error {
                border-left: 4px solid #F44336;
            }
            .notification-icon {
                font-size: 1.5rem;
            }
            .notification.success .notification-icon {
                color: #4CAF50;
            }
            .notification.info .notification-icon {
                color: #0A74DA;
            }
            .notification.error .notification-icon {
                color: #F44336;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set icon based on type
    let icon = '📋';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';
    
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span>${message}</span>
    `;
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}
