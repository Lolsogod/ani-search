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
    return data;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
};
