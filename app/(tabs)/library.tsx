import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles, TextStyles, LayoutStyles } from '@/styles';
import { HistoryItem, BookmarkItem } from '@/types/media';
import { api } from '@/utils/api';
import CategoryTabs from '@/components/ui/CategoryTabs';
import MediaCard from '@/components/ui/MediaCard';

const categories = ['All', 'Movies & Series', 'Anime'];

export default function LibraryScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [historyData, bookmarksData] = await Promise.all([
          api.getHistory(),
          api.getBookmarks(),
        ]);
        
        setHistory(historyData);
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error('Error fetching library data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredHistory = () => {
    if (activeCategory === 'All') return history;
    if (activeCategory === 'Movies & Series') {
      return history.filter(item => 
        item.mediaType === 'movie' || item.mediaType === 'series');
    }
    if (activeCategory === 'Anime') {
      return history.filter(item => item.mediaType === 'anime');
    }
    return [];
  };

  const filteredBookmarks = () => {
    if (activeCategory === 'All') return bookmarks;
    if (activeCategory === 'Movies & Series') {
      return bookmarks.filter(item => 
        item.mediaType === 'movie' || item.mediaType === 'series');
    }
    if (activeCategory === 'Anime') {
      return bookmarks.filter(item => item.mediaType === 'anime');
    }
    return [];
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.header}>
          <Text style={TextStyles.headerTitle}>Library</Text>
        </View>
        
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {loading ? (
          <View style={GlobalStyles.loadingContainer}>
            <Text style={GlobalStyles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={[
              { type: 'heading', id: 'continue-heading', title: 'Continue Watching' },
              { type: 'continue', id: 'continue-list', data: filteredHistory() },
              { type: 'heading', id: 'bookmarks-heading', title: 'Bookmarks' },
              { type: 'bookmarks', id: 'bookmarks-list', data: filteredBookmarks() },
              { type: 'heading', id: 'history-heading', title: 'History' },
              { type: 'history', id: 'history-list', data: filteredHistory() },
            ]}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.type === 'heading') {
                return <Text style={TextStyles.sectionTitle}>{item.title}</Text>;
              } else if (item.type === 'continue' && item.data) {
                return (
                  <FlatList
                    data={item.data as HistoryItem[]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={LayoutStyles.horizontalList}
                    keyExtractor={historyItem => historyItem.id}
                    renderItem={({ item: historyItem }) => (
                      <MediaCard
                        item={{
                          id: historyItem.mediaId,
                          title: historyItem.mediaTitle,
                          type: historyItem.mediaType,
                          coverImage: historyItem.coverImage,
                          description: '',
                        }}
                        showProgress={true}
                        progress={historyItem.progress}
                      />
                    )}
                    ListEmptyComponent={
                      <Text style={GlobalStyles.emptyText}>No items to continue watching</Text>
                    }
                  />
                );
              } else if (item.type === 'bookmarks' && item.data) {
                const mediaItems = (item.data as BookmarkItem[]).map(mediaItem => ({
                  id: mediaItem.mediaId,
                  title: mediaItem.mediaTitle,
                  type: mediaItem.mediaType,
                  coverImage: mediaItem.coverImage,
                  description: '',
                }));
                
                return (
                  <FlatList
                    data={mediaItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={LayoutStyles.horizontalList}
                    keyExtractor={mediaItem => mediaItem.id}
                    renderItem={({ item: mediaItem }) => (
                      <MediaCard item={mediaItem} />
                    )}
                    ListEmptyComponent={
                      <Text style={GlobalStyles.emptyText}>No bookmarks</Text>
                    }
                  />
                );
              } else if (item.type === 'history' && item.data) {
                const mediaItems = (item.data as HistoryItem[]).map(mediaItem => ({
                  id: mediaItem.mediaId,
                  title: mediaItem.mediaTitle,
                  type: mediaItem.mediaType,
                  coverImage: mediaItem.coverImage,
                  description: '',
                }));
                
                return (
                  <FlatList
                    data={mediaItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={LayoutStyles.horizontalList}
                    keyExtractor={mediaItem => mediaItem.id}
                    renderItem={({ item: mediaItem }) => (
                      <MediaCard item={mediaItem} />
                    )}
                    ListEmptyComponent={
                      <Text style={GlobalStyles.emptyText}>No history</Text>
                    }
                  />
                );
              }
              return null;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// Remove the entire StyleSheet.create() block as we're now using global styles