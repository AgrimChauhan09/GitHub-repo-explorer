# GitHub Explorer

I chose Exercise 3: GitHub Repo Explorer from the assessment.

This is a full-stack web application built with Next.js where you can search any GitHub username and view their public profile along with all their repositories. The frontend never calls GitHub directly — all requests go through Next.js API routes that act as a proxy, handling caching, rate limiting, and error states cleanly.

---

## Live Demo

[https://github-explorer-your-url.vercel.app](https://git-hub-repo-explorer-henna.vercel.app/)

---

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React (functional components + hooks)
- Tailwind CSS

**Backend**
- Next.js API Routes (acts as Node.js proxy)

**Caching**
- In-memory Map with 60 second TTL

I used Next.js because it lets you handle both frontend and backend in a single project. The API routes proxy all GitHub calls server-side so the token never gets exposed in the browser. Tailwind kept the styling fast and consistent without needing a separate CSS file.

---

## Features

- Search any GitHub username
- View avatar, bio, follower count, following count and public repo count
- Browse all public repositories with name, description, language, stars and last updated date
- Sort repos by stars, name or last updated
- Click any repo card to expand and see open issues, default branch and fork count
- Load more repos with pagination
- Server-side caching — same username within 60 seconds skips the GitHub API call entirely
- Graceful error handling for invalid usernames, rate limits and network failures
- Loading skeleton while data is being fetched

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/github-explorer.git
cd github-explorer

# 2. Install dependencies
npm install

# 3. Add your GitHub token
cp .env.example .env.local
# Open .env.local and add:
# GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx

# 4. Start the dev server
npm run dev
```

App runs on http://localhost:3000

## API Endpoints

**Get GitHub User**
```
GET /api/github/user/:username
```

Response includes login, name, avatar_url, bio, followers, following, public_repos and a fromCache flag.

Error responses — 404 if user not found, 429 if rate limit is hit with a resetsAt time, 400 if username is empty.

---

**Get User Repositories**
```
GET /api/github/repos/:username?page=1
```

Returns 30 repos per page. Each repo includes name, description, language, stargazers_count, updated_at, default_branch, open_issues_count, forks_count and html_url.

---

## Project Structure

```
github-explorer/
├── src/
│   ├── app/
│   │   ├── page.js                             # Home page — search bar and results
│   │   ├── layout.js                           # Root layout
│   │   └── api/
│   │       └── github/
│   │           ├── user/[username]/route.js    # Proxy route for GitHub user
│   │           └── repos/[username]/route.js   # Proxy route for repositories
│   ├── components/
│   │   ├── SearchBar.jsx                       # Input with Enter key support
│   │   ├── UserProfile.jsx                     # Avatar, bio and follower stats
│   │   ├── RepoList.jsx                        # Sort controls and repo cards
│   │   ├── RepoCard.jsx                        # Single repo, expandable on click
│   │   ├── SkeletonLoader.jsx                  # Animated loading placeholder
│   │   └── ErrorMessage.jsx                    # Error display component
│   ├── hooks/
│   │   └── useGithubSearch.js                  # All fetch logic, state, pagination and sorting
│   └── lib/
│       ├── cache.js                            # In-memory Map with TTL
│       └── githubApi.js                        # GitHub API calls with error handling
├── .env.example
├── .env.local                                  # Not committed — add your token here
└── README.md
```

---

## What Works

- Full GitHub user profile display
- Repository list with sorting and pagination
- Expandable repo cards with extra details
- Server-side caching with 60 second TTL
- Rate limit and 404 error handling
- Loading skeletons while fetching

---

## What I Would Improve With More Time

- Language breakdown chart across all repos using Recharts
- Debounced search-as-you-type

---

## Note

I used Cursor AI mainly to help with a few Tailwind CSS issues, especially while implementing the skeleton loader for the repository cards. I also used it  for small syntax references when I couldn't remember the exact implementation.
Other than that, I built the project myself while learning Next.js. I was already comfortable with the core concepts, so I didn't face many difficulties. I chose Next.js because I wanted to gain more hands-on experience with it while building a real project.


---

## Author

Agrim Chauhan
