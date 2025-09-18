describe('Formularios CRUD', () => {
  beforeEach(() => {
    cy.visitAndWait('/');
  });

  describe('Formulario de Empleados', () => {
    it('debe cargar correctamente el formulario de nuevo empleado', () => {
      cy.contains('Gestionar Empleados').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/employee-form');
      
      cy.contains('Nuevo Empleado').should('be.visible');
      cy.contains('Avatar').should('be.visible');
      cy.contains('Información básica').should('be.visible');
      cy.contains('Vista previa').should('be.visible');
    });

    it('debe ser responsive en diferentes pantallas', () => {
      cy.contains('Gestionar Empleados').click();
      cy.get('text').contains('+').click();
      
      // Probar en móvil
      cy.viewport(375, 667);
      cy.contains('Nuevo Empleado').should('be.visible');
      
      // Probar en desktop
      cy.viewport(1280, 720);
      cy.contains('Nuevo Empleado').should('be.visible');
      
      // En desktop, los botones deben estar en fila
      cy.get('button').contains('Crear empleado').should('be.visible');
      cy.get('button').contains('Cancelar').should('be.visible');
    });
  });

  describe('Formulario de Empresas', () => {
    it('debe cargar correctamente el formulario de nueva empresa', () => {
      cy.contains('Gestionar Empresas').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/company-form');
      
      cy.contains('Nueva Empresa').should('be.visible');
      cy.contains('Logo/Avatar').should('be.visible');
      cy.contains('Información básica').should('be.visible');
      cy.contains('Información de contacto').should('be.visible');
    });
  });

  describe('Formulario de Áreas', () => {
    it('debe cargar correctamente el formulario de nueva área', () => {
      cy.contains('Gestionar Áreas').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/area-form');
      
      cy.contains('Nueva Área').should('be.visible');
      cy.contains('Información básica').should('be.visible');
      cy.contains('Personalización').should('be.visible');
      cy.contains('Vista previa').should('be.visible');
    });
  });

  describe('Formulario de Actividades', () => {
    it('debe cargar correctamente el formulario de nueva actividad', () => {
      cy.contains('Ver Actividades').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/activity-form');
      
      cy.contains('Nueva Actividad').should('be.visible');
      cy.contains('Información básica').should('be.visible');
    });
  });

  describe('Formulario de Lecciones', () => {
    it('debe cargar correctamente el formulario de nueva lección', () => {
      cy.contains('Lecciones').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/lesson-form');
      
      cy.contains('Nueva Lección').should('be.visible');
      cy.contains('Información básica').should('be.visible');
    });
  });

  describe('Formulario de Metas', () => {
    it('debe cargar correctamente el formulario de nueva meta', () => {
      cy.contains('Revisar Metas').click();
      cy.get('text').contains('+').click();
      cy.shouldBeOnPage('/goal-form');
      
      cy.contains('Nueva Meta').should('be.visible');
      cy.contains('Información básica').should('be.visible');
      cy.contains('Configuración').should('be.visible');
    });
  });

  describe('Responsividad de Formularios', () => {
    const forms = [
      { name: 'Empleados', button: 'Gestionar Empleados', route: '/employee-form' },
      { name: 'Empresas', button: 'Gestionar Empresas', route: '/company-form' },
      { name: 'Áreas', button: 'Gestionar Áreas', route: '/area-form' },
      { name: 'Actividades', button: 'Ver Actividades', route: '/activity-form' },
      { name: 'Metas', button: 'Revisar Metas', route: '/goal-form' },
    ];

    forms.forEach(form => {
      it(`debe ser responsive el formulario de ${form.name}`, () => {
        cy.contains(form.button).click();
        cy.get('text').contains('+').click();
        cy.shouldBeOnPage(form.route);
        
        // Probar en diferentes tamaños
        cy.viewport(375, 667); // Móvil
        cy.get('button').should('be.visible');
        
        cy.viewport(768, 1024); // Tablet
        cy.get('button').should('be.visible');
        
        cy.viewport(1280, 720); // Desktop
        cy.get('button').should('be.visible');
      });
    });
  });
});
