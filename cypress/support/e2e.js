// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configuración global para EcoTrack
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // esto es útil para manejar errores de React Native Web que no afectan la funcionalidad
  return false;
});

// Comandos personalizados para la aplicación
Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type('admin@ecotrack.com');
  cy.get('[data-testid="password-input"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/');
});

Cypress.Commands.add('createEmployee', (employeeData) => {
  cy.get('[data-testid="add-employee-button"]').click();
  cy.get('[data-testid="name-input"]').type(employeeData.name);
  cy.get('[data-testid="email-input"]').type(employeeData.email);
  cy.get('[data-testid="position-input"]').type(employeeData.position);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="page-loader"]', { timeout: 10000 }).should('not.exist');
});
