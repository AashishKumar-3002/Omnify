import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Common button styles used throughout the application
 */
export const ButtonStyles = StyleSheet.create({
  // Primary Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Layout.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  primaryButtonText: {
    color: Colors.background.dark,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
  },
  
  // Secondary Buttons
  secondaryButton: {
    backgroundColor: Colors.background.light,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Layout.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  secondaryButtonText: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Icon Buttons
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  circularButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Control Buttons
  controlButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  
  backButton: {
    padding: Spacing.xs,
  },
  
  // Tab Buttons
  tabContainer: {
    marginRight: Spacing.xl,
    paddingVertical: Spacing.xs,
    position: 'relative',
  },
  
  // Settings Buttons
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
  
  // Theme Buttons
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
  
  // Play Buttons
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
  
  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: Colors.error,
    borderWidth: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Layout.radius.md,
    marginTop: Spacing.lg,
  },
  
  logoutText: {
    color: Colors.error,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Home Button (for 404 page)
  homeButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: Layout.radius.full,
    alignItems: 'center',
    marginTop: Spacing['2xl'],
  },
  
  homeButtonText: {
    color: Colors.background.dark,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: Spacing.xs,
  },
  
  // View All Button
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  viewAllText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
});
