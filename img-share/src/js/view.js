document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('imageContainer');

    // Get the value of the img parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const imgParam = urlParams.get('img');

    // Split the imgParam into an array of image URLs
    const imgUrls = imgParam ? imgParam.split(',') : [];

    // Display images in the image container
    imgUrls.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = decodeURIComponent(imgUrl);
        imageContainer.appendChild(img);
    });
});
