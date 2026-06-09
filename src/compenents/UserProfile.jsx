export default function UserProfile({ user }) {
    return (
      <div className="flex items-center gap-5 p-6 rounded-xl border border-gray-200 bg-white">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full border border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {user.name || user.login}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">@{user.login}</p>
  
          {user.bio && (
            <p className="text-sm text-gray-600 mt-2">{user.bio}</p>
          )}
  
          <div className="flex gap-5 mt-3 text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">{user.followers}</strong> followers
            </span>
            <span>
              <strong className="text-gray-900">{user.following}</strong> following
            </span>
            <span>
              <strong className="text-gray-900">{user.public_repos}</strong> repos
            </span>
          </div>
  
          {user.html_url && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-xs text-blue-600 hover:underline"
            >
              View on GitHub →
            </a>
          )}
        </div>
      </div>
    );
  }