import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [notifications, setNotifications] = useState(false);
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  const handleLogout = () => {
    console.log('handleLogout called'); // Debug log
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            console.log('Logout confirmed'); // Debug log
            try {
              await logout();
              console.log('Logout completed'); // Debug log
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.');
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, isWeb && isTablet && styles.webHeader]}>
        <TouchableOpacity onPress={() => router.back()} style={[isWeb && styles.webButton]}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Configuración</Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        {/* Notificaciones */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notificaciones</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Recibe recordatorios para tus actividades y actualizaciones importantes.
          </ThemedText>
          
          <View style={[styles.settingCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingTitle}>Notificaciones push</ThemedText>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: border, true: primary }}
                thumbColor={notifications ? '#ffffff' : background}
              />
            </View>
          </View>
        </View>

        {/* Modo Oscuro */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Modo Oscuro</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Cambia la apariencia de la aplicación para una mejor experiencia visual.
          </ThemedText>
          
          <View style={[styles.settingCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingTitle}>Tema oscuro</ThemedText>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: border, true: primary }}
                thumbColor={isDark ? '#ffffff' : background}
              />
            </View>
          </View>
        </View>

        {/* Gestión Empresarial */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Gestión Empresarial</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Administra todos los aspectos de tu empresa y sostenibilidad.
          </ThemedText>
          
          <View style={styles.crudGrid}>
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/employees')}
            >
              <Text style={styles.crudIcon}>👥</Text>
              <ThemedText style={styles.crudTitle}>Empleados</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/areas')}
            >
              <Text style={styles.crudIcon}>🏢</Text>
              <ThemedText style={styles.crudTitle}>Áreas</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/companies')}
            >
              <Text style={styles.crudIcon}>🏭</Text>
              <ThemedText style={styles.crudTitle}>Empresas</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/activities')}
            >
              <Text style={styles.crudIcon}>🌱</Text>
              <ThemedText style={styles.crudTitle}>Actividades</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/lessons-crud')}
            >
              <Text style={styles.crudIcon}>📚</Text>
              <ThemedText style={styles.crudTitle}>Lecciones</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.crudCard, { backgroundColor: cardBg, borderColor: border }]}
              onPress={() => router.push('/goals')}
            >
              <Text style={styles.crudIcon}>🎯</Text>
              <ThemedText style={styles.crudTitle}>Metas</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cerrar Sesión */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutCard, { backgroundColor: cardBg, borderColor: border }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.logoutText, { color: '#dc2626' }]}>Cerrar Sesión</ThemedText>
            <Text style={[styles.logoutIcon, { color: '#dc2626' }]}>→</Text>
          </TouchableOpacity>
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  settingCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      // transition handled by CSS
    }),
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      // transition handled by CSS
    }),
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutIcon: {
    fontSize: 16,
  },
  crudGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  crudCard: {
    width: '48%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      minWidth: 160,
      maxWidth: 220,
      flex: 1,
      cursor: 'pointer' as any,
      // transition handled by CSS
    }),
  },
  crudIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  crudTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  webHeader: Platform.OS === 'web' ? {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  } : {},
  webButton: Platform.OS === 'web' ? {
    cursor: 'pointer' as any,
  } : {},
});
