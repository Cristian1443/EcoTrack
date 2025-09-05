/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4ade80'; // Verde como en mockup
const tintColorDark = '#4ade80';

export const Colors = {
  light: {
    text: '#1f2937',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#6b7280',
    tabIconDefault: '#9ca3af',
    tabIconSelected: tintColorLight,
    card: '#f8fafc',
    border: '#e2e8f0',
    success: '#4ade80',
    primary: '#4ade80',
    secondary: '#f1f5f9',
    surface: '#ffffff',
    onSurface: '#1f2937',
    placeholder: '#64748b',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    muted: '#64748b',
  },
  dark: {
    text: '#f1f5f9',
    background: '#020617',
    tint: tintColorDark,
    icon: '#cbd5e1',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
    card: '#0f172a',
    border: '#1e293b',
    success: '#4ade80',
    primary: '#4ade80',
    secondary: '#1e293b',
    surface: '#0f172a',
    onSurface: '#f1f5f9',
    placeholder: '#94a3b8',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    muted: '#94a3b8',
  },
};
