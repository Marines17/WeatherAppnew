function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col">
            ${day}
            <br />
            <i class="fas fa-cloud-sun"></i>
            <div class="temp">
              19
              <span class="celcius">°C</span>
              - 20
              <span class="celcius">°C</span>
            </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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
  console.log(response);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

let celciusTemperature = null;

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
let day = days[now.getDay()];
today.innerHTML = `${day} ${date}`;
time.innerHTML = `${hours}:${minutes}`;

let fahrenheitLink = document.querySelector("#convertFahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#convertCelcius");
celciusLink.addEventListener("click", convertToCelcius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let pinButton = document.querySelector(".submitPin");
pinButton.addEventListener("click", getCurrentLocation);

searchCity("Bordeaux");
displayForecast();
