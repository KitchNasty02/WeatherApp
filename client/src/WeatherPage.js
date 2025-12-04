import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./WeatherPage.css";

function WeatherPage() {
  const [logout, setLogout] = useState(null);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const [units, setUnits] = useState("imperial");

  const fetchWeather = async () => {
        if (!zip) return; // no ZIP, don't fetch

        try {
            const API_URL = `http://localhost:3010/api/curweather?zip=${zip}&units=${units}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                setSearchError(data.message);
                setWeatherData(null);
                return;
            }

            setWeatherData(data.weather);
            setSearchError("");
        } catch (err) {
            setSearchError(err.message);
        }
    };

  const handleSearch = async (e) => {
    e.preventDefault();
    setZipError("");

    if (!zip) {
      setZipError("Enter a ZIP code");
      return;
    }

    fetchWeather();
  };


  const handleToggleUnits = () => {
    setUnits(units === "imperial" ? "metric" : "imperial");
  }

  useEffect(() => {
    fetchWeather();
  }, [units]); // re-run when zip or units change


  if (logout) return <Navigate to="/" />;

  return (
    <div className="weather-page">
      {/* Header */}
      <div className="weather-header">
        <div>
          <h1 className="weather-title">WeatherHub</h1>
          <p className="weather-subtitle">Welcome back!</p>
        </div>

        <div className="header-right">
            <button className="header-btn" onClick={handleToggleUnits}>
                {units === "imperial" ? "°F / mph" : "°C / km/h"}
            </button>
            <button className="header-btn" onClick={() => setLogout(true)}>
                Logout
            </button>
        </div>
      </div>

      {/* Weather Search Card */}
      <div className="weather-card">
        <h3>Check Weather</h3>
        <p>Enter a ZIP code to see current weather conditions</p>

        <form onSubmit={handleSearch} className="weather-search">
          <input
            type="text"
            className="weather-input"
            placeholder="Enter ZIP code (e.g., 10001)"
            onChange={(e) => setZip(e.target.value)}
          />

          <button className="weather-btn" type="submit">
            Get Weather
          </button>
        </form>

        {zipError && <p style={{ color: "red" }}>{zipError}</p>}
        {searchError && <p style={{ color: "red" }}>{searchError}</p>}
      </div>

      {/* Placeholder when no data */}
      {!weatherData && (
        <div className="weather-placeholder">
          <img
            className="weather-placeholder-icon"
            src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
          />
          <p className="weather-placeholder-text">
            Enter a ZIP code above to check the weather
          </p>
        </div>
      )}

      {/* If weather data exists */}
      {weatherData && (
        <div className="weather-details">
            <h2 className="weather-city">{weatherData.name}</h2>
            <p className="weather-main">
            {weatherData.weather[0].main} - {weatherData.weather[0].description}
            </p>

            <div className="weather-info-grid">
            <div className="weather-info-card">
                <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
                />
                <p>Temp: {weatherData.main.temp}°{units === "imperial" ? "F" : "C"}</p>
                <p>Feels Like: {weatherData.main.feels_like}°</p>
            </div>

            <div className="weather-info-card">
                <p>Min: {weatherData.main.temp_min}°</p>
                <p>Max: {weatherData.main.temp_max}°</p>
            </div>

            <div className="weather-info-card">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>

            <div className="weather-info-card">
                <p>
                Wind: {weatherData.wind.speed} {units === "imperial" ? "mph" : "km/h"}
                </p>
                <p>Direction: {weatherData.wind.deg}°</p>
            </div>
            </div>
        </div>
        )}


    </div>
  );
}

export default WeatherPage;
