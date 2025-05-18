import { useTheme } from '../context/ThemeContext';
import { FaSearch } from "react-icons/fa";

export function SearchBar({ onSearch, isLoading, error, setError, searchInput, 
  setSearchInput  }) {
  const { isDark } = useTheme();

   // Clear error when typing
    const handleChange = (e) => {
        setSearchInput(e.target.value);
        if (error) setError(null);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearch(searchInput);
  };

  return (
      <div className="flex flex-col w-full max-w-2xl mb-[6rem] min-h-[90px]">
      <div className="flex gap-4 w-full">
        <div className="relative flex-1">
            <input 
            id="country-input"
            type="text" 
            className={`input-bg ${isDark ? 'text-white bg-[#1A1A1A]/50' : 'text-black bg-white/20'}`}
            value={searchInput} 
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} 
          />
          <label 
            htmlFor="country-input"
            className={`absolute left-4 top-1 text-md 
            ${isDark ? 'text-[#FFFFFF66]' : 'text-[#00000066]'}`}>
            Country
          </label>
        </div>

        <button className={`px-5 rounded-[20px] h-[60px] 
            ${isDark ? 'bg-[#28124D]' : 'bg-[#6C40B5]'}`}  onClick={handleSubmit} disabled={isLoading}>
          <FaSearch className="w-5 h-5 text-white"/>
        </button>
        </div>
      {error && <p className="text-red-500 text-left">{error}</p>}
    </div>
  );
}
