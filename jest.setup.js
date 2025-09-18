// Configuración básica de Jest para React Native

// Mock de StyleSheet
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: (styles) => styles,
  flatten: (style) => style,
}));

// Mock de PixelRatio
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: () => 2,
  roundToNearestPixel: (value) => value,
}));

// Mock de expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock de expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock de async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock de Dimensions
const mockDimensions = {
  get: jest.fn(() => ({
    width: 375,
    height: 667,
    scale: 2,
    fontScale: 1,
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

jest.mock('react-native/Libraries/Utilities/Dimensions', () => mockDimensions);

// Silenciar warnings de React Native
jest.mock('react-native/Libraries/LogBox/LogBox', () => ({
  ignoreLogs: jest.fn(),
  ignoreAllLogs: jest.fn(),
}));

// Mock de Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios),
}));
