import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Area {
  id: number;
  name: string;
  description: string;
  leader: string;
  members: number;
  budget: number;
  icon: string;
  color: string;
  createdDate: string;
  isActive: boolean;
}

const initialAreas: Area[] = [
  {
    id: 1,
    name: 'Recursos Humanos',
    description: 'Gestión de talento y bienestar laboral con enfoque sostenible',
    leader: 'María González',
    members: 12,
    budget: 50000,
    icon: '👥',
    color: '#3b82f6',
    createdDate: '2024-01-10',
    isActive: true,
  },
  {
    id: 2,
    name: 'Tecnología Verde',
    description: 'Desarrollo de soluciones tecnológicas eco-amigables',
    leader: 'Carlos Ruiz',
    members: 8,
    budget: 75000,
    icon: '💻',
    color: '#10b981',
    createdDate: '2024-01-15',
    isActive: true,
  },
  {
    id: 3,
    name: 'Marketing Sostenible',
    description: 'Promoción de productos y servicios con impacto ambiental positivo',
    leader: 'Ana Morales',
    members: 15,
    budget: 40000,
    icon: '📈',
    color: '#f59e0b',
    createdDate: '2024-02-01',
    isActive: false,
  },
];

export default function AreasScreen() {
  const router = useRouter();
  const [areas, setAreas] = useState<Area[]>(initialAreas);
  const [searchText, setSearchText] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const filteredAreas = areas.filter(area => 
    area.name.toLowerCase().includes(searchText.toLowerCase()) ||
    area.leader.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteArea = (id: number, name: string) => {
    Alert.alert(
      'Eliminar Área',
      `¿Estás seguro de que deseas eliminar el área de ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setAreas(prev => prev.filter(area => area.id !== id));
            Alert.alert('Área eliminada', `El área de ${name} ha sido eliminada`);
          }
        }
      ]
    );
  };

  const toggleAreaStatus = (id: number) => {
    setAreas(prev => prev.map(area => 
      area.id === id ? { ...area, isActive: !area.isActive } : area
    ));
  };

  const totalBudget = areas.reduce((sum, area) => sum + area.budget, 0);
  const totalMembers = areas.reduce((sum, area) => sum + area.members, 0);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Áreas</Text>
        <TouchableOpacity onPress={() => router.push('/area-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{areas.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Áreas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{totalMembers}</ThemedText>
            <ThemedText style={styles.statLabel}>Miembros</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>
              ${(totalBudget / 1000).toFixed(0)}K
            </ThemedText>
            <ThemedText style={styles.statLabel}>Presupuesto</ThemedText>
          </View>
        </View>

        {/* Búsqueda */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar áreas o líderes..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>
        </View>

        {/* Lista de áreas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Áreas ({filteredAreas.length})
          </ThemedText>
          
          {filteredAreas.map((area) => (
            <View 
              key={area.id}
              style={[styles.areaCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.areaHeader}>
                <View style={[styles.areaIcon, { backgroundColor: `${area.color}20` }]}>
                  <Text style={styles.iconText}>{area.icon}</Text>
                </View>
                <View style={styles.areaInfo}>
                  <ThemedText style={styles.areaName}>{area.name}</ThemedText>
                  <ThemedText style={styles.areaLeader}>Líder: {area.leader}</ThemedText>
                  <View style={styles.areaStats}>
                    <ThemedText style={styles.areaStat}>
                      👥 {area.members} miembros
                    </ThemedText>
                    <ThemedText style={styles.areaStat}>
                      💰 ${area.budget.toLocaleString()}
                    </ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: area.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                  <Text style={styles.statusText}>
                    {area.isActive ? 'Activa' : 'Inactiva'}
                  </Text>
                </View>
              </View>
              
              <ThemedText style={styles.areaDescription}>
                {area.description}
              </ThemedText>
              
              <ThemedText style={styles.createdDate}>
                Creada: {new Date(area.createdDate).toLocaleDateString('es-ES')}
              </ThemedText>

              <View style={styles.areaActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/area-form?id=${area.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: area.isActive ? '#f59e0b' : '#4ade80' 
                  }]}
                  onPress={() => toggleAreaStatus(area.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {area.isActive ? 'Desactivar' : 'Activar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteArea(area.id, area.name)}
                >
                  <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredAreas.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: cardBg, borderColor: border }]}>
              <Text style={styles.emptyIcon}>🏢</Text>
              <ThemedText style={styles.emptyTitle}>No se encontraron áreas</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                {searchText 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Crea la primera área de tu empresa'
                }
              </ThemedText>
            </View>
          )}
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
  areaCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  areaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: { fontSize: 20 },
  areaInfo: { flex: 1, marginRight: 12 },
  areaName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  areaLeader: { fontSize: 14, fontWeight: '500', marginBottom: 6 },
  areaStats: { flexDirection: 'row', gap: 12 },
  areaStat: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  areaDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  createdDate: { fontSize: 12, opacity: 0.6, marginBottom: 16 },
  areaActions: {
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
  emptyState: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
});



