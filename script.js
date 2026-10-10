document.getElementById("searchButton").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(`getWeather.php?city=${encodeURIComponent(city)}`);
    const text = await response.text();
    console.log("Response text:", text); // Debug

    const data = JSON.parse(text);

    if (data.error) {
      document.getElementById("result").textContent = data.error;
      return;
    }

    const weather = data[0]; // first match
    document.getElementById("result").innerHTML = `
      <strong>City:</strong> ${weather.Location} <br>
      <strong>Date & Time:</strong> ${weather.Date_Time} <br>
      <strong>Temperature (°C):</strong> ${weather.Temperature_C.toFixed(2)} <br>
      <strong>Humidity (%):</strong> ${weather.Humidity_pct.toFixed(2)} <br>
      <strong>Precipitation (mm):</strong> ${weather.Precipitation_mm.toFixed(2)} <br>
      <strong>Wind Speed (km/h):</strong> ${weather.Wind_Speed_kmh.toFixed(2)}
    `;
  } catch (error) {
    console.error("Error:", error);
  }
});
