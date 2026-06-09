import RepoCard from "./RepoCard";

export default function RepoList({ repos, sortBy, setSortBy, hasMore, onLoadMore, username }) {
  return (
    <div className="space-y-4 text-black">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">
          {repos.length} repositories
        </h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm text-black px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="stars">Sort by Stars</option>
          <option value="name">Sort by Name</option>
          <option value="updated">Sort by Updated</option>
        </select>
      </div>

      {repos.length === 0 ? (
        <div className="text-center py-10 text-sm text-black">
          No repositories found.
        </div>
      ) : (
        repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))
      )}

      {hasMore && (
        <button
          onClick={() => onLoadMore(username)}
          className="w-full py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
}