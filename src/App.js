import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [tempUnit, setTempUnit] = useState('metric');

  async function getWeather(e) {
    if (e.key === 'Enter') {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=964aac2bae2c7c12657e7dfa45ed246e&units=${tempUnit}`,
          { mode: 'cors' }
        );
        const data = await response.json();
        setWeather(data);
        setLocation('');
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleunits = () => {
    if (tempUnit === 'metric') {
      setTempUnit('imperial');
    } else {
      setTempUnit('metric');
    }
  };

  return (
    <div
      className={
        // eslint-disable-next-line no-nested-ternary
        typeof weather.main !== 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <section>
        <div className="search-box">
          <input
            type="text"
            placeholder="London,UK"
            onChange={handleChange}
            value={location}
            className="search-bar"
            onKeyPress={getWeather}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <div className="weather-box">
            <button type="button" className="unit-btn" onClick={handleunits}>
              Toggle Unit
            </button>
            <div className="temp">
              {tempUnit === 'metric'
                ? `${Math.round(weather.main.temp)}°C`
                : `${Math.round((weather.main.temp * 9) / 5 + 32)}°F`}
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        ) : (
          ''
        )}
      </section>
    </div>
  );
}
export default App;
