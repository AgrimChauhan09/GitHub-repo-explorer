import { useState, useEffect, useCallback } from "react";

const MAX_RECENT = 5;

function getStoredSearches() {
  try {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  } catch {
    return [];
  }
}

export function useGithubSearch() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sortBy, setSortBy] = useState("stars");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    setRecentSearches(getStoredSearches());
  }, []);

  function saveToRecent(username) {
    const prev = getStoredSearches();
    const updated = [
      username,
      ...prev.filter((u) => u !== username),
    ].slice(0, MAX_RECENT);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);
    console.log("Recent searches updated:", updated);
  }

  // ADDED: useCallback — stable reference taaki debounce timer reset na ho har render pe
  const searchUser = useCallback(async (username) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setPage(1);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`/api/github/user/${username}`),
        fetch(`/api/github/repos/${username}?page=1`),
      ]);

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      if (!userRes.ok) {
        setError(userData.error || "Something went wrong");
        return;
      }

      setUser(userData);
      setRepos(reposData.repos || []);
      setHasMore((reposData.repos || []).length === 30);
      saveToRecent(username);
    } catch (err) {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []); // ADDED: empty array — function reference kabhi nahi badlega

  // ADDED: useCallback — loadMore bhi stable rakhna zaroori hai
  const loadMore = useCallback(async (username) => {
    const nextPage = page + 1;

    try {
      const res = await fetch(
        `/api/github/repos/${username}?page=${nextPage}`
      );
      const data = await res.json();

      setRepos((prev) => [...prev, ...(data.repos || [])]);
      setPage(nextPage);
      setHasMore((data.repos || []).length === 30);
    } catch (err) {
      setError("Failed to load more repos.");
    }
  }, [page]);

  function getSortedRepos() {
    return [...repos].sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "updated")
        return new Date(b.updated_at) - new Date(a.updated_at);
      return 0;
    });
  }

  return {
    user,
    repos: getSortedRepos(),
    loading,
    error,
    hasMore,
    sortBy,
    setSortBy,
    searchUser,
    loadMore,
    recentSearches,
  };
}