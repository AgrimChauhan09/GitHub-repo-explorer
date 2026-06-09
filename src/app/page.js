"use client";

import { useState, useCallback } from "react";
import { useGithubSearch } from "@/hooks/useGithubSearch";
import SearchBar from "@/compenents/SearchBar";
import UserProfile from "@/compenents/UserProfile";
import RepoList from "@/compenents/RepoList";
import SkeletonLoader from "@/compenents/SkeletonLoader";
import ErrorMessage from "@/compenents/ErrorMessage";

export default function Home() {
  const [username, setUsername] = useState("");
  const { user, repos, loading, error, hasMore, sortBy, setSortBy, searchUser, loadMore, recentSearches } =
    useGithubSearch();

  // useCallback — searchUser stable reference rakhta hai taaki debounce timer reset na ho
  const handleSearch = useCallback(
    (value) => {
      setUsername(value);
      searchUser(value);
    },
    [searchUser]
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            GitHub Explorer
          </h1>
          <p className="text-sm text-gray-500">
            Search any GitHub user and explore their repositories
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          recentSearches={recentSearches}
        />

        {loading && <SkeletonLoader />}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && user && (
          <div className="space-y-6">
            <UserProfile user={user} />
            <RepoList
              repos={repos}
              sortBy={sortBy}
              setSortBy={setSortBy}
              hasMore={hasMore}
              onLoadMore={loadMore}
              username={username}
            />
          </div>
        )}

        {!loading && !error && !user && (
          <div className="text-center py-16 text-sm text-gray-400">
            Search a GitHub username to get started
          </div>
        )}
      </div>
    </main>
  );
}