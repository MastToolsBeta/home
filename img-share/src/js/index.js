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
            for (let i = 0; i < uploadedImages.length; i++) {
                const formData = new FormData();
                formData.append('image', uploadedImages[i]);

                const response = await fetch('https://api.imgbb.com/1/upload?key=bc0128afc43bdda4d55e79c3781728ac', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data && data.data && data.data.url) {
                    imageUrls.push(data.data.url);
                    // Update image count
                    imageCount.textContent = `${i + 1}/${uploadedImages.length} uploaded`;
                } else {
                    throw new Error('Failed to upload image');
                }
            }

            // Hide spinner and image count after successful upload
            spinner.style.display = 'none';
            imageCount.textContent = '';

            const fullUrl = `http://masttools.com/img-share/view.html?img=${imageUrls.join(',')}`;

            // Shorten URL using TinyURL's HTTPS version
            const responseTinyUrl = await fetch(`https://tinyurl.com/api-create.php?url=${fullUrl}`);
            const tinyUrl = await responseTinyUrl.text();

            status.innerHTML = `Images uploaded successfully!`;

            // Add optional message to the share URL
            const message = messageInput.value.trim();
            const shareUrl = message ? `See image 👉 ${tinyUrl}&text=${encodeURIComponent(message)}` : tinyUrl;

            // Try to open web share dialog
            if (navigator.share) {
                await navigator.share({
                    title: 'Share Images',
                    text: message,
                    url: tinyUrl
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
