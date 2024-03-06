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
    var speed = 50; // Speed of typing (adjust as needed)

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}
