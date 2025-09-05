import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const companyTypes = [
  { id: 'startup', name: 'Startup', icon: '🚀' },
  { id: 'pyme', name: 'PYME', icon: '🏢' },
  { id: 'corporation', name: 'Corporación', icon: '🏭' },
  { id: 'nonprofit', name: 'ONG/Sin ánimo de lucro', icon: '🤝' },
];

const industries = [
  { id: 'tech', name: 'Tecnología', icon: '💻' },
  { id: 'finance', name: 'Finanzas', icon: '💰' },
  { id: 'health', name: 'Salud', icon: '🏥' },
  { id: 'education', name: 'Educación', icon: '🎓' },
  { id: 'retail', name: 'Retail', icon: '🛍️' },
  { id: 'manufacturing', name: 'Manufactura', icon: '🏭' },
  { id: 'energy', name: 'Energía', icon: '⚡' },
  { id: 'agriculture', name: 'Agricultura', icon: '🌾' },
];

export default function RegisterCompanyScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    website: '',
    employees: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [step, setStep] = useState(1);
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const handleSubmit = () => {
    if (!formData.companyName || !selectedType || !selectedIndustry) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    Alert.alert(
      'Empresa registrada',
      `¡${formData.companyName} ha sido registrada exitosamente! Recibirás un correo con los próximos pasos.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.companyName && selectedType && selectedIndustry;
  const isStep2Valid = formData.description && formData.employees;

  return (
    <ThemedView style={styles.container}>
      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backIcon, { color: text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: text }]}>Registrar Empresa</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Indicador de progreso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>Paso {step} de 3</ThemedText>
        </View>
        {/* Paso 1: Información básica */}
        {step === 1 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
            
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Nombre de la empresa *</ThemedText>
              <Input
                placeholder="Ej: EcoTech Solutions"
                value={formData.companyName}
                onChangeText={(value) => updateFormData('companyName', value)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Tipo de empresa *</ThemedText>
              <View style={styles.optionsGrid}>
                {companyTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.optionCard,
                      { backgroundColor: cardBg, borderColor: border },
                      selectedType === type.id && { borderColor: '#4ade80', borderWidth: 2 }
                    ]}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <Text style={styles.optionIcon}>{type.icon}</Text>
                    <ThemedText style={styles.optionText}>{type.name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Industria *</ThemedText>
              <View style={styles.optionsGrid}>
                {industries.map((industry) => (
                  <TouchableOpacity
                    key={industry.id}
                    style={[
                      styles.optionCard,
                      { backgroundColor: cardBg, borderColor: border },
                      selectedIndustry === industry.id && { borderColor: '#4ade80', borderWidth: 2 }
                    ]}
                    onPress={() => setSelectedIndustry(industry.id)}
                  >
                    <Text style={styles.optionIcon}>{industry.icon}</Text>
                    <ThemedText style={styles.optionText}>{industry.name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Paso 2: Detalles de la empresa */}
        {step === 2 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Detalles de la empresa</ThemedText>
            
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
              <ThemedText style={styles.inputLabel}>Número de empleados *</ThemedText>
              <Input
                placeholder="Ej: 50"
                value={formData.employees}
                onChangeText={(value) => updateFormData('employees', value)}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Sitio web</ThemedText>
              <Input
                placeholder="https://www.tuempresa.com"
                value={formData.website}
                onChangeText={(value) => updateFormData('website', value)}
                keyboardType="url"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>
        )}

        {/* Paso 3: Información de contacto */}
        {step === 3 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Información de contacto</ThemedText>
            
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Email de contacto</ThemedText>
              <Input
                placeholder="contacto@tuempresa.com"
                value={formData.contactEmail}
                onChangeText={(value) => updateFormData('contactEmail', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Teléfono</ThemedText>
              <Input
                placeholder="+57 300 123 4567"
                value={formData.contactPhone}
                onChangeText={(value) => updateFormData('contactPhone', value)}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>

            {/* Resumen */}
            <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: border }]}>
              <ThemedText style={styles.summaryTitle}>Resumen</ThemedText>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Empresa:</ThemedText>
                <ThemedText style={styles.summaryValue}>{formData.companyName}</ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Tipo:</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {companyTypes.find(t => t.id === selectedType)?.name}
                </ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Industria:</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {industries.find(i => i.id === selectedIndustry)?.name}
                </ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <ThemedText style={styles.summaryLabel}>Empleados:</ThemedText>
                <ThemedText style={styles.summaryValue}>{formData.employees}</ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Botones de navegación */}
        <View style={styles.buttonsContainer}>
        {step < 3 ? (
          <View style={styles.navigationButtons}>
            {step > 1 && (
              <Button
                label="Anterior"
                variant="secondary"
                onPress={() => setStep(step - 1)}
                style={styles.navButton}
              />
            )}
            <Button
              label="Siguiente"
              onPress={() => setStep(step + 1)}
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid)
              }
              style={[styles.navButton, step === 1 ? { flex: 1 } : {}]}
            />
          </View>
        ) : (
          <View style={styles.navigationButtons}>
            <Button
              label="Anterior"
              variant="secondary"
              onPress={() => setStep(step - 1)}
              style={styles.navButton}
            />
            <Button
              label="Registrar empresa"
              onPress={handleSubmit}
              style={styles.navButton}
            />
          </View>
        )}
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
    paddingBottom: 16,
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    marginBottom: 4,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
});

