import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Componente de prueba para usar el contexto
function TestComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <>
      <Text testID="current-theme">{theme}</Text>
      <Text testID="is-dark">{isDark.toString()}</Text>
      <TouchableOpacity testID="toggle-button" onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('proporciona valores iniciales correctos (tema claro por defecto)', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });
  });

  it('carga tema guardado desde AsyncStorage (tema claro)', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('light');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });
  });

  it('carga tema guardado desde AsyncStorage (tema oscuro)', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('dark');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('dark');
      expect(getByTestId('is-dark')).toHaveTextContent('true');
    });
  });

  it('ignora valores inválidos de AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid-theme');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });
  });

  it('alterna el tema de claro a oscuro', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Verificar estado inicial
    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });

    // Alternar tema
    await act(async () => {
      getByTestId('toggle-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('dark');
      expect(getByTestId('is-dark')).toHaveTextContent('true');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('alterna el tema de oscuro a claro', async () => {
    // Comenzar con tema oscuro
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('dark');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Verificar estado inicial (oscuro)
    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('dark');
      expect(getByTestId('is-dark')).toHaveTextContent('true');
    });

    // Alternar tema
    await act(async () => {
      getByTestId('toggle-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('maneja errores al cargar tema desde AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('light');
      expect(getByTestId('is-dark')).toHaveTextContent('false');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error loading theme:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('maneja errores al guardar tema en AsyncStorage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Alternar tema (esto debería disparar el error de guardado)
    await act(async () => {
      getByTestId('toggle-button').props.onPress();
    });

    await waitFor(() => {
      expect(getByTestId('current-theme')).toHaveTextContent('dark');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error saving theme:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('lanza error cuando useTheme se usa fuera del provider', () => {
    const TestComponentWithoutProvider = () => {
      const { theme } = useTheme();
      return <Text>{theme}</Text>;
    };

    // Capturar el error de la consola para evitar ruido en los tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
});
