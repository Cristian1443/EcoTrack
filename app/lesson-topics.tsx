import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const lessonCategories = [
  {
    id: 'water',
    name: 'Conservación del Agua',
    icon: '💧',
    color: '#3b82f6',
    topics: [
      { id: 1, title: 'Duchas eficientes', duration: '5 min', difficulty: 'Fácil' },
      { id: 2, title: 'Sistemas de captación', duration: '15 min', difficulty: 'Intermedio' },
      { id: 3, title: 'Reutilización de aguas grises', duration: '20 min', difficulty: 'Avanzado' },
    ]
  },
  {
    id: 'energy',
    name: 'Energía Renovable',
    icon: '⚡',
    color: '#f59e0b',
    topics: [
      { id: 4, title: 'Paneles solares básicos', duration: '10 min', difficulty: 'Fácil' },
      { id: 5, title: 'Eficiencia energética', duration: '12 min', difficulty: 'Intermedio' },
      { id: 6, title: 'Sistemas híbridos', duration: '25 min', difficulty: 'Avanzado' },
    ]
  },
  {
    id: 'recycling',
    name: 'Reciclaje Inteligente',
    icon: '♻️',
    color: '#4ade80',
    topics: [
      { id: 7, title: 'Separación de residuos', duration: '8 min', difficulty: 'Fácil' },
      { id: 8, title: 'Compostaje doméstico', duration: '15 min', difficulty: 'Intermedio' },
      { id: 9, title: 'Upcycling creativo', duration: '18 min', difficulty: 'Intermedio' },
    ]
  },
  {
    id: 'transport',
    name: 'Movilidad Sostenible',
    icon: '🚲',
    color: '#a78bfa',
    topics: [
      { id: 10, title: 'Transporte público', duration: '6 min', difficulty: 'Fácil' },
      { id: 11, title: 'Bicicletas urbanas', duration: '10 min', difficulty: 'Fácil' },
      { id: 12, title: 'Vehículos eléctricos', duration: '22 min', difficulty: 'Avanzado' },
    ]
  },
  {
    id: 'food',
    name: 'Alimentación Sustentable',
    icon: '🌱',
    color: '#ec4899',
    topics: [
      { id: 13, title: 'Dieta plant-based', duration: '12 min', difficulty: 'Intermedio' },
      { id: 14, title: 'Reducir desperdicio', duration: '8 min', difficulty: 'Fácil' },
      { id: 15, title: 'Huertos urbanos', duration: '20 min', difficulty: 'Avanzado' },
    ]
  },
  {
    id: 'lifestyle',
    name: 'Estilo de Vida Eco',
    icon: '🌍',
    color: '#06b6d4',
    topics: [
      { id: 16, title: 'Minimalismo consciente', duration: '10 min', difficulty: 'Fácil' },
      { id: 17, title: 'Productos eco-friendly', duration: '14 min', difficulty: 'Intermedio' },
      { id: 18, title: 'Zero waste lifestyle', duration: '25 min', difficulty: 'Avanzado' },
    ]
  },
];

const getDifficultyColor = (difficulty: string, isDark: boolean) => {
  switch (difficulty) {
    case 'Fácil':
      return isDark ? '#4ade80' : '#16a34a';
    case 'Intermedio':
      return isDark ? '#f59e0b' : '#d97706';
    case 'Avanzado':
      return isDark ? '#ef4444' : '#dc2626';
    default:
      return isDark ? '#6b7280' : '#374151';
  }
};

export default function LessonTopicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <WebContainer scrollable maxWidth={isTablet ? 1200 : 800}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backIcon, { color: text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: text }]}>Temas de Lecciones</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Categorías */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Categorías</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {lessonCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: cardBg, borderColor: border },
                  selectedCategory === category.id && { 
                    borderColor: category.color, 
                    borderWidth: 2,
                    backgroundColor: `${category.color}15`
                  }
                ]}
                onPress={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                <ThemedText style={styles.topicsCount}>
                  {category.topics.length} lecciones
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Temas de la categoría seleccionada */}
        {selectedCategory && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              {lessonCategories.find(c => c.id === selectedCategory)?.name}
            </ThemedText>
            
            {lessonCategories
              .find(c => c.id === selectedCategory)
              ?.topics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  style={[styles.topicCard, { backgroundColor: cardBg, borderColor: border }]}
                  activeOpacity={0.7}
                >
                  <View style={styles.topicContent}>
                    <View style={styles.topicInfo}>
                      <ThemedText style={styles.topicTitle}>{topic.title}</ThemedText>
                      <View style={styles.topicMeta}>
                        <Text style={[styles.topicDuration, { color: text }]}>
                          ⏱️ {topic.duration}
                        </Text>
                        <Text style={[
                          styles.topicDifficulty,
                          { color: getDifficultyColor(topic.difficulty, background === '#020617') }
                        ]}>
                          {topic.difficulty}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={[styles.startButton, { backgroundColor: primary }]}>
                      <Text style={styles.startButtonText}>▶️</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Todas las lecciones si no hay categoría seleccionada */}
        {!selectedCategory && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Todas las Lecciones</ThemedText>
            
            {lessonCategories.map((category) => (
              <View key={category.id} style={styles.categorySection}>
                <View style={styles.categorySectionHeader}>
                  <View style={[styles.categoryMiniIcon, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryMiniIconText}>{category.icon}</Text>
                  </View>
                  <ThemedText style={styles.categorySectionTitle}>
                    {category.name}
                  </ThemedText>
                </View>
                
                {category.topics.slice(0, 2).map((topic) => (
                  <TouchableOpacity
                    key={topic.id}
                    style={[styles.compactTopicCard, { backgroundColor: cardBg, borderColor: border }]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.compactTopicContent}>
                      <ThemedText style={styles.compactTopicTitle}>{topic.title}</ThemedText>
                      <View style={styles.compactTopicMeta}>
                        <Text style={[styles.compactDuration, { color: text }]}>
                          {topic.duration}
                        </Text>
                        <Text style={[
                          styles.compactDifficulty,
                          { color: getDifficultyColor(topic.difficulty, background === '#020617') }
                        ]}>
                          {topic.difficulty}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.compactStartButton}>
                      <Text style={styles.compactStartText}>▶️</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
                
                {category.topics.length > 2 && (
                  <TouchableOpacity
                    style={styles.viewMoreButton}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={[styles.viewMoreText, { color: category.color }]}>
                      Ver todas las {category.topics.length} lecciones
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
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
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  categoriesContainer: {
    paddingRight: 24,
    ...(Platform.OS === 'web' && {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
    }),
  },
  categoryCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
      marginRight: 0,
      minWidth: 160,
      maxWidth: 200,
    }),
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  topicsCount: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  topicCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  topicDuration: {
    fontSize: 14,
    opacity: 0.8,
  },
  topicDifficulty: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  startButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  startButtonText: {
    fontSize: 18,
  },
  categorySection: {
    marginBottom: 24,
  },
  categorySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryMiniIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryMiniIconText: {
    fontSize: 16,
  },
  categorySectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  compactTopicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  compactTopicContent: {
    flex: 1,
  },
  compactTopicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  compactTopicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compactDuration: {
    fontSize: 12,
    opacity: 0.7,
  },
  compactDifficulty: {
    fontSize: 11,
    fontWeight: '500',
  },
  compactStartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  compactStartText: {
    fontSize: 14,
  },
  viewMoreButton: {
    paddingVertical: 8,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
});


