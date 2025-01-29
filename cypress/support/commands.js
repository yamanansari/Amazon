import 'cypress-iframe'
import { LoginPage } from '../support/pageObjects/loginPage';

// Cypress.Commands.add('amazonLogin', (email, password) => {
//   const loginPage = new LoginPage();
  
//   loginPage.typeInEmail(email);
//   loginPage.clickContinue();
//   loginPage.typeInPassword(password, { log: false });
//   loginPage.clickSignIn();
// });
Cypress.Commands.add('login', (email, password) => {
  const loginPage = new LoginPage();
  cy.session([email, password], () => {
      // Visit the login page
      cy.visit('/');
      cy.get("#nav-link-accountList").click();
      // Fill in email and password
      cy.get("[id*='ap_email']").type(email);
      cy.get('#continue').click();
      cy.get('#ap_password').type(password, { log: false });
      cy.get('#signInSubmit').click();

      loginPage.validateLogInUrl(); 
      loginPage.validateLogInUser();

      cy.getCookies().then((cookies) => {
        cy.writeFile('cypress/fixtures/session.json', { cookies });
    });
    
  });

});
