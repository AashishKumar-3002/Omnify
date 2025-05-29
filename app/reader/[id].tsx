import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Book, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Layout } from '@/constants/layout';
import { api } from '@/utils/api';
import { Novel, Manga, Chapter } from '@/types/media';
import BackButton from '@/components/ui/BackButton';

type ReaderSettings = {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: 'light' | 'dark' | 'sepia';
};

export default function ReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [media, setMedia] = useState<Novel | Manga | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.lg,
    fontFamily: Typography.fontFamily.regular,
    theme: 'dark',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const mediaData = await api.getMediaById(id);
        if (mediaData && (mediaData.type === 'novel' || mediaData.type === 'manga')) {
          setMedia(mediaData as Novel | Manga);
          
          if ('chapters' in mediaData && mediaData.chapters.length > 0) {
            setChapter(mediaData.chapters[0]);
          }
        }
        
        // Check if bookmarked
        const bookmarks = await api.getBookmarks();
        setIsBookmarked(bookmarks.some(b => b.mediaId === id));
        
        // Add to history
        if (mediaData) {
          api.addToHistory({
            mediaId: mediaData.id,
            mediaTitle: mediaData.title,
            mediaType: mediaData.type,
            coverImage: mediaData.coverImage,
            progress: 0
          });
        }
      } catch (error) {
        console.error('Error fetching reader data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const toggleBookmark = async () => {
    if (!media) return;
    
    if (isBookmarked) {
      const bookmarks = await api.getBookmarks();
      const bookmark = bookmarks.find(b => b.mediaId === media.id);
      if (bookmark) {
        await api.removeBookmark(bookmark.id);
      }
    } else {
      await api.addBookmark({
        mediaId: media.id,
        mediaTitle: media.title,
        mediaType: media.type,
        coverImage: media.coverImage
      });
    }
    
    setIsBookmarked(!isBookmarked);
  };
  
  const getBackgroundColor = () => {
    switch (settings.theme) {
      case 'light':
        return '#ffffff';
      case 'sepia':
        return '#f8f1e3';
      case 'dark':
      default:
        return Colors.background.dark;
    }
  };
  
  const getTextColor = () => {
    switch (settings.theme) {
      case 'light':
        return '#333333';
      case 'sepia':
        return '#5b4636';
      case 'dark':
      default:
        return Colors.text.primary;
    }
  };
  
  const toggleControls = () => {
    setShowControls(!showControls);
    if (showSettings) setShowSettings(false);
  };
  
  if (loading || !media || !chapter) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: getBackgroundColor() }]}>
        <Text style={[styles.loadingText, { color: getTextColor() }]}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
      
      <Pressable
        style={styles.contentContainer}
        onPress={toggleControls}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
          <Text 
            style={[
              styles.content, 
              { 
                color: getTextColor(),
                fontSize: settings.fontSize,
                lineHeight: settings.lineHeight,
                fontFamily: settings.fontFamily,
              }
            ]}
          >
            {chapter.content}
          </Text>
        </ScrollView>
      </Pressable>
      
      {showControls && (
        <>
          <SafeAreaView style={styles.topControls}>
            <BackButton color={getTextColor()} />
            <View style={styles.rightControls}>
              <Pressable onPress={toggleBookmark} style={styles.controlButton}>
                {isBookmarked ? (
                  <BookmarkCheck color={Colors.primary} size={24} fill={Colors.primary} />
                ) : (
                  <Bookmark color={getTextColor()} size={24} />
                )}
              </Pressable>
              <Pressable 
                onPress={() => setShowSettings(!showSettings)} 
                style={styles.controlButton}
              >
                <Book color={showSettings ? Colors.primary : getTextColor()} size={24} />
              </Pressable>
            </View>
          </SafeAreaView>
          
          {showSettings && (
            <SafeAreaView style={styles.settingsContainer}>
              <Text style={[styles.settingsTitle, { color: getTextColor() }]}>Font</Text>
              <View style={styles.settingsRow}>
                <Pressable 
                  style={[
                    styles.settingButton, 
                    settings.fontSize === Typography.fontSize.sm && styles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.sm })}
                >
                  <Text style={[
                    styles.settingButtonText,
                    settings.fontSize === Typography.fontSize.sm && styles.activeSettingText
                  ]}>A</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.settingButton, 
                    settings.fontSize === Typography.fontSize.md && styles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.md })}
                >
                  <Text style={[
                    styles.settingButtonText,
                    { fontSize: Typography.fontSize.md },
                    settings.fontSize === Typography.fontSize.md && styles.activeSettingText
                  ]}>A</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.settingButton, 
                    settings.fontSize === Typography.fontSize.lg && styles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.lg })}
                >
                  <Text style={[
                    styles.settingButtonText,
                    { fontSize: Typography.fontSize.lg },
                    settings.fontSize === Typography.fontSize.lg && styles.activeSettingText
                  ]}>A</Text>
                </Pressable>
              </View>
              
              <Text style={[styles.settingsTitle, { color: getTextColor() }]}>Theme</Text>
              <View style={styles.settingsRow}>
                <Pressable 
                  style={[
                    styles.themeButton,
                    { backgroundColor: '#ffffff' },
                    settings.theme === 'light' && styles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'light' })}
                >
                  <Text style={[
                    styles.themeButtonText,
                    { color: '#333333' },
                  ]}>Light</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.themeButton,
                    { backgroundColor: '#f8f1e3' },
                    settings.theme === 'sepia' && styles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'sepia' })}
                >
                  <Text style={[
                    styles.themeButtonText,
                    { color: '#5b4636' },
                  ]}>Sepia</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.themeButton,
                    { backgroundColor: Colors.background.dark },
                    settings.theme === 'dark' && styles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'dark' })}
                >
                  <Text style={[
                    styles.themeButtonText,
                    { color: Colors.text.primary },
                  ]}>Dark</Text>
                </Pressable>
              </View>
              
              <View style={styles.tableOfContents}>
                <Text style={[styles.tocTitle, { color: getTextColor() }]}>Table of Contents</Text>
                <Pressable style={styles.tocItem}>
                  <Text style={[
                    styles.tocItemText, 
                    { color: getTextColor() },
                    chapter.number === 1 && { color: Colors.primary, fontFamily: Typography.fontFamily.medium }
                  ]}>
                    Chapter 1
                  </Text>
                </Pressable>
                <Pressable style={styles.tocItem}>
                  <Text style={[styles.tocItemText, { color: getTextColor() }]}>Chapter 2</Text>
                </Pressable>
                <Pressable style={styles.tocItem}>
                  <Text style={[styles.tocItemText, { color: getTextColor() }]}>Chapter 3</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.lg,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['4xl'],
  },
  chapterTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  content: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.lg,
    fontFamily: Typography.fontFamily.regular,
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightControls: {
    flexDirection: 'row',
  },
  controlButton: {
    marginLeft: Spacing.md,
    padding: Spacing.xs,
  },
  settingsContainer: {
    position: 'absolute',
    top: 70,
    right: 0,
    width: '80%',
    backgroundColor: Colors.background.medium,
    borderTopLeftRadius: Layout.radius.lg,
    borderBottomLeftRadius: Layout.radius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  settingsTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.sm,
  },
  settingsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  settingButton: {
    width: 44,
    height: 44,
    borderRadius: Layout.radius.md,
    backgroundColor: Colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  activeSettingButton: {
    backgroundColor: Colors.primary,
  },
  settingButtonText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.md,
  },
  activeSettingText: {
    color: Colors.background.dark,
  },
  themeButton: {
    flex: 1,
    height: 44,
    borderRadius: Layout.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  activeThemeButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  themeButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  tableOfContents: {
    marginTop: Spacing.lg,
  },
  tocTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.sm,
  },
  tocItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  tocItemText: {
    fontSize: Typography.fontSize.md,
  },
});