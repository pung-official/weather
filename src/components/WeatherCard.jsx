import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { WeatherDisplay } from "./WeatherDisplay";
import SearchHistory from "./SearchHistory";
import { WeatherAPI } from '../services/WeatherAPI';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function WeatherCard() {
  const { isDark, toggleTheme } = useTheme();
   const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('weatherHistory');
    return saved ? JSON.parse(saved) : [];
    
  });

  // First Load to show current location weather
    useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const data = await WeatherAPI.fetchByLocation();
        updateWeatherData(data);
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to fetch location');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const handleSearch = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const data = await WeatherAPI.fetchByCity(cityName);
      updateWeatherData(data);
      updateSearchHistory(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'City not found');
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherData = (data) => {
    setWeatherData({
      temp: Math.round(data.main.temp),
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      cityName: data.name,
      country: data.sys.country,
      weather: data.weather[0].main,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    });
  };

    const updateSearchHistory = (data) => {
      const newHistory = [
        { 
          name: `${data.name}, ${data.sys.country}`, 
          date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        },
        ...searchHistory
      ].slice(0, 5);
      setSearchHistory(newHistory);
      setSearchInput(data.name)
      localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
    };

    return (
    <div className={`weather-container font-sans ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <div className="w-full min-h-[40px] mb-4">
        <button
          onClick={toggleTheme}
          className={`z-10 fixed top-4 right-4 p-2 rounded-full
            ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
        >
          {isDark ? (
            <FaSun className="w-6 h-6 text-yellow-400" />
          ) : (
            <FaMoon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
      <SearchBar onSearch={handleSearch} isLoading={loading} error={error} setError={setError} searchInput={searchInput} setSearchInput={setSearchInput}/>
       <div className={`backdrop-blur-[20px] rounded-3xl p-6 w-full max-w-2xl relative
        ${isDark ? 'bg-[#1A1A1A]/30 text-white' : 'bg-[#FFFFFF]/20 text-black border border-white/50'}`}>
        <WeatherDisplay weatherData={weatherData} />
        <SearchHistory 
          cities={searchHistory}
          onSearch={handleSearch}
          onDelete={(index) => {
            const newHistory = searchHistory.filter((_, idx) => idx !== index);
            setSearchHistory(newHistory);
            localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
          }}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
