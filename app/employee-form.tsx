import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const areas = ['Recursos Humanos', 'Tecnología', 'Marketing', 'Finanzas', 'Operaciones'];
const avatars = ['👨🏻', '👩🏻', '👨🏽', '👩🏽', '👨🏿', '👩🏿', '🧑‍💼', '👩‍💼'];

export default function EmployeeFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    area: '',
    avatar: '👨🏻',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  useEffect(() => {
    if (isEditing) {
      // En una app real, aquí cargarías los datos del empleado desde la API
      setFormData({
        name: 'Elena Ramirez',
        email: 'elena.ramirez@ecotech.com',
        position: 'Gerente de Sostenibilidad',
        area: 'Recursos Humanos',
        avatar: '👩🏻',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.position || !formData.area) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizado' : 'creado';
    Alert.alert(
      'Empleado guardado',
      `El empleado ${formData.name} ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>
          {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        {/* Avatar */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Avatar</ThemedText>
          <View style={styles.avatarsGrid}>
            {avatars.map((avatar) => (
              <TouchableOpacity
                key={avatar}
                style={[
                  styles.avatarOption,
                  { backgroundColor: cardBg, borderColor: border },
                  formData.avatar === avatar && { borderColor: '#4ade80', borderWidth: 2 }
                ]}
                onPress={() => updateFormData('avatar', avatar)}
              >
                <Text style={styles.avatarText}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información personal</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nombre completo *</ThemedText>
            <Input
              placeholder="Ej: Elena Ramirez"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email corporativo *</ThemedText>
            <Input
              placeholder="empleado@empresa.com"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>
        </View>

        {/* Información laboral */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información laboral</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Posición/Cargo *</ThemedText>
            <Input
              placeholder="Ej: Gerente de Sostenibilidad"
              value={formData.position}
              onChangeText={(value) => updateFormData('position', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Área *</ThemedText>
            <View style={styles.areasGrid}>
              {areas.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.areaOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.area === area && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('area', area)}
                >
                  <ThemedText style={styles.areaOptionText}>{area}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Vista previa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vista previa</ThemedText>
          <View style={[styles.previewCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.previewHeader}>
              <View style={styles.previewAvatar}>
                <Text style={styles.previewAvatarText}>{formData.avatar}</Text>
              </View>
              <View style={styles.previewInfo}>
                <ThemedText style={styles.previewName}>
                  {formData.name || 'Nombre del empleado'}
                </ThemedText>
                <ThemedText style={styles.previewPosition}>
                  {formData.position || 'Posición'}
                </ThemedText>
                <ThemedText style={styles.previewArea}>
                  {formData.area || 'Área'}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.previewEmail}>
              {formData.email || 'email@empresa.com'}
            </ThemedText>
          </View>
        </View>
        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label={isEditing ? 'Actualizar empleado' : 'Crear empleado'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
          <Button
            label="Cancelar"
            variant="secondary"
            onPress={() => router.back()}
            style={styles.cancelButton}
          />
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
  content: { flex: 1 },
  section: { 
    paddingHorizontal: 24, 
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      paddingHorizontal: 0,
    }),
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  avatarsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { marginBottom: 4 },
  areasGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  areaOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '48%',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      minWidth: 150,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  areaOptionText: { fontSize: 14, fontWeight: '500' },
  previewCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewAvatarText: { fontSize: 20 },
  previewInfo: { flex: 1 },
  previewName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  previewPosition: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  previewArea: { fontSize: 12, opacity: 0.7 },
  previewEmail: { fontSize: 14, opacity: 0.8 },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
    ...(Platform.OS === 'web' && {
      paddingHorizontal: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      maxWidth: 400,
      alignSelf: 'center',
    }),
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});





