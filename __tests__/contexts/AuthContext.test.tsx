import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Componente de prueba para usar el contexto
function TestComponent() {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuth();

  return (
    <>
      <Text testID="user-name">{user?.name || 'No user'}</Text>
      <Text testID="is-authenticated">{isAuthenticated.toString()}</Text>
      <Text testID="is-loading">{isLoading.toString()}</Text>
      <TouchableOpacity
        testID="login-button"
        onPress={() => login('test@example.com', 'password')}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="register-button"
        onPress={() => register('Test User', 'test@example.com', 'password')}
      >
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="logout-button" onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('proporciona valores iniciales correctos', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user-name')).toHaveTextContent('No user');
      expect(getByTestId('is-authenticated')).toHaveTextContent('false');
      expect(getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  it('carga usuario existente desde AsyncStorage', async () => {
    const mockUserData = JSON.stringify({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      xp: 100,
      level: 2,
    });

    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce('mock_token')
      .mockResolvedValueOnce(mockUserData);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user-name')).toHaveTextContent('John Doe');
      expect(getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });

  it('maneja el login correctamente', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Esperar a que termine la carga inicial
    await waitFor(() => {
      expect(getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Simular login
    await act(async () => {
      getByTestId('login-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('user-name')).toHaveTextContent('Sofía Ramirez');
      expect(getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('auth_token', 'mock_token_12345');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'user_data',
      expect.stringContaining('Sofía Ramirez')
    );
  });

  it('maneja el registro correctamente', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Esperar a que termine la carga inicial
    await waitFor(() => {
      expect(getByTestId('is-loading')).toHaveTextContent('false');
    });

    // Simular registro
    await act(async () => {
      getByTestId('register-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('user-name')).toHaveTextContent('Test User');
      expect(getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'auth_token',
      expect.stringContaining('mock_token_')
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'user_data',
      expect.stringContaining('Test User')
    );
  });

  it('maneja el logout correctamente', async () => {
    // Primero configurar un usuario autenticado
    const mockUserData = JSON.stringify({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      xp: 100,
      level: 2,
    });

    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce('mock_token')
      .mockResolvedValueOnce(mockUserData);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Esperar a que el usuario se cargue
    await waitFor(() => {
      expect(getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    // Simular logout
    await act(async () => {
      getByTestId('logout-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('user-name')).toHaveTextContent('No user');
      expect(getByTestId('is-authenticated')).toHaveTextContent('false');
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('auth_token');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user_data');
  });

  it('lanza error cuando useAuth se usa fuera del provider', () => {
    const TestComponentWithoutProvider = () => {
      const { user } = useAuth();
      return <Text>{user?.name}</Text>;
    };

    // Capturar el error de la consola para evitar ruido en los tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});
