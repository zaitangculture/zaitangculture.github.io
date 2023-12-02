document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('interactiveCanvas');
    const ctx = canvas.getContext('2d');

    let orbVelocityX = 0;
    let orbVelocityY = 0;
    let orbX, orbY;
    let lastTime = Date.now();
    const centeringStrength = 1; // Modify strength of orb centering
    const opposingForceMultiplier = 5; // Modify force that opposes window movement
    const snapMultiplier = 0; // Modify snapback force
    let lastMovement = { x: 0, y: 0 }; // Track the last window movement
    let windowStopped = false;
    let distortionX = 0, distortionY = 0;
    const distortionStrength = .075;

    function updateOrbPosition(deltaTime) {
        orbX += orbVelocityX * deltaTime;
        orbY += orbVelocityY * deltaTime;

        // Keep the orb within the bounds of the canvas
        orbX = Math.max(0, Math.min(canvas.width, orbX));
        orbY = Math.max(0, Math.min(canvas.height, orbY));
    }

    function applyPhysics() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds

        // Calculate window movement
        const currentPosition = {
            x: window.innerWidth / 2 + window.screenX,
            y: window.innerHeight / 2 + window.screenY
        };
        const deltaX = currentPosition.x - lastMovement.x;
        const deltaY = currentPosition.y - lastMovement.y;

        // Check if window is moving
        if (deltaX !== 0 || deltaY !== 0) {
            // If the window is moving, apply opposing force
            orbVelocityX -= deltaX * opposingForceMultiplier;
            orbVelocityY -= deltaY * opposingForceMultiplier;
            windowStopped = false;
        } else if (!windowStopped) {
            // If the window just stopped, snap the orb in the opposite direction
            orbVelocityX += lastMovement.x * snapMultiplier;
            orbVelocityY += lastMovement.y * snapMultiplier;
            windowStopped = true;
        }

        // Apply centering force
        orbVelocityX += (canvas.width / 2 - orbX) * centeringStrength;
        orbVelocityY += (canvas.height / 2 - orbY) * centeringStrength;

        // Update orb position
        updateOrbPosition(deltaTime);

        // Simulate friction
        orbVelocityX *= 0.9;
        orbVelocityY *= 0.9;

        // Update last values
        lastTime = currentTime;
        lastMovement.x = currentPosition.x;
        lastMovement.y = currentPosition.y;

        // Calculate distortion based on velocity
        distortionX = orbVelocityX * distortionStrength;
        distortionY = orbVelocityY * distortionStrength;

        // Request next physics update
        requestAnimationFrame(applyPhysics);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        orbX = canvas.width / 2;
        orbY = canvas.height / 2;
    }

    // Event listener for window resize
    window.addEventListener('resize', resizeCanvas);

    function drawElements() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Define properties of the orb
        const numParticles = 2000; // Number of particles in the orb
        const orbRadius = 150; // Base radius of the orb
        const particleRadius = 1; // Radius of each particle
    
        // Get the current time for dynamic movement
        const now = new Date();
        const time = now.getTime();
    
        // Create a pulsating effect for the orb (constant speed)
        const pulsate = Math.sin(time * 0.0005) * 10;
    
        // Angle for 3D rotation around the y-axis (constant speed)
        const rotationAngle = time * 0.0001;
    
        // Draw each particle in the orb
        for (let i = 0; i < numParticles; i++) {
            const phi = Math.acos(-1 + (2 * i) / numParticles);
            const theta = Math.sqrt(numParticles * Math.PI) * phi;
    
            const cosAngle = Math.cos(rotationAngle);
            const sinAngle = Math.sin(rotationAngle);
    
            let x = (orbRadius + pulsate) * Math.sin(phi) * Math.cos(theta);
            let y = (orbRadius + pulsate) * Math.sin(phi) * Math.sin(theta);
            let z = (orbRadius + pulsate) * Math.cos(phi);
    
            const tempX = x;
            x = x * cosAngle - z * sinAngle;
            z = z * cosAngle + tempX * sinAngle;
    
            // Apply distortion
            x += distortionX * (orbRadius + pulsate - Math.abs(z)) / orbRadius;
            y += distortionY * (orbRadius + pulsate - Math.abs(z)) / orbRadius;

            // Draw the particle
            ctx.fillStyle = `hsla(${360 * i / numParticles}, 100%, 50%, 0.7)`;
            ctx.beginPath();
            ctx.arc(x + orbX, y + orbY, particleRadius, 0, Math.PI * 2, true);
            ctx.fill();
        }

        // Request next frame
        requestAnimationFrame(drawElements);
    }

    // Start the animation loops
    requestAnimationFrame(applyPhysics);
    requestAnimationFrame(drawElements);

    // Initialize canvas size
    resizeCanvas(); 
});
