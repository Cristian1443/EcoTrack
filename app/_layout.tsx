import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="splash">
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="lessons" options={{ headerShown: false }} />
            <Stack.Screen name="progress" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
                      <Stack.Screen name="add-activity" options={{ headerShown: false }} />
          <Stack.Screen name="join-area" options={{ headerShown: false }} />
          <Stack.Screen name="register-company" options={{ headerShown: false }} />
          <Stack.Screen name="lesson-topics" options={{ headerShown: false }} />
          <Stack.Screen name="employees" options={{ headerShown: false }} />
          <Stack.Screen name="employee-form" options={{ headerShown: false }} />
          <Stack.Screen name="areas" options={{ headerShown: false }} />
          <Stack.Screen name="area-form" options={{ headerShown: false }} />
          <Stack.Screen name="companies" options={{ headerShown: false }} />
          <Stack.Screen name="company-form" options={{ headerShown: false }} />
          <Stack.Screen name="activities" options={{ headerShown: false }} />
          <Stack.Screen name="activity-form" options={{ headerShown: false }} />
          <Stack.Screen name="lessons-crud" options={{ headerShown: false }} />
          <Stack.Screen name="lesson-form" options={{ headerShown: false }} />
          <Stack.Screen name="goals" options={{ headerShown: false }} />
          <Stack.Screen name="goal-form" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </NavigationThemeProvider>
      </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
