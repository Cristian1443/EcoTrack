import { ThemeProvider } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { renderHook } from '@testing-library/react-native';
import React from 'react';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));

// Mock de Colors
jest.mock('@/constants/Colors', () => ({
  Colors: {
    light: {
      text: '#000000',
      background: '#ffffff',
      primary: '#4ade80',
      secondary: '#6b7280',
    },
    dark: {
      text: '#ffffff',
      background: '#000000',
      primary: '#22c55e',
      secondary: '#9ca3af',
    },
  },
}));

describe('useThemeColor', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('retorna color del tema claro por defecto', () => {
    const { result } = renderHook(
      () => useThemeColor({}, 'text'),
      { wrapper }
    );

    expect(result.current).toBe('#000000');
  });

  it('retorna color personalizado cuando se proporciona en props (tema claro)', () => {
    const { result } = renderHook(
      () => useThemeColor({ light: '#ff0000' }, 'text'),
      { wrapper }
    );

    expect(result.current).toBe('#ff0000');
  });

  it('retorna color del tema cuando no se proporciona color personalizado', () => {
    const { result } = renderHook(
      () => useThemeColor({}, 'primary'),
      { wrapper }
    );

    expect(result.current).toBe('#4ade80');
  });

  it('maneja diferentes nombres de colores', () => {
    const { result: textResult } = renderHook(
      () => useThemeColor({}, 'text'),
      { wrapper }
    );
    
    const { result: backgroundResult } = renderHook(
      () => useThemeColor({}, 'background'),
      { wrapper }
    );
    
    const { result: secondaryResult } = renderHook(
      () => useThemeColor({}, 'secondary'),
      { wrapper }
    );

    expect(textResult.current).toBe('#000000');
    expect(backgroundResult.current).toBe('#ffffff');
    expect(secondaryResult.current).toBe('#6b7280');
  });

  it('prioriza color personalizado sobre color del tema', () => {
    const { result } = renderHook(
      () => useThemeColor({ light: '#custom-light', dark: '#custom-dark' }, 'text'),
      { wrapper }
    );

    expect(result.current).toBe('#custom-light');
  });

  // Nota: Para probar el tema oscuro necesitaríamos poder cambiar el estado del ThemeContext
  // Esto requeriría un setup más complejo o mocking adicional del contexto
});
