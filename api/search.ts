import LRU from 'quick-lru';
import type { SearchParams } from "./types";

const searchCache = new LRU({ maxSize: 100 });
const createCacheKey = (params: SearchParams): string => {
  return JSON.stringify(params);
};

export const searchAnime = async ({
  query,
  page = 1,
  orderBy = "score",
  sort = "desc",
  type,
  minScore,
  maxScore,
  start_date,
  end_date,
}: SearchParams) => {
  try {
    const cacheKey = createCacheKey({ 
      query, page, orderBy, sort, type, 
      minScore, maxScore, start_date, end_date 
    });

    if (searchCache.has(cacheKey)) {
      return searchCache.get(cacheKey);
    }

    let url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&order_by=${orderBy}&sort=${sort}`;

    if (type && type.length > 0) {
      url += `&type=${type}`;
    }
    if (minScore) {
      url += `&min_score=${minScore}`;
    }
    if (maxScore) {
      url += `&max_score=${maxScore}`;
    }
    if (start_date) {
      url += `&start_date=${start_date}`;
    }
    if (end_date) {
      url += `&end_date=${end_date}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    searchCache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
};
