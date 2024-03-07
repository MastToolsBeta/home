document.addEventListener('DOMContentLoaded', function () {
    // Parse URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var friendName = urlParams.get('name') || 'Friend';
    var imageUrl = urlParams.get('img') || '';
    var greetingMessage = decodeURIComponent(urlParams.get('message')) || '';

    // Display the "Tap to View" section
    displayTapToView(friendName);

    // Add a click event to the "Tap to View" section
    document.getElementById('tap-gif').addEventListener('click', function () {
        // Hide the "Tap to View" section
        hideTapToView();

        // Display the actual greeting card content
        displayGreetingCard(friendName, imageUrl, greetingMessage);

        // Update meta tags
        updateMetaTags(friendName, imageUrl, greetingMessage);
    });
});

function displayTapToView(friendName) {
    // Set the friend's name in the "Hi, friend_name" span
    document.getElementById('friend-name').innerText = friendName;

    // Show the "Tap to View" section
    document.getElementById('tap-to-view').style.display = 'flex';
}

function hideTapToView() {
    // Hide the "Tap to View" section
    document.getElementById('tap-to-view').style.display = 'none';
}

function displayGreetingCard(friendName, imageUrl, greetingMessage) {
    // Display the friend's name in the greeting card content
    document.getElementById('greeting-name').innerText = friendName;

    // Display the image in the greeting card content
    var imageElement = document.getElementById('greeting-image');
    imageElement.src = imageUrl;
    imageElement.alt = 'Greeting Image';

    // Show the greeting card content
    document.getElementById('greeting-card-content').style.display = 'flex';

    // Trigger the typewriter effect for the main message
    typewriterEffect('greeting-message', greetingMessage);
}

function typewriterEffect(elementId, text) {
    var element = document.getElementById(elementId);
    element.innerHTML = ''; // Clear existing content

    var i = 0;
    var speed = 200; // Speed of typing (adjust as needed)

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function updateMetaTags(friendName, imageUrl, greetingMessage) {
    // Update meta tags dynamically
    document.title = `${friendName}'s Greeting Card`;
    
    // Create or update the description meta tag
    var descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = `Check out ${friendName}'s personalized greeting card with a special message and image.`;

    // Update Open Graph meta tags (for social media sharing)
    var ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
        ogTitleMeta = document.createElement('meta');
        ogTitleMeta.property = 'og:title';
        document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.content = `${friendName}'s Greeting Card`;

    var ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescriptionMeta) {
        ogDescriptionMeta = document.createElement('meta');
        ogDescriptionMeta.property = 'og:description';
        document.head.appendChild(ogDescriptionMeta);
    }
    ogDescriptionMeta.content = descriptionMeta.content;

    var ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.property = 'og:image';
        document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.content = imageUrl || 'default-image-url.jpg'; // Provide a default image URL if imageUrl is not available
}
