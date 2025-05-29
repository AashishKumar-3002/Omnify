import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { HistoryItem, BookmarkItem } from '@/types/media';
import { api } from '@/utils/api';
import BackButton from '@/components/ui/BackButton';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Library</Text>
        </View>
        
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
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
                return <Text style={styles.sectionTitle}>{item.title}</Text>;
              } else if (item.type === 'continue') {
                return (
                  <FlatList
                    data={item.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
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
                      <Text style={styles.emptyText}>No items to continue watching</Text>
                    }
                  />
                );
              } else if (item.type === 'bookmarks' || item.type === 'history') {
                const mediaItems = item.data.map(mediaItem => ({
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
                    contentContainerStyle={styles.horizontalList}
                    keyExtractor={mediaItem => mediaItem.id}
                    renderItem={({ item: mediaItem }) => (
                      <MediaCard item={mediaItem} />
                    )}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>No {item.type}</Text>
                    }
                  />
                );
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  horizontalList: {
    paddingHorizontal: Spacing.md,
  },
  emptyText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.md,
    padding: Spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.md,
  },
});