import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, GestureResponderEvent, Platform, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({ label, onPress, variant = 'primary', disabled = false, loading = false, style }: ButtonProps) {
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  
  const background = variant === 'primary' ? primary : variant === 'secondary' ? secondary : 'transparent';
  const color = variant === 'primary' ? '#ffffff' : variant === 'ghost' ? primary : textColor;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base, 
        { backgroundColor: background, opacity: disabled ? 0.6 : 1 }, 
        Platform.OS === 'web' && styles.webButton,
        style
      ]}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  webButton: Platform.OS === 'web' ? {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } : {},
});


