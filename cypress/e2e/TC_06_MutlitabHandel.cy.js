/// <reference types='cypress' />

// import { url,validEmail,validPassword } from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();

describe('Amazon Login Tests', () => {

  beforeEach(function () {
    cy.readFile('cypress/fixtures/session.json').then((session) => {
        session.cookies.forEach((cookie) => {
            cy.setCookie(cookie.name, cookie.value);
        });
    });
      //  cy.visit(url,{
      //          headers:{"Accept-Encoding": "gzip , deflate"}
      //          });
      //      loginPage.validateLogInUrl(); 
      //      loginPage.validateLogInUser();
        });

  it.skip('Should login successfully with valid email and password', () => {
    
    // visit prime video url
    loginPage.VisitPrimeVideo();
    // validate visited URL
    loginPage.ValidatePrimeURL()
  });
});

