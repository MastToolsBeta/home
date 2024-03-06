var audioForName = new Audio("../assets/sounds/enter-name.mp3");
var audioForImage = new Audio("../assets/sounds/choose-photo.mp3");
var audioForMessage = new Audio("../assets/sounds/write-message.mp3");
var audioForError = new Audio("../assets/sounds/error.mp3");

var currentlyPlayingAudio = null;
var friendNameInput = document.getElementById("friend_name");
var friendImageInput = document.getElementById("friend_image");
var greetingMessageTextarea = document.getElementById("greeting_message");

// Example wishes array
var exampleWishes = [
    "रंगों की मस्ती, खुशियों का समा, दिल से निकलती हैं मुस्कानें, जीवन में हर कोने से आता है प्यार का रंग। होली का त्योहार आया है, मैं चाहता हूँ, आपका जीवन हमेशा हर रंगों से भरा रहे। होली की हार्दिक शुभकामनाएं!",
    "रंगीनी रातें, रंगों की बहार, दोस्तों की मिठास, परिवार का प्यार, हर किसी की आँखों में चमकता है एक प्यारा सा इज़हार। होली की ढेर सारी शुभकामनाएं!",
    "गुलाल की महक, सजीव रंगों का संग, आपके जीवन में हो एक खास सा हरिता रंग। मेरी दुआ है कि आपका हर पल हो मिठास से भरा। होली की हार्दिक शुभकामनाएं!",
    "रंगीनी हवा, मिठास का संगम, दोस्तों का साथ, परिवार का प्यार, होली के इस प्यार भरे मौसम में, आपका दिल कभी ना छोड़े मुस्कराहट का रंग। होली की ढेर सारी शुभकामनाएं!",
    "रंगों की बरसात, दिल की धड़कनों की बेकारारी, होली के इस त्योहार में, मिले सभी को खुशियों की प्यारी सी बहारी। होली की हार्दिक शुभकामनाएं!",
    "6",
    "7"
];


// Set a random example wish on page load
greetingMessageTextarea.value = exampleWishes[Math.floor(Math.random() * exampleWishes.length)];

// Retrieve the existing history from localStorage on page load
var shortenedLinksHistory = JSON.parse(localStorage.getItem('shortenedLinksHistory')) || [];

// Display the existing history
displayHistory();

friendNameInput.addEventListener("click", function() {
    playAudio(audioForName);
});

friendImageInput.addEventListener("click", function() {
    // Play the audio when the user clicks to choose a file
    playAudio(audioForImage);
});

// Remove the previous change event listener for friendImageInput

greetingMessageTextarea.addEventListener("focus", function() {
    playAudio(audioForMessage);
});


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('greetingForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (!isFormValid()) {
            playAudio(audioForError);
        } else {
            submitForm();
        }
    });
});


function isFormValid() {
    var isValid = friendNameInput.validity.valid && friendImageInput.validity.valid && greetingMessageTextarea.validity.valid;
    if (!isValid) {
        playAudio(audioForError);
    }
    return isValid;
}

function playAudio(audio) {
    if (currentlyPlayingAudio !== null && !currentlyPlayingAudio.paused) {
        currentlyPlayingAudio.pause();
    }
    audio.play();
    currentlyPlayingAudio = audio;
}

function submitForm() {
    document.querySelector('form').style.display = 'none';
    document.getElementById('processing-animation').style.display = 'block';
    document.querySelector('button[type="submit"]').disabled = true;

    uploadImage()
        .then(function (imageUrl) {
            // Trim extra spaces from the friend name
            var trimmedFriendName = friendNameInput.value.trim();
            
            var greetingLink = constructGreetingLink(imageUrl);
            shortenUrl(greetingLink)
                .then(function (shortUrl) {
                    // Pass the trimmed friendName here
                    showResult(shortUrl, trimmedFriendName);
                })
                .catch(function (error) {
                    console.error("Error shortening URL:", error);
                    // Pass the trimmed friendName even in case of an error
                    showResult(greetingLink, trimmedFriendName);
                });
        })
        .catch(function (error) {
            console.error("Error uploading image:", error);
            // Pass the trimmed friendName even in case of an error
            showResult("Error creating greeting card. Please try again.", trimmedFriendName);
        });
}



function uploadImage() {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append('image', friendImageInput.files[0]);

        // Use imgbb API for simplicity. Replace with your own image upload logic.
        fetch('https://api.imgbb.com/1/upload?key=bc0128afc43bdda4d55e79c3781728ac', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.url) {
                resolve(data.data.url);
            } else {
                reject("Invalid response from image upload API");
            }
        })
        .catch(error => reject(error));
    });
}

function shortenUrl(url) {
    return new Promise(function (resolve, reject) {
        var apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.shorturl) {
                    // Notify Telegram when URL is successfully shortened
                    notifyTelegram(data.shorturl);

                    // Update the history with the new shortened link
                    updateHistory(data.shorturl);

                    resolve(data.shorturl);
                } else {
                    reject("Invalid response from is.gd API");
                }
            })
            .catch(error => reject(error));
    });
}


function notifyTelegram(shortenedUrl) {
    var telegramBotKey = '6883902738:AAHioEWU2CkYWiiKSTRniLJ3Wc4VFXGa7hQ';
    var telegramChatId = '5192707470';
    var telegramApiUrl = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;

    // Create the Telegram message with the shortened URL
    var telegramMessage = `🌐 Greeting Card URL Shortened!\n\nShortened URL: ${shortenedUrl}`;

    // Send the message to the Telegram bot
    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Telegram notification sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending Telegram notification:', error);
    });
}

function constructGreetingLink(imageUrl) {
    var name = encodeURIComponent(friendNameInput.value);
    var img = encodeURIComponent(imageUrl);
    var message = encodeURIComponent(greetingMessageTextarea.value);

    // Replace with your actual GitHub Pages URL or other hosting URL
    var baseURL = "http://beta.masttools.com/holi-wish/view.html";

    return `${baseURL}?name=${name}&img=${img}&message=${message}`;
}

function updateHistory(shortenedUrl) {
    var friendName = friendNameInput.value; // Get the friend's name
    shortenedLinksHistory.push({ url: shortenedUrl, name: friendName });
    saveHistoryToLocalStorage(); // Save the updated history to localStorage
    displayHistory();
}

function displayHistory() {
    var historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    // Reverse the order of the array to display the last link on top
    shortenedLinksHistory.slice().reverse().forEach(function (entry) {
        var listItem = document.createElement('li');
        listItem.textContent = `For ${entry.name} - `;
        var linkElement = document.createElement('a');
        linkElement.href = entry.url;
        linkElement.textContent = entry.url;
        linkElement.className = 'history-link'; // Add a class to the link
        listItem.appendChild(linkElement);

        listItem.addEventListener('click', function () {
            copyToClipboard(entry.url);
        });
        historyList.appendChild(listItem);
    });
}


function saveHistoryToLocalStorage() {
    localStorage.setItem('shortenedLinksHistory', JSON.stringify(shortenedLinksHistory));
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function () {
            alert('Link copied to clipboard!');
        })
        .catch(function (err) {
            console.error('Unable to copy to clipboard', err);
        });
}

function showResult(greetingLink, friendName) {
    document.getElementById('processing-animation').style.display = 'none';
    var resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    // Set the inner HTML of the result div
    resultDiv.innerHTML = `
        <h2>Congratulations!<br>${friendName}'s Greeting Card is ready</h2>
        <p id="greetingLink">${greetingLink}</p>
        <button id="openLink">Open Link</button>
        <button id="copyLink">Copy Link</button>
        <button id="shareWhatsApp">Share on WhatsApp</button>
    `;

    // Attach event listeners to the buttons (you can keep your existing event listeners here)
    document.getElementById('openLink').addEventListener('click', function () {
        window.open(greetingLink, '_blank');
    });

    document.getElementById('copyLink').addEventListener('click', function () {
        copyToClipboard(greetingLink);
    });

    document.getElementById('shareWhatsApp').addEventListener('click', function () {
        var whatsappMessage = `🎉 * होली की हार्दिक शुभकामनाएं, ${friendName}*! इस रंगीन अवसर पर मैंने आपको एक *खास* संदेश भेजा है। इस लिंक पर क्लिक करके देखो: 🎁 *${greetingLink}* और बताओ कैसा लगा! 😊`;

        // Notify on Telegram about the new link
        notifyTelegram(greetingLink);

        var whatsappLink = `whatsapp://send?text=${encodeURIComponent(whatsappMessage)}`;
        window.location.href = whatsappLink;
    });
}
