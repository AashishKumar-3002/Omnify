const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
 
const config = getDefaultConfig(__dirname);

// Add CSS extension to Metro resolver so imports of .css files work
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'css'],
};

module.exports = withNativeWind(config, { input: path.resolve(__dirname, 'global.css') });