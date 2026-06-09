import { useState, useEffect, useRef } from "react";

export default function SearchBar({ onSearch, loading, recentSearches = [] }) {
  const [input, setInput] = useState("");
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!input.trim()) return;

    debounceTimer.current = setTimeout(() => {
      onSearch(input.trim());
    }, 5000);

    return () => clearTimeout(debounceTimer.current);
  }, [input, onSearch]);

  function handleSearch() {
    if (!input.trim()) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    onSearch(input.trim());
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleRecentClick(username) {
    setInput(username);
    onSearch(username);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !input.trim()}
          className="px-5 py-2 rounded-lg bg-gray-900 text-white text-sm disabled:opacity-50 hover:bg-gray-700 transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {recentSearches.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400">Recent:</span>
          {recentSearches.map((username) => (
            <button
              key={username}
              onClick={() => handleRecentClick(username)}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}