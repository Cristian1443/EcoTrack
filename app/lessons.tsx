import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const themes = [
  {
    id: 1,
    title: 'Conservación del Agua',
    description: 'Aprende técnicas para reducir el consumo de agua en casa y en la comunidad.',
    color: '#06b6d4',
    icon: '💧',
  },
  {
    id: 2,
    title: 'Energía Renovable',
    description: 'Descubre las fuentes de energía renovable y cómo puedes implementarlas.',
    color: '#3b82f6',
    icon: '☀️',
  },
  {
    id: 3,
    title: 'Reciclaje y Residuos',
    description: 'Domina el arte del reciclaje y reduce tu huella de carbono con prácticas sostenibles.',
    color: '#10b981',
    icon: '♻️',
  },
  {
    id: 4,
    title: 'Transporte Sostenible',
    description: 'Explora opciones de transporte ecológicas y reduce tu impacto ambiental.',
    color: '#059669',
    icon: '🌱',
  },
];

export default function LessonsScreen() {
  const router = useRouter();
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  return (
    <ThemedView style={styles.container}>
      <WebContainer scrollable maxWidth={isTablet ? 1000 : 800}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backIcon, { color: useThemeColor({}, 'text') }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Lecciones</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Temas</ThemedText>
          
          <View style={styles.themesGrid}>
            {themes.map((theme) => (
              <TouchableOpacity 
                key={theme.id}
                style={[styles.themeCard, { backgroundColor: cardBg, borderColor: border }]}
                activeOpacity={0.7}
              >
                <View style={styles.themeContent}>
                  <View style={styles.themeText}>
                    <ThemedText style={styles.themeTitle}>{theme.title}</ThemedText>
                    <ThemedText style={styles.themeDescription}>{theme.description}</ThemedText>
                  </View>
                  <View style={[styles.themeIcon, { backgroundColor: theme.color }]}>
                    <Text style={styles.iconText}>{theme.icon}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    ...(Platform.OS === 'web' && {
      maxWidth: 1000,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  backIcon: {
    fontSize: 24,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    ...(Platform.OS === 'web' && {
      maxWidth: 1000,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  themesGrid: {
    ...(Platform.OS === 'web' && {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    }),
  },
  themeCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
      width: '48%',
      minWidth: 300,
      maxWidth: 400,
    }),
  },
  themeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    flex: 1,
    marginRight: 16,
  },
  themeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  themeDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  themeIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
});
