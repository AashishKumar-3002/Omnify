import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Media } from '../../types/media';
import MediaCard from './MediaCard';

interface MediaSectionProps {
  title: string;
  data: Media[];
  showViewAll?: boolean;
  viewAllRoute?: string;
  horizontal?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
  progressData?: Record<string, number>;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  data,
  showViewAll = true,
  viewAllRoute,
  horizontal = true,
  cardSize = 'medium',
  showProgress = false,
  progressData = {},
}) => {
  const router = useRouter();

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showViewAll && viewAllRoute && (
          <Pressable 
            style={styles.viewAllButton}
            onPress={() => router.push(viewAllRoute)}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color={Colors.primary} style={{ marginLeft: Spacing.xs }} />
          </Pressable>
        )}
      </View>
      
      {horizontal ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MediaCard 
              item={item}
              size={cardSize}
              showProgress={showProgress}
              progress={progressData[item.id] || 0}
            />
          )}
        />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MediaCard 
              item={item}
              size={cardSize}
              showProgress={showProgress}
              progress={progressData[item.id] || 0}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  title: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  listContainer: {
    paddingHorizontal: Spacing.md,
  },
  gridContainer: {
    paddingHorizontal: Spacing.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default MediaSection;