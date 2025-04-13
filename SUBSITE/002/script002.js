const textElement = document.getElementById('text');

     // Function to calculate the distance between the mouse and the element
     function calculateDistance(mouseX, mouseY, element) {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;  // X center of the element
        const elementY = rect.top + rect.height / 2;  // Y center of the element

        // Calculate Euclidean distance between mouse and the center of the element
        const distance = Math.sqrt(
            Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
        );
        return distance;
    }

    window.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;  // Horizontal mouse position
        const mouseY = event.clientY;  // Vertical mouse position

        const distance = calculateDistance(mouseX, mouseY, textElement);
        console.log(distance);

        const maxDistance = Math.sqrt(
            Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
        );  // Maximum distance based on window size

        // Map the distance to a font weight value between 100 (far away) and 900 (close)
        const fontWeight = Math.min(
            Math.max(200 - (distance / maxDistance) * 200, 100),  //range from 100 to 200
            200
        );

        // Apply the font weight dynamically
        textElement.style.fontWeight = fontWeight;
    });

