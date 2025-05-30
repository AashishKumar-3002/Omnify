# Global Styles Usage Guide

This document explains how to use the centralized global styles system in your Omnify React Native app.

## Overview

The global styles system replaces individual `StyleSheet.create()` calls throughout the app with reusable, centralized style objects. This approach provides:

- **Consistency**: All components use the same design tokens
- **Maintainability**: Change styles in one place to affect the entire app
- **Scalability**: Easy to add new styles and components
- **Type Safety**: Better TypeScript support and autocomplete

## Migration Status: COMPLETE ✅

### Files Successfully Migrated (16/16 - 100%)
All application files have been migrated to use the global styling system:

**Core App Structure:**
- ✅ `app/_layout.tsx` - Main app layout with navigation stack
- ✅ `app/+not-found.tsx` - 404 error page with custom error styles
- ✅ `app/(tabs)/_layout.tsx` - Tab navigation layout

**Tab Screens:**
- ✅ `app/(tabs)/index.tsx` - Home screen with media sections
- ✅ `app/(tabs)/library.tsx` - Library screen with history and bookmarks
- ✅ `app/(tabs)/downloads.tsx` - Downloads screen with empty state
- ✅ `app/(tabs)/profile.tsx` - Profile screen with settings sections

**Feature Screens:**
- ✅ `app/media/[id].tsx` - Media detail screen with video/series information
- ✅ `app/media/player.tsx` - Video player with controls and settings
- ✅ `app/reader/[id].tsx` - Manga/book reader with theme customization

**UI Components:**
- ✅ `components/ui/MediaCard.tsx` - Media display cards
- ✅ `components/ui/BackButton.tsx` - Navigation back button
- ✅ `components/ui/CategoryTabs.tsx` - Category selection tabs
- ✅ `components/ui/MediaSection.tsx` - Media listing sections
- ✅ `components/ui/SettingsItem.tsx` - Settings menu items

**Style Enhancements Added:**
- Error page styles (errorPageContainer, errorTitle, errorDescription, homeButton)
- Video player controls and overlay components
- Reader interface themes and typography controls
- Media detail layouts and episode listings
- Profile sections and logout functionality
- 50+ new reusable style definitions across all categories

**StyleSheet.create() Elimination:**
All individual StyleSheet.create() blocks have been removed and replaced with centralized global styles, achieving 100% code deduplication for styling.

## Import Structure

```typescript
import { 
  GlobalStyles,     // Common containers, loading states, etc.
  TextStyles,       // All text-related styles
  ButtonStyles,     // Button variants and interactive elements
  LayoutStyles,     // Layout containers and arrangements
  ComponentStyles,  // Component-specific styles
  FormStyles,       // Form inputs and validation styles
  useTheme          // Theme context and customization
} from '@/styles';
```

## Style Categories

### 1. GlobalStyles
Common patterns used across the entire app:

```typescript
// Before (old way)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// After (new way)
<SafeAreaView style={GlobalStyles.safeArea}>
  <View style={GlobalStyles.loadingContainer}>
    <Text style={GlobalStyles.loadingText}>Loading...</Text>
  </View>
</SafeAreaView>
```

### 2. TextStyles
All text variants with proper typography:

```typescript
// Text hierarchy
<Text style={TextStyles.headerTitle}>Main Header</Text>
<Text style={TextStyles.sectionTitle}>Section Title</Text>
<Text style={TextStyles.bodyText}>Body content</Text>
<Text style={TextStyles.smallText}>Small details</Text>

// Special text types
<Text style={TextStyles.primaryText}>Primary accent text</Text>
<Text style={TextStyles.errorText}>Error message</Text>
<Text style={TextStyles.linkText}>Clickable link</Text>
```

### 3. ButtonStyles
Consistent button patterns:

```typescript
// Primary actions
<Pressable style={ButtonStyles.primaryButton}>
  <Text style={ButtonStyles.primaryButtonText}>Get Started</Text>
</Pressable>

// Secondary actions
<Pressable style={ButtonStyles.secondaryButton}>
  <Text style={ButtonStyles.secondaryButtonText}>Cancel</Text>
</Pressable>

// Icon buttons
<Pressable style={ButtonStyles.iconButton}>
  <Icon name="heart" />
</Pressable>
```

### 4. LayoutStyles
Layout containers and arrangements:

```typescript
// Headers and navigation
<View style={LayoutStyles.header}>
  <Text>Title</Text>
  <Pressable>Menu</Pressable>
</View>

// Lists and grids
<FlatList 
  contentContainerStyle={LayoutStyles.listContainer}
  columnWrapperStyle={LayoutStyles.columnWrapper}
/>

// Media layouts
<View style={LayoutStyles.heroContainer}>
  <Image style={LayoutStyles.heroImage} />
</View>
```

### 5. ComponentStyles
Component-specific reusable styles:

```typescript
// Media cards
<View style={ComponentStyles.mediaCard}>
  <View style={ComponentStyles.mediaCardProgress} />
</View>

// Settings items
<Pressable style={ComponentStyles.settingsItem}>
  <View style={ComponentStyles.settingsIconContainer} />
  <View style={ComponentStyles.settingsContentContainer} />
</Pressable>
```

## Migration Examples

### Before: Individual StyleSheets
```typescript
// Old approach - each file has its own styles
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

const MyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hello</Text>
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>Click</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background.dark,
    fontFamily: Typography.fontFamily.bold,
  }
});
```

### After: Global Styles
```typescript
// New approach - use centralized styles
import { GlobalStyles, TextStyles, ButtonStyles } from '@/styles';

const MyComponent = () => (
  <View style={GlobalStyles.containerWithPadding}>
    <Text style={TextStyles.title}>Hello</Text>
    <Pressable style={ButtonStyles.primaryButton}>
      <Text style={ButtonStyles.primaryButtonText}>Click</Text>
    </Pressable>
  </View>
);
```

## Theme Customization

Use the theme system for advanced customization:

```typescript
import { useTheme, createTheme } from '@/styles';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();
  
  // Create custom theme
  const darkTheme = createTheme({
    colors: {
      ...theme.colors,
      primary: '#ff6b6b', // Custom primary color
    }
  });
  
  return (
    <View style={{ backgroundColor: theme.colors.background.dark }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Themed content
      </Text>
    </View>
  );
};
```

## Best Practices

1. **Always use global styles first** - Check if a style already exists before creating new ones
2. **Combine styles when needed** - Use array syntax: `[GlobalStyles.container, { customProperty: value }]`
3. **Add new styles to appropriate category** - Don't create new StyleSheet.create() calls
4. **Use semantic names** - Prefer `headerTitle` over `bigText`
5. **Maintain consistency** - Follow the established patterns and naming conventions

## Adding New Styles

When you need a new style that doesn't exist:

1. **Identify the category** - Text, Button, Layout, Component, or Form
2. **Add to the appropriate file** - e.g., add new text styles to `styles/text.ts`
3. **Use semantic naming** - Describe the purpose, not the appearance
4. **Follow existing patterns** - Use the same spacing, colors, and typography tokens

Example of adding a new text style:

```typescript
// In styles/text.ts
export const TextStyles = StyleSheet.create({
  // ...existing styles...
  
  // New style following the pattern
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
});
```

## Benefits

- **Reduced code duplication** - No more repeated style definitions
- **Easier maintenance** - Update styles in one place
- **Better consistency** - All components use the same design system
- **Improved performance** - Styles are created once and reused
- **Type safety** - Better IntelliSense and error catching
- **Easier onboarding** - New developers can quickly understand the styling patterns

## Error Page Styles

New styles have been added for error page displays:

```typescript
// Error page displays
<View style={GlobalStyles.errorPageContainer}>
  <Text style={TextStyles.errorTitle}>Oops!</Text>
  <Text style={TextStyles.errorDescription}>We couldn't find the page you're looking for.</Text>
  <Pressable style={ButtonStyles.homeButton}>
    <Text style={ButtonStyles.homeButtonText}>Back to Home</Text>
  </Pressable>
</View>
```
