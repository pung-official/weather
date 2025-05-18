import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function SearchBar({ onSearch, isLoading, error, setError }) {
  const [searchInput, setSearchInput] = useState("");

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
          <input type="text" className="input-bg" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} onChange={handleChange}/>
          <label className="absolute left-4 top-1 text-md text-[#FFFFFF66]">Country</label>
        </div>

        <button className="bg-[#28124D] px-5 rounded-[20px] h-[60px]" onClick={handleSubmit} disabled={isLoading}>
          <FaSearch className="w-5 h-5 text-white" />
        </button>
        </div>
      {error && <p className="text-red-500 text-left">{error}</p>}
    </div>
  );
}
