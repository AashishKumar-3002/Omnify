import { Media, Movie, Series, Anime, Manga, Novel, Episode, Chapter, HistoryItem, BookmarkItem } from '../types/media';

// API base URL - replace with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

// Mock data for development
const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Last Frontier',
    type: 'movie',
    coverImage: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A thrilling adventure in the untamed wilderness.',
    releaseYear: '2024',
    rating: 8.5,
    duration: '2h 15m',
    videoUrl: 'https://example.com/videos/last-frontier'
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    type: 'movie',
    coverImage: 'https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A journey into a dystopian future where hope still exists.',
    releaseYear: '2023',
    rating: 7.9,
    duration: '2h 5m',
    videoUrl: 'https://example.com/videos/echoes-tomorrow'
  }
];

const MOCK_SERIES: Series[] = [
  {
    id: '3',
    title: 'The Silent Watchers',
    type: 'series',
    coverImage: 'https://images.pexels.com/photos/9072218/pexels-photo-9072218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A group of elite agents fight against invisible threats.',
    releaseYear: '2022',
    rating: 9.1,
    seasons: 2,
    episodes: [
      {
        id: 's1e1',
        title: 'Beginning of the End',
        number: 1,
        season: 1,
        duration: '42m',
        thumbnailUrl: 'https://images.pexels.com/photos/9072218/pexels-photo-9072218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://example.com/videos/silent-watchers/s1e1'
      }
    ]
  },
  {
    id: '4',
    title: 'City of Whispers',
    type: 'series',
    coverImage: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Uncovering secrets in a city full of mysteries.',
    releaseYear: '2021',
    rating: 8.7,
    seasons: 3,
    episodes: [
      {
        id: 's1e1',
        title: 'Shadows in the Alley',
        number: 1,
        season: 1,
        duration: '45m',
        thumbnailUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://example.com/videos/city-whispers/s1e1'
      }
    ]
  }
];

const MOCK_ANIME: Anime[] = [
  {
    id: '5',
    title: 'Celestial Guardians',
    type: 'anime',
    coverImage: 'https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A group of friends discover their celestial powers.',
    releaseYear: '2023',
    rating: 8.9,
    seasons: 2,
    episodes: [
      {
        id: 's1e1',
        title: 'Awakening',
        number: 1,
        season: 1,
        duration: '24m',
        thumbnailUrl: 'https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://example.com/videos/celestial-guardians/s1e1'
      }
    ]
  },
  {
    id: '6',
    title: 'Shadows of the Past',
    type: 'anime',
    coverImage: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A hero confronts their forgotten memories.',
    releaseYear: '2022',
    rating: 9.3,
    seasons: 1,
    episodes: [
      {
        id: 's1e1',
        title: 'Lost Memories',
        number: 1,
        season: 1,
        duration: '24m',
        thumbnailUrl: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://example.com/videos/shadows-past/s1e1'
      }
    ]
  }
];

const MOCK_MANGA: Manga[] = [
  {
    id: '7',
    title: 'Eternal Blade',
    type: 'manga',
    coverImage: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A legendary swordsman seeks redemption.',
    releaseYear: '2021',
    rating: 9.0,
    chapters: [
      {
        id: 'ch1',
        title: 'The Broken Sword',
        number: 1,
        content: 'Chapter content...'
      }
    ]
  },
  {
    id: '8',
    title: 'Spirit Hunters',
    type: 'manga',
    coverImage: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A team of specialists who hunt malevolent spirits.',
    releaseYear: '2022',
    rating: 8.8,
    chapters: [
      {
        id: 'ch1',
        title: 'First Hunt',
        number: 1,
        content: 'Chapter content...'
      }
    ]
  }
];

const MOCK_NOVELS: Novel[] = [
  {
    id: '9',
    title: 'Whispers in the Void',
    type: 'novel',
    coverImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A cosmic horror story of ancient entities.',
    releaseYear: '2023',
    rating: 8.6,
    chapters: [
      {
        id: 'ch1',
        title: 'Chapter 1',
        number: 1,
        content: `The sun dipped below the horizon, casting long shadows across the ancient forest. A lone figure, cloaked and hooded, moved silently through the undergrowth, their footsteps muffled by the soft earth. The air was thick with the scent of pine and damp leaves, and the only sound was the rustling of unseen creatures in the darkness. The figure paused, their head cocked to one side, listening intently. A faint sound reached their ears – a distant howl, carried on the wind. Their hand instinctively went to the hilt of the sword at their side, their eyes scanning the surrounding trees, searching for any sign of movement. The howl came again, closer this time, and the figure knew they were not alone in the forest. They drew their sword, the polished steel gleaming in the fading light, and prepared to face whatever lurked in the shadows.`
      }
    ]
  },
  {
    id: '10',
    title: 'Chronicles of the Last Kingdom',
    type: 'novel',
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An epic fantasy tale of kingdoms at war.',
    releaseYear: '2022',
    rating: 9.2,
    chapters: [
      {
        id: 'ch1',
        title: 'The Fall of Eldoria',
        number: 1,
        content: 'Chapter content...'
      }
    ]
  }
];

// Mock history data
const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 'h1',
    mediaId: '9',
    mediaTitle: 'The Last of Us',
    mediaType: 'series',
    coverImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    progress: 75,
    lastOpened: new Date().toISOString()
  },
  {
    id: 'h2',
    mediaId: '6',
    mediaTitle: 'Attack on Titan',
    mediaType: 'anime',
    coverImage: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    progress: 50,
    lastOpened: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'h3',
    mediaId: '10',
    mediaTitle: 'The Witcher',
    mediaType: 'series',
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    progress: 25,
    lastOpened: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

// Mock bookmarks
const MOCK_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'b1',
    mediaId: '9',
    mediaTitle: 'The Last of Us',
    mediaType: 'series',
    coverImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    dateAdded: new Date().toISOString()
  },
  {
    id: 'b2',
    mediaId: '6',
    mediaTitle: 'Attack on Titan',
    mediaType: 'anime',
    coverImage: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    dateAdded: new Date(Date.now() - 86400000).toISOString()
  }
];

// API Functions
export const api = {
  // Movies
  getMovies: async (): Promise<Movie[]> => {
    // In a real app, this would be a fetch call to your API
    // return fetch(`${API_BASE_URL}/movies`).then(res => res.json());
    return new Promise(resolve => setTimeout(() => resolve(MOCK_MOVIES), 500));
  },

  // Series
  getSeries: async (): Promise<Series[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_SERIES), 500));
  },

  // Anime
  getAnime: async (): Promise<Anime[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ANIME), 500));
  },

  // Manga
  getManga: async (): Promise<Manga[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_MANGA), 500));
  },

  // Novels
  getNovels: async (): Promise<Novel[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_NOVELS), 500));
  },

  // Get media by ID
  getMediaById: async (id: string): Promise<Media | null> => {
    const allMedia = [
      ...MOCK_MOVIES, 
      ...MOCK_SERIES, 
      ...MOCK_ANIME, 
      ...MOCK_MANGA, 
      ...MOCK_NOVELS
    ];
    const media = allMedia.find(item => item.id === id) || null;
    return new Promise(resolve => setTimeout(() => resolve(media), 300));
  },

  // Get chapter content
  getChapter: async (mediaId: string, chapterId: string): Promise<Chapter | null> => {
    const allMedia = [...MOCK_MANGA, ...MOCK_NOVELS];
    const media = allMedia.find(item => item.id === mediaId);
    if (!media) return Promise.resolve(null);
    
    const chapter = media.chapters.find(ch => ch.id === chapterId) || null;
    return new Promise(resolve => setTimeout(() => resolve(chapter), 300));
  },

  // History
  getHistory: async (): Promise<HistoryItem[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_HISTORY), 300));
  },
  
  addToHistory: async (item: Omit<HistoryItem, 'id' | 'lastOpened'>): Promise<HistoryItem> => {
    const newItem: HistoryItem = {
      ...item,
      id: `h${Date.now()}`,
      lastOpened: new Date().toISOString()
    };
    MOCK_HISTORY.unshift(newItem);
    return Promise.resolve(newItem);
  },
  
  updateHistory: async (id: string, progress: number): Promise<HistoryItem | null> => {
    const index = MOCK_HISTORY.findIndex(item => item.id === id);
    if (index === -1) return Promise.resolve(null);
    
    MOCK_HISTORY[index] = {
      ...MOCK_HISTORY[index],
      progress,
      lastOpened: new Date().toISOString()
    };
    return Promise.resolve(MOCK_HISTORY[index]);
  },

  // Bookmarks
  getBookmarks: async (): Promise<BookmarkItem[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_BOOKMARKS), 300));
  },
  
  addBookmark: async (item: Omit<BookmarkItem, 'id' | 'dateAdded'>): Promise<BookmarkItem> => {
    // Check if already bookmarked
    const existing = MOCK_BOOKMARKS.find(b => b.mediaId === item.mediaId);
    if (existing) return Promise.resolve(existing);
    
    const newItem: BookmarkItem = {
      ...item,
      id: `b${Date.now()}`,
      dateAdded: new Date().toISOString()
    };
    MOCK_BOOKMARKS.push(newItem);
    return Promise.resolve(newItem);
  },
  
  removeBookmark: async (id: string): Promise<boolean> => {
    const index = MOCK_BOOKMARKS.findIndex(item => item.id === id);
    if (index === -1) return Promise.resolve(false);
    
    MOCK_BOOKMARKS.splice(index, 1);
    return Promise.resolve(true);
  }
};