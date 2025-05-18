import { ThemeProvider } from './context/ThemeContext';
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <ThemeProvider>
      <WeatherCard />
    </ThemeProvider>
  );
}

export default App;
