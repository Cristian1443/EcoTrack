import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  employees: number;
  website: string;
  email: string;
  phone: string;
  avatar: string;
  totalXP: number;
  createdDate: string;
  isActive: boolean;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'EcoTech Solutions',
    description: 'Empresa líder en tecnologías sostenibles y soluciones ambientales',
    industry: 'Tecnología',
    employees: 150,
    website: 'https://ecotech.com',
    email: 'contacto@ecotech.com',
    phone: '+57 300 123 4567',
    avatar: '🌱',
    totalXP: 25000,
    createdDate: '2023-06-15',
    isActive: true,
  },
  {
    id: 2,
    name: 'Green Innovations',
    description: 'Innovación en productos eco-amigables para el hogar y oficina',
    industry: 'Manufactura',
    employees: 120,
    website: 'https://greeninnovations.co',
    email: 'info@greeninnovations.co',
    phone: '+57 310 987 6543',
    avatar: '♻️',
    totalXP: 23500,
    createdDate: '2023-08-20',
    isActive: true,
  },
  {
    id: 3,
    name: 'Sustainable Corp',
    description: 'Consultoría en sostenibilidad empresarial y certificaciones ambientales',
    industry: 'Consultoría',
    employees: 85,
    website: 'https://sustainablecorp.org',
    email: 'hello@sustainablecorp.org',
    phone: '+57 320 456 7890',
    avatar: '🌍',
    totalXP: 19800,
    createdDate: '2023-09-10',
    isActive: false,
  },
];

export default function CompaniesScreen() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchText, setSearchText] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const industries = [...new Set(companies.map(comp => comp.industry))];

  const filteredCompanies = companies.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesIndustry = !selectedIndustry || comp.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleDeleteCompany = (id: number, name: string) => {
    Alert.alert(
      'Eliminar Empresa',
      `¿Estás seguro de que deseas eliminar ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setCompanies(prev => prev.filter(comp => comp.id !== id));
            Alert.alert('Empresa eliminada', `${name} ha sido eliminada del sistema`);
          }
        }
      ]
    );
  };

  const toggleCompanyStatus = (id: number) => {
    setCompanies(prev => prev.map(comp => 
      comp.id === id ? { ...comp, isActive: !comp.isActive } : comp
    ));
  };

  const totalEmployees = companies.reduce((sum, comp) => sum + comp.employees, 0);
  const totalXP = companies.reduce((sum, comp) => sum + comp.totalXP, 0);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Empresas</Text>
        <TouchableOpacity onPress={() => router.push('/company-form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>
        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{companies.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Empresas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>{totalEmployees}</ThemedText>
            <ThemedText style={styles.statLabel}>Empleados</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.statValue}>
              {(totalXP / 1000).toFixed(0)}K
            </ThemedText>
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
              placeholder="Buscar empresas..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtro por industria */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.industryFilters}>
              <TouchableOpacity
                style={[
                  styles.industryFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedIndustry && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setSelectedIndustry('')}
              >
                <Text style={[
                  styles.industryFilterText,
                  { color: text },
                  !selectedIndustry && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>
              
              {industries.map((industry) => (
                <TouchableOpacity
                  key={industry}
                  style={[
                    styles.industryFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedIndustry === industry && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedIndustry(selectedIndustry === industry ? '' : industry)}
                >
                  <Text style={[
                    styles.industryFilterText,
                    { color: text },
                    selectedIndustry === industry && { color: 'white' }
                  ]}>
                    {industry}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de empresas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Empresas ({filteredCompanies.length})
          </ThemedText>
          
          {filteredCompanies.map((company) => (
            <View 
              key={company.id}
              style={[styles.companyCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.companyHeader}>
                <View style={styles.companyAvatar}>
                  <Text style={styles.avatarText}>{company.avatar}</Text>
                </View>
                <View style={styles.companyInfo}>
                  <ThemedText style={styles.companyName}>{company.name}</ThemedText>
                  <ThemedText style={styles.companyIndustry}>{company.industry}</ThemedText>
                  <View style={styles.companyStats}>
                    <ThemedText style={styles.companyStat}>
                      👥 {company.employees} empleados
                    </ThemedText>
                    <ThemedText style={styles.companyStat}>
                      🏆 {company.totalXP.toLocaleString()} XP
                    </ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: company.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                  <Text style={styles.statusText}>
                    {company.isActive ? 'Activa' : 'Inactiva'}
                  </Text>
                </View>
              </View>
              
              <ThemedText style={styles.companyDescription}>
                {company.description}
              </ThemedText>
              
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactItem}>🌐 {company.website}</ThemedText>
                <ThemedText style={styles.contactItem}>📧 {company.email}</ThemedText>
                <ThemedText style={styles.contactItem}>📱 {company.phone}</ThemedText>
              </View>

              <View style={styles.companyActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
                  onPress={() => router.push(`/company-form?id=${company.id}`)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: company.isActive ? '#f59e0b' : '#4ade80' 
                  }]}
                  onPress={() => toggleCompanyStatus(company.id)}
                >
                  <Text style={styles.actionButtonText}>
                    {company.isActive ? 'Desactivar' : 'Activar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleDeleteCompany(company.id, company.name)}
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
  industryFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  industryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  industryFilterText: { fontSize: 14, fontWeight: '500' },
  companyCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { fontSize: 24 },
  companyInfo: { flex: 1, marginRight: 12 },
  companyName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  companyIndustry: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
  companyStats: { flexDirection: 'row', gap: 12 },
  companyStat: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  companyDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  contactInfo: {
    marginBottom: 16,
    gap: 4,
  },
  contactItem: { fontSize: 12, opacity: 0.7 },
  companyActions: {
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
