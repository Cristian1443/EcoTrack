import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  area: string;
  xp: number;
  avatar: string;
  joinDate: string;
  isActive: boolean;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Elena Ramirez',
    email: 'elena.ramirez@ecotech.com',
    position: 'Gerente de Sostenibilidad',
    area: 'Recursos Humanos',
    xp: 12500,
    avatar: '👩🏻',
    joinDate: '2024-01-15',
    isActive: true,
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@ecotech.com',
    position: 'Desarrollador Senior',
    area: 'Tecnología',
    xp: 8900,
    avatar: '👨🏽',
    joinDate: '2024-02-20',
    isActive: true,
  },
  {
    id: 3,
    name: 'Sofia Vargas',
    email: 'sofia.vargas@ecotech.com',
    position: 'Analista de Marketing',
    area: 'Marketing',
    xp: 7200,
    avatar: '👩🏻',
    joinDate: '2024-03-10',
    isActive: false,
  },
];

export default function EmployeesScreen() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchText, setSearchText] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const areas = [...new Set(employees.map(emp => emp.area))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchText.toLowerCase());
    const matchesArea = !selectedArea || emp.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const handleDeleteEmployee = (id: number, name: string) => {
    Alert.alert(
      'Eliminar Empleado',
      `¿Estás seguro de que deseas eliminar a ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setEmployees(prev => prev.filter(emp => emp.id !== id));
            Alert.alert('Empleado eliminado', `${name} ha sido eliminado del sistema`);
          }
        }
      ]
    );
  };

  const toggleEmployeeStatus = (id: number) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    ));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Empleados</Text>
        <TouchableOpacity onPress={() => router.push('/employee-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{employees.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{employees.filter(e => e.isActive).length}</ThemedText>
            <ThemedText style={styles.statLabel}>Activos</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{areas.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Áreas</ThemedText>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtros</ThemedText>
          
          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar empleados..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtro por área */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.areaFilters}>
              <TouchableOpacity
                style={[
                  styles.areaFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedArea && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setSelectedArea('')}
              >
                <Text style={[
                  styles.areaFilterText,
                  { color: text },
                  !selectedArea && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>
              
              {areas.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.areaFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedArea === area && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedArea(selectedArea === area ? '' : area)}
                >
                  <Text style={[
                    styles.areaFilterText,
                    { color: text },
                    selectedArea === area && { color: 'white' }
                  ]}>
                    {area}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de empleados */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Empleados ({filteredEmployees.length})
          </ThemedText>
          
          {filteredEmployees.map((employee) => (
            <View 
              key={employee.id}
              style={[styles.employeeCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.employeeHeader}>
                <View style={styles.employeeAvatar}>
                  <Text style={styles.avatarText}>{employee.avatar}</Text>
                </View>
                <View style={styles.employeeInfo}>
                  <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                  <ThemedText style={styles.employeePosition}>{employee.position}</ThemedText>
                  <ThemedText style={styles.employeeArea}>{employee.area}</ThemedText>
                </View>
                <View style={styles.employeeStats}>
                  <ThemedText style={styles.employeeXP}>{employee.xp.toLocaleString()} XP</ThemedText>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: employee.isActive ? '#4ade80' : '#ef4444' }
                  ]}>
                    <Text style={styles.statusText}>
                      {employee.isActive ? 'Activo' : 'Inactivo'}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.employeeDetails}>
                <ThemedText style={styles.employeeEmail}>{employee.email}</ThemedText>
                <ThemedText style={styles.joinDate}>
                  Se unió: {new Date(employee.joinDate).toLocaleDateString('es-ES')}
                </ThemedText>
              </View>

              <View style={styles.employeeActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/employee-form?id=${employee.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: employee.isActive ? '#f59e0b' : '#4ade80' 
                  }]}
                  onPress={() => toggleEmployeeStatus(employee.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {employee.isActive ? 'Desactivar' : 'Activar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteEmployee(employee.id, employee.name)}
                >
                  <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredEmployees.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: cardBg, borderColor: border }]}>
              <Text style={styles.emptyIcon}>👥</Text>
              <ThemedText style={styles.emptyTitle}>No se encontraron empleados</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                {searchText || selectedArea 
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Agrega el primer empleado a tu empresa'
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
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, opacity: 0.7, marginTop: 4 },
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
  areaFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  areaFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  areaFilterText: { fontSize: 14, fontWeight: '500' },
  employeeCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  employeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { fontSize: 20 },
  employeeInfo: { flex: 1, marginRight: 12 },
  employeeName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  employeePosition: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  employeeArea: { fontSize: 12, opacity: 0.7 },
  employeeStats: { alignItems: 'flex-end' },
  employeeXP: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  employeeDetails: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 12,
  },
  employeeEmail: { fontSize: 14, marginBottom: 4 },
  joinDate: { fontSize: 12, opacity: 0.6 },
  employeeActions: {
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
