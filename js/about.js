// ==========================================
// ABOUT PAGE - Tech Background Animation
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let gridLines = [];
    
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initGrid();
    }
    
    // Grid line class
    class GridLine {
        constructor(isVertical) {
            this.isVertical = isVertical;
            if (isVertical) {
                this.x = Math.random() * canvas.width;
                this.y1 = 0;
                this.y2 = canvas.height;
            } else {
                this.y = Math.random() * canvas.height;
                this.x1 = 0;
                this.x2 = canvas.width;
            }
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        draw() {
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (this.isVertical) {
                ctx.moveTo(this.x, this.y1);
                ctx.lineTo(this.x, this.y2);
            } else {
                ctx.moveTo(this.x1, this.y);
                ctx.lineTo(this.x2, this.y);
            }
            ctx.stroke();
        }
    }
    
    // Particle class for tech visualization
    class TechParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            // Draw particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
            
            // Draw glow
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initGrid() {
        gridLines = [];
        const gridCount = 10;
        for (let i = 0; i < gridCount; i++) {
            gridLines.push(new GridLine(true));
            gridLines.push(new GridLine(false));
        }
    }
    
    function init() {
        particles = [];
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new TechParticle());
        }
    }
    
    // Draw car and parking icons
    function drawIcons() {
        const time = Date.now() * 0.001;
        
        // Draw floating car icons
        for (let i = 0; i < 3; i++) {
            const x = (canvas.width / 4) * (i + 0.5);
            const y = canvas.height / 2 + Math.sin(time + i) * 30;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.globalAlpha = 0.2;
            
            // Simple car shape
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(-20, -10, 40, 20);
            ctx.fillRect(-15, -15, 10, 10);
            ctx.fillRect(5, -15, 10, 10);
            
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        gridLines.forEach(line => line.draw());
        
        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        // Draw floating icons
        drawIcons();
        
        requestAnimationFrame(animate);
    }
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        init();
    });
});
