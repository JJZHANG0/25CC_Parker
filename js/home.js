// ==========================================
// HOME PAGE - Parking Simulation
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero background animation
    ParkerUtils.createParticlesBackground('parkingCanvas', 60);
    
    // Parking Simulation
    const canvas = document.getElementById('parkingSimulation');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let isPaused = false;
    
    // Simulation state
    const parkingLot = {
        rows: 4,
        cols: 8,
        spaces: [],
        vehicles: []
    };
    
    // Initialize parking spaces
    function initParkingLot() {
        parkingLot.spaces = [];
        const spaceWidth = 70;
        const spaceHeight = 40;
        const paddingX = 50;
        const paddingY = 50;
        const rowGap = 60;
        
        for (let row = 0; row < parkingLot.rows; row++) {
            for (let col = 0; col < parkingLot.cols; col++) {
                const x = paddingX + col * (spaceWidth + 10);
                const y = paddingY + row * (spaceHeight + rowGap);
                
                // Random initial status
                const random = Math.random();
                let status = 'available';
                if (random < 0.4) status = 'occupied';
                else if (random < 0.5) status = 'reserved';
                
                parkingLot.spaces.push({
                    id: `${row}-${col}`,
                    x, y,
                    width: spaceWidth,
                    height: spaceHeight,
                    status: status
                });
            }
        }
    }
    
    // Vehicle class
    class Vehicle {
        constructor(targetSpace) {
            this.targetSpace = targetSpace;
            this.x = canvas.width / 2;
            this.y = -20;
            this.width = 50;
            this.height = 30;
            this.speed = 2;
            this.arrived = false;
        }
        
        update() {
            if (this.arrived) return;
            
            const dx = this.targetSpace.x + 10 - this.x;
            const dy = this.targetSpace.y + 5 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 5) {
                this.arrived = true;
                this.targetSpace.status = 'occupied';
            } else {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Draw car body
            ctx.fillStyle = '#0A74DA';
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Draw car windows
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(10, 5, 15, 20);
            ctx.fillRect(30, 5, 15, 20);
            
            ctx.restore();
        }
    }
    
    // Draw parking space
    function drawParkingSpace(space) {
        // Space background
        let color;
        switch(space.status) {
            case 'available':
                color = '#4CAF50';
                break;
            case 'occupied':
                color = '#F44336';
                break;
            case 'reserved':
                color = '#FF9800';
                break;
        }
        
        ctx.fillStyle = color;
        ctx.fillRect(space.x, space.y, space.width, space.height);
        
        // Space border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(space.x, space.y, space.width, space.height);
        
        // Space ID
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(space.id, space.x + space.width / 2, space.y + space.height / 2);
    }
    
    // Draw road lines
    function drawRoads() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        
        // Horizontal roads
        for (let row = 0; row < parkingLot.rows; row++) {
            const y = 70 + row * 100;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Vertical roads
        const centerX = canvas.width / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }
    
    // Add new vehicle
    function addVehicle() {
        const availableSpaces = parkingLot.spaces.filter(s => s.status === 'available');
        if (availableSpaces.length > 0) {
            const targetSpace = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
            targetSpace.status = 'reserved';
            parkingLot.vehicles.push(new Vehicle(targetSpace));
        }
    }
    
    // Randomly free spaces
    function freeRandomSpace() {
        const occupiedSpaces = parkingLot.spaces.filter(s => s.status === 'occupied');
        if (occupiedSpaces.length > 0 && Math.random() < 0.05) {
            const space = occupiedSpaces[Math.floor(Math.random() * occupiedSpaces.length)];
            space.status = 'available';
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = '#f5f7fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw roads
        drawRoads();
        
        // Draw parking spaces
        parkingLot.spaces.forEach(drawParkingSpace);
        
        // Update and draw vehicles
        parkingLot.vehicles = parkingLot.vehicles.filter(vehicle => !vehicle.arrived);
        parkingLot.vehicles.forEach(vehicle => {
            vehicle.update();
            vehicle.draw();
        });
        
        // Randomly add vehicles
        if (Math.random() < 0.02 && parkingLot.vehicles.length < 3) {
            addVehicle();
        }
        
        // Randomly free spaces
        freeRandomSpace();
        
        if (!isPaused) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // Control buttons
    const startBtn = document.getElementById('startDemo');
    const pauseBtn = document.getElementById('pauseDemo');
    const resetBtn = document.getElementById('resetDemo');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (isPaused || !animationId) {
                isPaused = false;
                animate();
            }
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = true;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            isPaused = true;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            parkingLot.vehicles = [];
            initParkingLot();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isPaused = false;
            animate();
        });
    }
    
    // Initialize
    resizeCanvas();
    initParkingLot();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParkingLot();
    });
});
