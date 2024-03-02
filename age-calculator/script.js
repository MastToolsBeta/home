const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function animateText(element, text, delay = 50) {
  return new Promise((resolve) => {
    let index = 0;
    const intervalId = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        setTimeout(resolve, delay);
      }
    }, delay);
  });
}

function getResultData() {
  // Define a function to retrieve the generated data
  // Replace this with your logic to get the data from the result elements
  const ageResult = document.getElementById("ageResult").textContent;
  const bornOnResult = document.getElementById("bornOnResult").textContent;
  const ageOnResult = document.getElementById("ageOnResult").textContent;
  const durationResult = document.getElementById("durationResult").textContent;
  const durationInMonthsResult = document.getElementById("durationInMonthsResult").textContent;
  const durationInDaysResult = document.getElementById("durationInDaysResult").textContent;
  const durationInHoursResult = document.getElementById("durationInHoursResult").textContent;
  const durationInMinutesResult = document.getElementById("durationInMinutesResult").textContent;
  const durationInSecondsResult = document.getElementById("durationInSecondsResult").textContent;

  // Combine the data as needed
  const generatedData = `${ageResult}\n${bornOnResult}\n${ageOnResult}\n${durationResult}\n${durationInMonthsResult}\n${durationInDaysResult}\n${durationInHoursResult}\n${durationInMinutesResult}\n${durationInSecondsResult}`;

  return generatedData;
}

async function calculateAge() {
  const birthDate = new Date(document.getElementById("birthdate").value);
  const today = new Date();
  const ageInMs = today - birthDate;
  const ageInYears = Math.floor(ageInMs / (365.25 * 24 * 60 * 60 * 1000));

  const birthDay = birthDate.getDate();
  const birthMonth = birthDate.getMonth();
  const birthYear = birthDate.getFullYear();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Reset result elements
  document.getElementById("ageResult").textContent = "";
  document.getElementById("bornOnResult").textContent = "";
  document.getElementById("ageOnResult").textContent = "";
  document.getElementById("durationResult").textContent = "";
  document.getElementById("durationInMonthsResult").textContent = "";
  document.getElementById("durationInDaysResult").textContent = "";
  document.getElementById("durationInHoursResult").textContent = "";
  document.getElementById("durationInMinutesResult").textContent = "";
  document.getElementById("durationInSecondsResult").textContent = "";

  // Animate text for each result element
  await animateText(document.getElementById("ageResult"), `Age = ${ageInYears} years`);
  await animateText(document.getElementById("bornOnResult"), `Born on: ${dayNames[birthDate.getDay()]}, ${monthNames[birthMonth]} ${birthDay}, ${birthYear}`);
  await animateText(document.getElementById("ageOnResult"), `Age on: ${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
  await animateText(document.getElementById("durationResult"), `= ${ageInYears} years ${today.getMonth() - birthMonth} months ${today.getDate() - birthDay} days`);
  await animateText(document.getElementById("durationInMonthsResult"), `= ${ageInYears * 12 + (today.getMonth() - birthMonth)} months ${today.getDate() - birthDay} days`);
  await animateText(document.getElementById("durationInDaysResult"), `= ${Math.floor(ageInMs / (24 * 60 * 60 * 1000))} days`);
  await animateText(document.getElementById("durationInHoursResult"), `= ${Math.floor(ageInMs / (60 * 60 * 1000)).toLocaleString()} hours`);
  await animateText(document.getElementById("durationInMinutesResult"), `= ${Math.floor(ageInMs / (60 * 1000)).toLocaleString()} minutes`);
  await animateText(document.getElementById("durationInSecondsResult"), `= ${Math.floor(ageInMs / 1000).toLocaleString()} seconds`);

  // Display the share button after printing data
  document.getElementById("share-container").style.display = "block";
}

const calculateBtn = document.getElementById('calculate-btn');
const shareBtn = document.getElementById('share-btn');
const result = document.getElementById('result');

calculateBtn.addEventListener('click', async () => {
  // Code to calculate the result goes here

  // Show the result
  result.classList.add('show');

  // Calculate the age with animation
  await calculateAge();
});

shareBtn.addEventListener('click', () => {
  // Get the generated data
  const generatedData = getResultData();

  // Personalized greeting for WhatsApp message
  const whatsappMessage = "Hi, this is my age details:\n\n";

  // Create a WhatsApp share link
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage + generatedData + '\n\nYou can calculate your age here: ' + window.location.href)}`;

  // Open the share link in a new tab or window
  window.open(whatsappLink, '_blank');
});
