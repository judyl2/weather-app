function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city-header");
	let descriptionElement = document.querySelector("#weather-description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);
	let iconElement = document.querySelector("#weather-icon");

	temperatureElement.innerHTML = Math.round(temperature);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windElement.innerHTML = `${response.data.wind.speed}km/h`;
	timeElement.innerHTML = formatDate(date);
	iconElement.innerHTML = `<img
							src="${response.data.condition.icon_url}" class="weather-icon"
						/>`;
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "37f37b16a8e706e48te69fa4b2o3e673";

	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");

	searchCity(searchInput.value);
}

function displayforecast() {
	let forecastElement = document.querySelector("#forecast");

	let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
	let forecastHtml = "";

	days.forEach(function (day) {
		forecastHtml =
			forecastHtml +
			`
<div class="col-2">
						<div class="forecast-date">${day}</div>

						<img
							src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
							alt=""
							width="42"
						/>
						<div class="forecast-temps">
							<span class="forecast-temp-max">20°</span>

							<span class="forecast-temp-min">12°</span>
						</div>
					</div>`;
	});
	forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayforecast();
