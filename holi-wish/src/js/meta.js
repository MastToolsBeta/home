document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var friendName = urlParams.get('name') || 'Friend';
    var imageUrl = urlParams.get('img') || 'default-image-url.jpg';
    var greetingMessage = decodeURIComponent(urlParams.get('message')) || '';

    // Set meta tags based on user card data
    setMetaTags(friendName, greetingMessage, imageUrl);
});

function setMetaTags(friendName, greetingMessage, imageUrl) {
    // Set the title meta tag
    setMetaTagContent('title', `${friendName}'s Greeting Card`);

    // Set the description meta tag
    setMetaTagContent('description', `Check out the personalized greeting card for ${friendName}. ${greetingMessage}`);

    // Set the image meta tag
    setMetaTagContent('image', imageUrl);
}

function setMetaTagContent(tagId, content) {
    var metaTag = document.getElementById(tagId);
    if (metaTag) {
        metaTag.content = content;
    }
}
