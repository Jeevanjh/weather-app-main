document.addEventListener('DOMContentLoaded', () => {
  let cityInput = document.getElementById("city-input");
  let getWeatherBtn = document.getElementById("get-weather-btn");
  let weatherInfo = document.getElementById("weather-info");
  let cityNameDisplay = document.getElementById("city-name");
  let temperatureDisplay = document.getElementById("temperature");
  let descriptionDisplay = document.getElementById("description");
  let humidityDisplay = document.getElementById("humidity");
  let windDisplay = document.getElementById("wind");
  let weatherIcon = document.getElementById("weather-icon");
  let errorMessage = document.getElementById("error-message");
  let loading = document.getElementById("loading");

  let API_KEY = "4736b0aa7266665e8fbeba16c0fe9b1a";

  getWeatherBtn.addEventListener('click', async () => {
    let city = cityInput.value.trim();
    if (!city) return;

    // Show loader
    loading.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");

    try {
      let weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    } finally {
      loading.classList.add("hidden");
    }
  });

  async function fetchWeatherData(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    return await response.json();
  }

  function displayWeatherData(data) {
    let { name, main, weather, wind } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `🌡️ ${main.temp}°C`;
    descriptionDisplay.textContent = `🌥️ ${weather[0].description}`;
    humidityDisplay.textContent = main.humidity;
    windDisplay.textContent = (wind.speed * 3.6).toFixed(1); // m/s → km/h

    let iconCode = weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
