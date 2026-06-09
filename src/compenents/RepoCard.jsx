import { useState } from "react";

export default function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false);

  const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {repo.description}
            </p>
          )}
        </div>

        <span className="text-xs text-gray-400">{expanded ? "▲" : "▼"}</span>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stargazers_count}</span>
        <span>Updated {updatedAt}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="text-gray-400">Default branch</span>
            <p className="font-medium text-gray-800">{repo.default_branch}</p>
          </div>
          <div>
            <span className="text-gray-400">Open issues</span>
            <p className="font-medium text-gray-800">{repo.open_issues_count}</p>
          </div>
          <div>
            <span className="text-gray-400">Visibility</span>
            <p className="font-medium text-gray-800">{repo.private ? "Private" : "Public"}</p>
          </div>
          <div>
            <span className="text-gray-400">Forks</span>
            <p className="font-medium text-gray-800">{repo.forks_count}</p>
          </div>
        </div>
      )}
    </div>
  );
}