describe('Operaciones CRUD', () => {
  beforeEach(() => {
    cy.visitAndWait('/');
  });

  describe('CRUD de Empleados', () => {
    it('debe poder crear un nuevo empleado', () => {
      cy.contains('⚙️').click();
      cy.contains('Empleados').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/employee-form');
      
      // Verificar que el formulario está vacío para nuevo empleado
      cy.contains('Nuevo Empleado').should('be.visible');
      cy.contains('Vista previa').should('be.visible');
      cy.contains('Nombre del empleado').should('be.visible'); // Placeholder de vista previa
    });

    it('debe poder editar un empleado existente', () => {
      cy.contains('⚙️').click();
      cy.contains('Empleados').click();
      cy.contains('Editar').first().click();
      cy.shouldBeOnPage('/employee-form');
      
      // Verificar que el formulario tiene datos pre-cargados
      cy.contains('Editar Empleado').should('be.visible');
      cy.contains('Elena Ramirez').should('be.visible'); // Datos pre-cargados
    });

    it('debe poder eliminar un empleado', () => {
      cy.contains('⚙️').click();
      cy.contains('Empleados').click();
      
      // Contar empleados iniciales
      cy.get('[data-testid="employee-card"]').should('have.length.at.least', 1);
      
      // Eliminar primer empleado
      cy.contains('Eliminar').first().click();
      
      // Confirmar eliminación en el alert
      cy.on('window:confirm', () => true);
    });

    it('debe poder cambiar estado activo/inactivo', () => {
      cy.contains('⚙️').click();
      cy.contains('Empleados').click();
      
      // Buscar empleado activo
      cy.contains('Activo').should('be.visible');
      cy.contains('Desactivar').first().click();
      
      // Verificar cambio de estado
      cy.contains('Activar').should('be.visible');
    });
  });

  describe('CRUD de Empresas', () => {
    it('debe poder navegar y crear nueva empresa', () => {
      cy.contains('⚙️').click();
      cy.contains('Empresas').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/company-form');
      
      cy.contains('Nueva Empresa').should('be.visible');
      cy.contains('Logo/Avatar').should('be.visible');
    });

    it('debe mostrar estadísticas de empresas', () => {
      cy.contains('⚙️').click();
      cy.contains('Empresas').click();
      cy.shouldBeOnPage('/companies');
      
      cy.contains('Empresas').should('be.visible');
      cy.contains('Empleados').should('be.visible');
      cy.contains('XP Total').should('be.visible');
    });
  });

  describe('CRUD de Áreas', () => {
    it('debe poder navegar y crear nueva área', () => {
      cy.contains('⚙️').click();
      cy.contains('Áreas').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/area-form');
      
      cy.contains('Nueva Área').should('be.visible');
      cy.contains('Personalización').should('be.visible');
    });

    it('debe mostrar información de áreas existentes', () => {
      cy.contains('⚙️').click();
      cy.contains('Áreas').click();
      cy.shouldBeOnPage('/areas');
      
      cy.contains('Recursos Humanos').should('be.visible');
      cy.contains('Tecnología Verde').should('be.visible');
      cy.contains('Marketing Sostenible').should('be.visible');
    });
  });

  describe('CRUD de Actividades', () => {
    it('debe poder navegar y crear nueva actividad', () => {
      cy.contains('⚙️').click();
      cy.contains('Actividades').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/activity-form');
      
      cy.contains('Nueva Actividad').should('be.visible');
    });

    it('debe mostrar filtros de actividades', () => {
      cy.contains('⚙️').click();
      cy.contains('Actividades').click();
      cy.shouldBeOnPage('/activities');
      
      cy.contains('Filtros').should('be.visible');
      cy.get('input[placeholder*="Buscar actividades"]').should('be.visible');
      cy.contains('Todas').should('be.visible'); // Filtro de categorías
    });
  });

  describe('CRUD de Metas', () => {
    it('debe poder navegar y crear nueva meta', () => {
      cy.contains('⚙️').click();
      cy.contains('Metas').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/goal-form');
      
      cy.contains('Nueva Meta').should('be.visible');
      cy.contains('Configuración').should('be.visible');
    });

    it('debe mostrar progreso de metas', () => {
      cy.contains('⚙️').click();
      cy.contains('Metas').click();
      cy.shouldBeOnPage('/goals');
      
      cy.contains('Total').should('be.visible');
      cy.contains('Completadas').should('be.visible');
      cy.contains('En progreso').should('be.visible');
    });
  });

  describe('CRUD de Lecciones', () => {
    it('debe poder navegar y crear nueva lección', () => {
      cy.contains('Lecciones').click();
      cy.contains('+').click();
      cy.shouldBeOnPage('/lesson-form');
      
      cy.contains('Nueva Lección').should('be.visible');
    });

    it('debe mostrar temas de lecciones', () => {
      cy.contains('Lecciones').click();
      cy.shouldBeOnPage('/lessons');
      
      cy.contains('Temas').should('be.visible');
      cy.contains('Conservación del Agua').should('be.visible');
      cy.contains('Energía Renovable').should('be.visible');
    });
  });
});
