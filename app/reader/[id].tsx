import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Book, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { GlobalStyles, ComponentStyles, LayoutStyles } from '@/styles';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
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
          const typedMedia = mediaData as Novel | Manga;
          setMedia(typedMedia);
          
          if (typedMedia.chapters && typedMedia.chapters.length > 0) {
            setChapter(typedMedia.chapters[0]);
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
      <SafeAreaView style={[GlobalStyles.loadingContainer, { backgroundColor: getBackgroundColor() }]}>
        <Text style={[GlobalStyles.loadingText, { color: getTextColor() }]}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={[ComponentStyles.readerContainer, { backgroundColor: getBackgroundColor() }]}>
      <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
      
      <Pressable
        style={{ flex: 1 }}
        onPress={toggleControls}
      >
        <ScrollView 
          style={ComponentStyles.readerScrollView}
          contentContainerStyle={ComponentStyles.readerScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={ComponentStyles.chapterTitle}>{chapter.title}</Text>
          <Text 
            style={[
              ComponentStyles.readerText, 
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
          <SafeAreaView style={ComponentStyles.readerTopControls}>
            <BackButton color={getTextColor()} />
            <View style={ComponentStyles.rightControls}>
              <Pressable onPress={toggleBookmark} style={ComponentStyles.controlButton}>
                {isBookmarked ? (
                  <BookmarkCheck color={Colors.primary} size={24} fill={Colors.primary} />
                ) : (
                  <Bookmark color={getTextColor()} size={24} />
                )}
              </Pressable>
              <Pressable 
                onPress={() => setShowSettings(!showSettings)} 
                style={ComponentStyles.controlButton}
              >
                <Book color={showSettings ? Colors.primary : getTextColor()} size={24} />
              </Pressable>
            </View>
          </SafeAreaView>
          
          {showSettings && (
            <SafeAreaView style={ComponentStyles.settingsContainer}>
              <Text style={[ComponentStyles.settingsTitle, { color: getTextColor() }]}>Font</Text>
              <View style={LayoutStyles.settingsRow}>
                <Pressable 
                  style={[
                    ComponentStyles.settingButton, 
                    settings.fontSize === Typography.fontSize.sm && ComponentStyles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.sm })}
                >
                  <Text style={[
                    ComponentStyles.settingButtonText,
                    settings.fontSize === Typography.fontSize.sm && ComponentStyles.activeSettingText
                  ]}>A</Text>
                </Pressable>
                <Pressable 
                  style={[
                    ComponentStyles.settingButton, 
                    settings.fontSize === Typography.fontSize.md && ComponentStyles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.md })}
                >
                  <Text style={[
                    ComponentStyles.settingButtonText,
                    { fontSize: Typography.fontSize.md },
                    settings.fontSize === Typography.fontSize.md && ComponentStyles.activeSettingText
                  ]}>A</Text>
                </Pressable>
                <Pressable 
                  style={[
                    ComponentStyles.settingButton, 
                    settings.fontSize === Typography.fontSize.lg && ComponentStyles.activeSettingButton
                  ]}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.lg })}
                >
                  <Text style={[
                    ComponentStyles.settingButtonText,
                    { fontSize: Typography.fontSize.lg },
                    settings.fontSize === Typography.fontSize.lg && ComponentStyles.activeSettingText
                  ]}>A</Text>
                </Pressable>
              </View>
              
              <Text style={[ComponentStyles.settingsTitle, { color: getTextColor() }]}>Theme</Text>
              <View style={LayoutStyles.settingsRow}>
                <Pressable 
                  style={[
                    ComponentStyles.themeButton,
                    { backgroundColor: '#ffffff' },
                    settings.theme === 'light' && ComponentStyles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'light' })}
                >
                  <Text style={[
                    ComponentStyles.themeButtonText,
                    { color: '#333333' },
                  ]}>Light</Text>
                </Pressable>
                <Pressable 
                  style={[
                    ComponentStyles.themeButton,
                    { backgroundColor: '#f8f1e3' },
                    settings.theme === 'sepia' && ComponentStyles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'sepia' })}
                >
                  <Text style={[
                    ComponentStyles.themeButtonText,
                    { color: '#5b4636' },
                  ]}>Sepia</Text>
                </Pressable>
                <Pressable 
                  style={[
                    ComponentStyles.themeButton,
                    { backgroundColor: Colors.background.dark },
                    settings.theme === 'dark' && ComponentStyles.activeThemeButton
                  ]}
                  onPress={() => setSettings({ ...settings, theme: 'dark' })}
                >
                  <Text style={[
                    ComponentStyles.themeButtonText,
                    { color: Colors.text.primary },
                  ]}>Dark</Text>
                </Pressable>
              </View>
              
              <View style={ComponentStyles.tableOfContents}>
                <Text style={[ComponentStyles.tocTitle, { color: getTextColor() }]}>Table of Contents</Text>
                <Pressable style={ComponentStyles.tocItem}>
                  <Text style={[
                    ComponentStyles.tocItemText, 
                    { color: getTextColor() },
                    chapter.number === 1 && { color: Colors.primary, fontFamily: Typography.fontFamily.medium }
                  ]}>
                    Chapter 1
                  </Text>
                </Pressable>
                <Pressable style={ComponentStyles.tocItem}>
                  <Text style={[ComponentStyles.tocItemText, { color: getTextColor() }]}>Chapter 2</Text>
                </Pressable>
                <Pressable style={ComponentStyles.tocItem}>
                  <Text style={[ComponentStyles.tocItemText, { color: getTextColor() }]}>Chapter 3</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
    </View>
  );
}