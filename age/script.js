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
  var ageInMonths = ageInDays / 30.44; // average days in a month
  var ageInYears = ageInMonths / 12;

  var resultString =
    "You are " +
    Math.floor(ageInYears) +
    " years, " +
    Math.floor(ageInMonths % 12) +
    " months, and " +
    Math.floor(ageInDays % 30.44) +
    " days old.";

  document.getElementById('result').innerHTML = resultString;
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
