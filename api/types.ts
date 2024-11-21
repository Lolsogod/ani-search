interface AnimeImages {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface AnimeTitle {
  type: string;
  title: string;
}

interface AnimeData {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  episodes: number;
  status: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  year: number;
  titles: AnimeTitle[];
}

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface AnimeResponse {
  data: AnimeData[];
  pagination: Pagination;
}

type OrderBy = 'mal_id' | 'title' | 'episodes' | 'score' | 'scored_by' | 'rank' | 'popularity' | 'members' | 'favorites';
type SortDirection = 'desc' | 'asc';
type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';

interface SearchParams {
  query: string;
  page: number;
  orderBy: OrderBy;
  sort: SortDirection;
  type?: AnimeType;
  minScore?: number;
  maxScore?: number;
  start_date?: string;
  end_date?: string;
}
