import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ['Agua', 'Energía', 'Transporte', 'Residuos', 'Educación', 'Bienestar'];
const priorities = ['Alta', 'Media', 'Baja'];
const areas = ['Recursos Humanos', 'Tecnología', 'Marketing', 'Finanzas', 'Operaciones', 'Sostenibilidad'];
const goalIcons = ['🎯', '💧', '⚡', '🚲', '♻️', '🌱', '📚', '💪', '🏆', '📊'];

export default function GoalFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetValue: '',
    unit: '',
    deadline: '',
    priority: 'Media' as 'Alta' | 'Media' | 'Baja',
    assignedTo: '',
    icon: '🎯',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: 'Reducir consumo de agua',
        description: 'Disminuir el consumo de agua en la oficina en un 20%',
        category: 'Agua',
        targetValue: '20',
        unit: '%',
        deadline: '2024-06-30',
        priority: 'Alta',
        assignedTo: 'Área de Operaciones',
        icon: '💧',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.targetValue || !formData.assignedTo) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Meta guardada',
      `La meta "${formData.title}" ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return '#ef4444';
      case 'Media': return '#f59e0b';
      case 'Baja': return '#4ade80';
      default: return '#6b7280';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>
          {isEditing ? 'Editar Meta' : 'Nueva Meta'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la meta *</ThemedText>
            <Input
              placeholder="Ej: Reducir consumo de agua"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe el objetivo a alcanzar..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Categoría</ThemedText>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.category === category && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('category', category)}
                >
                  <ThemedText style={styles.categoryOptionText}>{category}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Objetivo y medición */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Objetivo y medición</ThemedText>
          
          <View style={styles.targetRow}>
            <View style={styles.targetInput}>
              <ThemedText style={styles.inputLabel}>Valor objetivo *</ThemedText>
              <Input
                placeholder="20"
                value={formData.targetValue}
                onChangeText={(value) => updateFormData('targetValue', value)}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.unitInput}>
              <ThemedText style={styles.inputLabel}>Unidad</ThemedText>
              <Input
                placeholder="%, kg, puntos"
                value={formData.unit}
                onChangeText={(value) => updateFormData('unit', value)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Fecha límite</ThemedText>
            <Input
              placeholder="2024-12-31"
              value={formData.deadline}
              onChangeText={(value) => updateFormData('deadline', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Prioridad</ThemedText>
            <View style={styles.prioritiesRow}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    { 
                      backgroundColor: formData.priority === priority 
                        ? getPriorityColor(priority) 
                        : cardBg,
                      borderColor: border
                    }
                  ]}
                  onPress={() => updateFormData('priority', priority)}
                >
                  <Text style={[
                    styles.priorityText,
                    { 
                      color: formData.priority === priority ? 'white' : text 
                    }
                  ]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Asignado a *</ThemedText>
            <View style={styles.areasGrid}>
              {areas.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.areaOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.assignedTo === area && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('assignedTo', area)}
                >
                  <ThemedText style={styles.areaOptionText}>{area}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Icono</ThemedText>
            <View style={styles.iconsGrid}>
              {goalIcons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    { backgroundColor: cardBg, borderColor: border },
                    formData.icon === icon && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => updateFormData('icon', icon)}
                >
                  <Text style={styles.iconText}>{icon}</Text>
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
              <View style={styles.previewIcon}>
                <Text style={styles.previewIconText}>{formData.icon}</Text>
              </View>
              <View style={styles.previewInfo}>
                <ThemedText style={styles.previewTitle}>
                  {formData.title || 'Título de la meta'}
                </ThemedText>
                <ThemedText style={styles.previewAssigned}>
                  {formData.assignedTo || 'Área asignada'}
                </ThemedText>
                <View style={styles.previewMeta}>
                  <Text style={[
                    styles.previewPriority,
                    { backgroundColor: getPriorityColor(formData.priority) }
                  ]}>
                    {formData.priority}
                  </Text>
                  <ThemedText style={styles.previewTarget}>
                    Meta: {formData.targetValue || '0'} {formData.unit || 'unidad'}
                  </ThemedText>
                </View>
              </View>
            </View>
            <ThemedText style={styles.previewDescription}>
              {formData.description || 'Descripción de la meta...'}
            </ThemedText>
            {formData.deadline && (
              <ThemedText style={styles.previewDeadline}>
                📅 Fecha límite: {new Date(formData.deadline).toLocaleDateString('es-ES')}
              </ThemedText>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          label={isEditing ? 'Actualizar meta' : 'Crear meta'}
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
  targetRow: { flexDirection: 'row', gap: 12 },
  targetInput: { flex: 2 },
  unitInput: { flex: 1 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  categoryOptionText: { fontSize: 14, fontWeight: '500' },
  prioritiesRow: { flexDirection: 'row', gap: 12 },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityText: { fontSize: 14, fontWeight: '600' },
  areasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  areaOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '48%',
    alignItems: 'center',
  },
  areaOptionText: { fontSize: 14, fontWeight: '500' },
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
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewIconText: { fontSize: 20 },
  previewInfo: { flex: 1 },
  previewTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  previewAssigned: { fontSize: 14, marginBottom: 6, opacity: 0.8 },
  previewMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewPriority: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  previewTarget: { fontSize: 12, opacity: 0.7 },
  previewDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  previewDeadline: { fontSize: 12, opacity: 0.6 },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});
