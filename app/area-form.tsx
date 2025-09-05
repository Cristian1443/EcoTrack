import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const areaIcons = ['👥', '💻', '📈', '💰', '⚙️', '🎯', '📊', '🔬', '🏭', '🌱'];
const areaColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

export default function AreaFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leader: '',
    budget: '',
    icon: '👥',
    color: '#3b82f6',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: 'Recursos Humanos',
        description: 'Gestión de talento y bienestar laboral con enfoque sostenible',
        leader: 'María González',
        budget: '50000',
        icon: '👥',
        color: '#3b82f6',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.leader || !formData.budget) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Área guardada',
      `El área ${formData.name} ha sido ${action} exitosamente`,
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
          {isEditing ? 'Editar Área' : 'Nueva Área'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nombre del área *</ThemedText>
            <Input
              placeholder="Ej: Recursos Humanos"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe las funciones del área..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Líder del área *</ThemedText>
            <Input
              placeholder="Nombre del líder"
              value={formData.leader}
              onChangeText={(value) => updateFormData('leader', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Presupuesto anual (USD) *</ThemedText>
            <Input
              placeholder="50000"
              value={formData.budget}
              onChangeText={(value) => updateFormData('budget', value)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        {/* Personalización */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Personalización</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Icono</ThemedText>
            <View style={styles.iconsGrid}>
              {areaIcons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.icon === icon && { borderColor: formData.color, borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('icon', icon)}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Color</ThemedText>
            <View style={styles.colorsGrid}>
              {areaColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    formData.color === color && styles.selectedColor
                  ]}
                  onPress={() => updateFormData('color', color)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Vista previa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vista previa</ThemedText>
          <View style={[styles.previewCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.previewHeader}>
              <View style={[styles.previewIcon, { backgroundColor: `${formData.color}20` }]}>
                <Text style={styles.previewIconText}>{formData.icon}</Text>
              </View>
              <View style={styles.previewInfo}>
                <ThemedText style={styles.previewName}>
                  {formData.name || 'Nombre del área'}
                </ThemedText>
                <ThemedText style={styles.previewLeader}>
                  Líder: {formData.leader || 'Nombre del líder'}
                </ThemedText>
                <ThemedText style={styles.previewBudget}>
                  Presupuesto: ${formData.budget ? parseInt(formData.budget).toLocaleString() : '0'}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.previewDescription}>
              {formData.description || 'Descripción del área...'}
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          label={isEditing ? 'Actualizar área' : 'Crear área'}
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
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { marginBottom: 4 },
  iconsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 20 },
  colorsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: { borderColor: '#ffffff', borderWidth: 3 },
  previewCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  previewIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewIconText: { fontSize: 20 },
  previewInfo: { flex: 1 },
  previewName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  previewLeader: { fontSize: 14, marginBottom: 2 },
  previewBudget: { fontSize: 14, opacity: 0.8 },
  previewDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});

