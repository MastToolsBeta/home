document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var friendName = urlParams.get('name') || 'Friend';
    var greetingMessage = decodeURIComponent(urlParams.get('message')) || '';

    // Set meta tags dynamically
    setMetaTags(friendName, greetingMessage);
});

function setMetaTags(friendName, greetingMessage) {
    // Set the title tag
    document.title = `${friendName}'s Greeting Card`;

    // Set the description meta tag
    var descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
        descriptionMeta.content = `${friendName}'s personalized greeting card. ${greetingMessage}`;
    }

    // Set any other meta tags as needed

    // For example, you can set Open Graph (OG) meta tags for social sharing
    setOpenGraphMetaTags(friendName, greetingMessage);
}

function setOpenGraphMetaTags(friendName, greetingMessage) {
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

    // Set Open Graph image (replace with the actual image URL)
    var ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
        ogImageMeta.content = 'https://example.com/path/to/your/image.jpg';
    }

    // Set any other Open Graph meta tags as needed
}
