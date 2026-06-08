import { getCache, setCache } from "./cache";

const BASE_URL = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

export async function fetchGithubUser(username) {
  const cacheKey = `user:${username}`;
  const cached = getCache(cacheKey);

  if (cached) {
    console.log(`[CACHE HIT] user:${username}`);
    return { data: cached, fromCache: true };
  }

  console.log(`[CACHE MISS] Fetching from GitHub: ${username}`);

  const res = await fetch(`${BASE_URL}/users/${username}`, {
    headers,
    cache: "no-store",
  });

  if (res.status === 404) {
    throw new Error("User not found");
  }

  if (res.status === 403 || res.status === 429) {
    const resetTime = res.headers.get("X-RateLimit-Reset");
    const resetsAt = new Date(resetTime * 1000).toLocaleTimeString();
    throw new Error(`Rate limit exceeded. Try again at ${resetsAt}`);
  }

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  setCache(cacheKey, data);
  return { data, fromCache: false };
}

export async function fetchGithubRepos(username, page = 1) {
  const cacheKey = `repos:${username}:page:${page}`;
  const cached = getCache(cacheKey);

  if (cached) {
    console.log(`[CACHE HIT]:${username}:page:${page}`);
    return { data: cached, fromCache: true };
  }

  console.log(`[CACHE MISS]: ${username}`);

  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=30&page=${page}&sort=updated`,
    { headers, cache: "no-store" }
  );

  if (res.status === 404) {
    throw new Error("User not found");
  }

  if (res.status === 403 || res.status === 429) {
    const resetTime = res.headers.get("X-RateLimit-Reset");
    const resetsAt = new Date(resetTime * 1000).toLocaleTimeString();
    throw new Error(`Rate limit exceeded. Try again at ${resetsAt}`);
  }

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  setCache(cacheKey, data);
  return { data, fromCache: false };
}