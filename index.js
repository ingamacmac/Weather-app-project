/// current date and time
let date = document.querySelector("#todays-date");

let now = new Date();
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
let time = now.getHours();
let minutes = now.getMinutes();

date.innerHTML = `${day} ${time}:${minutes}`;

/// city name change

function search(cityName) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML =
    Math.round(response.data.main.temp) + "°C";
}

function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").value;
  search(cityName);
}
function searchLocation(position) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let place = document.querySelector("#search-form");
place.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", displayCurrent);
search("London");
