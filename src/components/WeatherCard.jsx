import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SearchHistory from "./SearchHistory";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function WeatherCard() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('weatherHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // First Load to show current location weather
    fetchCurrentLocation();
  }, []);

  // Use the History Location to search again
  const handleHistorySearch = (cityName) => {
    const cityOnly = cityName.split(',')[0];
    fetchWeatherData(cityOnly);
  };

  // Delete Search History
  const handleHistoryDelete = (index) => {
    const newHistory = searchHistory.filter((_, idx) => idx !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
  };

  // Fetch current location weather
  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const xhr = new XMLHttpRequest();
          const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          xhr.open("GET", url, true);

          xhr.onload = function () {
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
                date: new Date().toLocaleString(),
              });
              setLoading(false);
            } else {
              setError("Failed to fetch weather data");
              setLoading(false);
            }
          };

          xhr.onerror = function () {
            setError("Network error occurred");
            setLoading(false);
          };

          xhr.send();
        },
        (err) => {
          setError("Failed to get location: " + err.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  // Button to trigger location weather
  const fetchWeatherData = async (city = null) => {
    const cityToSearch = city || searchInput;
    if (!cityToSearch) return;

    setLoading(true);
    setError(null);

    const xhr = new XMLHttpRequest();
    const url = `${BASE_URL}?q=${cityToSearch}&appid=${API_KEY}&units=metric`;

    xhr.open("GET", url, true);

    xhr.onload = function () {
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
          date: new Date().toLocaleString(),
        });


         // Add to search history
        const newHistory = [
          { 
            name: `${data.name}, ${data.sys.country}`, 
            date: new Date().toLocaleString() 
          },
          ...searchHistory
        ].slice(0, 5); // Keep only last 5 searches
        setSearchHistory(newHistory);
        localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
      
        
        setLoading(false);
      } else {
        setError("City not found");
        setLoading(false);
      }
    };

    xhr.onerror = function () {
      setError("Network error occurred");
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
          <input type="text" className="input-bg" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}/>
          <label className="absolute left-4 top-1 text-md text-[#FFFFFF66]">Country</label>
        </div>

        <button className="bg-[#28124D] px-5 rounded-[20px] h-[60px]" onClick={handleSearch} disabled={loading}>
          <FaSearch className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Weather card */}
      <div className="bg-[#1A1A1A4D] backdrop-blur-lg rounded-3xl p-6 w-full max-w-2xl text-white relative">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {weatherData && (
          <>
            {/* Weather Icon */}
            <div className="absolute top-[-100px] right-[10px] md:top-[-120px] md:right-[25px] w-[200px] h-[200px] md:w-[270px] md:h-[270px]">
              <img src={weatherData.weather.toLowerCase() === "clouds" ? "/images/cloud.png" : "/images/sun.png"} alt="Weather Icon" className="w-full h-full object-contain" />
            </div>

            {/* Today's Weather */}
            <div>
              <h2 className="text-md">Today's Weather</h2>
              <h1 className="text-5xl md:text-9xl font-bold mt-2">{weatherData.temp}°</h1>
              <div className="text-md mt-2">
                <p>
                  H: {weatherData.tempMax}° L: {weatherData.tempMin}°
                </p>
              </div>
              <div className="flex flex-row gap-4 mt-2 text-md">
                <p className="font-bold">
                  {weatherData.cityName}, {weatherData.country}
                </p>
                <p>{weatherData.date}</p>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>{weatherData.weather}</p>
              </div>
            </div>
          </>
        )}

        {/* Search History */}
        <SearchHistory 
          cities={searchHistory}
          onSearch={handleHistorySearch}
          onDelete={handleHistoryDelete}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
