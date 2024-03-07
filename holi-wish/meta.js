document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var friendName = urlParams.get('name') || 'Friend';
    var friendImage = decodeURIComponent(urlParams.get('img')) || '';

    // Set meta tags dynamically
    setMetaTags(friendName, friendImage);
});

function setMetaTags(friendName, friendImage) {
    // Set the title tag
    document.title = `${friendName}'s Greeting Card`;

    // Set the description meta tag (customize this as needed)
    var greetingMessage = "A personalized greeting card for your friend.";
    
    // Set Open Graph meta tags
    setOpenGraphMetaTags(friendName, greetingMessage, friendImage);
}

function setOpenGraphMetaTags(friendName, greetingMessage, friendImage) {
    // Set Open Graph title
    var ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
        ogTitleMeta.content = `${friendName}'s Greeting Card`;
    }

    // Set Open Graph description
    var ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
        ogDescriptionMeta.content = greetingMessage;
    }

    // Set Open Graph image
    var ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
        ogImageMeta.content = friendImage;
    }

    // Set any other Open Graph meta tags as needed
}
