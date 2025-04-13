const textElement = document.getElementById('text');

        window.addEventListener('mousemove', (event) => {
            let mouseX = event.clientX;  // Vertical mouse position
            let windowWidth = window.innerWidth;

           /* let fontWeight = (mouseX / windowWidth * 100) + 100; //mapping font weight to mouse pos

            fontWeight = Math.min(Math.max(fontWeight, 100), 200);*/

            //let fontWeight = Math.min(Math.max(((mouseX / windowWidth) * 100) +100, 100), 200);  // Example mapping
            let fontWeight = (mouseX / windowWidth) * 100 + 100;
            // Apply the font width dynamically
            textElement.style.fontWeight = fontWeight;
        });
