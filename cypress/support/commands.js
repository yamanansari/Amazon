import 'cypress-iframe'
import { LoginPage } from './pageObjects/LoginPage';
import{validEmail,validPassword}from '../support/constants';
const loginPage = new LoginPage();

// // Cypress.Commands.add('amazonLogin', (email, password) => {
// //   const loginPage = new LoginPage();
  
// //   loginPage.typeInEmail(email);
// //   loginPage.clickContinue();
// //   loginPage.typeInPassword(password, { log: false });
// //   loginPage.clickSignIn();
// // });

// Cypress.Commands.add('amazon', () => {
//   cy.session("amazon session ", () => {
//     cy.visit('/');
// // Visit the login page
//       // cy.visit('/');
//       // cy.get("#nav-link-accountList").click();
//       // // Fill in email and password
//       // cy.get("[id*='ap_email']").type(email);
//       // cy.get('#continue').click();
//       // cy.get('#ap_password').type(password, { log: false });
//       // cy.get('#signInSubmit').click();
//     const attemptLogin = (retryCount = 0) => {
//       cy.log(`Login attempt #${retryCount + 1}`);

//       loginPage.visitSignInPage();
//       loginPage.typeInEmail(validEmail);
//       loginPage.clickContinue();
//       loginPage.typeInPassword(validPassword, { log: false });
//       loginPage.clickSignIn();

//       cy.wait(2000); // Wait for CAPTCHA or navigation to appear
      
//       cy.contains("puzzle").then(() => {
        
//         if (retryCount < 2) {
//           cy.log('CAPTCHA detected via URL! Reloading page...');
//           cy.reload().then(() => {
//             attemptLogin(retryCount + 1);
//           });
//         } else {
//           throw new Error('CAPTCHA still detected after 3 attempts. Aborting login.');
//         }

//         cy.log('No CAPTCHA detected. Proceeding with post-login validations.');

//         loginPage.validateLogInUrl(); 
//         loginPage.validateLogInUser();

//         cy.getCookies().then((cookies) => {
//           cy.writeFile('cypress/fixtures/session.json', { cookies });
//         });
//       });
//     };

//     attemptLogin(); // Start the login process
//   });
// });



// // Cypress.Commands.add('amazon', () => {
// //   cy.session("amazon session ", () => {
// //     cy.visit('/');

// //     const attemptLogin = (retryCount = 0) => {
// //       cy.log(` Login attempt #${retryCount + 1}`);

// //       loginPage.visitSignInPage();
// //       loginPage.typeInEmail(validEmail);
// //       loginPage.clickContinue();
// //       loginPage.typeInPassword(validPassword, { log: false });
// //       loginPage.clickSignIn();

// //       cy.wait(2000); // Wait for CAPTCHA or navigation to appear

// //       cy.document().then((doc) => {
// //         const hasCaptcha =
// //           doc.querySelector('#captchacharacters') ||
// //           doc.querySelector('iframe[src*="captcha"]') ||  
// //           doc.querySelector('[name*="captcha_token"]';

// //         if (hasCaptcha) {
// //           if (retryCount < 2) {
// //             cy.log(' CAPTCHA detected! Refreshing page and retrying login...');
// //             cy.reload().then(() => {
// //               attemptLogin(retryCount + 1);
// //             });
// //           } else {
// //             throw new Error('CAPTCHA still detected after 3 attempts. Aborting login.');
// //           }
// //         } else {
// //           cy.log(' No CAPTCHA detected. Proceeding with post-login validations.');

// //           loginPage.validateLogInUrl(); 
// //           loginPage.validateLogInUser();

// //           cy.getCookies().then((cookies) => {
// //             cy.writeFile('cypress/fixtures/session.json', { cookies });
// //           });
// //         }
// //       });
// //     };

// //     attemptLogin(); // Start the login process
// //   });
// // });

Cypress.Commands.add('amazon', () => {
  cy.session("amazon session", () => {
    cy.visit('/');

    const attemptLogin = (retryCount = 0) => {
      cy.log(`Login attempt #${retryCount + 1}`);

      loginPage.visitSignInPage();
      loginPage.typeInEmail(validEmail);
      loginPage.clickContinue();
      loginPage.typeInPassword(validPassword, { log: false });
      loginPage.clickSignIn();

      cy.wait(2000); // Wait for potential redirect or CAPTCHA

      cy.url().then((currentUrl) => {
        if (currentUrl.includes('/?ref_=nav_ya_signin')) {
          cy.log('No CAPTCHA detected. Proceeding with post-login validations.');

          loginPage.validateLogInUrl();
          loginPage.validateLogInUser();

          cy.getCookies().then((cookies) => {
            cy.writeFile('cypress/fixtures/session.json', { cookies });
          });
        } else {
          // Check for CAPTCHA
          cy.document().then((doc) => {
            const captchaPresent =
              doc.querySelector('#captchacharacters') ||
              doc.querySelector('iframe[src*="captcha"]') ||
              doc.querySelector('[name*="captcha_token"]') ||
              doc.body.innerText.toLowerCase().includes("puzzle");

            if (captchaPresent) {
              if (retryCount < 2) {
                cy.log('CAPTCHA detected! Retrying login...');
                cy.reload().then(() => attemptLogin(retryCount + 1));
              } else {
                throw new Error('CAPTCHA still detected after 3 attempts. Aborting login.');
              }
            } else {
              // If URL doesn’t contain the expected ref but there's no CAPTCHA, still proceed cautiously
              cy.log('No CAPTCHA detected and URL is different. Proceeding with validations.');

              loginPage.validateLogInUrl();
              loginPage.validateLogInUser();

              cy.getCookies().then((cookies) => {
                cy.writeFile('cypress/fixtures/session.json', { cookies });
              });
            }
          });
        }
      });
    };

    attemptLogin(); // Start login process
  });
});
