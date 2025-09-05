import React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

interface WebContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  maxWidth?: number;
  centered?: boolean;
}

export function WebContainer({ 
  children, 
  style, 
  scrollable = false, 
  maxWidth = 1200,
  centered = true 
}: WebContainerProps) {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const containerStyle = [
    styles.container,
    isWeb && styles.webContainer,
    isWeb && centered && styles.centered,
    isWeb && { maxWidth: isTablet ? maxWidth : '100%' },
    isWeb && isDesktop && styles.desktopSpacing,
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView 
        style={containerStyle}
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && isTablet && styles.tabletPadding
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webContainer: Platform.OS === 'web' ? {
    width: '100%',
    alignSelf: 'center',
  } : {},
  centered: Platform.OS === 'web' ? {
    marginHorizontal: 'auto',
  } : {},
  desktopSpacing: Platform.OS === 'web' ? {
    paddingHorizontal: 60,
  } : {},
  scrollContent: {
    flexGrow: 1,
  },
  tabletPadding: Platform.OS === 'web' ? {
    paddingHorizontal: 40,
    paddingVertical: 20,
  } : {},
});

export default WebContainer;

