document.addEventListener("DOMContentLoaded", function () {
    const colorBlast = document.getElementById("colorBlast");
    const images = colorBlast.getElementsByTagName("img");

    function getRandomPosition() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const randomX = Math.floor(Math.random() * screenWidth);
        const randomY = Math.floor(Math.random() * screenHeight);

        return { x: randomX, y: randomY };
    }

    function createBlastEffect(x, y) {
        const blastElement = document.createElement("div");
        blastElement.classList.add("blast");
        blastElement.style.left = x + "px";
        blastElement.style.top = y + "px";
        document.body.appendChild(blastElement);

        setTimeout(function () {
            document.body.removeChild(blastElement);
        }, 500);
    }

    function popUpAndReposition(image, delay) {
        setTimeout(function () {
            function animate() {
                const randomPosition = getRandomPosition();

                // Set the initial position
                image.style.left = randomPosition.x + "px";
                image.style.top = randomPosition.y + "px";

                // Display the image
                image.style.display = "block";

                // Hide the image after 3 seconds with bomb blast effect
                setTimeout(function () {
                    // Create a bomb blast effect at the current image position
                    createBlastEffect(randomPosition.x, randomPosition.y);

                    // Hide the image
                    image.style.display = "none";

                    // Call animate again after 3 seconds for the next iteration
                    setTimeout(animate, 6000);
                }, 9000);
            }

            // Initial call to start the animation loop
            animate();
        }, delay);
    }

    // Trigger the pop-up and reposition for each image with individual delays
    for (let i = 0; i < images.length; i++) {
        // Add a delay for each image based on its index
        popUpAndReposition(images[i], i * 1000);
    }
});