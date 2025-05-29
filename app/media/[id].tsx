import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Bookmark, BookmarkCheck, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Layout } from '@/constants/layout';
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
      <View style={styles.episodesContainer}>
        <Text style={styles.sectionTitle}>Episodes</Text>
        
        {seriesOrAnime.episodes.map((episode: Episode) => (
          <Pressable
            key={episode.id}
            style={styles.episodeItem}
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
              style={styles.episodeThumbnail}
            />
            <View style={styles.episodeInfo}>
              <Text style={styles.episodeNumber}>
                S{episode.season} E{episode.number}
              </Text>
              <Text style={styles.episodeTitle}>{episode.title}</Text>
              <Text style={styles.episodeDuration}>{episode.duration}</Text>
            </View>
            <View style={styles.episodePlay}>
              <Play size={20} color={Colors.primary} />
            </View>
          </Pressable>
        ))}
      </View>
    );
  };
  
  if (loading || !media) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: media.coverImage }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={Colors.gradients.dark}
            style={styles.overlay}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <SafeAreaView style={styles.topBar}>
            <BackButton />
          </SafeAreaView>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{media.title}</Text>
          
          <View style={styles.metaContainer}>
            {media.releaseYear && (
              <Text style={styles.metaText}>{media.releaseYear}</Text>
            )}
            {media.rating && (
              <View style={styles.ratingContainer}>
                <Star size={14} color={Colors.primary} fill={Colors.primary} />
                <Text style={styles.ratingText}>{media.rating.toFixed(1)}</Text>
              </View>
            )}
            <Text style={styles.metaText}>{media.type.charAt(0).toUpperCase() + media.type.slice(1)}</Text>
          </View>
          
          <View style={styles.actionContainer}>
            <Pressable style={styles.playButton} onPress={handlePlayPress}>
              <Play size={20} color={Colors.background.dark} />
              <Text style={styles.playButtonText}>
                {media.type === 'movie' ? 'Play Movie' : 'Play Episode 1'}
              </Text>
            </Pressable>
            
            <Pressable style={styles.bookmarkButton} onPress={toggleBookmark}>
              {isBookmarked ? (
                <BookmarkCheck size={20} color={Colors.primary} fill={Colors.primary} />
              ) : (
                <Bookmark size={20} color={Colors.text.primary} />
              )}
            </Pressable>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Synopsis</Text>
            <Text style={styles.description}>{media.description}</Text>
          </View>
          
          {renderEpisodes()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.dark,
  },
  loadingText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.lg,
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: 80,
    top: 'auto',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  metaText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginRight: Spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary,
    marginLeft: Spacing.xs / 2,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Layout.radius.full,
    flex: 1,
    justifyContent: 'center',
  },
  playButtonText: {
    color: Colors.background.dark,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: Spacing.xs,
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  descriptionContainer: {
    marginTop: Spacing.xl,
  },
  descriptionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.lg,
  },
  episodesContainer: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  episodeItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    backgroundColor: Colors.background.light,
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
  },
  episodeThumbnail: {
    width: 120,
    height: 68,
  },
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  episodeNumber: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
  },
  episodeTitle: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    marginTop: Spacing.xs / 2,
  },
  episodeDuration: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginTop: Spacing.xs,
  },
  episodePlay: {
    justifyContent: 'center',
    padding: Spacing.md,
  },
});