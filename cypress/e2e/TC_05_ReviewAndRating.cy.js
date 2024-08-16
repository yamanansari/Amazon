
import { reviewText, reviewTitle, url, validEmail, validPassword } from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";
import { AccountPage, OrdersPage, ReviewPage } from "../support/pageObjects/AccountAndSubaccountPage";

const loginPage = new LoginPage();
const accountPage = new AccountPage();
const ordersPage = new OrdersPage();
const reviewPage = new ReviewPage();

describe('Amazon Product Review and Rating', () => {

    beforeEach(() => {
        // Visit the Amazon login page before each test
        cy.visit(url,{
            headers:{"Accept-Encoding": "gzip , deflate"}
        });
        loginPage.visitSignInPage();
    });

    it('Should allow a user to submit a product review and verify it', () => {
        
        // Log in
        cy.amazonLogin(validEmail, validPassword);

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
