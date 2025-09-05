import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarInactiveTintColor: Colors[theme].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          web: {
            backgroundColor: Colors[theme].background,
            borderTopWidth: 1,
            borderTopColor: Colors[theme].border,
            height: isTablet ? 70 : 60,
            paddingBottom: 5,
            paddingTop: 10,
            maxWidth: isTablet ? 600 : '100%',
            alignSelf: 'center',
            width: '100%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: isDark ? 0.2 : 0.1,
            shadowRadius: 8,
            elevation: 8,
          },
          ios: {
            position: 'absolute',
            backgroundColor: isDark ? 'rgba(2,6,23,0.95)' : 'rgba(255,255,255,0.95)',
            borderTopWidth: 1,
            borderTopColor: Colors[theme].border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: isDark ? 0.3 : 0.1,
            shadowRadius: 4,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
            height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
          },
          default: {
            backgroundColor: Colors[theme].background,
            borderTopWidth: 1,
            borderTopColor: Colors[theme].border,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 5,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lecciones',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="book.fill" color={color} />,
          tabBarLabelStyle: { 
            fontSize: isWeb && isTablet ? 14 : 12, 
            fontWeight: '500',
            ...(isWeb && { cursor: 'pointer' })
          },
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diario',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="square.and.pencil" color={color} />,
          tabBarLabelStyle: { 
            fontSize: isWeb && isTablet ? 14 : 12, 
            fontWeight: '500',
            ...(isWeb && { cursor: 'pointer' })
          },
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="rosette" color={color} />,
          tabBarLabelStyle: { 
            fontSize: isWeb && isTablet ? 14 : 12, 
            fontWeight: '500',
            ...(isWeb && { cursor: 'pointer' })
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.crop.circle" color={color} />,
          tabBarLabelStyle: { 
            fontSize: isWeb && isTablet ? 14 : 12, 
            fontWeight: '500',
            ...(isWeb && { cursor: 'pointer' })
          },
        }}
      />
    </Tabs>
  );
}
