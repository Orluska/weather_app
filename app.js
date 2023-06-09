function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
}

let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let weekDay = days[now.getDay()];
let month = months[now.getMonth()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${weekDay}, ${month} ${date}, ${year},${hour}:${minute}`;

////

function showLocalWeather() {
  function showPosition(position) {
    let apiKey = "dfa83bccaab6931b58468afd20b4f462";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    function showWeather(response) {
      document.querySelector("h1").innerHTML = response.data.name;

      document.querySelector("h2").innerHTML =
        Math.round(response.data.main.temp) + "℃";

      document.querySelector("#humidity").innerHTML =
        Math.round(response.data.main.humidity) + "%";

      document.querySelector("#wind").innerHTML =
        Math.round(response.data.wind.speed) + "km/h";

      document.querySelector("#descr").innerHTML =
        response.data.weather[0].description;
    }

    axios.get(apiUrl).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locWeather = document.querySelector("#current");
locWeather.addEventListener("click", showLocalWeather);

////////////////

function searchWeather(response) {
  document.querySelector("#cityApp").innerHTML = response.data.name;

  document.querySelector("h2").innerHTML =
    Math.round(response.data.main.temp) + " ℃";

  document.querySelector("#humidity").innerHTML =
    Math.round(response.data.main.humidity) + " %";

  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";

  document.querySelector("#descr").innerHTML =
    response.data.weather[0].description;
}

function searchCity(cityName) {
  let apiKey = "dfa83bccaab6931b58468afd20b4f462";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(searchWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#inputCity").value;
  searchCity(cityName);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Athens");
