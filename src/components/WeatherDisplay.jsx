import { useTheme } from '../context/ThemeContext';


export function WeatherDisplay({ weatherData }) {
  const { isDark } = useTheme();
  if (!weatherData) return null;

  return (
    <>

      <div className="absolute top-[-80px] right-[10px] md:top-[-120px] md:right-[25px] w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] md:w-[370px] md:h-[370px]">
        <img 
          src={weatherData.weather.toLowerCase() === "clouds" ? "/images/cloud.png" : "/images/sun.png"} 
          alt="Weather Icon" 
          className="w-full h-full object-contain" 
        />
      </div>

      <div>
        <h2 className="text-md">Today's Weather</h2>
        <h1 className={`text-7xl md:text-9xl font-bold mt-2 ${isDark ? 'text-white' : 'text-[#6C40B5]'}`}>{weatherData.temp}°</h1>
        <div className="text-md mt-2">
          <p>H: {weatherData.tempMax}° L: {weatherData.tempMin}°</p>
        </div>

        <div className={`flex flex-row justify-between md:gap-4 ${isDark ? 'text-white' : 'text-[#666666]'}`}>
          <div className="w-1/2 md:w-1/4">
            <p className="font-bold mb-2 md:mb-0">
              {weatherData.cityName}, {weatherData.country}
            </p>
          </div>
          
          <div className="w-1/2 md:w-3/4 text-right md:mt-0 mt-[-48px]">
            <div className="text-md flex flex-col-reverse md:flex-row md:justify-between">
              <p>{weatherData.date}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>{weatherData.weather}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}