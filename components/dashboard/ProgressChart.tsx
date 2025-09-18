import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressChartProps {
  title: string;
  data: {
    label: string;
    value: number;
    maxValue: number;
    color?: string;
  }[];
}

export default function ProgressChart({ title, data }: ProgressChartProps) {
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const getDefaultColor = (index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
    return colors[index % colors.length];
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBg, borderColor: border }]}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      
      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const percentage = (item.value / item.maxValue) * 100;
          const color = item.color || getDefaultColor(index);
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barHeader}>
                <ThemedText style={styles.barLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.barValue}>
                  {item.value}/{item.maxValue}
                </ThemedText>
              </View>
              
              <View style={styles.barTrack}>
                <View 
                  style={[
                    styles.barFill,
                    { 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: color 
                    }
                  ]} 
                />
              </View>
              
              <ThemedText style={styles.barPercentage}>
                {Math.round(percentage)}%
              </ThemedText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    gap: 16,
  },
  barContainer: {
    gap: 8,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  barValue: {
    fontSize: 12,
    opacity: 0.7,
  },
  barTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barPercentage: {
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
});
