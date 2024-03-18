document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const customFileUpload = document.getElementById('customFileUpload');
    const imagePreview = document.getElementById('imagePreview');
    const messageInput = document.getElementById('message');
    const status = document.getElementById('status');
    const uploadButton = document.getElementById('uploadButton');

    fileInput.addEventListener('change', handleFileSelect);

    let uploadedImages = [];

    function handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 0) {
            uploadedImages = [];
            imagePreview.innerHTML = '';
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
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
                uploadedImages.push(file);
            }
        } else {
            imagePreview.innerHTML = '<span>Choose files</span>';
        }
    }

    uploadButton.addEventListener('click', uploadImages);

    async function uploadImages() {
        if (uploadedImages.length === 0) {
            alert('Please select images to upload.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < uploadedImages.length; i++) {
            formData.append('image', uploadedImages[i]);
        }

        // Add optional message to the FormData
        const message = messageInput.value.trim();
        if (message !== '') {
            formData.append('message', message);
        }

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=bc0128afc43bdda4d55e79c3781728ac', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data && data.data && data.data.url) {
                const imageUrls = uploadedImages.map((image, index) => data.data.image.url);
                const fullUrl = `http://beta.masttools.com/img-share/view.html?img=${imageUrls.join(',')}`;

                // Shorten URL using TinyURL's HTTPS version
                const responseTinyUrl = await fetch(`https://tinyurl.com/api-create.php?url=${fullUrl}`);
                const tinyUrl = await responseTinyUrl.text();

                status.innerHTML = `Images uploaded successfully!`;

                // Generate shareable URL
                const shareUrl = encodeURIComponent(tinyUrl);

                // Try to open web share dialog
                if (navigator.share) {
                    await navigator.share({
                        title: 'Share Images',
                        text: message,
                        url: tinyUrl
                    });
                } else {
                    // If web share not supported, open WhatsApp with the generated URL
                    window.location.href = `whatsapp://send?text=${message} ${shareUrl}`;
                }
            } else {
                status.innerHTML = 'Failed to upload images.';
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            status.innerHTML = 'An error occurred while uploading the images.';
        }
    }
});
