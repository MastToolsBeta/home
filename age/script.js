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
