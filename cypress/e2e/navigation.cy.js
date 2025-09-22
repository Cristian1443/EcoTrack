describe('Navegación de la Aplicación', () => {
  beforeEach(() => {
    cy.visitAndWait('/');
  });

  it('debe cargar la página principal correctamente', () => {
    cy.contains('EcoTrack').should('be.visible');
    cy.contains('Tu compañero en el camino hacia la sostenibilidad').should('be.visible');
  });

  it('debe navegar a pantallas disponibles desde la página principal', () => {
    // Dashboard Corporativo
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    cy.contains('Dashboard Corporativo').should('be.visible');
    cy.contains('←').click();
    cy.shouldBeOnPage('/');

    // Lecciones
    cy.contains('Lecciones').click();
    cy.shouldBeOnPage('/lessons');
    cy.contains('Lecciones').should('be.visible');
    cy.contains('←').click();
    cy.shouldBeOnPage('/');
  });

  it('debe navegar a pantallas CRUD desde configuración', () => {
    // Ir a configuración
    cy.contains('⚙️').click();
    cy.shouldBeOnPage('/settings');

    const crudScreens = [
      { button: 'Empleados', route: '/employees', title: 'Gestión de Empleados' },
      { button: 'Empresas', route: '/companies', title: 'Gestión de Empresas' },
      { button: 'Áreas', route: '/areas', title: 'Gestión de Áreas' },
      { button: 'Actividades', route: '/activities', title: 'Gestión de Actividades' },
    ];

    crudScreens.forEach(screen => {
      cy.contains(screen.button).click();
      cy.shouldBeOnPage(screen.route);
      cy.contains(screen.title).should('be.visible');
      
      // Volver a configuración
      cy.contains('←').click();
      cy.shouldBeOnPage('/settings');
    });
  });

  it('debe navegar al dashboard corporativo', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    cy.contains('Dashboard Corporativo').should('be.visible');
    
    // Volver a la página principal
    cy.contains('←').click();
    cy.shouldBeOnPage('/');
  });

  it('debe navegar a los formularios desde las pantallas CRUD', () => {
    // Ir a configuración primero
    cy.contains('⚙️').click();
    cy.shouldBeOnPage('/settings');
    
    // Probar navegación a formulario de empleados
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('+').click();
    cy.shouldBeOnPage('/employee-form');
    cy.contains('Nuevo Empleado').should('be.visible');
    
    // Volver
    cy.contains('←').click();
    cy.shouldBeOnPage('/employees');
    
    cy.contains('←').click();
    cy.shouldBeOnPage('/settings');
  });

  it('debe manejar navegación con botón back', () => {
    // Navegar a través de múltiples pantallas
    cy.contains('⚙️').click();
    cy.shouldBeOnPage('/settings');
    
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    cy.get('text').contains('+').click();
    cy.shouldBeOnPage('/employee-form');
    
    // Usar botón back
    cy.contains('←').click();
    cy.shouldBeOnPage('/employees');
    
    cy.contains('←').click();
    cy.shouldBeOnPage('/settings');
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
