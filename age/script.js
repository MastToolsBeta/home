document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners to date input fields
  var fromDateInput = document.getElementById('fromDate');
  var toDateInput = document.getElementById('toDate');

  fromDateInput.addEventListener('input', function () {
    autoFormatDate(fromDateInput);
    validateDateInput(fromDateInput);
  });

  toDateInput.addEventListener('input', function () {
    autoFormatDate(toDateInput);
    validateDateInput(toDateInput);
  });

  // Set the 'inputmode' attribute to suggest a numeric keyboard on mobile devices
  fromDateInput.setAttribute('inputmode', 'numeric');
  toDateInput.setAttribute('inputmode', 'numeric');

  // Auto-fill current date in To Date input on page load
  var currentDate = new Date();
  var currentDateString =
    currentDate.getDate().toString().padStart(2, '0') + '/' +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
    currentDate.getFullYear().toString();
  toDateInput.value = currentDateString;
});

function autoFormatDate(input) {
  var inputValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
  if (inputValue.length > 2) {
    inputValue = inputValue.substring(0, 2) + '/' + inputValue.substring(2);
  }
  if (inputValue.length > 5) {
    inputValue = inputValue.substring(0, 5) + '/' + inputValue.substring(5, 9);
  }
  input.value = inputValue;
}

function validateDateInput(input) {
  var inputValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters

  if (inputValue.length === 8) {
    var day = parseInt(inputValue.substring(0, 2), 10);
    var month = parseInt(inputValue.substring(2, 4), 10);
    var year = parseInt(inputValue.substring(4, 8), 10);

    var currentYear = new Date().getFullYear();

    if (day > 31 || month > 12 || year > currentYear) {
      alert("Please enter a valid date.");
      input.value = ''; // Clear the input if the date is invalid
    }
  }
}

function calculateAge() {
  var fromDate = parseDate(document.getElementById('fromDate').value);
  var toDateInput = document.getElementById('toDate').value;

  var toDate;
  if (toDateInput === '') {
    toDate = new Date(); // Use today's date if "To Date" is not specified
  } else {
    toDate = parseDate(toDateInput);
  }

  if (!fromDate || !toDate || fromDate >= toDate) {
    alert("Please enter valid dates. 'From Date' should be earlier than 'To Date'.");
    return;
  }

  var ageInMilliseconds = toDate - fromDate;
  var ageInSeconds = ageInMilliseconds / 1000;
  var ageInMinutes = ageInSeconds / 60;
  var ageInHours = ageInMinutes / 60;
  var ageInDays = ageInHours / 24;
  var ageInWeeks = ageInDays / 7;
  var ageInMonths = ageInDays / 30.44; // average days in a month
  var ageInYears = ageInMonths / 12;

  // Calculate remaining days after calculating years and months
  var remainingDays = Math.floor(ageInDays % 30.44);

  // Format the result with line breaks
  var resultString =
    "Age:\n" +
    Math.floor(ageInYears) + " years " +
    Math.floor(ageInMonths % 12) + " months " +
    remainingDays + " days\n" +
    "or " + Math.floor(ageInMonths) + " months " +
    remainingDays + " days\n" +
    "or " + Math.floor(ageInWeeks) + " weeks " +
    remainingDays + " days\n" +
    "or " + Math.floor(ageInDays) + " days\n" +
    "or " + Math.floor(ageInHours) + " hours\n" +
    "or " + Math.floor(ageInMinutes) + " minutes\n" +
    "or " + Math.floor(ageInSeconds) + " seconds";

  // Display the result in a table-like format with typing effect
  displayResultInTableWithTyping(resultString);
}

function displayResultInTableWithTyping(resultString) {
  var lines = resultString.split('\n');
  var resultTable = document.createElement('table');
  var resultElement = document.getElementById('result');
  resultElement.innerHTML = '';

  function displayLine(index) {
    var row = resultTable.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = lines[index];

    // Typing effect for each character in the line
    var currentChar = 0;

    function typeCharacter() {
      if (currentChar < lines[index].length) {
        setTimeout(function () {
          var clonedTable = resultTable.cloneNode(true);
          resultElement.innerHTML = '';
          resultElement.appendChild(clonedTable);

          cell.innerHTML = lines[index].substring(0, currentChar + 1);
          currentChar++;
          typeCharacter();
        }, 50); // Adjust the typing speed (milliseconds)
      } else {
        // Move to the next line after completing the current line
        setTimeout(function () {
          if (index < lines.length - 1) {
            displayLine(index + 1);
          } else {
            // Show the share button when all lines are displayed
            var shareButton = document.getElementById('shareButton');
            shareButton.style.display = 'flex';
          }
        }, 500); // Adjust the delay before moving to the next line (milliseconds)
      }
    }

    typeCharacter();
  }

  // Start displaying lines
  displayLine(0);
}


function shareResult() {
  var resultText = document.getElementById('result').innerText;

  // Get the current window URL
  var currentUrl = window.location.href;

  // Create a shareable message with line breaks for better formatting
  var shareMessage = "My Age Calculation:\n\n" + resultText + "\n\nPowered by: " + currentUrl;

  // Encode the message for a valid URI
  var encodedMessage = encodeURIComponent(shareMessage);

  // Create a WhatsApp share link
  var whatsappShareLink = "https://wa.me/?text=" + encodedMessage;

  // Open the WhatsApp share link in a new tab or window
  window.open(whatsappShareLink, "_blank");
}

function parseDate(dateString) {
  var parts = dateString.split('/');
  if (parts.length === 3) {
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // months are zero-based
    var year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
}
