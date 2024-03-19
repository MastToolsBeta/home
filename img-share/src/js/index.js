document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const customFileUpload = document.getElementById('customFileUpload');
    const imagePreview = document.getElementById('imagePreview');
    const messageInput = document.getElementById('message');
    const status = document.getElementById('status');
    const uploadButton = document.getElementById('uploadButton');
    const spinner = document.getElementById('spinner');
    const imageCount = document.getElementById('imageCount');

    fileInput.addEventListener('change', handleFileSelect);

    let uploadedImages = [];

    function handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 0) {
            uploadedImages = Array.from(files); // Convert FileList to Array
            imagePreview.innerHTML = '';
            uploadedImages.forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "Preview";
                    img.style.maxWidth = '100px';
                    img.style.maxHeight = '100px';
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
            imageCount.textContent = `0/${uploadedImages.length} uploaded`;
        } else {
            imagePreview.innerHTML = '<span>Choose files</span>';
            imageCount.textContent = '';
        }
    }

    uploadButton.addEventListener('click', uploadImages);

    async function uploadImages() {
        if (uploadedImages.length === 0) {
            alert('Please select images to upload.');
            return;
        }

        spinner.style.display = 'flex';
        uploadButton.disabled = true;

        try {
            const imageUrls = [];
            let retryImages = uploadedImages.slice(); // Make a copy of the original array to retry failed uploads
            let retryLimit = 3; // Set a limit for the number of retries

            while (retryImages.length > 0 && retryLimit > 0) {
                const currentImage = retryImages.shift(); // Get the first image from the retry array
                const formData = new FormData();
                formData.append('image', currentImage);

                const response = await fetch('https://api.imgbb.com/1/upload?key=bc0128afc43bdda4d55e79c3781728ac', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data && data.data && data.data.url) {
                    imageUrls.push(data.data.url);
                    // Update image count
                    imageCount.textContent = `${imageUrls.length}/${uploadedImages.length} uploaded`;
                } else {
                    console.error('Failed to upload image:', data.error.message);
                    retryImages.push(currentImage); // Add the failed image back to the retry array
                    retryLimit--; // Decrement the retry limit
                }
            }

            // Hide spinner after successful upload
            spinner.style.display = 'none';

            if (retryImages.length > 0) {
                throw new Error(`Failed to upload ${retryImages.length} image(s).`);
            }

            const fullUrl = `http://beta.masttools.com/img-share/view.html?img=${imageUrls.join(',')}`;

            // Shorten URL using TinyURL's HTTPS version
            const responseTinyUrl = await fetch(`https://tinyurl.com/api-create.php?url=${fullUrl}`);
            const tinyUrl = await responseTinyUrl.text();

            status.innerHTML = `Images uploaded successfully!`;

            // Add optional message to the share URL
            const message = `${messageInput.value.trim()} See image 👉 `;
            const shareUrl = message
                ? `${tinyUrl}&text=${encodeURIComponent(message)}`
                : tinyUrl;

            // Try to open web share dialog
            if (navigator.share) {
                await navigator.share({
                    title: 'Share Images',
                    text: message,
                    url: tinyUrl,
                });
            } else {
                // If web share not supported, open WhatsApp with the generated URL
                window.location.href = `whatsapp://send?text=${shareUrl}`;
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            status.innerHTML = 'An error occurred while uploading the images.';
            // Hide spinner and enable upload button in case of error
            spinner.style.display = 'none';
            uploadButton.disabled = false;
        }
    }
});
