import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onRegister = async () => {
    // Limpiar errores previos
    setError('');

    // Validaciones específicas
    if (!name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!password.trim()) {
      setError('La contraseña es requerida');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!confirm.trim()) {
      setError('Confirma tu contraseña');
      return;
    }
    
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(name.trim(), email.trim(), password);
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Error al crear la cuenta. El email podría estar en uso.');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Crear cuenta</ThemedText>
        <ThemedText>Únete a EcoTrack para gamificar tus hábitos.</ThemedText>
      </View>
      <View style={styles.form}>
        <Input placeholder="Nombre" value={name} onChangeText={setName} />
        <Input placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} style={{ marginTop: 10 }} />
        <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} style={{ marginTop: 10 }} />
        <Input placeholder="Confirmar contraseña" secureTextEntry value={confirm} onChangeText={setConfirm} style={{ marginTop: 10 }} />
        
        {error ? (
          <Text style={[styles.errorText, { color: '#ef4444' }]}>{error}</Text>
        ) : null}
        
        <Button label="Registrarme" onPress={onRegister} loading={loading} style={{ marginTop: 16 }} />
        <Link href="/login" asChild>
          <Button label="Ya tengo cuenta" variant="ghost" style={{ marginTop: 8 }} />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 24, justifyContent: 'center' },
  header: { gap: 6, alignItems: 'center' },
  form: { gap: 8 },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});




