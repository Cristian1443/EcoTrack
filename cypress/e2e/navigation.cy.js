describe('Navegación de la Aplicación', () => {
  beforeEach(() => {
    cy.visitAndWait('/');
  });

  it('debe cargar la página principal correctamente', () => {
    cy.contains('EcoTrack').should('be.visible');
    cy.contains('Tu compañero en el camino hacia la sostenibilidad').should('be.visible');
  });

  it('debe navegar a todas las pantallas CRUD desde la página principal', () => {
    const crudScreens = [
      { button: 'Gestionar Empleados', route: '/employees', title: 'Gestión de Empleados' },
      { button: 'Gestionar Empresas', route: '/companies', title: 'Gestión de Empresas' },
      { button: 'Gestionar Áreas', route: '/areas', title: 'Gestión de Áreas' },
      { button: 'Ver Actividades', route: '/activities', title: 'Gestión de Actividades' },
      { button: 'Revisar Metas', route: '/goals', title: 'Gestión de Metas' },
      { button: 'Lecciones', route: '/lessons', title: 'Lecciones' },
    ];

    crudScreens.forEach(screen => {
      cy.contains(screen.button).click();
      cy.shouldBeOnPage(screen.route);
      cy.contains(screen.title).should('be.visible');
      
      // Volver a la página principal
      cy.get('text').contains('←').click();
      cy.shouldBeOnPage('/');
    });
  });

  it('debe navegar al dashboard corporativo', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    cy.contains('Dashboard Corporativo').should('be.visible');
    
    // Volver a la página principal
    cy.get('text').contains('←').click();
    cy.shouldBeOnPage('/');
  });

  it('debe navegar a los formularios desde las pantallas CRUD', () => {
    // Probar navegación a formulario de empleados
    cy.contains('Gestionar Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('+').click();
    cy.shouldBeOnPage('/employee-form');
    cy.contains('Nuevo Empleado').should('be.visible');
    
    // Volver
    cy.get('text').contains('←').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('←').click();
    cy.shouldBeOnPage('/');
  });

  it('debe manejar navegación con botón back', () => {
    // Navegar a través de múltiples pantallas
    cy.contains('Gestionar Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('+').click();
    cy.shouldBeOnPage('/employee-form');
    
    // Usar botón back
    cy.get('text').contains('←').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('←').click();
    cy.shouldBeOnPage('/');
  });

  it('debe navegar entre tabs correctamente', () => {
    // Verificar que las tabs están presentes y funcionan
    cy.get('[role="tablist"]').should('exist');
    
    // Probar navegación entre tabs
    cy.contains('Perfil').click();
    cy.shouldBeOnPage('/profile');
    
    cy.contains('Ranking').click();
    cy.shouldBeOnPage('/ranking');
    
    cy.contains('Diario').click();
    cy.shouldBeOnPage('/diary');
    
    // Volver al home
    cy.contains('Inicio').click();
    cy.shouldBeOnPage('/');
  });

  it('debe ser responsive la navegación', () => {
    // Probar en móvil
    cy.viewport(375, 667);
    cy.contains('Gestionar Empleados').should('be.visible');
    
    // Probar en tablet
    cy.viewport(768, 1024);
    cy.contains('Gestionar Empleados').should('be.visible');
    
    // Probar en desktop
    cy.viewport(1280, 720);
    cy.contains('Gestionar Empleados').should('be.visible');
  });
});
