import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
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
import { GlobalStyles, ComponentStyles, ButtonStyles, LayoutStyles, TextStyles } from '@/styles';
import { Colors } from '@/constants/colors';

export default function PlayerScreen() {
  const params = useLocalSearchParams<{ videoUrl: string; title: string }>();
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  
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
    let timeout: ReturnType<typeof setTimeout>;
    
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
    <View className={GlobalStyles.videoPlayerContainer}>
      <StatusBar hidden />
      
      <Pressable
        className={ComponentStyles.videoContainer}
        onPress={() => setControlsVisible(!controlsVisible)}
      >
        <Video
          ref={videoRef}
          className={ComponentStyles.video}
          source={{ uri: params.videoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={setStatus}
          shouldPlay={true}
        />
      </Pressable>
      
      {controlsVisible && (
        <SafeAreaView className={ComponentStyles.controlsOverlay}>
          <View className={LayoutStyles.topControls}>
            <Pressable onPress={() => router.back()} className={ButtonStyles.backButton}>
              <X color={Colors.text.primary} size={24} />
            </Pressable>
            <Text className={`${TextStyles.primaryText} flex-1`} numberOfLines={1}>
              {params.title || 'Video Player'}
            </Text>
            <View className={LayoutStyles.rightControls}>
              <Pressable className={ButtonStyles.controlButton} onPress={toggleSubtitles}>
                <Subtitles 
                  color={showSubtitles ? Colors.primary : Colors.text.primary} 
                  size={24} 
                  fill={showSubtitles ? Colors.primary : undefined}
                />
              </Pressable>
              <Pressable className={ButtonStyles.controlButton} onPress={toggleQualityOptions}>
                <Settings 
                  color={showQualityOptions ? Colors.primary : Colors.text.primary} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          
          <View className={LayoutStyles.centerControls}>
            <Pressable className={ButtonStyles.seekButton} onPress={() => seek(-10000)}>
              <SkipBack color={Colors.text.primary} size={32} />
            </Pressable>
            <Pressable className={ButtonStyles.playPauseButton} onPress={togglePlayPause}>
              {isPlaying ? (
                <Pause color={Colors.background.dark} size={28} />
              ) : (
                <Play color={Colors.background.dark} size={28} />
              )}
            </Pressable>
            <Pressable className={ButtonStyles.seekButton} onPress={() => seek(10000)}>
              <SkipForward color={Colors.text.primary} size={32} />
            </Pressable>
          </View>
          
          <View className={LayoutStyles.bottomControls}>
            <View className={LayoutStyles.progressContainer}>
              <View className={LayoutStyles.progressBackground}>
                <View className={LayoutStyles.progressFill} style={{ width: `${progress * 100}%` }} />
              </View>
              <View className={LayoutStyles.timeContainer}>
                <Text className={ComponentStyles.timeText}>
                  {formatTime(position)}
                </Text>
                <Text className={ComponentStyles.timeText}>
                  {formatTime(duration || 0)}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
      
      {showSubtitles && controlsVisible && (
        <View className={ComponentStyles.optionsPanel}>
          <Text className={ComponentStyles.optionsPanelTitle}>Subtitles</Text>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={`${ComponentStyles.optionText} ${ComponentStyles.optionTextActive}`}>English</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>Spanish</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>French</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>Off</Text>
          </Pressable>
        </View>
      )}
      
      {showQualityOptions && controlsVisible && (
        <View className={ComponentStyles.optionsPanel}>
          <Text className={ComponentStyles.optionsPanelTitle}>Quality</Text>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={`${ComponentStyles.optionText} ${ComponentStyles.optionTextActive}`}>Auto</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>1080p</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>720p</Text>
          </Pressable>
          <Pressable className={ComponentStyles.optionItem}>
            <Text className={ComponentStyles.optionText}>480p</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// Remove the entire StyleSheet.create() block as we're now using global styles