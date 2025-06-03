import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Book, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { GlobalStyles, ComponentStyles, LayoutStyles, ButtonStyles, TextStyles, readerThemes } from '@/styles';
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
  const themeClasses = readerThemes[settings.theme];
   
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
      <SafeAreaView className={`${GlobalStyles.loadingContainer} ${themeClasses.backgroundClass}`}> 
        <Text className={`${GlobalStyles.loadingText} ${themeClasses.textClass}`}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className={`flex-1 ${themeClasses.backgroundClass}`}>  
      <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />

      <Pressable className="flex-1" onPress={toggleControls}>
        <ScrollView 
          className={ComponentStyles.readerScrollView}
          contentContainerClassName={ComponentStyles.readerScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text className={`${ComponentStyles.chapterTitle} ${themeClasses.textClass}`}>{chapter.title}</Text>
          <Text 
            className={`${ComponentStyles.readerContent} ${themeClasses.textClass}`}
            style={{
              fontSize: settings.fontSize,
              lineHeight: settings.lineHeight,
              fontFamily: settings.fontFamily,
            }}
          >
            {chapter.content}
          </Text>
        </ScrollView>
      </Pressable>

      {showControls && (
        <>
          <SafeAreaView className={LayoutStyles.topControls}>
            <BackButton color={getTextColor()} />
            <View className={LayoutStyles.rightControls}>
              <Pressable onPress={toggleBookmark} className={ButtonStyles.controlButton}>
                {isBookmarked ? (
                  <BookmarkCheck color={Colors.primary} size={24} fill={Colors.primary} />
                ) : (
                  <Bookmark color={getTextColor()} size={24} />
                )}
              </Pressable>
              <Pressable 
                onPress={() => setShowSettings(!showSettings)} 
                className={ButtonStyles.controlButton}
              >
                <Book color={showSettings ? Colors.primary : getTextColor()} size={24} />
              </Pressable>
            </View>
          </SafeAreaView>

          {showSettings && (
            <SafeAreaView className={ComponentStyles.readerSettingsContainer}>
              <Text className={ComponentStyles.settingsTitle} style={{ color: getTextColor() }}>Font</Text>
              <View className={LayoutStyles.settingsRow}>
                <Pressable 
                  className={`${ButtonStyles.settingButton} ${settings.fontSize === Typography.fontSize.sm ? ButtonStyles.activeSettingButton : ''}`}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.sm })}
                >
                  <Text 
                    className={ButtonStyles.settingButtonText}
                    style={settings.fontSize === Typography.fontSize.sm ? { color: Colors.primary } : undefined}
                  >A</Text>
                </Pressable>
                <Pressable 
                  className={`${ButtonStyles.settingButton} ${settings.fontSize === Typography.fontSize.md ? ButtonStyles.activeSettingButton : ''}`}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.md })}
                >
                  <Text 
                    className={ButtonStyles.settingButtonText}
                    style={settings.fontSize === Typography.fontSize.md ? { color: Colors.primary } : undefined}
                  >A</Text>
                </Pressable>
                <Pressable 
                  className={`${ButtonStyles.settingButton} ${settings.fontSize === Typography.fontSize.lg ? ButtonStyles.activeSettingButton : ''}`}
                  onPress={() => setSettings({ ...settings, fontSize: Typography.fontSize.lg })}
                >
                  <Text 
                    className={ButtonStyles.settingButtonText}
                    style={settings.fontSize === Typography.fontSize.lg ? { color: Colors.primary } : undefined}
                  >A</Text>
                </Pressable>
              </View>

              <Text className={ComponentStyles.settingsTitle} style={{ color: getTextColor() }}>Theme</Text>
              <View className={LayoutStyles.settingsRow}>
                <Pressable 
                  className={`${ButtonStyles.themeButton}${settings.theme === 'light' ? ` ${ButtonStyles.activeThemeButton}` : ''}`}
                  onPress={() => setSettings({ ...settings, theme: 'light' })}
                >
                  <Text className={ButtonStyles.themeButtonText} style={{ color: '#333333' }}>Light</Text>
                </Pressable>
                <Pressable 
                  className={`${ButtonStyles.themeButton}${settings.theme === 'sepia' ? ` ${ButtonStyles.activeThemeButton}` : ''}`}
                  onPress={() => setSettings({ ...settings, theme: 'sepia' })}
                >
                  <Text className={ButtonStyles.themeButtonText} style={{ color: '#5b4636' }}>Sepia</Text>
                </Pressable>
                <Pressable 
                  className={`${ButtonStyles.themeButton}${settings.theme === 'dark' ? ` ${ButtonStyles.activeThemeButton}` : ''}`}
                  onPress={() => setSettings({ ...settings, theme: 'dark' })}
                >
                  <Text className={ButtonStyles.themeButtonText} style={{ color: Colors.text.primary }}>Dark</Text>
                </Pressable>
              </View>

              <View className={ComponentStyles.tableOfContents}>
                <Text className={ComponentStyles.tocTitle} style={{ color: getTextColor() }}>Table of Contents</Text>
                <Pressable className={ComponentStyles.tocItem}>
                  <Text
                    className={ComponentStyles.tocItemText}
                    style={{
                      color: chapter.number === 1 ? Colors.primary : getTextColor(),
                      fontFamily: chapter.number === 1 ? Typography.fontFamily.medium : undefined,
                    }}
                  >
                    Chapter 1
                  </Text>
                </Pressable>
                <Pressable className={ComponentStyles.tocItem}>
                  <Text className={ComponentStyles.tocItemText} style={{ color: getTextColor() }}>Chapter 2</Text>
                </Pressable>
                <Pressable className={ComponentStyles.tocItem}>
                  <Text className={ComponentStyles.tocItemText} style={{ color: getTextColor() }}>Chapter 3</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
    </View>
   );
 }