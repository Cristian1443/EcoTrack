import { ThemedView } from '@/components/ThemedView';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

// Mock del hook useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#ffffff'),
}));

// Mock de useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
}));

describe('ThemedView', () => {
  it('renderiza correctamente con contenido hijo', () => {
    const { getByText } = render(
      <ThemedView>
        <Text>Contenido hijo</Text>
      </ThemedView>
    );
    expect(getByText('Contenido hijo')).toBeTruthy();
  });

  it('aplica el color de fondo del tema', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toHaveStyle({
      backgroundColor: '#ffffff',
    });
  });

  it('no aplica safe area por defecto', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).not.toHaveStyle({
      paddingTop: 44,
    });
  });

  it('aplica safe area cuando useSafeArea es true', () => {
    const { getByTestId } = render(
      <ThemedView useSafeArea testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toHaveStyle({
      paddingTop: 44,
    });
  });

  it('acepta estilos personalizados', () => {
    const customStyle = { padding: 20, margin: 10 };
    const { getByTestId } = render(
      <ThemedView style={customStyle} testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toHaveStyle(customStyle);
  });

  it('pasa props adicionales al componente View', () => {
    const { getByTestId } = render(
      <ThemedView accessible={true} testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toHaveProp('accessible', true);
  });

  it('combina estilos de safe area con estilos personalizados', () => {
    const customStyle = { padding: 20 };
    const { getByTestId } = render(
      <ThemedView useSafeArea style={customStyle} testID="themed-view">
        <Text>Contenido</Text>
      </ThemedView>
    );
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toHaveStyle({
      paddingTop: 44,
      padding: 20,
    });
  });
});
