const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const WeatherAPI = {

    fetchByLocation: () => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const xhr = new XMLHttpRequest();
          const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          xhr.open("GET", url, true);
          xhr.onload = function () {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject("Failed to fetch weather data");
            }
          };
          xhr.onerror = () => reject("Network error occurred");
          xhr.send();
        },
        (err) => reject("Failed to get location: " + err.message)
      );
    });
  },

  fetchByCity: (city) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
      
      xhr.open("GET", url, true);
      xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          resolve(response);
        } else {
          reject(response.message || "City not found");
        }
      };
      xhr.onerror = () => reject("Network error occurred");
      xhr.send();
    });
  }
};