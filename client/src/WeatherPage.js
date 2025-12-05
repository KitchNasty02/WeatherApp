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
        <>
          <div className="weather-display-card">

            <h2 className="city-name">{weatherData.name}</h2>
            <p className="weather-expect">
              {weatherData.weather[0].description.replace(/^\w/, (c) => c.toUpperCase())}
            </p>

            <div className="weather-center-temp">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                className="weather-big-icon"
              />
              <div className="temp-info">
                <h1 className="temp-big">
                  {Math.round(weatherData.main.temp)}°{units === "imperial" ? "F" : "C"}
                </h1>
                <p className="feels-like">
                  Feels like {Math.round(weatherData.main.feels_like)}°
                </p>
              </div>
            </div>

            {/* GRID INFO BOXES */}
            <div className="weather-stats-grid">

              <div className="stat-box">
                <img src="https://cdn-icons-png.flaticon.com/512/5024/5024369.png" className="stat-icon" />
                <p className="stat-label">Wind Speed</p>
                <p className="stat-value">
                  {weatherData.wind.speed} {units === "imperial" ? "mph" : "km/h"}
                </p>
              </div>

              <div className="stat-box">
                <img src="https://cdn-icons-png.flaticon.com/512/414/414974.png" className="stat-icon" />
                <p className="stat-label">Humidity</p>
                <p className="stat-value">{weatherData.main.humidity}%</p>
              </div>

              <div className="stat-box">
                <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" className="stat-icon" />
                <p className="stat-label">Visibility</p>
                <p className="stat-value">
                  {(weatherData.visibility / 1609).toFixed(1)} mi
                </p>
              </div>

              <div className="stat-box">
                <img src="https://cdn-icons-png.flaticon.com/512/833/833273.png" className="stat-icon" />
                <p className="stat-label">Pressure</p>
                <p className="stat-value">{weatherData.main.pressure} hPa</p>
              </div>

            </div>

          </div>

        </>
      )}


    </div>
  );
}

export default WeatherPage;
