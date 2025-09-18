// Pruebas para funciones de utilidad de formateo
describe('Funciones de Formateo', () => {
  // Función para formatear números
  const formatNumber = (number) => {
    if (typeof number !== 'number') return '0';
    return number.toLocaleString('es-ES');
  };

  // Función para formatear XP
  const formatXP = (xp) => {
    if (xp >= 1000) {
      return `${(xp / 1000).toFixed(1)}K`;
    }
    return xp.toString();
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Función para obtener saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Función para calcular progreso en porcentaje
  const calculateProgress = (current, target) => {
    if (!target || target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  describe('Formateo de Números', () => {
    it('formatea números correctamente', () => {
      // Los números pueden formatearse diferente según la configuración local
      expect(formatNumber(1234)).toMatch(/1[.,]?234/);
      expect(formatNumber(1000)).toMatch(/1[.,]?000/);
      expect(formatNumber(500)).toBe('500');
    });

    it('maneja valores no numéricos', () => {
      expect(formatNumber('abc')).toBe('0');
      expect(formatNumber(null)).toBe('0');
      expect(formatNumber(undefined)).toBe('0');
    });
  });

  describe('Formateo de XP', () => {
    it('formatea XP menor a 1000', () => {
      expect(formatXP(500)).toBe('500');
      expect(formatXP(999)).toBe('999');
      expect(formatXP(0)).toBe('0');
    });

    it('formatea XP mayor o igual a 1000', () => {
      expect(formatXP(1000)).toBe('1.0K');
      expect(formatXP(1500)).toBe('1.5K');
      expect(formatXP(2500)).toBe('2.5K');
      expect(formatXP(10000)).toBe('10.0K');
    });
  });

  describe('Formateo de Fechas', () => {
    it('formatea fechas correctamente', () => {
      const result = formatDate('2024-03-15');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('maneja fechas vacías o inválidas', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('Saludos', () => {
    it('retorna un saludo válido', () => {
      const greeting = getGreeting();
      const validGreetings = ['Buenos días', 'Buenas tardes', 'Buenas noches'];
      expect(validGreetings).toContain(greeting);
    });
  });

  describe('Cálculo de Progreso', () => {
    it('calcula progreso correctamente', () => {
      expect(calculateProgress(50, 100)).toBe(50);
      expect(calculateProgress(25, 100)).toBe(25);
      expect(calculateProgress(100, 100)).toBe(100);
    });

    it('no excede el 100%', () => {
      expect(calculateProgress(150, 100)).toBe(100);
      expect(calculateProgress(200, 100)).toBe(100);
    });

    it('maneja casos edge', () => {
      expect(calculateProgress(50, 0)).toBe(0);
      expect(calculateProgress(50, null)).toBe(0);
      expect(calculateProgress(50, undefined)).toBe(0);
    });

    it('redondea correctamente', () => {
      expect(calculateProgress(33, 100)).toBe(33);
      expect(calculateProgress(33.7, 100)).toBe(34);
      expect(calculateProgress(33.4, 100)).toBe(33);
    });
  });
});
