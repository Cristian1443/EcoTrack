import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  duration: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  xpReward: number;
  icon: string;
  author: string;
  createdDate: string;
  isPublished: boolean;
  completions: number;
}

const initialLessons: Lesson[] = [
  {
    id: 1,
    title: 'Introducción al ahorro de agua',
    description: 'Aprende técnicas básicas para reducir el consumo de agua en casa y oficina',
    content: 'Contenido de la lección sobre ahorro de agua...',
    category: 'Agua',
    duration: '15 min',
    difficulty: 'Fácil',
    xpReward: 50,
    icon: '💧',
    author: 'Dr. María Pérez',
    createdDate: '2024-01-10',
    isPublished: true,
    completions: 45,
  },
  {
    id: 2,
    title: 'Energías renovables en la empresa',
    description: 'Implementación de paneles solares y sistemas de energía limpia',
    content: 'Contenido detallado sobre energías renovables...',
    category: 'Energía',
    duration: '25 min',
    difficulty: 'Intermedio',
    xpReward: 75,
    icon: '⚡',
    author: 'Ing. Carlos López',
    createdDate: '2024-01-15',
    isPublished: true,
    completions: 32,
  },
  {
    id: 3,
    title: 'Gestión avanzada de residuos',
    description: 'Estrategias para reducir, reutilizar y reciclar en entornos corporativos',
    content: 'Contenido sobre gestión de residuos...',
    category: 'Residuos',
    duration: '30 min',
    difficulty: 'Avanzado',
    xpReward: 100,
    icon: '♻️',
    author: 'Dra. Ana Ruiz',
    createdDate: '2024-02-01',
    isPublished: false,
    completions: 8,
  },
];

export default function LessonsCRUDScreen() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterPublished, setFilterPublished] = useState('all');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const categories = [...new Set(lessons.map(lesson => lesson.category))];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         lesson.author.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || lesson.category === selectedCategory;
    const matchesPublished = filterPublished === 'all' || 
                            (filterPublished === 'published' && lesson.isPublished) ||
                            (filterPublished === 'draft' && !lesson.isPublished);
    return matchesSearch && matchesCategory && matchesPublished;
  });

  const handleDeleteLesson = (id: number, title: string) => {
    Alert.alert(
      'Eliminar Lección',
      `¿Estás seguro de que deseas eliminar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setLessons(prev => prev.filter(lesson => lesson.id !== id));
            Alert.alert('Lección eliminada', `"${title}" ha sido eliminada`);
          }
        }
      ]
    );
  };

  const toggleLessonStatus = (id: number) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === id ? { ...lesson, isPublished: !lesson.isPublished } : lesson
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return '#4ade80';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const totalCompletions = lessons.reduce((sum, lesson) => sum + lesson.completions, 0);
  const publishedLessons = lessons.filter(lesson => lesson.isPublished).length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Lecciones</Text>
        <TouchableOpacity onPress={() => router.push('/lesson-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{lessons.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{publishedLessons}</ThemedText>
            <ThemedText style={styles.statLabel}>Publicadas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{totalCompletions}</ThemedText>
            <ThemedText style={styles.statLabel}>Completadas</ThemedText>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtros</ThemedText>
          
          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar lecciones o autores..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtros de estado */}
          <View style={styles.statusFilters}>
            {[
              { key: 'all', label: 'Todas' },
              { key: 'published', label: 'Publicadas' },
              { key: 'draft', label: 'Borradores' }
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.statusFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  filterPublished === filter.key && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setFilterPublished(filter.key)}
              >
                <Text style={[
                  styles.statusFilterText,
                  { color: text },
                  filterPublished === filter.key && { color: 'white' }
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lista de lecciones */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Lecciones ({filteredLessons.length})
          </ThemedText>
          
          {filteredLessons.map((lesson) => (
            <View 
              key={lesson.id}
              style={[styles.lessonCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.lessonIcon}>
                  <Text style={styles.iconText}>{lesson.icon}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>
                  <ThemedText style={styles.lessonAuthor}>Por {lesson.author}</ThemedText>
                  <View style={styles.lessonMeta}>
                    <Text style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(lesson.difficulty) }
                    ]}>
                      {lesson.difficulty}
                    </Text>
                    <ThemedText style={styles.lessonDuration}>⏱️ {lesson.duration}</ThemedText>
                    <ThemedText style={styles.lessonXP}>🏆 {lesson.xpReward} XP</ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: lesson.isPublished ? '#4ade80' : '#f59e0b' }
                ]}>
                  <Text style={styles.statusText}>
                    {lesson.isPublished ? 'Publicada' : 'Borrador'}
                  </Text>
                </View>
              </View>
              
              <ThemedText style={styles.lessonDescription}>
                {lesson.description}
              </ThemedText>
              
              <ThemedText style={styles.completionInfo}>
                {lesson.completions} completadas • Creada: {new Date(lesson.createdDate).toLocaleDateString('es-ES')}
              </ThemedText>

              <View style={styles.lessonActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/lesson-form?id=${lesson.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: lesson.isPublished ? '#f59e0b' : '#4ade80' 
                  }]}
                  onPress={() => toggleLessonStatus(lesson.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {lesson.isPublished ? 'Despublicar' : 'Publicar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteLesson(lesson.id, lesson.title)}
                >
                  <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backIcon: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: '700' },
  addIcon: { fontSize: 28, color: '#4ade80' },
  content: { flex: 1 },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
      flexWrap: 'wrap',
    }),
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      minWidth: 150,
      maxWidth: 200,
    }),
  },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, opacity: 0.7, marginTop: 4 },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  statusFilters: { flexDirection: 'row', gap: 12 },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusFilterText: { fontSize: 14, fontWeight: '500' },
  lessonCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: { fontSize: 20 },
  lessonInfo: { flex: 1, marginRight: 12 },
  lessonTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  lessonAuthor: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  difficultyBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  lessonDuration: { fontSize: 12, opacity: 0.7 },
  lessonXP: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  lessonDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  completionInfo: { fontSize: 12, opacity: 0.6, marginBottom: 16 },
  lessonActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
