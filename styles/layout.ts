import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Layout-specific styles for different screen arrangements
 */
export const LayoutStyles = StyleSheet.create({
  // Headers
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  
  // Tab Bar
  tabBar: {
    backgroundColor: Colors.background.medium,
    borderTopColor: Colors.background.medium,
    height: 60,
    paddingBottom: 6,
  },
  
  // Media Layouts
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  
  heroImage: {
    width: '100%',
    height: '100%',
  },
  
  imageContainer: {
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.background.light,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  // List Layouts
  horizontalList: {
    paddingHorizontal: Spacing.md,
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
  
  // Flex Layouts
  row: {
    flexDirection: 'row',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  // Meta Container
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  
  // Action Container
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  
  // Control Layouts
  rightControls: {
    flexDirection: 'row',
  },
  
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  bottomControls: {
    padding: Spacing.md,
  },
  
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  
  // Progress Layouts
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
  
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  
  // Time Container
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  
  // Rating Container
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  
  // Episode Layouts
  episodesContainer: {
    marginTop: Spacing.xl,
  },
  
  episodeItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    backgroundColor: Colors.background.light,
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
  },
  
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  
  episodeThumbnail: {
    width: 120,
    height: 68,
  },
  
  episodePlay: {
    justifyContent: 'center',
    padding: Spacing.md,
  },
  
  // Section Layouts
  section: {
    marginBottom: Spacing.xl,
  },
  
  settingsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  
  // Version Container
  versionContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
});
