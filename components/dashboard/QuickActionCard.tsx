import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuickActionCardProps {
  title: string;
  icon: string;
  route: string;
  color: string;
  description?: string;
  badge?: string;
}

export default function QuickActionCard({ 
  title, 
  icon, 
  route, 
  color, 
  description,
  badge 
}: QuickActionCardProps) {
  const router = useRouter();
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cardBg, borderColor: border }]}
      onPress={() => router.push(route)}
      activeOpacity={0.8}
    >
      {badge && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      
      <ThemedText style={styles.title}>{title}</ThemedText>
      
      {description && (
        <ThemedText style={styles.description}>{description}</ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
    ...(Platform.OS === 'web' && {
      maxWidth: '23%',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: { 
    fontSize: 20 
  },
  title: { 
    fontSize: 12, 
    fontWeight: '500', 
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
  },
});
