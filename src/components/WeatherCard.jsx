import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { WeatherDisplay } from "./WeatherDisplay";
import SearchHistory from "./SearchHistory";
import { WeatherAPI } from '../services/WeatherAPI';

function WeatherCard() {
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
      date: new Date().toLocaleString(),
    });
  };

    const updateSearchHistory = (data) => {
      const newHistory = [
        { 
          name: `${data.name}, ${data.sys.country}`, 
          date: new Date().toLocaleString() 
        },
        ...searchHistory
      ].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
    };

    return (
    <div className="weather-container">
      <SearchBar onSearch={handleSearch} isLoading={loading} error={error} setError={setError}/>
      <div className="bg-[#1A1A1A4D] backdrop-blur-lg rounded-3xl p-6 w-full max-w-2xl text-white relative">
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
