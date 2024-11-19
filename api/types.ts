interface AnimeData {
  id: number;
  title: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
}

interface AnimeResponse {
  data: AnimeData[];
  pagination: {
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
