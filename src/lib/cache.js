const cache = new Map();

export function getCache(key) {
  const entry = cache.get(key);
  
  if (!entry) return null;
  
  // expired check
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

export function setCache(key, data, ttl = 60) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl * 1000,
  });
}