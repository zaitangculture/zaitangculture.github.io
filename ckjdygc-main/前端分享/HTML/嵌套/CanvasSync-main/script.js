document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('interactiveCanvas');
    const ctx = canvas.getContext('2d');

    let centerXPos;
    let centerYPos;

    function updateCanvasSizeAndPosition() {
        if ('getScreenDetails' in window) {
            window.getScreenDetails().then(screenDetails => {
                const currentScreen = screenDetails.currentScreen;

                // Set canvas size to the size of the monitor
                canvas.width = currentScreen.width;
                canvas.height = currentScreen.height;

                centerXPos = currentScreen.width / 2;
                centerYPos = currentScreen.height / 2;

                // Adjust canvas position based on the window's position
                canvas.style.left = (-window.screenX) + 'px';
                canvas.style.top = (-window.screenY) + 'px';

                drawElements(); // Redraw elements after repositioning
            }).catch(error => {
                console.error('Error fetching screen details:', error);
                centerCanvasOnWindow();
            });
        } else {
            // console.error('getScreenDetails API is not available in this browser.');
            centerCanvasOnWindow();
        }
    }

    function centerCanvasOnWindow() {
        // Set canvas size to the size of the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        centerXPos = window.innerWidth / 2;
        centerYPos = window.innerHeight / 2;

        // Center the canvas on the window
        canvas.style.left = '0';
        canvas.style.top = '0';

        drawElements(); // Redraw elements after repositioning
    }

    function drawElements() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Define properties of the orb
        const numParticles = 2000; // Number of particles in the orb
        const orbRadius = 150; // Base radius of the orb
        const particleRadius = .75; // Radius of each particle
    
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
            const y = (orbRadius + pulsate) * Math.sin(phi) * Math.sin(theta);
            let z = (orbRadius + pulsate) * Math.cos(phi);
    
            const tempX = x;
            x = x * cosAngle - z * sinAngle;
            z = z * cosAngle + tempX * sinAngle;
    
            ctx.fillStyle = `hsla(${360 * i / numParticles}, 100%, 50%, 0.7)`;
            ctx.beginPath();
            ctx.arc(x + centerXPos, y + centerYPos, particleRadius, 0, Math.PI * 2, true);
            ctx.fill();

        }
    
    }
    
    // Update the drawElements function in the setInterval to redraw continuously
    setInterval(drawElements, 50);      

    // Update the canvas size and position continuously
    setInterval(updateCanvasSizeAndPosition, 100);

    // Initial setup
    updateCanvasSizeAndPosition();
});
