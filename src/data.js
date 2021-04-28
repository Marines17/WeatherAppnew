let now = new Date();
let today = document.querySelector(".today");
let time = document.querySelector(".time");
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
let day = days[now.getDay()];
today.innerHTML = `${day}`;
time.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col">
            ${formatDay(forecastDay.dt)} </br>
            <img class="forecastImg" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width=70px>
            <div class="temp">
              ${Math.round(forecastDay.temp.max)}
              <span class="celcius">°C</span>
              - ${Math.round(forecastDay.temp.min)}
              <span class="celcius">°C</span>
            </div>
          </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "66e48331c74ac5541e45dafb42039ad5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = `Feels like : ${Math.round(
    response.data.main.feels_like
  )} ℃`;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celciusTemperature
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity : ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind : ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#titleIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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

function showPosition(position) {
  let apiKey = "66e48331c74ac5541e45dafb42039ad5";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#convertFahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#convertCelcius");
celciusLink.addEventListener("click", convertToCelcius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let pinButton = document.querySelector(".submitPin");
pinButton.addEventListener("click", getCurrentLocation);

let celciusTemperature = null;

searchCity("Bordeaux");
