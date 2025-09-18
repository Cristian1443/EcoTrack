// Pruebas para funciones de utilidad de validación
describe('Funciones de Validación', () => {
  // Función para validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para validar contraseña
  const isValidPassword = (password) => {
    return !!(password && typeof password === 'string' && password.trim().length >= 6);
  };

  // Función para validar nombre
  const isValidName = (name) => {
    return !!(name && typeof name === 'string' && name.trim().length >= 2);
  };

  // Función para calcular XP por actividad
  const calculateActivityXP = (activity) => {
    const baseXP = 10;
    const difficultyMultiplier = {
      'Fácil': 1,
      'Intermedio': 1.5,
      'Avanzado': 2,
    };
    
    return baseXP * (difficultyMultiplier[activity.difficulty] || 1);
  };

  describe('Validación de Email', () => {
    it('valida emails correctos', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email@domain.co')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('rechaza emails inválidos', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('Validación de Contraseña', () => {
    it('acepta contraseñas válidas', () => {
      expect(isValidPassword('123456')).toBe(true);
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('MiContraseñaSegura!')).toBe(true);
    });

    it('rechaza contraseñas inválidas', () => {
      expect(isValidPassword('12345')).toBe(false);
      expect(isValidPassword('')).toBe(false);
      expect(isValidPassword(null)).toBe(false);
      expect(isValidPassword(undefined)).toBe(false);
    });
  });

  describe('Validación de Nombre', () => {
    it('acepta nombres válidos', () => {
      expect(isValidName('Juan')).toBe(true);
      expect(isValidName('María García')).toBe(true);
      expect(isValidName('Ana')).toBe(true);
    });

    it('rechaza nombres inválidos', () => {
      expect(isValidName('A')).toBe(false);
      expect(isValidName('')).toBe(false);
      expect(isValidName('  ')).toBe(false);
      expect(isValidName(null)).toBe(false);
      expect(isValidName(undefined)).toBe(false);
    });
  });

  describe('Cálculo de XP', () => {
    it('calcula XP correctamente para actividades fáciles', () => {
      const activity = { difficulty: 'Fácil' };
      expect(calculateActivityXP(activity)).toBe(10);
    });

    it('calcula XP correctamente para actividades intermedias', () => {
      const activity = { difficulty: 'Intermedio' };
      expect(calculateActivityXP(activity)).toBe(15);
    });

    it('calcula XP correctamente para actividades avanzadas', () => {
      const activity = { difficulty: 'Avanzado' };
      expect(calculateActivityXP(activity)).toBe(20);
    });

    it('usa multiplicador por defecto para dificultades desconocidas', () => {
      const activity = { difficulty: 'Desconocida' };
      expect(calculateActivityXP(activity)).toBe(10);
    });
  });
});
