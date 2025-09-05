import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  xpReward: number;
  duration: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  icon: string;
  createdBy: string;
  createdDate: string;
  isActive: boolean;
}

const initialActivities: Activity[] = [
  {
    id: 1,
    title: 'Ducha corta (5 minutos)',
    description: 'Reducir el tiempo de ducha para conservar agua y energía',
    category: 'Agua',
    xpReward: 10,
    duration: '5 min',
    difficulty: 'Fácil',
    icon: '💧',
    createdBy: 'Sistema',
    createdDate: '2024-01-15',
    isActive: true,
  },
  {
    id: 2,
    title: 'Usar bicicleta al trabajo',
    description: 'Transporte sostenible que reduce emisiones de CO2',
    category: 'Transporte',
    xpReward: 25,
    duration: '30 min',
    difficulty: 'Intermedio',
    icon: '🚲',
    createdBy: 'Elena Ramirez',
    createdDate: '2024-01-20',
    isActive: true,
  },
  {
    id: 3,
    title: 'Reciclaje de papel',
    description: 'Separar y reciclar papel de oficina correctamente',
    category: 'Residuos',
    xpReward: 15,
    duration: '10 min',
    difficulty: 'Fácil',
    icon: '📄',
    createdBy: 'Carlos Mendoza',
    createdDate: '2024-02-01',
    isActive: false,
  },
];

export default function ActivitiesScreen() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const categories = [...new Set(activities.map(act => act.category))];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteActivity = (id: number, title: string) => {
    Alert.alert(
      'Eliminar Actividad',
      `¿Estás seguro de que deseas eliminar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setActivities(prev => prev.filter(act => act.id !== id));
            Alert.alert('Actividad eliminada', `"${title}" ha sido eliminada`);
          }
        }
      ]
    );
  };

  const toggleActivityStatus = (id: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, isActive: !activity.isActive } : activity
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

  const totalXP = activities.reduce((sum, act) => sum + act.xpReward, 0);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Actividades</Text>
        <TouchableOpacity onPress={() => router.push('/activity-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{activities.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Actividades</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{categories.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Categorías</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{totalXP}</ThemedText>
            <ThemedText style={styles.statLabel}>XP Total</ThemedText>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtros</ThemedText>
          
          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar actividades..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtro por categoría */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryFilters}>
              <TouchableOpacity
                style={[
                  styles.categoryFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedCategory && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setSelectedCategory('')}
              >
                <Text style={[
                  styles.categoryFilterText,
                  { color: text },
                  !selectedCategory && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>
              
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedCategory === category && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                >
                  <Text style={[
                    styles.categoryFilterText,
                    { color: text },
                    selectedCategory === category && { color: 'white' }
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de actividades */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Actividades ({filteredActivities.length})
          </ThemedText>
          
          {filteredActivities.map((activity) => (
            <View 
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.activityHeader}>
                <View style={styles.activityIcon}>
                  <Text style={styles.iconText}>{activity.icon}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <ThemedText style={styles.activityCategory}>{activity.category}</ThemedText>
                  <View style={styles.activityMeta}>
                    <Text style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(activity.difficulty) }
                    ]}>
                      {activity.difficulty}
                    </Text>
                    <ThemedText style={styles.activityDuration}>⏱️ {activity.duration}</ThemedText>
                    <ThemedText style={styles.activityXP}>🏆 {activity.xpReward} XP</ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: activity.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                  <Text style={styles.statusText}>
                    {activity.isActive ? 'Activa' : 'Inactiva'}
                  </Text>
                </View>
              </View>
              
              <ThemedText style={styles.activityDescription}>
                {activity.description}
              </ThemedText>
              
              <ThemedText style={styles.createdInfo}>
                Creada por {activity.createdBy} • {new Date(activity.createdDate).toLocaleDateString('es-ES')}
              </ThemedText>

              <View style={styles.activityActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/activity-form?id=${activity.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: activity.isActive ? '#f59e0b' : '#4ade80' 
                  }]}
                  onPress={() => toggleActivityStatus(activity.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {activity.isActive ? 'Desactivar' : 'Activar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteActivity(activity.id, activity.title)}
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
  categoryFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryFilterText: { fontSize: 14, fontWeight: '500' },
  activityCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      maxWidth: '100%',
      transition: 'all 0.2s ease',
    }),
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: { fontSize: 20 },
  activityInfo: { flex: 1, marginRight: 12 },
  activityTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  activityCategory: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
  activityMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  difficultyBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activityDuration: { fontSize: 12, opacity: 0.7 },
  activityXP: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  activityDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  createdInfo: { fontSize: 12, opacity: 0.6, marginBottom: 16 },
  activityActions: {
    flexDirection: 'row',
    gap: 8,
    ...(Platform.OS === 'web' && {
      flexWrap: 'wrap',
      justifyContent: 'center',
    }),
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      minWidth: 80,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
