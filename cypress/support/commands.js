// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comandos personalizados para EcoTrack

// Comando para navegar y esperar que la página cargue
Cypress.Commands.add('visitAndWait', (url) => {
  cy.visit(url);
  cy.wait(1000); // Esperar a que React Native Web se estabilice
});

// Comando para hacer clic en un botón y esperar navegación
Cypress.Commands.add('clickAndWait', (selector) => {
  cy.get(selector).click();
  cy.wait(500);
});

// Comando para completar un formulario básico
Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach(field => {
    cy.get(`[data-testid="${field}-input"]`).clear().type(formData[field]);
  });
});

// Comando para verificar que un elemento contiene texto
Cypress.Commands.add('shouldContainText', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject).should('contain.text', text);
});

// Comando para esperar y verificar URL
Cypress.Commands.add('shouldBeOnPage', (path) => {
  cy.url().should('include', path);
  cy.wait(500);
});
