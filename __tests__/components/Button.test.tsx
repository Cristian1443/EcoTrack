import Button from '@/components/ui/Button';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

// Mock del hook useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn((colors, colorName) => {
    const mockColors = {
      primary: '#4ade80',
      secondary: '#6b7280',
      text: '#000000',
    };
    return mockColors[colorName as keyof typeof mockColors] || '#000000';
  }),
}));

describe('Button', () => {
  it('renderiza correctamente con label', () => {
    const { getByText } = render(<Button label="Botón de prueba" />);
    expect(getByText('Botón de prueba')).toBeTruthy();
  });

  it('ejecuta onPress cuando se presiona', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(<Button label="Presionar" onPress={mockOnPress} />);
    
    const button = getByRole('button');
    fireEvent.press(button);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('aplica estilo primario por defecto', () => {
    const { getByRole } = render(<Button label="Botón primario" />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle({
      backgroundColor: '#4ade80',
    });
  });

  it('aplica estilo secundario cuando variant es "secondary"', () => {
    const { getByRole } = render(<Button label="Botón secundario" variant="secondary" />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle({
      backgroundColor: '#6b7280',
    });
  });

  it('aplica estilo ghost cuando variant es "ghost"', () => {
    const { getByRole } = render(<Button label="Botón ghost" variant="ghost" />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('se deshabilita cuando disabled es true', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button label="Botón deshabilitado" onPress={mockOnPress} disabled />
    );
    
    const button = getByRole('button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
    expect(button).toHaveStyle({
      opacity: 0.6,
    });
  });

  it('muestra indicador de carga cuando loading es true', () => {
    const { getByRole, queryByText } = render(
      <Button label="Botón cargando" loading />
    );
    
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(queryByText('Botón cargando')).toBeFalsy();
    
    // Verifica que el ActivityIndicator esté presente
    const activityIndicator = button.findByType('ActivityIndicator');
    expect(activityIndicator).toBeTruthy();
  });

  it('se deshabilita cuando loading es true', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button label="Botón cargando" onPress={mockOnPress} loading />
    );
    
    const button = getByRole('button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('acepta estilos personalizados', () => {
    const customStyle = { margin: 10, borderRadius: 8 };
    const { getByRole } = render(
      <Button label="Botón personalizado" style={customStyle} />
    );
    
    const button = getByRole('button');
    expect(button).toHaveStyle(customStyle);
  });

  it('tiene el accessibilityRole correcto', () => {
    const { getByRole } = render(<Button label="Botón accesible" />);
    const button = getByRole('button');
    
    expect(button).toHaveProp('accessibilityRole', 'button');
  });

  it('aplica activeOpacity correctamente', () => {
    const { getByRole } = render(<Button label="Botón con opacidad" />);
    const button = getByRole('button');
    
    expect(button).toHaveProp('activeOpacity', 0.9);
  });
});
