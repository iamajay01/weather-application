const form = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const weatherCard = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const aqi = document.getElementById("aqi");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  const apiKey = "2777af00b03247f4955163230252805";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found.");
    const data = await response.json();

    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = data.current.temp_c;
    condition.textContent = data.current.condition.text;
    humidity.textContent = data.current.humidity;
    aqi.textContent = data.current.air_quality.pm2_5.toFixed(2);

    weatherCard.classList.remove("hidden");
  } catch (error) {
    alert("Failed to fetch weather data: " + error.message);
    weatherCard.classList.add("hidden");
  }
});
