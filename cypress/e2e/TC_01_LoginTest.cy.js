/// <reference types='cypress' />

// import { url,validEmail,validPassword} from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();

describe('Amazon Login Tests', () => {
  before(() => {
    
    cy.amazon(); // Run session login before any test suites
});
  // beforeEach(function () {  
  //   cy.readFile('cypress/fixtures/session.json').then((session) => {
  //     session.cookies.forEach((cookie) => {
  //         cy.setCookie(cookie.name, cookie.value);
  //     });
  // });
  //   });

  it('Should login successfully with valid email and password', () => {
       
    cy.visit('/')
     // validate login
    // loginPage.validateLogInUrl(); 
    loginPage.validateLogInUser();
    
  });
});

