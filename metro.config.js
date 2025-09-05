const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para web
if (process.env.EXPO_PLATFORM === 'web') {
  // Agregar soporte para CSS
  config.resolver.assetExts.push('css');
}

module.exports = config;

