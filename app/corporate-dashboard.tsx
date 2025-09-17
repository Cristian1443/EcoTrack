import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import MetricCard from '@/components/dashboard/MetricCard';
import ProgressChart from '@/components/dashboard/ProgressChart';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos simulados del dashboard
const dashboardData = {
  companyInfo: {
    name: 'EcoTech Solutions',
    employees: 150,
    totalXP: 284500,
    level: 'Gold',
    sustainabilityScore: 87,
  },
  metrics: {
    totalEmployees: 150,
    activeEmployees: 142,
    totalXP: 284500,
    completedGoals: 12,
    totalGoals: 18,
    activitiesThisMonth: 89,
    averageXPPerEmployee: 1897,
  },
  topPerformers: [
    { id: 1, name: 'Elena Ramirez', xp: 12500, area: 'Sostenibilidad', avatar: '👩🏻' },
    { id: 2, name: 'Carlos Mendoza', xp: 11200, area: 'Tecnología', avatar: '👨🏽' },
    { id: 3, name: 'Ana García', xp: 10800, area: 'Marketing', avatar: '👩🏻' },
    { id: 4, name: 'Luis Rodriguez', xp: 9500, area: 'Operaciones', avatar: '👨🏽' },
    { id: 5, name: 'María López', xp: 8900, area: 'RRHH', avatar: '👩🏻' },
  ],
  areaPerformance: [
    { area: 'Sostenibilidad', employees: 25, xp: 58000, goals: 5, progress: 92 },
    { area: 'Tecnología', employees: 45, xp: 89500, goals: 6, progress: 78 },
    { area: 'Marketing', employees: 30, xp: 62000, goals: 4, progress: 85 },
    { area: 'Operaciones', employees: 35, xp: 48000, goals: 2, progress: 65 },
    { area: 'RRHH', employees: 15, xp: 27000, goals: 1, progress: 88 },
  ],
  recentActivities: [
    { id: 1, title: 'Ducha corta completada', user: 'Elena R.', xp: 10, time: '2h' },
    { id: 2, title: 'Reciclaje de papel', user: 'Carlos M.', xp: 15, time: '3h' },
    { id: 3, title: 'Uso de bicicleta', user: 'Ana G.', xp: 25, time: '4h' },
    { id: 4, title: 'Ahorro energético', user: 'Luis R.', xp: 20, time: '5h' },
  ],
};

export default function CorporateDashboardScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  const periods = [
    { key: 'semana', label: 'Semana' },
    { key: 'mes', label: 'Mes' },
    { key: 'trimestre', label: 'Trimestre' },
    { key: 'año', label: 'Año' },
  ];

  const quickActions = [
    { 
      title: 'Gestionar Empleados', 
      icon: '👥', 
      route: '/employees', 
      color: '#3b82f6',
      description: `${dashboardData.metrics.totalEmployees} empleados`,
      badge: `${dashboardData.metrics.activeEmployees}`
    },
    { 
      title: 'Ver Actividades', 
      icon: '🌱', 
      route: '/activities', 
      color: '#10b981',
      description: `${dashboardData.metrics.activitiesThisMonth} este mes`,
    },
    { 
      title: 'Revisar Metas', 
      icon: '🎯', 
      route: '/goals', 
      color: '#f59e0b',
      description: `${dashboardData.metrics.completedGoals}/${dashboardData.metrics.totalGoals} completadas`,
    },
    { 
      title: 'Gestionar Áreas', 
      icon: '🏢', 
      route: '/areas', 
      color: '#8b5cf6',
      description: `${dashboardData.areaPerformance.length} áreas`,
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: text }]}>Dashboard Corporativo</Text>
          <Text style={[styles.companyName, { color: text, opacity: 0.7 }]}>
            {dashboardData.companyInfo.name}
          </Text>
        </View>
        <View style={styles.companyLevel}>
          <Text style={[styles.levelBadge, { backgroundColor: '#fbbf24' }]}>
            {dashboardData.companyInfo.level}
          </Text>
        </View>
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 1200 : 800}>
        {/* Filtro de período */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.periodFilters}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.key}
                  style={[
                    styles.periodFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedPeriod === period.key && { backgroundColor: primary, borderColor: primary }
                  ]}
                  onPress={() => setSelectedPeriod(period.key)}
                >
                  <Text style={[
                    styles.periodFilterText,
                    { color: text },
                    selectedPeriod === period.key && { color: 'white' }
                  ]}>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Métricas principales */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Resumen Ejecutivo</ThemedText>
          <View style={styles.metricsGrid}>
            <MetricCard
              icon="👥"
              value={`${dashboardData.metrics.activeEmployees}/${dashboardData.metrics.totalEmployees}`}
              label="Empleados Activos"
              trend={{ value: 5.2, isPositive: true }}
            />
            
            <MetricCard
              icon="🏆"
              value={`${(dashboardData.metrics.totalXP / 1000).toFixed(0)}K`}
              label="XP Total"
              trend={{ value: 12.3, isPositive: true }}
            />
            
            <MetricCard
              icon="🎯"
              value={`${dashboardData.metrics.completedGoals}/${dashboardData.metrics.totalGoals}`}
              label="Metas Completadas"
              trend={{ value: 8.1, isPositive: true }}
            />
            
            <MetricCard
              icon="🌱"
              value={`${dashboardData.metrics.activitiesThisMonth}`}
              label="Actividades este Mes"
              trend={{ value: 15.7, isPositive: true }}
            />
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Acciones Rápidas</ThemedText>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                route={action.route}
                color={action.color}
                description={action.description}
                badge={action.badge}
              />
            ))}
          </View>
        </View>

        {/* Top Performers */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Top Performers</ThemedText>
          <View style={[styles.rankingCard, { backgroundColor: cardBg, borderColor: border }]}>
            {dashboardData.topPerformers.map((performer, index) => (
              <View key={performer.id} style={styles.performerRow}>
                <View style={styles.performerRank}>
                  <Text style={[styles.rankNumber, { color: index < 3 ? '#fbbf24' : text }]}>
                    #{index + 1}
                  </Text>
                </View>
                <View style={styles.performerAvatar}>
                  <Text style={styles.avatarText}>{performer.avatar}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <ThemedText style={styles.performerName}>{performer.name}</ThemedText>
                  <ThemedText style={styles.performerArea}>{performer.area}</ThemedText>
                </View>
                <View style={styles.performerXP}>
                  <ThemedText style={styles.xpValue}>{performer.xp.toLocaleString()}</ThemedText>
                  <ThemedText style={styles.xpLabel}>XP</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Rendimiento por área */}
        <View style={styles.section}>
          <ProgressChart
            title="Rendimiento por Área"
            data={dashboardData.areaPerformance.map(area => ({
              label: area.area,
              value: area.progress,
              maxValue: 100,
              color: getProgressColor(area.progress)
            }))}
          />
        </View>

        {/* Actividades recientes */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Actividad Reciente</ThemedText>
          <View style={[styles.activityCard, { backgroundColor: cardBg, borderColor: border }]}>
            {dashboardData.recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityRow}>
                <View style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <ThemedText style={styles.activityUser}>por {activity.user}</ThemedText>
                </View>
                <View style={styles.activityReward}>
                  <Text style={styles.xpBadge}>+{activity.xp} XP</Text>
                  <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Información de la empresa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información Corporativa</ThemedText>
          <View style={[styles.companyCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.companyRow}>
              <ThemedText style={styles.companyLabel}>Puntuación de Sostenibilidad</ThemedText>
              <View style={styles.scoreContainer}>
                <View style={[styles.scoreBadge, { backgroundColor: '#10b981' }]}>
                  <Text style={styles.scoreText}>{dashboardData.companyInfo.sustainabilityScore}</Text>
                </View>
              </View>
            </View>
            <View style={styles.companyRow}>
              <ThemedText style={styles.companyLabel}>XP Promedio por Empleado</ThemedText>
              <ThemedText style={styles.companyValue}>
                {dashboardData.metrics.averageXPPerEmployee.toLocaleString()} XP
              </ThemedText>
            </View>
            <View style={styles.companyRow}>
              <ThemedText style={styles.companyLabel}>Nivel Corporativo</ThemedText>
              <View style={[styles.levelBadge, { backgroundColor: '#fbbf24' }]}>
                <Text style={styles.levelText}>{dashboardData.companyInfo.level}</Text>
              </View>
            </View>
          </View>
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
  headerContent: { flex: 1, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  companyName: { fontSize: 14, marginTop: 2 },
  companyLevel: { alignItems: 'flex-end' },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: { fontSize: 10, fontWeight: '600', color: 'white' },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  
  // Filtros de período
  periodFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  periodFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  periodFilterText: { fontSize: 14, fontWeight: '500' },
  
  // Métricas
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    ...(Platform.OS === 'web' && {
      justifyContent: 'space-between',
    }),
  },
  
  // Acciones rápidas
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  // Ranking
  rankingCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  performerRank: { width: 40 },
  rankNumber: { fontSize: 16, fontWeight: 'bold' },
  performerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 16 },
  performerInfo: { flex: 1 },
  performerName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  performerArea: { fontSize: 12, opacity: 0.6 },
  performerXP: { alignItems: 'flex-end' },
  xpValue: { fontSize: 14, fontWeight: 'bold' },
  xpLabel: { fontSize: 10, opacity: 0.6 },
  
  
  // Actividades recientes
  activityCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  activityUser: { fontSize: 12, opacity: 0.6 },
  activityReward: { alignItems: 'flex-end' },
  xpBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    backgroundColor: '#10b98120',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 2,
  },
  activityTime: { fontSize: 10, opacity: 0.6 },
  
  // Información de la empresa
  companyCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  companyLabel: { fontSize: 14, fontWeight: '500' },
  companyValue: { fontSize: 14, fontWeight: '600' },
  scoreContainer: { alignItems: 'flex-end' },
  scoreBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: { fontSize: 14, fontWeight: 'bold', color: 'white' },
});
