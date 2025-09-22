describe('Gestión de Empleados', () => {
  beforeEach(() => {
    cy.visitAndWait('/');
  });

  it('debe navegar a la gestión de empleados', () => {
    // Ir a configuración primero
    cy.contains('⚙️').click();
    cy.shouldBeOnPage('/settings');
    
    // Luego a empleados
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    cy.contains('Gestión de Empleados').should('be.visible');
  });

  it('debe mostrar la lista de empleados existentes', () => {
    // Ir a configuración y luego a empleados
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Verificar que hay empleados en la lista
    cy.contains('Elena Ramirez').should('be.visible');
    cy.contains('Carlos Mendoza').should('be.visible');
    cy.contains('Sofia Vargas').should('be.visible');
    
    // Verificar estadísticas
    cy.contains('Total').should('be.visible');
    cy.contains('Activos').should('be.visible');
    cy.contains('Áreas').should('be.visible');
  });

  it('debe poder filtrar empleados por búsqueda', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Buscar por nombre
    cy.get('input[placeholder*="Buscar empleados"]').type('Elena');
    cy.contains('Elena Ramirez').should('be.visible');
    cy.contains('Carlos Mendoza').should('not.exist');
    
    // Limpiar búsqueda
    cy.get('input[placeholder*="Buscar empleados"]').clear();
    cy.contains('Carlos Mendoza').should('be.visible');
  });

  it('debe poder filtrar empleados por área', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Filtrar por área de Tecnología
    cy.contains('Tecnología').click();
    cy.contains('Carlos Mendoza').should('be.visible');
    cy.contains('Elena Ramirez').should('not.exist');
    
    // Volver a mostrar todos
    cy.contains('Todas').click();
    cy.contains('Elena Ramirez').should('be.visible');
  });

  it('debe navegar al formulario de crear empleado', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Hacer clic en el botón de agregar (+)
    cy.contains('+').click();
    cy.shouldBeOnPage('/employee-form');
    cy.contains('Nuevo Empleado').should('be.visible');
  });

  it('debe poder editar un empleado existente', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Buscar y editar a Elena
    cy.get('input[placeholder*="Buscar empleados"]').type('Elena');
    cy.contains('Editar').first().click();
    cy.shouldBeOnPage('/employee-form');
    cy.contains('Editar Empleado').should('be.visible');
  });

  it('debe mostrar estado activo/inactivo correctamente', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Verificar badges de estado
    cy.contains('Activo').should('be.visible');
    cy.contains('Inactivo').should('be.visible');
  });

  it('debe poder cambiar el estado de un empleado', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Buscar empleado activo y desactivarlo
    cy.get('input[placeholder*="Buscar empleados"]').type('Elena');
    cy.contains('Desactivar').click();
    
    // Verificar que cambió el estado
    cy.contains('Activar').should('be.visible');
  });

  it('debe mostrar mensaje cuando no hay empleados en los filtros', () => {
    cy.contains('⚙️').click();
    cy.contains('Empleados').click();
    cy.shouldBeOnPage('/employees');
    
    // Buscar algo que no existe
    cy.get('input[placeholder*="Buscar empleados"]').type('NoExiste123');
    cy.contains('No se encontraron empleados').should('be.visible');
    cy.contains('Intenta con otros filtros de búsqueda').should('be.visible');
  });
});
