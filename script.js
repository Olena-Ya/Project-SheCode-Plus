let currentDay = new Date();

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

//get current time

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

let dayOfWeekElement = document.querySelector("#day-of-week");
let currentTimeElement = document.querySelector("#current-time");

dayOfWeekElement.innerHTML = nameOfDayOfWeek;
currentTimeElement.innerHTML = currentTime;

//when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function showCityInfo(responseCityWeather) {
  let cityInputFromResponse = responseCityWeather.data.name;

  temperatureValue.innerHTML = Math.round(responseCityWeather.data.main.temp);
}

function searchCityInfo(responseSearchInput) {
  //cityElement.innerHTML = cityInputFromResponse;

  let latCityInput = responseSearchInput.data[0].lat;
  let lonCityInput = responseSearchInput.data[0].lon;
  cityElement.innerHTML = responseSearchInput.data[0].name;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrlCityInput = `https://api.openweathermap.org/data/2.5/weather?lat=${latCityInput}&lon=${lonCityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCityInput).then(showCityInfo);
  console.log(apiUrlCityInput);
}

function searchCity(SearchInput) {
  SearchInput.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  console.log(cityInput);
  console.log("hello");

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = cityInput;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrlCityInput = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`;
  axios.get(apiUrlCityInput).then(searchCityInfo);
}

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  temperatureValue.innerHTML = temperature;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function getUserPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function searchDefaultCity(defaultCity) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrlDefaultCity = `https://api.openweathermap.org/geo/1.0/direct?q=${defaultCity}&limit=5&appid=${apiKey}`;
  axios.get(apiUrlDefaultCity).then(searchCityInfo);
}

let apiKey = "58a6775f97527351bf6c6966e209be39";
let cityElement = document.querySelector("#city-name");
let temperatureValue = document.querySelector("#temperature-value");

let userPositionButton = document.querySelector("#get-position");
userPositionButton.addEventListener("click", getUserPosition);

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

searchDefaultCity("kyiv");
