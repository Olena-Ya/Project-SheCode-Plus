function formatDate(timestamp) {
  console.log(timestamp);
  let currentDay = new Date(timestamp);

  //get name of current day of a week
  let dayOfWeek = currentDay.getDay();

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let nameOfDayOfWeek = daysOfWeek[dayOfWeek];
  console.log(nameOfDayOfWeek);
  //get current time

  let date = currentDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let month = currentDay.getMonth();
  if (month < 10) {
    month = `0${month}`;
  }
  let year = currentDay.getFullYear();

  let currentTimeHours = currentDay.getHours();
  if (currentTimeHours < 10) {
    currentTimeHours = `0${currentTimeHours}`;
  }

  let currentTimeMinutes = currentDay.getMinutes();
  if (currentTimeMinutes < 10) {
    currentTimeMinutes = `0${currentTimeMinutes}`;
  }

  let currentTime = `${currentTimeHours}:${currentTimeMinutes}`;

  //display the current date and time using JavaScript: Tuesday 16:00
  console.log(currentTimeHours);
  console.log(currentTimeMinutes);
  console.log(currentTime);
  let dayOfWeekElement = document.querySelector("#day-of-week");
  let currentTimeElement = document.querySelector("#current-time");

  // dayOfWeekElement.innerHTML = nameOfDayOfWeek;
  // currentTimeElement.innerHTML = currentTime;
  return `${nameOfDayOfWeek}  ${currentTime}   ${date}.${month}.${year}`;
}

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function searchCity(SearchInput) {
  SearchInput.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  console.log(cityInput);
  console.log("hello");

  let apiKey = "a1585c05669d0tf0ba920b3fae4oe637";
  let apiUrlCityInput = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCityInput).then(showTemperature);
}

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showTemperature(response) {
  // let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  console.log(response.data.temperature);
  console.log(response.data.temperature.current);
  console.log(response.data.temperature.humidity);
  console.log(response.data.time);
  let temp = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperature-value");
  let lastUpdatedTime = document.querySelector("#last-updated-time");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  // let wetherIconElement =
  cityElement.innerHTML = response.data.city;
  temperatureValue.innerHTML = temp;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  lastUpdatedTime.innerHTML = formatDate(response.data.time * 1000);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a1585c05669d0tf0ba920b3fae4oe637";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
  console.log(apiURL);
}

function getUserPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function searchDefaultCity(defaultCity) {
  let apiKey = "a1585c05669d0tf0ba920b3fae4oe637";
  let apiUrlCityInput = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCityInput).then(showTemperature);
}

//let apiKey = "58a6775f97527351bf6c6966e209be39";

let userPositionButton = document.querySelector("#get-position");
userPositionButton.addEventListener("click", getUserPosition);

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

searchDefaultCity("uman");
