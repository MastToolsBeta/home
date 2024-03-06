
    // Function to get URL parameters
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Function to set content based on URL parameters
    function setContent() {
        var name = getParameterByName('name');
        var image = getParameterByName('img');
        var message = getParameterByName('message');

        // Set content to the HTML elements
        document.getElementById('name').innerText = name;
        document.getElementById('message').innerText = message;
        document.querySelector('img').src = image;
    }

    // Call the function to set content when the page loads
    window.onload = setContent;

