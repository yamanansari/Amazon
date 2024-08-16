
import { url,validEmail,validPassword } from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();
const invalidEmail = 'afjsakdj';
const invalidPassword = 'asd';

describe('Amazon Login Tests', () => {
 
  beforeEach(() => {

    // Visit the Amazon login page before each test
    cy.visit(url,{
      headers:{"Accept-Encoding": "gzip , deflate"}
    });
    loginPage.visitSignInPage();
  });

  it('Should show error for invalid email', () => {
    loginPage.typeInEmail(invalidEmail);
    loginPage.clickContinue();
    loginPage.validateEmailErrorMessage();
  });

  it('Should show error for invalid password', () => {
    cy.amazonLogin(validEmail, invalidPassword);
    loginPage.validatePasswordErrorMessage();
  });

  it('Should login successfully with valid email and password', () => {
    cy.amazonLogin(validEmail, validPassword);
    // validate login
    loginPage.validateLogInUrl(); 
    loginPage.validateLogInUser();
    
  });
});

