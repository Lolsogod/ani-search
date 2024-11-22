export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';
export type OrderBy = 'mal_id' | 'title' | 'episodes' | 'score' | 'scored_by' | 'rank' | 'popularity' | 'members' | 'favorites';
export type SortDirection = 'desc' | 'asc';

export interface AnimeImages {
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

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface AnimeDataFull {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
  title_english: string;
  title_japanese: string;
  type: AnimeType;
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

export type AnimeDataTable = Pick<AnimeDataFull, 'mal_id' | 'title' | 'type'> & {
  score: number | null;
  members: number | null;
  episodes: number | null;
};

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  }
}