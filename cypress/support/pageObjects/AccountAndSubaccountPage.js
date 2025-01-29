const selectors = {
    accountMenu: {
        accountMenuButton: "#nav-link-accountList",
        yourOrders: "#nav_prefetch_yourorders",
    },
    orders: {
        recentOrder: ".order",
        writeReviewButton: "a[href*='review']",
    },
    review: {
        starRating: "[class*='starRating-single']", 
        reviewTitle: "#reviewTitle",
        reviewText: "#reviewText",
        submitButton: '.a-button-input',
        submittedReview: "[data-testid='in-context-ryp__thankyou-text']",
    }
};


export class AccountPage {
    navigateToYourOrders() {
        cy.get(selectors.accountMenu.accountMenuButton).trigger('mouseover');
        return cy.get(selectors.accountMenu.yourOrders).click({force:true});
    }
}

export class OrdersPage {
  
    clickWriteReviewButton() {
        return cy.get(selectors.orders.writeReviewButton).first().click();
    }
}

export class ReviewPage {
    rateProduct(starIndex) {
        return cy.get(selectors.review.starRating).eq(starIndex-1).click();
    }

    writeReview(title, text) {
        cy.get(selectors.review.reviewTitle).clear().type(title);
        return cy.get(selectors.review.reviewText).clear().type(text);
    }

    submitReview() {
       return cy.get(selectors.review.submitButton).click();
    }

    validateReviewSubmission() {
        return cy.get(selectors.review.submittedReview)
        .should('contain', "Review Submitted");

        // add one more assertion check review added or not or rating is correct 
    }

}