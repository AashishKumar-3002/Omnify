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
import { GlobalStyles, ComponentStyles } from '@/styles';
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
    <View style={GlobalStyles.videoPlayerContainer}>
      <StatusBar hidden />
      
      <Pressable
        style={ComponentStyles.videoContainer}
        onPress={() => setControlsVisible(!controlsVisible)}
      >
        <Video
          ref={videoRef}
          style={ComponentStyles.video}
          source={{ uri: params.videoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={setStatus}
          shouldPlay={true}
        />
      </Pressable>
      
      {controlsVisible && (
        <SafeAreaView style={ComponentStyles.controlsOverlay}>
          <View style={ComponentStyles.topControls}>
            <Pressable onPress={() => router.back()} style={ComponentStyles.backButton}>
              <X color={Colors.text.primary} size={24} />
            </Pressable>
            <Text style={ComponentStyles.playerTitle} numberOfLines={1}>
              {params.title || 'Video Player'}
            </Text>
            <View style={ComponentStyles.rightControls}>
              <Pressable style={ComponentStyles.controlButton} onPress={toggleSubtitles}>
                <Subtitles 
                  color={showSubtitles ? Colors.primary : Colors.text.primary} 
                  size={24} 
                  fill={showSubtitles ? Colors.primary : undefined}
                />
              </Pressable>
              <Pressable style={ComponentStyles.controlButton} onPress={toggleQualityOptions}>
                <Settings 
                  color={showQualityOptions ? Colors.primary : Colors.text.primary} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          
          <View style={ComponentStyles.centerControls}>
            <Pressable style={ComponentStyles.seekButton} onPress={() => seek(-10000)}>
              <SkipBack color={Colors.text.primary} size={32} />
            </Pressable>
            <Pressable style={ComponentStyles.playPauseButton} onPress={togglePlayPause}>
              {isPlaying ? (
                <Pause color={Colors.background.dark} size={28} />
              ) : (
                <Play color={Colors.background.dark} size={28} />
              )}
            </Pressable>
            <Pressable style={ComponentStyles.seekButton} onPress={() => seek(10000)}>
              <SkipForward color={Colors.text.primary} size={32} />
            </Pressable>
          </View>
          
          <View style={ComponentStyles.bottomControls}>
            <View style={ComponentStyles.progressContainer}>
              <View style={ComponentStyles.progressBackground}>
                <View style={[ComponentStyles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <View style={ComponentStyles.timeContainer}>
                <Text style={ComponentStyles.timeText}>
                  {formatTime(position)}
                </Text>
                <Text style={ComponentStyles.timeText}>
                  {formatTime(duration || 0)}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
      
      {showSubtitles && controlsVisible && (
        <View style={ComponentStyles.optionsPanel}>
          <Text style={ComponentStyles.optionsPanelTitle}>Subtitles</Text>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={[ComponentStyles.optionText, ComponentStyles.optionTextActive]}>English</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>Spanish</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>French</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>Off</Text>
          </Pressable>
        </View>
      )}
      
      {showQualityOptions && controlsVisible && (
        <View style={ComponentStyles.optionsPanel}>
          <Text style={ComponentStyles.optionsPanelTitle}>Quality</Text>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={[ComponentStyles.optionText, ComponentStyles.optionTextActive]}>Auto</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>1080p</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>720p</Text>
          </Pressable>
          <Pressable style={ComponentStyles.optionItem}>
            <Text style={ComponentStyles.optionText}>480p</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// Remove the entire StyleSheet.create() block as we're now using global styles