import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cities = [
  { name: "Johor, MY", date: "01-09-2022 09:41am" },
  { name: "Osaka, JP", date: "01-09-2022 09:41am" },
  { name: "Seoul, KR", date: "01-09-2022 09:41am" },
  { name: "Tokusan-ri, KR", date: "01-09-2022 09:41am" },
  { name: "Taipei, TW", date: "01-09-2022 09:41am" },
];

function WeatherCard() {

  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add after your state declarations
useEffect(() => {
  fetchCurrentLocation();
}, []); 


  // Add after your existing state declarations
const fetchCurrentLocation = () => {
  if ("geolocation" in navigator) {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        const xhr = new XMLHttpRequest();
        const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setWeatherData({
              temp: Math.round(data.main.temp),
              tempMax: Math.round(data.main.temp_max),
              tempMin: Math.round(data.main.temp_min),
              humidity: data.main.humidity,
              cityName: data.name,
              country: data.sys.country,
              weather: data.weather[0].main,
              date: new Date().toLocaleString()
            });
            setLoading(false);
          } else {
            setError('Failed to fetch weather data');
            setLoading(false);
          }
        };
        
        xhr.onerror = function() {
          setError('Network error occurred');
          setLoading(false);
        };
        
        xhr.send();
      },
      (err) => {
        setError('Failed to get location: ' + err.message);
        setLoading(false);
      }
    );
  } else {
    setError('Geolocation is not supported by your browser');
  }
};

  const fetchWeatherData = async () => {
  if (!searchInput) return;
    
  setLoading(true);
  setError(null);

  const xhr = new XMLHttpRequest();
  const url = `${BASE_URL}?q=${searchInput}&appid=${API_KEY}&units=metric`;

  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      setWeatherData({
        temp: Math.round(data.main.temp),
        tempMax: Math.round(data.main.temp_max),
        tempMin: Math.round(data.main.temp_min),
        humidity: data.main.humidity,
        cityName: data.name,
        country: data.sys.country,
        weather: data.weather[0].main,
        date: new Date().toLocaleString()
      });
      setLoading(false);
    } else {
      setError('City not found');
      setLoading(false);
    }
  };

  xhr.onerror = function() {
    setError('Network error occurred');
    setLoading(false);
  };

  xhr.send();
};

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      {/* Search bar */}
      <div className="flex w-full max-w-2xl mb-[6rem] gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="input-bg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <label className="absolute left-4 top-1 text-md text-[#FFFFFF66]">Country</label>
        </div>

        <button 
          className="bg-[#28124D] px-5 rounded-[20px] h-[56px]"  
          onClick={handleSearch} 
          disabled={loading}>
            <FaSearch className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Weather card */}
      <div className="bg-[#1A1A1A4D] backdrop-blur-lg rounded-3xl p-6 w-full max-w-2xl text-white relative">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {weatherData && (
        <>
        {/* Weather Icon */}
        <div className="absolute top-[-120px] right-[25px] w-[270px] h-[270px]">
          <img  src={weatherData.weather.toLowerCase() === 'clouds' ? "/images/cloud.png" : "/images/sun.png"}  alt="Weather Icon" className="w-full h-full object-contain" />
        </div>

        {/* Today's Weather */}
        <div>
          <h2 className="text-md">Today's Weather</h2>
          <h1 className="text-5xl md:text-9xl font-bold mt-2">{weatherData.temp}°</h1>
          <div className="text-md mt-2">
            <p>H: {weatherData.tempMax}° L: {weatherData.tempMin}°</p>
          </div>
          <div className="flex flex-row gap-4 mt-2 text-md">
            <p className="font-bold">{weatherData.cityName}, {weatherData.country}</p>
                <p>{weatherData.date}</p>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>{weatherData.weather}</p>
          </div>
        </div>
          </>
        )}

        {/* Search History */}
        <div className="mt-6 bg-[#1A1A1A80] rounded-3xl p-6 w-full">
          <h3 className="text-md font-semibold mb-2">Search History</h3>
          <ul className="space-y-4">
            {cities.map((city, idx) => (
              <li key={idx} className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-xl gap-1 md:gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                  <p className="font-medium">{city.name}</p>
                  <p className="text-md md:text-right">{city.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="icon-circle">
                    <FaSearch className="w-3 h-3 text-grey" />
                  </button>
                  <button className="icon-circle">
                    <FaTrash className="w-3 h-3 text-grey" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
