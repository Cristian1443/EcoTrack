describe('Dashboard Corporativo', () => {
  beforeEach(() => {
    // Visitar la página principal
    cy.visitAndWait('/');
  });

  it('debe mostrar el botón de Dashboard Corporativo', () => {
    cy.contains('Dashboard Corporativo').should('be.visible');
  });

  it('debe navegar al dashboard cuando se hace clic', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
  });

  it('debe mostrar las métricas principales en el dashboard', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Verificar que las métricas están presentes
    cy.contains('Resumen Ejecutivo').should('be.visible');
    cy.contains('Empleados Activos').should('be.visible');
    cy.contains('XP Total').should('be.visible');
    cy.contains('Metas Completadas').should('be.visible');
    cy.contains('Actividades este Mes').should('be.visible');
  });

  it('debe mostrar las acciones rápidas', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Verificar acciones rápidas
    cy.contains('Acciones Rápidas').should('be.visible');
    cy.contains('Gestionar Empleados').should('be.visible');
    cy.contains('Ver Actividades').should('be.visible');
    cy.contains('Revisar Metas').should('be.visible');
    cy.contains('Gestionar Áreas').should('be.visible');
  });

  it('debe mostrar el ranking de top performers', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Verificar ranking
    cy.contains('Top Performers').should('be.visible');
    cy.contains('#1').should('be.visible'); // Primer lugar
    cy.contains('Elena Ramirez').should('be.visible'); // Ejemplo de empleado
  });

  it('debe mostrar el gráfico de rendimiento por área', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Verificar gráfico de áreas
    cy.contains('Rendimiento por Área').should('be.visible');
    cy.contains('Sostenibilidad').should('be.visible');
    cy.contains('Tecnología').should('be.visible');
  });

  it('debe navegar desde acciones rápidas a módulos específicos', () => {
    cy.contains('Dashboard Corporativo').click();
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Probar navegación a empleados
    cy.contains('Gestionar Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Volver al dashboard
    cy.go('back');
    cy.shouldBeOnPage('/corporate-dashboard');
    
    // Probar navegación a actividades
    cy.contains('Ver Actividades').click();
    cy.shouldBeOnPage('/activities');
  });

  it('debe ser responsive en diferentes tamaños de pantalla', () => {
    // Probar en móvil
    cy.viewport(375, 667);
    cy.contains('Dashboard Corporativo').click();
    cy.contains('Resumen Ejecutivo').should('be.visible');
    
    // Probar en tablet
    cy.viewport(768, 1024);
    cy.contains('Resumen Ejecutivo').should('be.visible');
    
    // Probar en desktop
    cy.viewport(1280, 720);
    cy.contains('Resumen Ejecutivo').should('be.visible');
  });
});
