import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaCard from '@/components/ui/MediaCard';
import { api } from '@/utils/api';
import { Media } from '@/types/media';

const categories = ['All', 'Movies & Series', 'Anime'];

export default function LibraryScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [history, setHistory] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    api.getHistory().then(setHistory);
    api.getBookmarks().then(setBookmarks);
  }, []);

  const filteredHistory = () => {
    if (activeCategory === 'All') return history;
    if (activeCategory === 'Movies & Series') {
      return history.filter(item => item.mediaType === 'movie' || item.mediaType === 'series');
    }
    if (activeCategory === 'Anime') {
      return history.filter(item => item.mediaType === 'anime');
    }
    return [];
  };

  const filteredBookmarks = () => {
    if (activeCategory === 'All') return bookmarks;
    if (activeCategory === 'Movies & Series') {
      return bookmarks.filter(item => item.mediaType === 'movie' || item.mediaType === 'series');
    }
    if (activeCategory === 'Anime') {
      return bookmarks.filter(item => item.mediaType === 'anime');
    }
    return [];
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar style="light" />
      <View className="px-4 pt-8 pb-2">
        <Text className="text-2xl font-bold text-primary">Library</Text>
      </View>
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ScrollView className="flex-1 px-2" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-primary mb-2 mt-2">Continue Watching</Text>
        <View className="flex-row gap-4 mb-4">
          {filteredHistory().map((item) => (
            <MediaCard key={item.id} item={{
              id: item.mediaId,
              title: item.mediaTitle,
              type: item.mediaType,
              coverImage: item.coverImage,
              description: '',
            }} showProgress progress={item.progress || 0} />
          ))}
        </View>
        <Text className="text-lg font-bold text-primary mb-2">Bookmarks</Text>
        <View className="flex-row gap-4 mb-4">
          {filteredBookmarks().map((item) => (
            <MediaCard key={item.id} item={{
              id: item.mediaId,
              title: item.mediaTitle,
              type: item.mediaType,
              coverImage: item.coverImage,
              description: '',
            }} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}