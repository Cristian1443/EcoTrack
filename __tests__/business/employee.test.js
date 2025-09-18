// Pruebas para lógica de negocio de empleados
describe('Lógica de Negocio - Empleados', () => {
  // Datos de prueba
  const mockEmployees = [
    {
      id: 1,
      name: 'Elena Ramirez',
      email: 'elena.ramirez@ecotech.com',
      position: 'Gerente de Sostenibilidad',
      area: 'Recursos Humanos',
      xp: 12500,
      isActive: true,
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@ecotech.com',
      position: 'Desarrollador Senior',
      area: 'Tecnología',
      xp: 8900,
      isActive: true,
    },
    {
      id: 3,
      name: 'Sofia Vargas',
      email: 'sofia.vargas@ecotech.com',
      position: 'Analista de Marketing',
      area: 'Marketing',
      xp: 7200,
      isActive: false,
    },
  ];

  // Funciones de utilidad para empleados
  const getActiveEmployees = (employees) => {
    return employees.filter(emp => emp.isActive);
  };

  const getEmployeesByArea = (employees, area) => {
    return employees.filter(emp => emp.area === area);
  };

  const getTotalXP = (employees) => {
    return employees.reduce((total, emp) => total + emp.xp, 0);
  };

  const getTopPerformers = (employees, limit = 3) => {
    return [...employees]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit);
  };

  const searchEmployees = (employees, searchTerm) => {
    if (!searchTerm) return employees;
    
    const term = searchTerm.toLowerCase();
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term) ||
      emp.area.toLowerCase().includes(term)
    );
  };

  const getEmployeeLevel = (xp) => {
    if (xp >= 10000) return 'Senior';
    if (xp >= 5000) return 'Intermedio';
    return 'Junior';
  };

  describe('Filtrado de Empleados', () => {
    it('filtra empleados activos correctamente', () => {
      const activeEmployees = getActiveEmployees(mockEmployees);
      expect(activeEmployees).toHaveLength(2);
      expect(activeEmployees.every(emp => emp.isActive)).toBe(true);
    });

    it('filtra empleados por área correctamente', () => {
      const techEmployees = getEmployeesByArea(mockEmployees, 'Tecnología');
      expect(techEmployees).toHaveLength(1);
      expect(techEmployees[0].name).toBe('Carlos Mendoza');
    });

    it('retorna array vacío para área inexistente', () => {
      const result = getEmployeesByArea(mockEmployees, 'Área Inexistente');
      expect(result).toHaveLength(0);
    });
  });

  describe('Cálculos de XP', () => {
    it('calcula XP total correctamente', () => {
      const totalXP = getTotalXP(mockEmployees);
      expect(totalXP).toBe(28600);
    });

    it('maneja array vacío', () => {
      const totalXP = getTotalXP([]);
      expect(totalXP).toBe(0);
    });
  });

  describe('Top Performers', () => {
    it('obtiene top performers ordenados por XP', () => {
      const topPerformers = getTopPerformers(mockEmployees);
      expect(topPerformers).toHaveLength(3);
      expect(topPerformers[0].name).toBe('Elena Ramirez');
      expect(topPerformers[1].name).toBe('Carlos Mendoza');
      expect(topPerformers[2].name).toBe('Sofia Vargas');
    });

    it('respeta el límite especificado', () => {
      const topPerformers = getTopPerformers(mockEmployees, 2);
      expect(topPerformers).toHaveLength(2);
    });

    it('no modifica el array original', () => {
      const originalOrder = [...mockEmployees];
      getTopPerformers(mockEmployees);
      expect(mockEmployees).toEqual(originalOrder);
    });
  });

  describe('Búsqueda de Empleados', () => {
    it('busca por nombre', () => {
      const results = searchEmployees(mockEmployees, 'Elena');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Elena Ramirez');
    });

    it('busca por email', () => {
      const results = searchEmployees(mockEmployees, 'carlos.mendoza');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Carlos Mendoza');
    });

    it('busca por posición', () => {
      const results = searchEmployees(mockEmployees, 'Desarrollador');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Carlos Mendoza');
    });

    it('busca por área', () => {
      const results = searchEmployees(mockEmployees, 'Marketing');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Sofia Vargas');
    });

    it('es case insensitive', () => {
      const results = searchEmployees(mockEmployees, 'ELENA');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Elena Ramirez');
    });

    it('retorna todos los empleados si no hay término de búsqueda', () => {
      const results = searchEmployees(mockEmployees, '');
      expect(results).toHaveLength(3);
    });

    it('retorna array vacío si no encuentra coincidencias', () => {
      const results = searchEmployees(mockEmployees, 'NoExiste');
      expect(results).toHaveLength(0);
    });
  });

  describe('Niveles de Empleados', () => {
    it('clasifica correctamente nivel Senior', () => {
      expect(getEmployeeLevel(12500)).toBe('Senior');
      expect(getEmployeeLevel(10000)).toBe('Senior');
    });

    it('clasifica correctamente nivel Intermedio', () => {
      expect(getEmployeeLevel(8900)).toBe('Intermedio');
      expect(getEmployeeLevel(5000)).toBe('Intermedio');
    });

    it('clasifica correctamente nivel Junior', () => {
      expect(getEmployeeLevel(4999)).toBe('Junior');
      expect(getEmployeeLevel(1000)).toBe('Junior');
      expect(getEmployeeLevel(0)).toBe('Junior');
    });
  });
});
