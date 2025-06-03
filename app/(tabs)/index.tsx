import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaSection from '@/components/ui/MediaSection';
import { Media } from '@/types/media';

const categories = ['Movies', 'Series', 'Anime', 'Manga/Manhwa'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Movies');
  const [movies, setMovies] = useState<Media[]>([]);
  const [series, setSeries] = useState<Media[]>([]);
  const [anime, setAnime] = useState<Media[]>([]);
  const [manga, setManga] = useState<Media[]>([]);

  useEffect(() => {
    // Mock data fetching
    setMovies([{ id: '1', title: 'Movie 1', type: 'movie', coverImage: '', description: '' }, { id: '2', title: 'Movie 2', type: 'movie', coverImage: '', description: '' }]);
    setSeries([{ id: '3', title: 'Series 1', type: 'series', coverImage: '', description: '' }, { id: '4', title: 'Series 2', type: 'series', coverImage: '', description: '' }]);
    setAnime([{ id: '5', title: 'Anime 1', type: 'anime', coverImage: '', description: '' }, { id: '6', title: 'Anime 2', type: 'anime', coverImage: '', description: '' }]);
    setManga([{ id: '7', title: 'Manga 1', type: 'manga', coverImage: '', description: '' }, { id: '8', title: 'Manga 2', type: 'manga', coverImage: '', description: '' }]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar style="light" />
      <View className="px-md pt-xl pb-sm">
        <Text className="text-2xl font-bold text-primary">Entertainment Hub</Text>
      </View>
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ScrollView className="flex-1 px-md" showsVerticalScrollIndicator={false}>
        <MediaSection title="Featured Movies" data={movies} />
        <MediaSection title="Popular Series" data={series} />
        <MediaSection title="Trending Anime" data={anime} />
        <MediaSection title="Top Manga/Manhwa" data={manga} />
      </ScrollView>
    </SafeAreaView>
  );
}