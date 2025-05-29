# Omnify

A comprehensive entertainment platform that unifies streaming and reading experiences in one powerful mobile application. Omnify brings together movies, series, anime, manga, manhwa, and novels — all in one seamless interface.

## Purpose

Omnify is designed for media enthusiasts who value simplicity and convenience. Instead of juggling multiple apps for different types of content, Omnify provides a unified platform where you can:
- Stream your favorite movies, TV series, and anime
- Read manga, manhwa, and novels
- Track your progress across all content types
- Enjoy a consistent, intuitive experience

## Features

### Content Streaming
- 🎬 High-quality video streaming for movies and TV series
- 📺 Dedicated anime streaming section
- 🎥 Adaptive quality streaming
- ⏯️ Continue watching from where you left off
- 📱 Cross-platform support (iOS, Android, and Web)

### Reading Experience
- 📚 Manga and manhwa reader with customizable settings
- 📖 Novel reading interface
- 🔍 Zoom and pan controls
- 🌙 Dark mode support
- 📱 Responsive layout for different screen sizes

### User Experience
- 📋 Unified dashboard for all content
- 🔖 Bookmark and save your favorite content
- 📊 Track watch/read history
- 🎨 Clean, intuitive UI with consistent design
- 🔄 Seamless navigation between different content types
- 🎯 Personalized recommendations

### Technical Features
- 🚀 Built with Expo Router for smooth navigation
- 🎨 Modern UI components with Expo Vector Icons
- 📸 Optimized media handling
- 🔄 Gesture controls for enhanced interaction
- 🎭 Smooth animations and transitions
- 🔍 TypeScript support for robust development
- 📱 Responsive design with safe area handling

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd omnify
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Run on your preferred platform:
- Press `i` to run on iOS simulator
- Press `a` to run on Android emulator
- Press `w` to run on web browser

## Development with Expo

### Using Expo Go
1. Install the Expo Go app on your mobile device from the App Store (iOS) or Play Store (Android)
2. Scan the QR code that appears in your terminal or browser
3. The app will load on your device

### Using Simulators/Emulators
- For iOS: Make sure you have Xcode installed (Mac only)
- For Android: Make sure you have Android Studio and an emulator set up

### Development Tips
- Use `npm run lint` to check for code quality issues
- The app uses TypeScript for better type safety and development experience
- Hot reloading is enabled by default
- Use `npm run build:web` to create a production build for web

## Project Structure

```
├── app/              # Main application screens and navigation
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── constants/        # App-wide constants and configuration
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

## Dependencies

The project uses several key dependencies:
- expo: ^53.0.0
- react-native: 0.79.1
- expo-router: ~5.0.2
- react-native-reanimated: ~3.17.4
- expo-camera: ~16.1.5
- expo-av: ~13.10.5
- And many more (see package.json for full list)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the terms of the license included in the repository.

## Support

For support, please open an issue in the repository.