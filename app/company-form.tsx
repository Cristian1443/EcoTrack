import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const companyAvatars = ['🌱', '♻️', '🌍', '⚡', '💧', '🏭', '🌿', '🔋'];
const industries = ['Tecnología', 'Manufactura', 'Consultoría', 'Energía', 'Agricultura', 'Salud', 'Educación', 'Finanzas'];

export default function CompanyFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    employees: '',
    website: '',
    email: '',
    phone: '',
    avatar: '🌱',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 768;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: 'EcoTech Solutions',
        description: 'Empresa líder en tecnologías sostenibles y soluciones ambientales',
        industry: 'Tecnología',
        employees: '150',
        website: 'https://ecotech.com',
        email: 'contacto@ecotech.com',
        phone: '+57 300 123 4567',
        avatar: '🌱',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.industry || !formData.employees) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Empresa guardada',
      `La empresa ${formData.name} ha sido ${action} exitosamente`,
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
          {isEditing ? 'Editar Empresa' : 'Nueva Empresa'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        {/* Avatar */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Logo/Avatar</ThemedText>
          <View style={styles.avatarsGrid}>
            {companyAvatars.map((avatar) => (
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

        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nombre de la empresa *</ThemedText>
            <Input
              placeholder="Ej: EcoTech Solutions"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe qué hace tu empresa..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={4}
              style={[styles.input, { height: 100 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Industria *</ThemedText>
            <View style={styles.industriesGrid}>
              {industries.map((industry) => (
                <TouchableOpacity
                  key={industry}
                  style={[
                    styles.industryOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.industry === industry && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('industry', industry)}
                >
                  <ThemedText style={styles.industryOptionText}>{industry}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Número de empleados *</ThemedText>
            <Input
              placeholder="150"
              value={formData.employees}
              onChangeText={(value) => updateFormData('employees', value)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        {/* Información de contacto */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información de contacto</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Sitio web</ThemedText>
            <Input
              placeholder="https://www.empresa.com"
              value={formData.website}
              onChangeText={(value) => updateFormData('website', value)}
              keyboardType="url"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <Input
              placeholder="contacto@empresa.com"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Teléfono</ThemedText>
            <Input
              placeholder="+57 300 123 4567"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        </View>
        {/* Botones */}
        <View style={styles.buttonsContainer}>
        <Button
          label={isEditing ? 'Actualizar empresa' : 'Crear empresa'}
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
  avatarText: { fontSize: 28 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { marginBottom: 4 },
  industriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  industryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '31%',
    alignItems: 'center',
  },
  industryOptionText: { fontSize: 14, fontWeight: '500' },
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
