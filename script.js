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

  return `${nameOfDayOfWeek}  ${currentTime}   ${date}.${month}.${year}`;
}

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function searchCity(SearchInput) {
  SearchInput.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiKey = "a1585c05669d0tf0ba920b3fae4oe637";
  let apiUrlCityInput = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCityInput).then(showTemperature);
}

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showTemperature(response) {
  // let temperature = Math.round(response.data.main.temp);
  temp = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperature-value");
  let lastUpdatedTime = document.querySelector("#last-updated-time");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let wetherIconElement = document.querySelector("#heaven-icon");
  cityElement.innerHTML = response.data.city;
  temperatureValue.innerHTML = temp;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  wetherIconElement.setAttribute("src", response.data.condition.icon_url);
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

function getCelsius(event) {
  console.log(temp);
  event.preventDefault();
  temperatureValue.innerHTML = temp;
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.remove("inactive");
  fahrenheitTemp.classList.add("inactive");
}

function getFahrenheit(event) {
  console.log(temp);
  event.preventDefault();
  temperatureValue.innerHTML = Math.round((temp * 9) / 5 + 32);
  fahrenheitTemp.classList.add("active");
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.remove("inactive");
  celsiusTemp.classList.add("inactive");
}

let fahrenheitTemp = document.querySelector("#grad-F");
fahrenheitTemp.addEventListener("click", getFahrenheit);

let celsiusTemp = document.querySelector("#grad-C");
celsiusTemp.addEventListener("click", getCelsius);

let userPositionButton = document.querySelector("#get-position");
userPositionButton.addEventListener("click", getUserPosition);

let temp = null;
let temperatureValue = document.querySelector("#temperature-value");
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

searchDefaultCity("Kyiv");
