import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  function handleSearch() {
    if (!input.trim()) return;
    onSearch(input.trim());
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
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
  );
}