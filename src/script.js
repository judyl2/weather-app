function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.main.temp;
	let cityElement = document.querySelector("#city-header");
	cityElement.innerHTML = response.data.name;
	temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
	let apiKey = "6bfa54f242cbb59343d4e58db578dc61";

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");

	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
