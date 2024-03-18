document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const customFileUpload = document.getElementById('customFileUpload');
    const imagePreview = document.getElementById('imagePreview');
    const status = document.getElementById('status');
    const uploadButton = document.getElementById('uploadButton');

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

                // Check if the Web Share API is supported
                if (navigator.share) {
                    const shareData = {
                        title: 'Check out this image!',
                        text: 'Shared from my website.',
                        url: viewUrl,
                    };
                    navigator.share(shareData)
                        .then(() => console.log('Shared successfully'))
                        .catch((error) => console.error('Error sharing:', error));
                } else {
                    // Provide link for copying
                    const copyLink = document.createElement('input');
                    copyLink.setAttribute('type', 'text');
                    copyLink.setAttribute('value', viewUrl);
                    document.body.appendChild(copyLink);
                    copyLink.select();
                    document.execCommand('copy');
                    document.body.removeChild(copyLink);
                    alert('Image link copied to clipboard:\n' + viewUrl);
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
