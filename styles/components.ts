import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Component-specific styles that are reused across multiple components
 */
export const ComponentStyles = StyleSheet.create({
  // Media Card
  mediaCard: {
    marginRight: Spacing.md,
    marginBottom: Spacing.md,
  },
  
  mediaCardProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.background.light,
  },
  
  // Settings Item
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  
  settingsIconContainer: {
    marginRight: Spacing.md,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  settingsContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  settingsTitle: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  settingsSubtitle: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginTop: Spacing.xs / 2,
  },
  
  // Category Tabs
  categoryTabsContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  
  categoryTab: {
    marginRight: Spacing.xl,
    paddingVertical: Spacing.xs,
    position: 'relative',
  },
  
  categoryTabText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  categoryTabActive: {
    color: Colors.text.primary,
    fontFamily: Typography.fontFamily.bold,
  },
  
  categoryTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  
  // Media Section
  mediaSectionContainer: {
    marginBottom: Spacing.xl,
  },
  
  mediaSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  
  // Back Button
  backButtonContainer: {
    padding: Spacing.xs,
  },
  
  // Video Player
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
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
  
  // Options Panel
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
  
  // Reader Settings
  readerSettingsContainer: {
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
  
  // Table of Contents
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
  
  // Version Container
  versionContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  
  versionText: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  
  // Description Container
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
  
  // Reader Content
  readerScrollView: {
    flex: 1,
  },
  
  readerScrollContent: {
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
  
  readerContent: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.lg,
    fontFamily: Typography.fontFamily.regular,
  },
  
  // Time Text
  timeText: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Rating Text
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary,
    marginLeft: Spacing.xs / 2,
  },
  
  // Logout Icon
  logoutIcon: {
    marginRight: Spacing.sm,
  },
  
  // Media Detail Components
  contentContainer: {
    padding: Spacing.md,
  },
  
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
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
  
  episodeThumbnail: {
    width: 120,
    height: 68,
  },
  
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  
  episodePlay: {
    justifyContent: 'center',
    padding: Spacing.md,
  },
  
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  
  backButton: {
    padding: Spacing.xs,
  },
  
  playerTitle: {
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

  // Reader Components
  readerContainer: {
    flex: 1,
  },

  readerText: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.lg,
    fontFamily: Typography.fontFamily.regular,
  },

  readerTopControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
