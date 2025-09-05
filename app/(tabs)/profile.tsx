import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const achievements = [
  { id: 1, title: 'Primeros pasos', description: 'Completó tu primera lección', icon: '👶' },
  { id: 2, title: 'Eco-explorador', description: 'Explora 5 lugares', icon: '🌱' },
  { id: 3, title: 'Guardián del bosque', description: 'Planta 10 árboles', icon: '🌳' },
  { id: 4, title: 'Reciclador estrella', description: 'Recicla 20 artículos', icon: '♻️' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(false);
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <View style={styles.header}>
        <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Perfil</Text>
        <Link href="/settings" asChild>
          <TouchableOpacity>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Perfil del usuario */}
        <View style={[styles.profileCard, { backgroundColor: cardBg, borderColor: border }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩🏻</Text>
          </View>
          <ThemedText style={styles.userName}>{user?.name || 'Usuario'}</ThemedText>
          <ThemedText style={styles.userLocation}>Colombia</ThemedText>
          <ThemedText style={styles.userXP}>{user?.xp?.toLocaleString() || '0'} XP</ThemedText>
        </View>

        {/* Logros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Logros</ThemedText>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id}
                style={[styles.achievementCard, { backgroundColor: cardBg, borderColor: border }]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <ThemedText style={styles.achievementTitle}>{achievement.title}</ThemedText>
                <ThemedText style={styles.achievementDesc}>{achievement.description}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Ajustes */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ajustes</ThemedText>
          
          <TouchableOpacity 
            style={[
              styles.settingCard, 
              { backgroundColor: cardBg, borderColor: border },
              Platform.OS === 'web' && styles.webHover
            ]}
            onPress={toggleTheme}
          >
            <ThemedText style={styles.settingTitle}>Modo oscuro</ThemedText>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: border, true: primary }}
              thumbColor={isDark ? '#ffffff' : background}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.settingCard, 
              { backgroundColor: cardBg, borderColor: border },
              Platform.OS === 'web' && styles.webHover
            ]}
          >
            <ThemedText style={styles.settingTitle}>Notificaciones</ThemedText>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: border, true: primary }}
              thumbColor={notifications ? '#ffffff' : background}
            />
          </TouchableOpacity>

          <Button
            label="Cerrar Sesión"
            onPress={handleLogout}
            variant="secondary"
            style={[styles.logoutButton, Platform.OS === 'web' && styles.webButton]}
          />
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingsIcon: {
    fontSize: 20,
  },
  profileCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      maxWidth: 400,
      alignSelf: 'center',
    }),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  userXP: {
    fontSize: 16,
    color: '#6b7280',
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
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'space-between',
    }),
  },
  achievementCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      minWidth: 180,
      maxWidth: 220,
      flex: 1,
    }),
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  webHover: Platform.OS === 'web' ? {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } : {},
  webButton: Platform.OS === 'web' ? {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } : {},
});


