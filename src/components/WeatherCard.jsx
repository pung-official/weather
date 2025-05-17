import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const cities = [
  { name: "Johor, MY", date: "01-09-2022 09:41am" },
  { name: "Osaka, JP", date: "01-09-2022 09:41am" },
  { name: "Seoul, KR", date: "01-09-2022 09:41am" },
  { name: "Tokusan-ri, KR", date: "01-09-2022 09:41am" },
  { name: "Taipei, TW", date: "01-09-2022 09:41am" },
];

function WeatherCard() {
  return (
    <div className="weather-container">
      {/* Search bar */}
      <div className="flex w-full max-w-2xl mb-[6rem] gap-4">
        <div className="relative flex-1">
          <input type="text" className="input-bg" />
          <label className="absolute left-4 top-1 text-md text-[#FFFFFF66]">Country</label>
        </div>

        <button className="bg-[#28124D] px-5 rounded-[20px] h-[56px]">
          <FaSearch className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Weather card */}
      <div className="bg-[#1A1A1A4D] backdrop-blur-lg rounded-3xl p-6 w-full max-w-2xl text-white relative">
        {/* Weather Icon */}
        <div className="absolute top-[-120px] right-[25px] w-[270px] h-[270px]">
          <img src="/images/cloud.png" alt="Weather Icon" className="w-full h-full object-contain" />
        </div>

        {/* Today's Weather */}
        <div>
          <h2 className="text-md">Today's Weather</h2>
          <h1 className="text-5xl md:text-9xl font-bold mt-2">26°</h1>
          <div className="text-md mt-2">
            <p>H: 29° L: 26°</p>
          </div>
          <div className="flex flex-row gap-4 mt-2 text-md">
            <p className="font-bold">Johor, MY</p>
            <p>01-09-2022 09:41am</p>
            <p>Humidity: 58%</p>
            <p>Clouds</p>
          </div>
        </div>

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
