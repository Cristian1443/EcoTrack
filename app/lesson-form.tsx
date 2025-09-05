import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ['Agua', 'Energía', 'Transporte', 'Residuos', 'Alimentación', 'Consumo'];
const difficulties = ['Fácil', 'Intermedio', 'Avanzado'];
const lessonIcons = ['💧', '⚡', '🚲', '♻️', '🌱', '🛒', '🌍', '📱', '💡', '🏠'];

export default function LessonFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    duration: '',
    difficulty: 'Fácil' as 'Fácil' | 'Intermedio' | 'Avanzado',
    xpReward: '',
    icon: '💧',
    author: '',
  });
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: 'Introducción al ahorro de agua',
        description: 'Aprende técnicas básicas para reducir el consumo de agua en casa y oficina',
        content: 'Contenido detallado de la lección...',
        category: 'Agua',
        duration: '15 min',
        difficulty: 'Fácil',
        xpReward: '50',
        icon: '💧',
        author: 'Dr. María Pérez',
      });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.content || !formData.category) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Lección guardada',
      `La lección "${formData.title}" ha sido ${action} exitosamente`,
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
          {isEditing ? 'Editar Lección' : 'Nueva Lección'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la lección *</ThemedText>
            <Input
              placeholder="Ej: Introducción al ahorro de agua"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe brevemente el contenido de la lección..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Contenido de la lección *</ThemedText>
            <Input
              placeholder="Escribe el contenido completo de la lección..."
              value={formData.content}
              onChangeText={(value) => updateFormData('content', value)}
              multiline
              numberOfLines={6}
              style={[styles.input, { height: 150 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Autor</ThemedText>
            <Input
              placeholder="Nombre del autor"
              value={formData.author}
              onChangeText={(value) => updateFormData('author', value)}
              style={styles.input}
            />
          </View>
        </View>

        {/* Configuración */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Configuración</ThemedText>
          
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

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Duración estimada</ThemedText>
            <Input
              placeholder="Ej: 15 min, 30 min, 1 hora"
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
            <ThemedText style={styles.inputLabel}>Recompensa XP</ThemedText>
            <Input
              placeholder="50"
              value={formData.xpReward}
              onChangeText={(value) => updateFormData('xpReward', value)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Icono</ThemedText>
            <View style={styles.iconsGrid}>
              {lessonIcons.map((icon) => (
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
      </ScrollView>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          label={isEditing ? 'Actualizar lección' : 'Crear lección'}
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
  difficultiesRow: { flexDirection: 'row', gap: 12 },
  difficultyOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  difficultyText: { fontSize: 14, fontWeight: '600' },
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
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});
