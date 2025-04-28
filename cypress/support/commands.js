import 'cypress-iframe'
import { LoginPage } from './pageObjects/loginPage';
import{validEmail,validPassword}from '../support/constants';
const loginPage = new LoginPage();

// Cypress.Commands.add('amazonLogin', (email, password) => {
//   const loginPage = new LoginPage();
  
//   loginPage.typeInEmail(email);
//   loginPage.clickContinue();
//   loginPage.typeInPassword(password, { log: false });
//   loginPage.clickSignIn();
// });
Cypress.Commands.add('amazon', () => {
  cy.session("amazon session ", () => {
    cy.visit('/')
        loginPage.visitSignInPage()
        
      // Visit the login page
      // cy.visit('/');
      // cy.get("#nav-link-accountList").click();
      // // Fill in email and password
      // cy.get("[id*='ap_email']").type(email);
      // cy.get('#continue').click();
      // cy.get('#ap_password').type(password, { log: false });
      // cy.get('#signInSubmit').click();
      loginPage.typeInEmail(validEmail);
  loginPage.clickContinue();
  loginPage.typeInPassword(validPassword, { log: false });
  loginPage.clickSignIn();

      loginPage.validateLogInUrl(); 
      loginPage.validateLogInUser();

      cy.getCookies().then((cookies) => {
        cy.writeFile('cypress/fixtures/session.json', { cookies });
    });
    
  });

});
