import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useSafeArea?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, useSafeArea = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets();

  const safeAreaStyle = useSafeArea ? { paddingTop: insets.top } : {};

  return <View style={[{ backgroundColor }, safeAreaStyle, style]} {...otherProps} />;
}
