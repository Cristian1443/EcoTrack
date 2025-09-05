import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ['Agua', 'Energía', 'Transporte', 'Residuos', 'Alimentación', 'Consumo'];
const difficulties = ['Fácil', 'Intermedio', 'Avanzado'];
const activityIcons = ['💧', '⚡', '🚲', '♻️', '🌱', '🛒', '🌍', '📱', '💡', '🏠'];

export default function ActivityFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    xpReward: '',
    duration: '',
    difficulty: 'Fácil' as 'Fácil' | 'Intermedio' | 'Avanzado',
    icon: '💧',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: 'Ducha corta (5 minutos)',
        description: 'Reducir el tiempo de ducha para conservar agua y energía',
        category: 'Agua',
        xpReward: '10',
        duration: '5 min',
        difficulty: 'Fácil',
        icon: '💧',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.category || !formData.xpReward) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Actividad guardada',
      `La actividad "${formData.title}" ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return '#4ade80';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
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
          {isEditing ? 'Editar Actividad' : 'Nueva Actividad'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la actividad *</ThemedText>
            <Input
              placeholder="Ej: Ducha corta (5 minutos)"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe cómo realizar la actividad..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Categoría *</ThemedText>
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

        {/* Configuración */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Configuración</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Recompensa XP *</ThemedText>
            <Input
              placeholder="10"
              value={formData.xpReward}
              onChangeText={(value) => updateFormData('xpReward', value)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Duración estimada</ThemedText>
            <Input
              placeholder="Ej: 5 min, 30 min, 1 hora"
              value={formData.duration}
              onChangeText={(value) => updateFormData('duration', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Dificultad</ThemedText>
            <View style={styles.difficultiesRow}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.difficultyOption,
                    { 
                      backgroundColor: formData.difficulty === difficulty 
                        ? getDifficultyColor(difficulty) 
                        : cardBg,
                      borderColor: border
                    }
                  ]}
                  onPress={() => updateFormData('difficulty', difficulty)}
                >
                  <Text style={[
                    styles.difficultyText,
                    { 
                      color: formData.difficulty === difficulty ? 'white' : text 
                    }
                  ]}>
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Icono</ThemedText>
            <View style={styles.iconsGrid}>
              {activityIcons.map((icon) => (
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
                  {formData.title || 'Título de la actividad'}
                </ThemedText>
                <ThemedText style={styles.previewCategory}>
                  {formData.category || 'Categoría'}
                </ThemedText>
                <View style={styles.previewMeta}>
                  <Text style={[
                    styles.previewDifficulty,
                    { backgroundColor: getDifficultyColor(formData.difficulty) }
                  ]}>
                    {formData.difficulty}
                  </Text>
                  <ThemedText style={styles.previewDuration}>
                    {formData.duration || 'Duración'}
                  </ThemedText>
                  <ThemedText style={styles.previewXP}>
                    {formData.xpReward || '0'} XP
                  </ThemedText>
                </View>
              </View>
            </View>
            <ThemedText style={styles.previewDescription}>
              {formData.description || 'Descripción de la actividad...'}
            </ThemedText>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
        <Button
          label={isEditing ? 'Actualizar actividad' : 'Crear actividad'}
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
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { marginBottom: 4 },
  categoriesGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '30%',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  categoryOptionText: { fontSize: 14, fontWeight: '500' },
  difficultiesRow: { flexDirection: 'row', gap: 12 },
  difficultyOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  difficultyText: { fontSize: 14, fontWeight: '600' },
  iconsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
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
  previewCategory: { fontSize: 14, marginBottom: 6, opacity: 0.8 },
  previewMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewDifficulty: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  previewDuration: { fontSize: 12, opacity: 0.7 },
  previewXP: { fontSize: 12, opacity: 0.7 },
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
