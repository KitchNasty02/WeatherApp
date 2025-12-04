import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./WeatherPage.css";

function WeatherPage() {
  const [logout, setLogout] = useState(null);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setZipError("");

    if (!zip) {
      setZipError("Enter a ZIP code");
      return;
    }

    try {
      const API_URL = `http://localhost:3010/api/curweather?zip=${zip}`;
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        setSearchError(data.message);
        return;
      }

      setWeatherData(data.weather);
    } catch (err) {
      setSearchError(err.message);
    }
  };

  if (logout) return <Navigate to="/" />;

  return (
    <div className="weather-page">
      {/* Header */}
      <div className="weather-header">
        <div>
          <h1 className="weather-title">WeatherHub</h1>
          <p className="weather-subtitle">Welcome back, user!</p>
        </div>

        <div className="header-right">
          <button className="header-btn">↻</button>
          <button className="header-btn">°F / mph</button>
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
        <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
          Temperature: {weatherData.main.temp}°
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
