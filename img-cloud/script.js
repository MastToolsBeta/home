// Function to save uploaded image URL to localStorage
function saveImageUrlToLocalStorage(imageUrl) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(imageUrl);
    localStorage.setItem('images', JSON.stringify(images));
}

// Function to load images from localStorage
function loadImagesFromLocalStorage() {
    const images = JSON.parse(localStorage.getItem('images'));
    if (images) {
        const gallery = document.getElementById('gallery');
        images.forEach(imageUrl => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imageContainer.appendChild(imgElement);

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                if (confirm("Are you sure you want to delete this image?")) {
                    deleteImageUrlFromLocalStorage(imageUrl);
                    imageContainer.remove();
                }
            });
            imageContainer.appendChild(deleteButton);

            gallery.appendChild(imageContainer);
        });
    }
}

// Function to handle image upload
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = 'cb18ceb77734bc133ae0cb04ec665605'; // Your ImgBB API key

    try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data); // Use data to display or process the uploaded image
        if (data.data && data.data.url) {
            const imageUrl = data.data.url;
            const gallery = document.getElementById('gallery');
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imageContainer.appendChild(imgElement);

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                if (confirm("Are you sure you want to delete this image?")) {
                    deleteImageUrlFromLocalStorage(imageUrl);
                    imageContainer.remove();
                }
            });
            imageContainer.appendChild(deleteButton);

            // Prepend the new image container to the gallery
            gallery.insertBefore(imageContainer, gallery.firstChild);

            // Save uploaded image URL to localStorage
            saveImageUrlToLocalStorage(imageUrl);
        } else {
            console.error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Function to delete image URL from localStorage
function deleteImageUrlFromLocalStorage(imageUrl) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const filteredImages = images.filter(img => img !== imageUrl);
    localStorage.setItem('images', JSON.stringify(filteredImages));
}

// Load images from localStorage when the page loads
window.onload = loadImagesFromLocalStorage;

// Automatically trigger image upload when a file is selected
document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 0) {
        uploadImage(files[0]);
    }
});

// Hide upload button on scroll up
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        document.getElementById("uploadButton").classList.add("hide-on-scroll-up");
    } else {
        document.getElementById("uploadButton").classList.remove("hide-on-scroll-up");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
