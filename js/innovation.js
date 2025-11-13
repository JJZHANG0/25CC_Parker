// ==========================================
// INNOVATION PAGE - Interactive Features
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Live simulation canvas
    const canvas = document.getElementById('liveSimulation');
    if (canvas) {
        initLiveSimulation(canvas);
    }
    
    // Interactive feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Highlight effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Live Simulation
function initLiveSimulation(canvas) {
    const ctx = canvas.getContext('2d');
    let dataPoints = [];
    let time = 0;
    
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // Data point class
    class DataPoint {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 4 + 2;
            this.life = 100;
            this.maxLife = 100;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;
            
            if (this.life <= 0) {
                this.reset();
            }
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 191, 165, ${alpha * 0.8})`;
            ctx.fill();
            
            // Draw glow
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
            gradient.addColorStop(0, `rgba(0, 191, 165, ${alpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 191, 165, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Sensor visualization
    class Sensor {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 30;
            this.pulseRadius = 30;
            this.pulseSpeed = 0.5;
        }
        
        update() {
            this.pulseRadius += this.pulseSpeed;
            if (this.pulseRadius > 80) {
                this.pulseRadius = 30;
            }
        }
        
        draw() {
            // Draw pulse
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
            const pulseAlpha = 1 - (this.pulseRadius - 30) / 50;
            ctx.strokeStyle = `rgba(10, 116, 218, ${pulseAlpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw sensor
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(10, 116, 218, 0.6)';
            ctx.fill();
            
            // Draw center
            ctx.beginPath();
            ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
        }
    }
    
    // Initialize sensors
    const sensors = [
        new Sensor(canvas.width * 0.25, canvas.height * 0.3),
        new Sensor(canvas.width * 0.75, canvas.height * 0.3),
        new Sensor(canvas.width * 0.25, canvas.height * 0.7),
        new Sensor(canvas.width * 0.75, canvas.height * 0.7)
    ];
    
    // Initialize data points
    function init() {
        dataPoints = [];
        for (let i = 0; i < 60; i++) {
            dataPoints.push(new DataPoint());
        }
    }
    
    // Draw network connections
    function drawNetwork() {
        // Draw lines between sensors
        ctx.strokeStyle = 'rgba(157, 78, 221, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < sensors.length; i++) {
            for (let j = i + 1; j < sensors.length; j++) {
                ctx.beginPath();
                ctx.moveTo(sensors[i].x, sensors[i].y);
                ctx.lineTo(sensors[j].x, sensors[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw grid
    function drawGrid() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    // Draw stats overlay
    function drawStats() {
        time++;
        const activeSpaces = Math.floor(Math.sin(time * 0.01) * 20 + 70);
        const accuracy = (95 + Math.sin(time * 0.02) * 3).toFixed(1);
        
        ctx.font = 'bold 16px Inter';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.textAlign = 'left';
        
        const padding = 20;
        const lineHeight = 25;
        
        ctx.fillText(`Active Spaces: ${activeSpaces}/150`, padding, padding + lineHeight);
        ctx.fillText(`Recognition Accuracy: ${accuracy}%`, padding, padding + lineHeight * 2);
        ctx.fillText(`System Status: Online`, padding, padding + lineHeight * 3);
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        drawGrid();
        
        // Draw network
        drawNetwork();
        
        // Update and draw data points
        dataPoints.forEach(point => {
            point.update();
            point.draw();
        });
        
        // Draw connections between close points
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const dx = dataPoints[i].x - dataPoints[j].x;
                const dy = dataPoints[i].y - dataPoints[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(dataPoints[i].x, dataPoints[i].y);
                    ctx.lineTo(dataPoints[j].x, dataPoints[j].y);
                    ctx.strokeStyle = `rgba(0, 191, 165, ${0.3 * (1 - dist / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw sensors
        sensors.forEach(sensor => {
            sensor.update();
            sensor.draw();
        });
        
        // Draw stats
        drawStats();
        
        requestAnimationFrame(animate);
    }
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        // Reposition sensors
        sensors[0].x = canvas.width * 0.25;
        sensors[0].y = canvas.height * 0.3;
        sensors[1].x = canvas.width * 0.75;
        sensors[1].y = canvas.height * 0.3;
        sensors[2].x = canvas.width * 0.25;
        sensors[2].y = canvas.height * 0.7;
        sensors[3].x = canvas.width * 0.75;
        sensors[3].y = canvas.height * 0.7;
    });
}
