import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import {
  Subtitles,
  Settings,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Layout } from '@/constants/layout';

export default function PlayerScreen() {
  const params = useLocalSearchParams<{ videoUrl: string; title: string }>();
  const router = useRouter();
  const videoRef = React.useRef<Video>(null);
  
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  
  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded ? status.durationMillis : 0;
  const progress = duration ? position / duration : 0;
  
  // Hide controls after a period of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (controlsVisible) {
      timeout = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [controlsVisible]);
  
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    
    // Show controls temporarily
    setControlsVisible(true);
  };
  
  const seek = (amount: number) => {
    if (!videoRef.current || !status?.isLoaded) return;
    
    const newPosition = Math.max(0, Math.min((position || 0) + amount, (duration || 0) - 1000));
    videoRef.current.setPositionAsync(newPosition);
    setControlsVisible(true);
  };
  
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    setControlsVisible(true);
  };
  
  const toggleQualityOptions = () => {
    setShowQualityOptions(!showQualityOptions);
    setControlsVisible(true);
  };
  
  const formatTime = (millis: number | null) => {
    if (!millis) return '00:00';
    
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <Pressable
        style={styles.videoContainer}
        onPress={() => setControlsVisible(!controlsVisible)}
      >
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: params.videoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={setStatus}
          shouldPlay={true}
        />
      </Pressable>
      
      {controlsVisible && (
        <SafeAreaView style={styles.controlsOverlay}>
          <View style={styles.topControls}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <X color={Colors.text.primary} size={24} />
            </Pressable>
            <Text style={styles.title} numberOfLines={1}>
              {params.title || 'Video Player'}
            </Text>
            <View style={styles.rightControls}>
              <Pressable style={styles.controlButton} onPress={toggleSubtitles}>
                <Subtitles 
                  color={showSubtitles ? Colors.primary : Colors.text.primary} 
                  size={24} 
                  fill={showSubtitles ? Colors.primary : undefined}
                />
              </Pressable>
              <Pressable style={styles.controlButton} onPress={toggleQualityOptions}>
                <Settings 
                  color={showQualityOptions ? Colors.primary : Colors.text.primary} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          
          <View style={styles.centerControls}>
            <Pressable style={styles.seekButton} onPress={() => seek(-10000)}>
              <SkipBack color={Colors.text.primary} size={32} />
            </Pressable>
            <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
              {isPlaying ? (
                <Pause color={Colors.background.dark} size={28} />
              ) : (
                <Play color={Colors.background.dark} size={28} />
              )}
            </Pressable>
            <Pressable style={styles.seekButton} onPress={() => seek(10000)}>
              <SkipForward color={Colors.text.primary} size={32} />
            </Pressable>
          </View>
          
          <View style={styles.bottomControls}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTime(position)}
                </Text>
                <Text style={styles.timeText}>
                  {formatTime(duration)}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
      
      {showSubtitles && controlsVisible && (
        <View style={styles.optionsPanel}>
          <Text style={styles.optionsPanelTitle}>Subtitles</Text>
          <Pressable style={styles.optionItem}>
            <Text style={[styles.optionText, styles.optionTextActive]}>English</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>Spanish</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>French</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>Off</Text>
          </Pressable>
        </View>
      )}
      
      {showQualityOptions && controlsVisible && (
        <View style={styles.optionsPanel}>
          <Text style={styles.optionsPanelTitle}>Quality</Text>
          <Pressable style={styles.optionItem}>
            <Text style={[styles.optionText, styles.optionTextActive]}>Auto</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>1080p</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>720p</Text>
          </Pressable>
          <Pressable style={styles.optionItem}>
            <Text style={styles.optionText}>480p</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  title: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  rightControls: {
    flexDirection: 'row',
  },
  controlButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
  },
  seekButton: {
    padding: Spacing.md,
  },
  bottomControls: {
    padding: Spacing.md,
  },
  progressContainer: {
    width: '100%',
  },
  progressBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  timeText: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  optionsPanel: {
    position: 'absolute',
    right: 0,
    top: 70,
    backgroundColor: Colors.background.medium,
    borderRadius: Layout.radius.md,
    padding: Spacing.md,
    margin: Spacing.md,
    width: 160,
  },
  optionsPanelTitle: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: Spacing.sm,
  },
  optionItem: {
    paddingVertical: Spacing.sm,
  },
  optionText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.md,
  },
  optionTextActive: {
    color: Colors.primary,
    fontFamily: Typography.fontFamily.medium,
  },
});