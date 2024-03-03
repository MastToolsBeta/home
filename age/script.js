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

  document.getElementById('ageResult').innerHTML = "Age: " + Math.floor(ageInYears) + " years";
  document.getElementById('bornOnResult').innerHTML = "Born on: " + formatDate(fromDate);
  document.getElementById('ageOnResult').innerHTML = "Age on " + formatDate(toDate) + ": " + Math.floor(ageInYears) + " years";
  document.getElementById('durationResult').innerHTML = "Duration: " + Math.floor(ageInDays) + " days";
  document.getElementById('durationInMonthsResult').innerHTML = "Duration in months: " + Math.floor(ageInMonths);
  document.getElementById('durationInDaysResult').innerHTML = "Duration in days: " + Math.floor(ageInDays);
  document.getElementById('durationInHoursResult').innerHTML = "Duration in hours: " + Math.floor(ageInHours);
  document.getElementById('durationInMinutesResult').innerHTML = "Duration in minutes: " + Math.floor(ageInMinutes);
  document.getElementById('durationInSecondsResult').innerHTML = "Duration in seconds: " + Math.floor(ageInSeconds);
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

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1; // months are zero-based
  var year = date.getFullYear();
  return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
}
