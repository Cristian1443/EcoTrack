import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export default function Input(props: TextInputProps) {
  const bg = useThemeColor({}, 'card');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'border');
  const placeholder = useThemeColor({}, 'placeholder');

  return (
    <View style={[styles.container, { borderColor: border, backgroundColor: bg }]}>
      <TextInput
        placeholderTextColor={placeholder}
        style={[styles.input, { color: text }]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
  },
});


