import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const activityTypes = [
  { id: 1, name: 'Transporte', icon: '🚲', activities: ['Caminar', 'Bicicleta', 'Transporte público', 'Carro eléctrico'] },
  { id: 2, name: 'Energía', icon: '💡', activities: ['Luces LED', 'Energía solar', 'Desconectar aparatos', 'Reducir calefacción'] },
  { id: 3, name: 'Agua', icon: '💧', activities: ['Ducha corta', 'Reparar goteras', 'Recoger agua lluvia', 'Lavado eficiente'] },
  { id: 4, name: 'Residuos', icon: '♻️', activities: ['Reciclaje papel', 'Reciclaje plástico', 'Compostaje', 'Reducir empaques'] },
  { id: 5, name: 'Consumo', icon: '🛒', activities: ['Productos locales', 'Segunda mano', 'Reparar antes de desechar', 'Compra responsable'] },
];

export default function AddActivityScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const handleSave = () => {
    // Validaciones más específicas
    if (!selectedType) {
      Alert.alert(
        'Tipo de actividad requerido', 
        'Por favor selecciona el tipo de actividad que realizaste.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    if (!selectedActivity && !customActivity.trim()) {
      Alert.alert(
        'Descripción requerida', 
        'Por favor describe qué actividad realizaste o selecciona una de las opciones.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    if (customActivity.trim() && customActivity.trim().length < 5) {
      Alert.alert(
        'Descripción muy corta', 
        'Por favor proporciona una descripción más detallada de tu actividad.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    // Simular guardado con feedback mejorado
    Alert.alert(
      '¡Actividad registrada! 🎉',
      `Has registrado tu actividad de ${selectedTypeData?.name.toLowerCase()}. ¡Sigue así contribuyendo al medio ambiente!`,
      [
        { 
          text: 'Ver mi progreso', 
          onPress: () => router.push('/(tabs)/profile'),
          style: 'default'
        },
        { 
          text: 'Agregar otra', 
          onPress: () => {
            setSelectedType(null);
            setSelectedActivity('');
            setCustomActivity('');
            setDuration('');
            setNotes('');
          },
          style: 'cancel'
        }
      ]
    );
  };

  const selectedTypeData = activityTypes.find(type => type.id === selectedType);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Añadir Actividad</Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={700}>
        {/* Tipo de actividad */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tipo de actividad</ThemedText>
          
          <View style={styles.typesGrid}>
            {activityTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  { backgroundColor: cardBg, borderColor: border },
                  selectedType === type.id && { borderColor: '#4ade80', borderWidth: 2 }
                ]}
                onPress={() => {
                  setSelectedType(type.id);
                  setSelectedActivity('');
                }}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <ThemedText style={styles.typeName}>{type.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actividades específicas */}
        {selectedTypeData && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>¿Qué hiciste?</ThemedText>
            
            <View style={styles.activitiesContainer}>
              {selectedTypeData.activities.map((activity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.activityChip,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedActivity === activity && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => {
                    setSelectedActivity(activity);
                    setCustomActivity('');
                  }}
                >
                  <Text style={[
                    styles.activityChipText,
                    { color: text },
                    selectedActivity === activity && { color: 'white' }
                  ]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.customSection}>
              <ThemedText style={styles.customLabel}>O describe tu actividad:</ThemedText>
              <Input
                placeholder="Ej: Planté un árbol en mi jardín"
                value={customActivity}
                onChangeText={(text) => {
                  setCustomActivity(text);
                  setSelectedActivity('');
                }}
                style={styles.input}
              />
            </View>
          </View>
        )}

        {/* Detalles adicionales */}
        {(selectedActivity || customActivity) && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Detalles</ThemedText>
            
            <View style={styles.detailsContainer}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Duración o cantidad</ThemedText>
                <Input
                  placeholder="Ej: 30 min, 5 kg, 2 horas"
                  value={duration}
                  onChangeText={setDuration}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Notas adicionales (opcional)</ThemedText>
                <Input
                  placeholder="Detalles extra sobre tu actividad..."
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  style={[styles.input, { height: 80 }]}
                />
              </View>
            </View>
          </View>
        )}

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label="Guardar Actividad"
            onPress={handleSave}
            style={styles.saveButton}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  typeCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      minWidth: 140,
      maxWidth: 180,
      flex: 1,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  activityChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  activityChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  customSection: {
    marginTop: 16,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  saveButton: {
    marginBottom: 8,
  },
  cancelButton: {
    marginBottom: 8,
  },
});


