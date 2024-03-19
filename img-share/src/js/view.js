document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('gallery');

    // Get the image URL parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const imgParam = urlParams.get('img');

    // Split the imgParam into an array of image URLs
    const imgUrls = imgParam ? imgParam.split(',') : [];

    // Function to fetch images from URLs
    async function fetchImages() {
        try {
            // Clear previous images if any
            imageContainer.innerHTML = '';

            // Loop through image URLs and create img elements
            for (const imgUrl of imgUrls) {
                if (imgUrl.endsWith('.mp4')) {
                    const video = document.createElement('video');
                    video.classList.add('video');
                    video.setAttribute('controls', '');
                    const source = document.createElement('source');
                    source.src = imgUrl;
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    imageContainer.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.classList.add('img');
                    imageContainer.appendChild(img);
                }
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    // Call the function to fetch images
    fetchImages();
});

$(document).ready(function(){
    $("img").click(function(){
        var t = $(this).attr("src");
        $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
        $("#myModal").css("display", "block");
    });
  
    $("video").click(function(){
        var v = $("video > source");
        var t = v.attr("src");
        $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
        $("#myModal").css("display", "block");
    });

    $(".close").click(function(){
        $("#myModal").css("display", "none");
    });
});
