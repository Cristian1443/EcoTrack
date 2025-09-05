import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const areaData = [
  { id: 1, name: 'Recursos Humanos', xp: 8500, avatar: '👥', members: 12 },
  { id: 2, name: 'Tecnología', xp: 7800, avatar: '💻', members: 8 },
  { id: 3, name: 'Marketing', xp: 7200, avatar: '📈', members: 15 },
  { id: 4, name: 'Finanzas', xp: 6900, avatar: '💰', members: 6 },
  { id: 5, name: 'Operaciones', xp: 6500, avatar: '⚙️', members: 20 },
];

const empresasData = [
  { id: 1, name: 'EcoTech Solutions', xp: 25000, avatar: '🌱', employees: 150 },
  { id: 2, name: 'Green Innovations', xp: 23500, avatar: '♻️', employees: 120 },
  { id: 3, name: 'Sustainable Corp', xp: 19800, avatar: '🌍', employees: 200 },
  { id: 4, name: 'CleanEnergy Inc', xp: 18200, avatar: '⚡', employees: 85 },
];

export default function RankingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('area');
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;
  
  const currentData = activeTab === 'area' ? areaData : empresasData;

  return (
    <ThemedView style={styles.container} useSafeArea>
      <View style={[styles.header, isWeb && isTablet && styles.webHeader]}>
        <View style={{ width: 24 }} />
        <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Ranking</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.tabs, isWeb && isTablet && styles.webTabs]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'area' && styles.activeTab, isWeb && styles.webTab]}
          onPress={() => setActiveTab('area')}
        >
          <Text style={[styles.tabText, activeTab === 'area' && styles.activeTabText]}>
            Área
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'empresas' && styles.activeTab, isWeb && styles.webTab]}
          onPress={() => setActiveTab('empresas')}
        >
          <Text style={[styles.tabText, activeTab === 'empresas' && styles.activeTabText]}>
            Empresas
          </Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        {currentData.map((item, index) => (
          <View 
            key={item.id}
            style={[styles.userCard, { backgroundColor: cardBg, borderColor: border }]}
          >
            <View style={styles.position}>
              <Text style={[styles.positionText, { color: useThemeColor({}, 'text') }]}>#{index + 1}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>{item.name}</ThemedText>
              <ThemedText style={styles.userXP}>{item.xp.toLocaleString()} XP</ThemedText>
              <ThemedText style={styles.userMeta}>
                {activeTab === 'area' 
                  ? `${(item as any).members} miembros`
                  : `${(item as any).employees} empleados`
                }
              </ThemedText>
            </View>
          </View>
        ))}
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4ade80',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#4ade80',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  position: {
    width: 32,
    marginRight: 12,
  },
  positionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userXP: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.8,
  },
  userMeta: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.6,
  },
  webHeader: Platform.OS === 'web' ? {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  } : {},
  webTabs: Platform.OS === 'web' ? {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  } : {},
  webTab: Platform.OS === 'web' ? {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } : {},
});


