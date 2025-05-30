import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Global styles that are commonly used across the entire application
 */
export const GlobalStyles = StyleSheet.create({
  // Safe Area Containers
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  
  // Main Containers
  container: {
    flex: 1,
  },
  
  containerWithPadding: {
    flex: 1,
    padding: Spacing.md,
  },
  
  contentContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  
  scrollContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Loading States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.dark,
  },
  
  loadingText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.medium,
  },
  
  // Empty States
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  
  emptyText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  
  // Error Page Containers
  errorPageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.background.dark,
  },
  
  // Shadow
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  
  // Overlays
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 80,
    top: 'auto',
  },
  
  // Dividers
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.sm,
  },
  
  // Rounded Corners
  rounded: {
    borderRadius: Layout.radius.md,
  },
  
  roundedLarge: {
    borderRadius: Layout.radius.lg,
  },
  
  roundedFull: {
    borderRadius: Layout.radius.full,
  },
  
  // Video Player Container
  videoPlayerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  // Headers
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.background.dark,
  },
});
