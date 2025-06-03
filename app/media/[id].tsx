import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Bookmark, BookmarkCheck, Star } from 'lucide-react-native';
import { GlobalStyles, TextStyles, ComponentStyles, LayoutStyles } from '@/styles';
import { Colors } from '@/constants/colors';
import { api } from '@/utils/api';
import { Media, Movie, Series, Anime, Episode } from '@/types/media';
import BackButton from '@/components/ui/BackButton';

export default function MediaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const [media, setMedia] = useState<Media | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMedia = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const mediaData = await api.getMediaById(id);
        if (mediaData) {
          setMedia(mediaData);
        }
        
        // Check if bookmarked
        const bookmarks = await api.getBookmarks();
        setIsBookmarked(bookmarks.some(b => b.mediaId === id));
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedia();
  }, [id]);
  
  const handlePlayPress = () => {
    if (!media) return;
    
    if (media.type === 'movie') {
      const movie = media as Movie;
      router.push({
        pathname: '/media/player',
        params: {
          videoUrl: movie.videoUrl,
          title: movie.title
        }
      });
    } else if (media.type === 'series' || media.type === 'anime') {
      const seriesOrAnime = media as Series | Anime;
      if (seriesOrAnime.episodes && seriesOrAnime.episodes.length > 0) {
        router.push({
          pathname: '/media/player',
          params: {
            videoUrl: seriesOrAnime.episodes[0].videoUrl,
            title: `${seriesOrAnime.title} - ${seriesOrAnime.episodes[0].title}`
          }
        });
      }
    }
    
    // Add to history
    if (media) {
      api.addToHistory({
        mediaId: media.id,
        mediaTitle: media.title,
        mediaType: media.type,
        coverImage: media.coverImage,
        progress: 0
      });
    }
  };
  
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
  
  const renderEpisodes = () => {
    if (media?.type !== 'series' && media?.type !== 'anime') return null;
    
    const seriesOrAnime = media as Series | Anime;
    if (!seriesOrAnime.episodes || seriesOrAnime.episodes.length === 0) return null;
    
    return (
      <View className={ComponentStyles.episodesContainer}>
        <Text className={TextStyles.sectionTitle}>Episodes</Text>
        
        {seriesOrAnime.episodes.map((episode: Episode) => (
          <Pressable
            key={episode.id}
            className={LayoutStyles.episodeItem}
            onPress={() => {
              router.push({
                pathname: '/media/player',
                params: {
                  videoUrl: episode.videoUrl,
                  title: `${media.title} - ${episode.title}`
                }
              });
              
              // Add to history
              api.addToHistory({
                mediaId: media.id,
                mediaTitle: media.title,
                mediaType: media.type,
                coverImage: media.coverImage,
                progress: 0
              });
            }}
          >
            <Image 
              source={{ uri: episode.thumbnailUrl }}
              className={LayoutStyles.episodeThumbnail}
            />
            <View className={LayoutStyles.episodeInfo}>
              <Text className={TextStyles.episodeNumber}>
                S{episode.season} E{episode.number}
              </Text>
              <Text className={TextStyles.episodeTitle}>{episode.title}</Text>
              <Text className={TextStyles.episodeDuration}>{episode.duration}</Text>
            </View>
            <View className={LayoutStyles.episodePlay}>
              <Play size={20} color={Colors.primary} />
            </View>
          </Pressable>
        ))}
      </View>
    );
  };
  
  if (loading || !media) {
    return (
      <SafeAreaView className={GlobalStyles.loadingContainer}>
        <Text className={GlobalStyles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <View className={GlobalStyles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className={LayoutStyles.heroContainer}>
          <Image
            source={{ uri: media.coverImage }}
            className={LayoutStyles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={Colors.gradients.dark as any}
            className={GlobalStyles.gradientOverlay}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <SafeAreaView className={LayoutStyles.topBar}>
            <BackButton />
          </SafeAreaView>
        </View>
        
        <View className={ComponentStyles.contentContainer}>
          <Text className={TextStyles.title}>{media.title}</Text>
          
          <View className={ComponentStyles.metaContainer}>
            {media.releaseYear && (
              <Text className={TextStyles.metaText}>{media.releaseYear}</Text>
            )}
            {media.rating && (
              <View className={ComponentStyles.ratingContainer}>
                <Star size={14} color={Colors.primary} fill={Colors.primary} />
                <Text className={ComponentStyles.ratingText}>{media.rating.toFixed(1)}</Text>
              </View>
            )}
            <Text className={TextStyles.metaText}>{media.type.charAt(0).toUpperCase() + media.type.slice(1)}</Text>
          </View>
          
          <View className={ComponentStyles.actionContainer}>
            <Pressable onPress={handlePlayPress} className={ComponentStyles.playButton}>
              <Play size={20} color={Colors.background.dark} />
              <Text className={ComponentStyles.playButtonText}>
                {media.type === 'movie' ? 'Play Movie' : 'Play Episode 1'}
              </Text>
            </Pressable>
            
            <Pressable onPress={toggleBookmark} className={ComponentStyles.bookmarkButton}>
              {isBookmarked ? (
                <BookmarkCheck size={20} color={Colors.primary} fill={Colors.primary} />
              ) : (
                <Bookmark size={20} color={Colors.text.primary} />
              )}
            </Pressable>
          </View>
          
          <View className={ComponentStyles.descriptionContainer}>
            <Text className={ComponentStyles.descriptionTitle}>Synopsis</Text>
            <Text className={TextStyles.description}>{media.description}</Text>
          </View>
          
          {renderEpisodes()}
        </View>
      </ScrollView>
    </View>
  );
}

// Remove the entire StyleSheet.create() block as we're now using global styles