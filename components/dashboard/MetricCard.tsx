import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  icon: string;
  value: string;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function MetricCard({ icon, value, label, trend }: MetricCardProps) {
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  return (
    <View style={[styles.container, { backgroundColor: cardBg, borderColor: border }]}>
      <Text style={styles.icon}>{icon}</Text>
      <ThemedText style={styles.value}>{value}</ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
      
      {trend && (
        <View style={styles.trendContainer}>
          <Text style={[
            styles.trendValue,
            { color: trend.isPositive ? '#10b981' : '#ef4444' }
          ]}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 150,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      maxWidth: '23%',
      transition: 'all 0.2s ease',
    }),
  },
  icon: { 
    fontSize: 32, 
    marginBottom: 8 
  },
  value: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  label: { 
    fontSize: 12, 
    opacity: 0.7, 
    textAlign: 'center',
    marginBottom: 8,
  },
  trendContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  trendValue: {
    fontSize: 10,
    fontWeight: '600',
  },
});
