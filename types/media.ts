export type MediaType = 'movie' | 'series' | 'anime' | 'manga' | 'novel';

export interface Media {
  id: string;
  title: string;
  type: MediaType;
  coverImage: string;
  description: string;
  releaseYear?: string;
  rating?: number;
}

export interface Movie extends Media {
  type: 'movie';
  duration: string;
  videoUrl: string;
}

export interface Series extends Media {
  type: 'series';
  seasons: number;
  episodes: Episode[];
}

export interface Anime extends Media {
  type: 'anime';
  seasons: number;
  episodes: Episode[];
}

export interface Manga extends Media {
  type: 'manga';
  chapters: Chapter[];
}

export interface Novel extends Media {
  type: 'novel';
  chapters: Chapter[];
}

export interface Episode {
  id: string;
  title: string;
  number: number;
  season: number;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface Chapter {
  id: string;
  title: string;
  number: number;
  content: string;
}

export interface HistoryItem {
  id: string;
  mediaId: string;
  mediaTitle: string;
  mediaType: MediaType;
  coverImage: string;
  progress: number; // percentage or time in seconds or chapter number
  lastOpened: string; // ISO date string
}

export interface BookmarkItem {
  id: string;
  mediaId: string;
  mediaTitle: string;
  mediaType: MediaType;
  coverImage: string;
  dateAdded: string; // ISO date string
}