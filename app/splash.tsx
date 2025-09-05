import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/login'), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  const backgroundColor = isDark ? '#020617' : '#4ade80';
  const circleColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';
  const innerCircleColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.logoContainer}>
        <View style={[styles.circle, { backgroundColor: circleColor }]}>
          <View style={[styles.innerCircle, { backgroundColor: innerCircleColor }]} />
        </View>
        <Text style={styles.logoText}>ecoTrack</Text>
      </View>
      <TouchableOpacity 
        style={[styles.bottom, { backgroundColor: circleColor }]}
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.startText}>INICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 20,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  bottom: {
    position: 'absolute',
    bottom: 80,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});


