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
        PrimeURL: "/gp/video/ssoredirect/?ie=UTF8&pvp=%2Fdetail%2Famzn1.dv.gti.635c7633-c016-404d-8561-4c556cd7d6db&ref_=dvm_crs_in_dk_hud_rfy_p_dw&source=standards&token=5AA88DFA9D67585B16D08920442C28AB49C39F2B&pd_rd_w=B3e3Y&content-id=amzn1.sym.eb8314b7-4dd3-415d-a4b6-f9d7cbc90fac&pf_rd_p=eb8314b7-4dd3-415d-a4b6-f9d7cbc90fac&pf_rd_r=D49P9HX8ZVYKQ56A141V&pd_rd_wg=wvZJ6&pd_rd_r=114b4065-bf60-4ebe-97cb-080a247b2ab5"
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
     return cy.get(selectors.validate.validLogIn).should('contain', 'Hello');
    }
    VisitPrimeVideo(){
        //  cy.get(selectors.NewTab.videoLink).invoke('removeAttr', 'target').click({ force: true });
        cy.origin(selectors.NewTab.PrimeURL, ()=>{
            cy.log(cy.url());
            cy.pause();
        });
    }
    ValidatePrimeURL(){
        cy.log(cy.url());
         cy.pause();
       cy.reload();
       cy.log(cy.url());
     cy.pause()
       return cy.get('[data-testid="pv-nav-join-prime"]').should('contain.text','Join Prime');
    }

}
