import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles, TextStyles } from '@/styles';
import { Movie, Series, Anime, Manga } from '@/types/media';
import { api } from '@/utils/api';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaSection from '@/components/ui/MediaSection';

const categories = ['Movies', 'Series', 'Anime', 'Manga/Manhwa'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Movies');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [anime, setAnime] = useState<Anime[]>([]);
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesData, seriesData, animeData, mangaData] = await Promise.all([
          api.getMovies(),
          api.getSeries(),
          api.getAnime(),
          api.getManga()
        ]);
        
        setMovies(moviesData);
        setSeries(seriesData);
        setAnime(animeData);
        setManga(mangaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeCategory) {
      case 'Movies':
        return (
          <>
            <MediaSection 
              title="Featured Movies" 
              data={movies} 
              viewAllRoute="/movies/featured"
              cardSize="large"
            />
            <MediaSection 
              title="Popular Movies" 
              data={[...movies].reverse()} 
              viewAllRoute="/movies/popular"
            />
          </>
        );
      case 'Series':
        return (
          <>
            <MediaSection 
              title="Popular Series" 
              data={series} 
              viewAllRoute="/series/popular"
            />
            <MediaSection 
              title="New Releases" 
              data={[...series].reverse()} 
              viewAllRoute="/series/new"
            />
          </>
        );
      case 'Anime':
        return (
          <>
            <MediaSection 
              title="Trending Anime" 
              data={anime} 
              viewAllRoute="/anime/trending"
            />
            <MediaSection 
              title="Classic Anime" 
              data={[...anime].reverse()} 
              viewAllRoute="/anime/classic"
            />
          </>
        );
      case 'Manga/Manhwa':
        return (
          <>
            <MediaSection 
              title="Top Manga/Manhwa" 
              data={manga} 
              viewAllRoute="/manga/top"
            />
            <MediaSection 
              title="New Releases" 
              data={[...manga].reverse()} 
              viewAllRoute="/manga/new"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <View style={GlobalStyles.container}>
        <Text style={TextStyles.headerTitle}>Entertainment Hub</Text>
        
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollContent}
        >
          {loading ? (
            <Text style={TextStyles.bodyTextSecondary}>Loading...</Text>
          ) : (
            renderContent()
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}