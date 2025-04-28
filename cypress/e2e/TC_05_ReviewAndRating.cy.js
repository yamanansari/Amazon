/// <reference types='cypress' />

import { reviewText, reviewTitle, url, validEmail, validPassword } from "../support/constants";
// import { LoginPage } from "../support/pageObjects/LoginPage";
import { AccountPage, OrdersPage, ReviewPage } from "../support/pageObjects/AccountAndSubaccountPage";

// const loginPage = new LoginPage();
const accountPage = new AccountPage();
const ordersPage = new OrdersPage();
const reviewPage = new ReviewPage();

describe('Amazon Product Review and Rating', () => {

    beforeEach(function () {  
        cy.readFile('cypress/fixtures/session.json').then((session) => {
            session.cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
            });
        });
    //    cy.visit(url,{
    //            headers:{"Accept-Encoding": "gzip , deflate"}
    //            });
    //        loginPage.validateLogInUrl(); 
    //        loginPage.validateLogInUser();
              
               });
               

    it('Should allow a user to submit a product review and verify it', () => {

        cy.visit('/')
        
        // Navigate to "Your Orders"
        accountPage.navigateToYourOrders();

        // Click "Write a product review"
        ordersPage.clickWriteReviewButton();

        // Rate the product
        reviewPage.rateProduct(5); // 5-star rating

        // Write a review
        reviewPage.writeReview(reviewTitle, reviewText);

        // Submit the review
        reviewPage.submitReview();

        // Validate the review was submitted
        reviewPage.validateReviewSubmission();
    });
});
