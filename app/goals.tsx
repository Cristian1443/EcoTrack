import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: 'Alta' | 'Media' | 'Baja';
  assignedTo: string;
  icon: string;
  createdDate: string;
  status: 'En progreso' | 'Completada' | 'Pausada' | 'Vencida';
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: 'Reducir consumo de agua',
    description: 'Disminuir el consumo de agua en la oficina en un 20%',
    category: 'Agua',
    targetValue: 20,
    currentValue: 12,
    unit: '%',
    deadline: '2024-06-30',
    priority: 'Alta',
    assignedTo: 'Área de Operaciones',
    icon: '💧',
    createdDate: '2024-01-15',
    status: 'En progreso',
  },
  {
    id: 2,
    title: 'Implementar reciclaje',
    description: 'Establecer puntos de reciclaje en todas las plantas',
    category: 'Residuos',
    targetValue: 5,
    currentValue: 5,
    unit: 'puntos',
    deadline: '2024-03-31',
    priority: 'Media',
    assignedTo: 'Área de Sostenibilidad',
    icon: '♻️',
    createdDate: '2024-01-20',
    status: 'Completada',
  },
  {
    id: 3,
    title: 'Capacitar empleados',
    description: 'Entrenar al 80% de empleados en prácticas sostenibles',
    category: 'Educación',
    targetValue: 80,
    currentValue: 45,
    unit: '%',
    deadline: '2024-12-31',
    priority: 'Alta',
    assignedTo: 'Recursos Humanos',
    icon: '🎓',
    createdDate: '2024-02-01',
    status: 'En progreso',
  },
];

export default function GoalsScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const statuses = [...new Set(goals.map(goal => goal.status))];
  const priorities = [...new Set(goals.map(goal => goal.priority))];

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         goal.assignedTo.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !selectedStatus || goal.status === selectedStatus;
    const matchesPriority = !selectedPriority || goal.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDeleteGoal = (id: number, title: string) => {
    Alert.alert(
      'Eliminar Meta',
      `¿Estás seguro de que deseas eliminar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setGoals(prev => prev.filter(goal => goal.id !== id));
            Alert.alert('Meta eliminada', `"${title}" ha sido eliminada`);
          }
        }
      ]
    );
  };

  const updateGoalProgress = (id: number, newValue: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { 
        ...goal, 
        currentValue: newValue,
        status: newValue >= goal.targetValue ? 'Completada' : 'En progreso'
      } : goal
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada': return '#4ade80';
      case 'En progreso': return '#3b82f6';
      case 'Pausada': return '#f59e0b';
      case 'Vencida': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return '#ef4444';
      case 'Media': return '#f59e0b';
      case 'Baja': return '#4ade80';
      default: return '#6b7280';
    }
  };

  const completedGoals = goals.filter(goal => goal.status === 'Completada').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'En progreso').length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Metas</Text>
        <TouchableOpacity onPress={() => router.push('/goal-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{goals.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{completedGoals}</ThemedText>
            <ThemedText style={styles.statLabel}>Completadas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{inProgressGoals}</ThemedText>
            <ThemedText style={styles.statLabel}>En progreso</ThemedText>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtros</ThemedText>
          
          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar metas..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtros de estado y prioridad */}
          <View style={styles.filtersRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filters}>
                <TouchableOpacity
                  style={[
                    styles.filter,
                    { backgroundColor: cardBg, borderColor: border },
                    !selectedStatus && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedStatus('')}
                >
                  <Text style={[
                    styles.filterText,
                    { color: text },
                    !selectedStatus && { color: 'white' }
                  ]}>
                    Todos los estados
                  </Text>
                </TouchableOpacity>
                
                {statuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filter,
                      { backgroundColor: cardBg, borderColor: border },
                      selectedStatus === status && { backgroundColor: getStatusColor(status), borderColor: getStatusColor(status) }
                    ]}
                    onPress={() => setSelectedStatus(selectedStatus === status ? '' : status)}
                  >
                    <Text style={[
                      styles.filterText,
                      { color: text },
                      selectedStatus === status && { color: 'white' }
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Lista de metas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Metas ({filteredGoals.length})
          </ThemedText>
          
          {filteredGoals.map((goal) => (
            <View 
              key={goal.id}
              style={[styles.goalCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.goalHeader}>
                <View style={styles.goalIcon}>
                  <Text style={styles.iconText}>{goal.icon}</Text>
                </View>
                <View style={styles.goalInfo}>
                  <ThemedText style={styles.goalTitle}>{goal.title}</ThemedText>
                  <ThemedText style={styles.goalAssigned}>Asignada a: {goal.assignedTo}</ThemedText>
                  <View style={styles.goalMeta}>
                    <Text style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(goal.priority) }
                    ]}>
                      {goal.priority}
                    </Text>
                    <ThemedText style={styles.goalDeadline}>
                      📅 {new Date(goal.deadline).toLocaleDateString('es-ES')}
                    </ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(goal.status) }
                ]}>
                  <Text style={styles.statusText}>{goal.status}</Text>
                </View>
              </View>
              
              <ThemedText style={styles.goalDescription}>
                {goal.description}
              </ThemedText>
              
              {/* Progreso */}
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <ThemedText style={styles.progressLabel}>Progreso</ThemedText>
                  <ThemedText style={styles.progressText}>
                    {goal.currentValue}/{goal.targetValue} {goal.unit}
                  </ThemedText>
                </View>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill,
                    { 
                      width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%`,
                      backgroundColor: getStatusColor(goal.status)
                    }
                  ]} />
                </View>
                <ThemedText style={styles.progressPercentage}>
                  {Math.round((goal.currentValue / goal.targetValue) * 100)}% completado
                </ThemedText>
              </View>

              <View style={styles.goalActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/goal-form?id=${goal.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#10b981' }]}
                  onPress={() => {
                    Alert.prompt(
                      'Actualizar progreso',
                      `Progreso actual: ${goal.currentValue} ${goal.unit}`,
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                          text: 'Actualizar',
                          onPress: (value) => {
                            const newValue = parseInt(value || '0');
                            if (!isNaN(newValue)) {
                              updateGoalProgress(goal.id, newValue);
                            }
                          }
                        }
                      ],
                      'plain-text',
                      goal.currentValue.toString()
                    );
                  }}
                >
                  <Text style={styles.actionButtonText}>Progreso</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteGoal(goal.id, goal.title)}
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
  filtersRow: { marginBottom: 16 },
  filters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: { fontSize: 14, fontWeight: '500' },
  goalCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: { fontSize: 20 },
  goalInfo: { flex: 1, marginRight: 12 },
  goalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  goalAssigned: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
  goalMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priorityBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  goalDeadline: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  goalDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  progressContainer: { marginBottom: 16 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: { fontSize: 14, fontWeight: '600' },
  progressText: { fontSize: 14, fontWeight: '600' },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: { fontSize: 12, opacity: 0.7 },
  goalActions: {
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
