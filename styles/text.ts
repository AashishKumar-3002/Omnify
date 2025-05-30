import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Common text styles used throughout the application
 */
export const TextStyles = StyleSheet.create({
  // Headers
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  
  sectionTitleSecondary: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.secondary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  
  subtitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  
  // Body Text
  bodyText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    lineHeight: Typography.lineHeight.lg,
  },
  
  description: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.lg,
  },
  
  bodyTextSecondary: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.lg,
  },
  
  smallText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  
  tinyText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
  },
  
  // Meta Text
  metaText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginRight: Spacing.md,
  },
  
  // Links
  linkText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Special Text
  primaryText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  
  errorText: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  
  // Error Page Text
  errorTitle: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    marginTop: Spacing.lg,
    color: Colors.text.primary,
  },
  
  errorDescription: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  
  // Centered Text
  centeredText: {
    textAlign: 'center',
  },
  
  // Tab Labels
  tabLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
  },
  
  // Media Card Text
  cardTitle: {
    marginTop: Spacing.xs,
    color: Colors.text.primary,
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
  },
  
  // Episode Text
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
  
  // Version Text
  versionText: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});
