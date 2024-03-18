document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const customFileUpload = document.getElementById('customFileUpload');
    const imagePreview = document.getElementById('imagePreview');
    const status = document.getElementById('status');
    const uploadButton = document.getElementById('uploadButton');
    const shareButton = document.getElementById('shareButton');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 0) {
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
            }
        } else {
            imagePreview.innerHTML = '<span>Choose files</span>';
        }
    }

    uploadButton.addEventListener('click', uploadImages);

    async function uploadImages() {
        const files = fileInput.files;

        if (files.length === 0) {
            alert('Please select images to upload.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=bc0128afc43bdda4d55e79c3781728ac', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data && data.data && data.data.url) {
                const imageUrl = data.data.url;
                const viewUrl = `example.com/view.html?img=${imageUrl}`;
                status.innerHTML = `Images uploaded successfully!`;
                
                // Show the share button
                shareButton.style.display = 'inline';
                shareButton.dataset.shareUrl = viewUrl;
            } else {
                status.innerHTML = 'Failed to upload images.';
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            status.innerHTML = 'An error occurred while uploading the images.';
        }
    }

    shareButton.addEventListener('click', function() {
        const shareUrl = this.dataset.shareUrl;
        if (navigator.share) {
            navigator.share({
                title: 'Check out this image!',
                text: 'Shared from my website.',
                url: shareUrl,
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
            console.log('Web Share API not supported');
        }
    });
});
