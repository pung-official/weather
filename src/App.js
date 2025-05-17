import React from 'react';
import WeatherCard from "./components/WeatherCard";

function App() {
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=johor&appid=858dbab6fb0bae89a29c3cb0482d1112`;


  return (
    <div className="app">
      <WeatherCard />
    </div>
  );
}

export default App;
