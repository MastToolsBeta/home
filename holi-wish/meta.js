document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var friendName = urlParams.get('name') || 'Friend';
    var imageUrl = urlParams.get('img') || '';
    var greetingMessage = decodeURIComponent(urlParams.get('message')) || '';

    // Set meta tags based on user card data
    setMetaTags(friendName, greetingMessage, imageUrl);
});

function setMetaTags(friendName, greetingMessage, imageUrl) {
    // Set the title tag
    var title = `${friendName}'s Greeting Card`;
    document.title = title;

    // Set the description meta tag
    var description = `Check out the personalized greeting card for ${friendName}. ${greetingMessage}`;
    setMetaTag('description', description);

    // Set the image meta tag
    setMetaTag('og:image', imageUrl);
}

function setMetaTag(property, content) {
    var metaTag = document.querySelector(`meta[property="${property}"]`);
    if (metaTag) {
        metaTag.content = content;
    } else {
        // Create the meta tag if it doesn't exist
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.content = content;
        document.head.appendChild(metaTag);
    }
}
