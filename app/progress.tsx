import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const modules = [
  {
    id: 1,
    title: 'Introducción a la sostenibilidad',
    progress: 75,
    icon: '🌱',
  },
  {
    id: 2,
    title: 'Energía renovable',
    progress: 50,
    icon: '☀️',
  },
  {
    id: 3,
    title: 'Conservación del agua',
    progress: 25,
    icon: '💧',
  },
  {
    id: 4,
    title: 'Reducción de residuos',
    progress: 0,
    icon: '♻️',
  },
];

export default function ProgressScreen() {
  const router = useRouter();
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: useThemeColor({}, 'text') }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Progreso</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progreso total */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Progreso total</ThemedText>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
          <ThemedText style={styles.progressText}>60%</ThemedText>
        </View>

        {/* Módulos */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Módulos</ThemedText>
          
          {modules.map((module) => (
            <View 
              key={module.id}
              style={[styles.moduleCard, { backgroundColor: cardBg, borderColor: border }]}
            >
              <View style={styles.moduleIcon}>
                <Text style={styles.iconText}>{module.icon}</Text>
              </View>
              <View style={styles.moduleInfo}>
                <ThemedText style={styles.moduleTitle}>{module.title}</ThemedText>
                <ThemedText style={styles.moduleProgress}>{module.progress}% completado</ThemedText>
                <View style={styles.moduleProgressBar}>
                  <View style={[styles.moduleProgressFill, { width: `${module.progress}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Estadísticas</ThemedText>
          
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
              <ThemedText style={styles.statLabel}>Lecciones completadas</ThemedText>
              <ThemedText style={styles.statValue}>15/25</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: border }]}>
              <ThemedText style={styles.statLabel}>Insignias</ThemedText>
              <ThemedText style={styles.statValue}>7</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 60,
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
    color: '#1f2937',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  moduleProgress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  moduleProgressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  moduleProgressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});
