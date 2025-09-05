import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const availableAreas = [
  { 
    id: 1, 
    name: 'Recursos Humanos', 
    company: 'EcoTech Solutions',
    members: 12, 
    avatar: '👥',
    description: 'Gestión de talento y bienestar laboral con enfoque sostenible',
    lead: 'María González'
  },
  { 
    id: 2, 
    name: 'Tecnología Verde', 
    company: 'Green Innovations',
    members: 8, 
    avatar: '💻',
    description: 'Desarrollo de soluciones tecnológicas eco-amigables',
    lead: 'Carlos Ruiz'
  },
  { 
    id: 3, 
    name: 'Marketing Sostenible', 
    company: 'EcoTech Solutions',
    members: 15, 
    avatar: '📈',
    description: 'Promoción de productos y servicios con impacto ambiental positivo',
    lead: 'Ana Morales'
  },
  { 
    id: 4, 
    name: 'Finanzas Verdes', 
    company: 'Sustainable Corp',
    members: 6, 
    avatar: '💰',
    description: 'Gestión financiera con criterios ESG y sostenibilidad',
    lead: 'Roberto Silva'
  },
];

export default function JoinAreaScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  const handleJoinArea = (areaName: string, company: string) => {
    Alert.alert(
      'Solicitud enviada',
      `Se ha enviado tu solicitud para unirse al área de ${areaName} en ${company}`,
      [{ text: 'OK' }]
    );
  };

  const filteredAreas = availableAreas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         area.company.toLowerCase().includes(searchText.toLowerCase());
    const matchesCompany = !selectedCompany || area.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const companies = [...new Set(availableAreas.map(area => area.company))];

  return (
    <ThemedView style={styles.container}>
      <WebContainer scrollable maxWidth={isTablet ? 1000 : 800}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backIcon, { color: text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: text }]}>Unirse a Área</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Búsqueda */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Buscar área</ThemedText>
          <Input
            placeholder="Buscar por área o empresa..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        {/* Filtro por empresa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtrar por empresa</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.companyFilters}>
              <TouchableOpacity
                style={[
                  styles.companyFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedCompany && { backgroundColor: primary, borderColor: primary }
                ]}
                onPress={() => setSelectedCompany('')}
              >
                <Text style={[
                  styles.companyFilterText,
                  { color: text },
                  !selectedCompany && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>
              
              {companies.map((company) => (
                <TouchableOpacity
                  key={company}
                  style={[
                    styles.companyFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedCompany === company && { backgroundColor: primary, borderColor: primary }
                  ]}
                  onPress={() => setSelectedCompany(selectedCompany === company ? '' : company)}
                >
                  <Text style={[
                    styles.companyFilterText,
                    { color: text },
                    selectedCompany === company && { color: 'white' }
                  ]}>
                    {company}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Áreas disponibles */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Áreas disponibles ({filteredAreas.length})
          </ThemedText>
          
          {filteredAreas.map((area) => (
            <View 
              key={area.id}
              style={[styles.areaCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.areaHeader}>
                <View style={styles.areaIcon}>
                  <Text style={styles.iconText}>{area.avatar}</Text>
                </View>
                <View style={styles.areaInfo}>
                  <ThemedText style={styles.areaName}>{area.name}</ThemedText>
                  <ThemedText style={styles.companyName}>{area.company}</ThemedText>
                  <ThemedText style={styles.areaStats}>
                    {area.members} miembros • Líder: {area.lead}
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.areaDescription}>
                {area.description}
              </ThemedText>
              
              <View style={styles.areaActions}>
                <Button
                  label="Solicitar unirse"
                  onPress={() => handleJoinArea(area.name, area.company)}
                  style={styles.joinButton}
                />
                <TouchableOpacity style={styles.infoButton}>
                  <Text style={[styles.infoButtonText, { color: text }]}>Más info</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredAreas.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: cardBg, borderColor: border }]}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <ThemedText style={styles.emptyTitle}>No se encontraron áreas</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                Intenta con otros términos de búsqueda o revisa los filtros
              </ThemedText>
            </View>
          )}
        </View>

        {/* Solicitar nueva área */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>¿No encuentras tu área?</ThemedText>
          <View style={[styles.requestCard, { backgroundColor: cardBg, borderColor: border }]}>
            <ThemedText style={styles.requestTitle}>Solicitar nueva área</ThemedText>
            <ThemedText style={styles.requestDescription}>
              Si no encuentras el área donde trabajas, puedes solicitar que se cree una nueva
            </ThemedText>
            <Button
              label="Solicitar nueva área"
              variant="secondary"
              onPress={() => {
                Alert.alert(
                  'Solicitud enviada',
                  'Hemos recibido tu solicitud. Te contactaremos pronto para crear el área.'
                );
              }}
              style={styles.requestButton}
            />
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
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
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      maxWidth: 1000,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 12,
  },
  companyFilters: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 24,
  },
  companyFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  companyFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  areaCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
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
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
    marginBottom: 4,
  },
  areaStats: {
    fontSize: 14,
    opacity: 0.6,
  },
  areaDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  areaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  joinButton: {
    flex: 1,
  },
  infoButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
  requestCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  requestDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 16,
  },
  requestButton: {
    width: '100%',
  },
});

