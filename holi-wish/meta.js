document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // Get user card details from URL parameters
    var friendName = decodeURIComponent(urlParams.get('name')) || '';
    var friendImage = decodeURIComponent(urlParams.get('img')) || '';
    var greetingMessage = decodeURIComponent(urlParams.get('message')) || '';

    // Set Open Graph and other meta tags
    setMetaTags(friendName, friendImage, greetingMessage);
});

function setMetaTags(friendName, friendImage, greetingMessage) {
    // Set title
    document.title = friendName + "'s Greeting Card";

    // Set Open Graph tags
    setOpenGraphTags(friendName, friendImage, greetingMessage);

    // Add more meta tags as needed
}

function setOpenGraphTags(friendName, friendImage, greetingMessage) {
    // Set Open Graph title
    var ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
        ogTitleMeta.content = friendName + "'s Greeting Card";
    }

    // Set Open Graph description (use the greeting message for this example)
    var ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
        ogDescriptionMeta.content = greetingMessage;
    }

    // Set Open Graph image
    var ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
        ogImageMeta.content = friendImage;
    }
    // Add more Open Graph tags as needed
}
