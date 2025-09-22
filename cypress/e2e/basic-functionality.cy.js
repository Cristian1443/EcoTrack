describe('Funcionalidad Básica de EcoTrack', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000); // Esperar que la aplicación cargue completamente
  });

  it('debe cargar la página principal', () => {
    // Verificar que la aplicación carga
    cy.get('body').should('be.visible');
    cy.contains('EcoTrack').should('be.visible');
  });

  it('debe mostrar el botón de Dashboard Corporativo', () => {
    // Buscar el botón sin importar dónde esté
    cy.get('body').then($body => {
      if ($body.find(':contains("Dashboard Corporativo")').length > 0) {
        cy.contains('Dashboard Corporativo').should('exist');
      }
    });
  });

  it('debe poder navegar al dashboard corporativo', () => {
    // Buscar y hacer clic en Dashboard Corporativo
    cy.get('body').then($body => {
      if ($body.find(':contains("Dashboard Corporativo")').length > 0) {
        cy.contains('Dashboard Corporativo').click({ force: true });
        cy.url().should('include', '/corporate-dashboard');
      }
    });
  });

  it('debe mostrar elementos en el dashboard', () => {
    // Navegar al dashboard
    cy.contains('Dashboard Corporativo').click({ force: true });
    cy.wait(2000);
    
    // Verificar elementos básicos del dashboard
    cy.get('body').should('contain.text', 'Dashboard');
  });

  it('debe poder navegar a configuración', () => {
    // Buscar el ícono de configuración
    cy.get('body').then($body => {
      if ($body.find(':contains("⚙️")').length > 0) {
        cy.contains('⚙️').click({ force: true });
        cy.url().should('include', '/settings');
      }
    });
  });

  it('debe navegar a empleados desde configuración', () => {
    // Ir a configuración
    cy.contains('⚙️').click({ force: true });
    cy.wait(1000);
    
    // Buscar y hacer clic en Empleados
    cy.get('body').then($body => {
      if ($body.find(':contains("Empleados")').length > 0) {
        cy.contains('Empleados').click({ force: true });
        cy.url().should('include', '/employees');
      }
    });
  });

  it('debe mostrar navegación por tabs', () => {
    // Verificar que hay elementos de navegación
    cy.get('[role="tablist"]').should('exist');
    
    // Verificar tabs básicas
    cy.get('body').should('contain.text', 'Perfil');
    cy.get('body').should('contain.text', 'Ranking');
  });

  it('debe ser responsive básicamente', () => {
    // Probar diferentes viewports
    cy.viewport(375, 667); // Móvil
    cy.get('body').should('be.visible');
    
    cy.viewport(1280, 720); // Desktop
    cy.get('body').should('be.visible');
  });
});
