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
        starRating: ".ryp__star__button", 
        reviewTitle: "#scarface-review-title-label",
        reviewText: "#scarface-review-text-card-title",
        submitButton: '[data-hook="ryp-review-submit-button"]',
        submittedReview: ".ryp__thank-you-title",
    }
};


export class AccountPage {
    navigateToYourOrders() {
        cy.get(selectors.accountMenu.accountMenuButton).trigger('mouseover');
        return cy.get(selectors.accountMenu.yourOrders).click();
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
        .should('contain', "Review submitted - Thank you!");
    }

}