import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const todayActivities = [
  { id: 1, title: 'Ducha corta', duration: '10 min', icon: '💧' },
  { id: 2, title: 'Bicicleta al trabajo', duration: '15 min', icon: '🚲' },
  { id: 3, title: 'Reciclaje de papel', duration: '10 kg', icon: '♻️' },
];

const yesterdayActivities = [
  { id: 4, title: 'Bicicleta al trabajo', duration: '15 min', icon: '🚲' },
  { id: 5, title: 'Reciclaje de papel', duration: '10 kg', icon: '♻️' },
];

export default function DiaryScreen() {
  const router = useRouter();
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  return (
    <ThemedView style={styles.container} useSafeArea>
      <View style={[styles.header, isWeb && isTablet && styles.webHeader]}>
        <View style={{ width: 24 }} />
        <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Diario</Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 900 : 600}>
        {/* Hoy */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Hoy</ThemedText>
          
          {todayActivities.map((activity) => (
            <View 
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={[styles.activityIcon, { backgroundColor: background }]}>
                <Text style={styles.iconText}>{activity.icon}</Text>
              </View>
              <View style={styles.activityInfo}>
                <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                <ThemedText style={styles.activityDuration}>{activity.duration}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Ayer */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ayer</ThemedText>
          
          {yesterdayActivities.map((activity) => (
            <View 
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={[styles.activityIcon, { backgroundColor: background }]}>
                <Text style={styles.iconText}>{activity.icon}</Text>
              </View>
              <View style={styles.activityInfo}>
                <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                <ThemedText style={styles.activityDuration}>{activity.duration}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Botón para añadir actividad */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: primary }, isWeb && styles.webButton]}
          onPress={() => router.push('/add-activity')}
        >
          <Text style={styles.addIcon}>+</Text>
          <Text style={styles.addText}>Añadir Actividad</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityDuration: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 100,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  webHeader: Platform.OS === 'web' ? {
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  } : {},
  webButton: Platform.OS === 'web' ? {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } : {},
});


