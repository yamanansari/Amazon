
import { url,validEmail,validPassword } from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();
const invalidEmail = 'afjsakdj';
const invalidPassword = 'asd';

describe('Amazon Login Tests', () => {
  beforeEach(function () {  
    cy.readFile('cypress/fixtures/session.json').then((session) => {
      session.cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value);
      });
  });
    });

  it('Should login successfully with valid email and password', () => {
       
    cy.visit(url)
     // validate login
    loginPage.validateLogInUrl(); 
    loginPage.validateLogInUser();
    
  });
});

