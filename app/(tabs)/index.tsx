import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaSection from '@/components/ui/MediaSection';
import { api } from '@/utils/api';
import { Media } from '@/types/media';

const categories = ['Movies', 'Series', 'Anime', 'Manga/Manhwa'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Movies');
  const [movies, setMovies] = useState<Media[]>([]);
  const [series, setSeries] = useState<Media[]>([]);
  const [anime, setAnime] = useState<Media[]>([]);
  const [manga, setManga] = useState<Media[]>([]);

  useEffect(() => {
    api.getMovies().then(setMovies);
    api.getSeries().then(setSeries);
    api.getAnime().then(setAnime);
    api.getManga().then(setManga);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar style="light" />
      <View className="px-4 pt-8 pb-2">
        <Text className="text-2xl font-bold text-primary">Entertainment Hub</Text>
      </View>
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ScrollView className="flex-1 px-2" showsVerticalScrollIndicator={false}>
        <MediaSection title="Featured Movies" data={movies} />
        <MediaSection title="Popular Series" data={series} />
        <MediaSection title="Trending Anime" data={anime} />
        <MediaSection title="Top Manga/Manhwa" data={manga} />
      </ScrollView>
    </SafeAreaView>
  );
}