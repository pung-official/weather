import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaSearch, FaTrash } from "react-icons/fa";

function SearchHistory({ cities, onSearch, onDelete }) {
  const { isDark } = useTheme();
  if (!cities || cities.length === 0) return null;

  return (
    <div
      className={`mt-6 rounded-3xl p-6 w-full
      ${isDark ? "bg-[#1A1A1A]/30" : "bg-[#FFFFFF]/20"}`}
    >
      <h3
        className={`text-md mb-4 
        ${isDark ? "text-white" : "text-black"}`}
      >
        Search History
      </h3>
      <AnimatePresence>
        <motion.ul className="space-y-4">
          {cities.map((city, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className={`flex justify-between items-center px-4 py-2 rounded-xl
          ${isDark ? "bg-[#1A1A1A]/50" : "bg-[#fff]/40"}`}
            >
              <div className="md:flex items-center justify-between md:flex-1 md:pr-2">
                <p>{city.name}</p>
                <p className={`text-sm ${isDark ? "text-[#FFFFFF66]" : "text-[#000000]"}`}>{city.date}</p>
              </div>
              <div className="flex gap-2">
                <button className={`icon-circle ${isDark ? "bg-transparent" : "bg-[#fff]"}`} onClick={() => onSearch(city.name)}>
                  <FaSearch className={`w-3 h-3 ${isDark ? "text-[#FFFFFF66]" : "text-[#000000]/50"}`} />
                </button>
                <button className={`icon-circle ${isDark ? "bg-transparent" : "bg-[#fff]"}`} onClick={() => onDelete(idx)}>
                  <FaTrash className={`w-3 h-3 ${isDark ? "text-[#FFFFFF66]" : "text-[#000000]/50"}`} />
                </button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export default SearchHistory;
