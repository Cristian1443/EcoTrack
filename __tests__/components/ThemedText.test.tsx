import { ThemedText } from '@/components/ThemedText';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock del hook useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

describe('ThemedText', () => {
  it('renderiza correctamente con texto por defecto', () => {
    const { getByText } = render(<ThemedText>Texto de prueba</ThemedText>);
    expect(getByText('Texto de prueba')).toBeTruthy();
  });

  it('aplica el estilo por defecto cuando no se especifica tipo', () => {
    const { getByText } = render(<ThemedText>Texto por defecto</ThemedText>);
    const textElement = getByText('Texto por defecto');
    
    expect(textElement).toHaveStyle({
      fontSize: 16,
      lineHeight: 24,
    });
  });

  it('aplica el estilo de título cuando type es "title"', () => {
    const { getByText } = render(<ThemedText type="title">Título</ThemedText>);
    const textElement = getByText('Título');
    
    expect(textElement).toHaveStyle({
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 32,
    });
  });

  it('aplica el estilo de subtítulo cuando type es "subtitle"', () => {
    const { getByText } = render(<ThemedText type="subtitle">Subtítulo</ThemedText>);
    const textElement = getByText('Subtítulo');
    
    expect(textElement).toHaveStyle({
      fontSize: 20,
      fontWeight: 'bold',
    });
  });

  it('aplica el estilo de enlace cuando type es "link"', () => {
    const { getByText } = render(<ThemedText type="link">Enlace</ThemedText>);
    const textElement = getByText('Enlace');
    
    expect(textElement).toHaveStyle({
      fontSize: 16,
      lineHeight: 30,
      color: '#0a7ea4',
    });
  });

  it('aplica el estilo semi-bold cuando type es "defaultSemiBold"', () => {
    const { getByText } = render(<ThemedText type="defaultSemiBold">Texto semi-bold</ThemedText>);
    const textElement = getByText('Texto semi-bold');
    
    expect(textElement).toHaveStyle({
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    });
  });

  it('acepta estilos personalizados', () => {
    const customStyle = { fontSize: 20, color: 'red' };
    const { getByText } = render(
      <ThemedText style={customStyle}>Texto personalizado</ThemedText>
    );
    const textElement = getByText('Texto personalizado');
    
    expect(textElement).toHaveStyle(customStyle);
  });

  it('pasa props adicionales al componente Text', () => {
    const { getByText } = render(
      <ThemedText numberOfLines={1} testID="themed-text">Texto con props</ThemedText>
    );
    const textElement = getByText('Texto con props');
    
    expect(textElement).toHaveProp('numberOfLines', 1);
    expect(textElement).toHaveProp('testID', 'themed-text');
  });
});
