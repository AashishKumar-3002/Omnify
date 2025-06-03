import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaCard from '@/components/ui/MediaCard';
import { Media } from '@/types/media';

const categories = ['All', 'Movies & Series', 'Anime'];

export default function LibraryScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [history, setHistory] = useState<Media[]>([]);
  const [bookmarks, setBookmarks] = useState<Media[]>([]);

  useEffect(() => {
    // Mock data fetching
    setHistory([
      { id: '1', title: 'The Last of Us', type: 'series', coverImage: '', description: '' },
      { id: '2', title: 'Attack on Titan', type: 'anime', coverImage: '', description: '' },
    ]);
    setBookmarks([
      { id: '3', title: 'The Last of Us', type: 'series', coverImage: '', description: '' },
      { id: '4', title: 'Attack on Titan', type: 'anime', coverImage: '', description: '' },
    ]);
  }, []);

  const filteredHistory = () => {
    if (activeCategory === 'All') return history;
    if (activeCategory === 'Movies & Series') {
      return history.filter(item => item.type === 'movie' || item.type === 'series');
    }
    if (activeCategory === 'Anime') {
      return history.filter(item => item.type === 'anime');
    }
    return [];
  };

  const filteredBookmarks = () => {
    if (activeCategory === 'All') return bookmarks;
    if (activeCategory === 'Movies & Series') {
      return bookmarks.filter(item => item.type === 'movie' || item.type === 'series');
    }
    if (activeCategory === 'Anime') {
      return bookmarks.filter(item => item.type === 'anime');
    }
    return [];
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar style="light" />
      <View className="px-md pt-xl pb-sm">
        <Text className="text-2xl font-bold text-primary">Library</Text>
      </View>
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FlatList
        data={filteredHistory()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MediaCard item={item} />
        )}
        ListHeaderComponent={() => (
          <Text className="text-lg font-bold text-primary px-md mt-xl mb-md">Continue Watching</Text>
        )}
        ListEmptyComponent={() => (
          <Text className="text-sm text-secondary px-md">No items to display</Text>
        )}
      />
      <FlatList
        data={filteredBookmarks()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MediaCard item={item} />
        )}
        ListHeaderComponent={() => (
          <Text className="text-lg font-bold text-primary px-md mt-xl mb-md">Bookmarks</Text>
        )}
        ListEmptyComponent={() => (
          <Text className="text-sm text-secondary px-md">No items to display</Text>
        )}
      />
    </SafeAreaView>
  );
}