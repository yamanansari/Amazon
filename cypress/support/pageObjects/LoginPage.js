import { emailError, passwordError } from "../constants";

const selectors = {
    signIn:{
        signInPage:"#nav-link-accountList"
    },
    inputField: {
        email: "[id*='ap_email']", 
        password: "#ap_password", 
    },
    buttons: {
        continueButton: "#continue", 
        signIn: "#signInSubmit", 
    },
    message:{
        authEmail: ".a-alert-content",
        authError : '#auth-error-message-box',
    } ,
    validate:{
        validLogIn: '#nav-link-accountList-nav-line-1',
    },
    NewTab:{
        videoLink: "[aria-label='Start watching on Prime Video']",
        PrimeURL: "/www.primevideo.com/"
    }
};

export class LoginPage {

    visitSignInPage(){
        return cy.get(selectors.signIn.signInPage).click();
    }
    typeInEmail(email) {
        return cy.get(selectors.inputField.email).type(email);
    }
    clickContinue() {
        return cy.get(selectors.buttons.continueButton).click();
    }
    typeInPassword(password) {
        return cy.get(selectors.inputField.password).type(password);
    }
    clickSignIn() {
        return cy.get(selectors.buttons.signIn).click();
    }
    validateEmailErrorMessage(){
       return cy.get(selectors.message.authEmail).should('be.visible')
       .and('contain', emailError);
    }
    validatePasswordErrorMessage(){
      return cy.get(selectors.message.authError).should('be.visible')
      .and('contain', passwordError);
    }
    validateLogInUrl(){
     return cy.url().should('include','/?ref_=nav_ya_signin');
    }
    validateLogInUser(){
     return cy.get(selectors.validate.validLogIn).should('contain', 'Hello, Yaman');
    }
    VisitPrimeVideo(){
        return cy.get(selectors.NewTab.videoLink).invoke('removeAttr', 'target').click({ force: true });
    }
    ValidatePrimeURL(){
        cy.intercept('GET', '**primevideo.com**').as('primeVideoLoad');
        cy.wait('@primeVideoLoad', { timeout: 10000 });
        cy.url().should('include', 'www.primevideo.com');
   
    }
}
