// Function to save uploaded image URL to Firebase Realtime Database
function saveImageUrlToDatabase(imageUrl) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const userId = currentUser.uid;
        firebase.database().ref('users/' + userId + '/images').push(imageUrl)
            .then(() => {
                console.log('Image URL saved to database');
            })
            .catch(error => {
                console.error('Error saving image URL to database:', error);
            });
    } else {
        console.error('User not authenticated.');
    }
}

// Function to handle image upload
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = 'cb18ceb77734bc133ae0cb04ec665605'; // Your ImgBB API key

    try {
        // Show loading spinner
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'flex';

        const response = await fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data); // Use data to display or process the uploaded image

        // Hide loading spinner
        spinner.style.display = 'none';

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
                    deleteImageUrlFromDatabase(imageUrl);
                    imageContainer.remove();
                }
            });
            imageContainer.appendChild(deleteButton);

            // Prepend the new image container to the gallery
            gallery.insertBefore(imageContainer, gallery.firstChild);

            // Save uploaded image URL to Firebase Realtime Database
            saveImageUrlToDatabase(imageUrl);
        } else {
            console.error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Function to delete image URL from Firebase Realtime Database
function deleteImageUrlFromDatabase(imageUrl) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const userId = currentUser.uid;
        firebase.database().ref('users/' + userId + '/images').orderByValue().equalTo(imageUrl).once('value')
            .then(snapshot => {
                snapshot.forEach(child => {
                    child.ref.remove();
                });
                console.log('Image URL deleted from database');
            })
            .catch(error => {
                console.error('Error deleting image URL from database:', error);
            });
    } else {
        console.error('User not authenticated.');
    }
}

// Function to fetch image URLs from Firebase Realtime Database and display images
function fetchAndDisplayImages() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const userId = currentUser.uid;
        const gallery = document.getElementById('gallery');

        // Reference to the user's images in the database
        const imagesRef = firebase.database().ref('users/' + userId + '/images');

        // Listen for changes in the images
        imagesRef.on('value', snapshot => {
            gallery.innerHTML = ''; // Clear existing images
            const data = snapshot.val();
            if (data) {
                Object.values(data).forEach(imageUrl => {
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
                            deleteImageUrlFromDatabase(imageUrl);
                            imageContainer.remove();
                        }
                    });
                    imageContainer.appendChild(deleteButton);

                    // Append the new image container to the gallery
                    gallery.appendChild(imageContainer);
                });
            } else {
                // If no images found, display a message to the user
                const message = document.createElement('div');
                message.classList.add('message-container');
                message.innerHTML = `
                    <p>You can securely upload and store images here.</p>
                    <ul>
                        <li>No Ads</li>
                        <li>Direct Linking</li>
                        <li>Unlimited Space</li>
                        <li>32 MB file size per image</li>
                    </ul>
                `;
                gallery.appendChild(message);
            }
        });
    } else {
        console.log('User not authenticated. Waiting for user authentication...');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('User authenticated. Fetching images...');
                fetchAndDisplayImages(); // User is authenticated, retry fetching images
            } else {
                console.error('User not authenticated.');
            }
        });
    }
}

// Call the function to fetch and display images when the page loads
window.onload = fetchAndDisplayImages;


// Automatically trigger image upload when files are selected
document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 0) {
        // Loop through all selected files and upload each one
        for (const file of files) {
            uploadImage(file);
        }
    }
});

// Hide upload button

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