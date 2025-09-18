// Prueba simple para verificar que Jest funciona
describe('Configuración básica de Jest', () => {
  it('ejecuta una prueba simple', () => {
    expect(1 + 1).toBe(2);
  });

  it('puede trabajar con strings', () => {
    expect('hello world').toContain('world');
  });

  it('puede trabajar con arrays', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toContain('banana');
    expect(fruits).toHaveLength(3);
  });
});
