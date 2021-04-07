let now = new Date();
let today = document.querySelector(".today");
let time = document.querySelector(".time");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = `Feels like : ${Math.round(
    response.data.main.feels_like
  )} ℃`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity : ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind : ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function searchCity(city) {
  let apiKey = "66e48331c74ac5541e45dafb42039ad5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let day = days[now.getDay()];
today.innerHTML = `${day} ${date}`;
time.innerHTML = `${hours}:${minutes}`;

let celsiusLink = document.querySelector("#convertCelcius");
celsiusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#convertFahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Bordeaux");

//bonus
function showPosition(position) {
  let apiKey = "66e48331c74ac5541e45dafb42039ad5";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let pinButton = document.querySelector(".submitPin");
pinButton.addEventListener("click", getCurrentLocation);
