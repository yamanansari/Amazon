const selectors = {
    productPage: {
        addToCartButton: "#add-to-cart-button.a-button-input",
        addToWishlistButton: "[title='Add to Wish List']", 
        viewWishlistLink: "#huc-view-your-list-button", 
    },
    checkOut: {
        cartButton: "#nav-cart",
        proceedToCheckoutButton: "[name='proceedToRetailCheckout']",
    }
};

export class ProductPage {
    addToCart() {
        // Click on add to cart button
        return cy.get(selectors.productPage.addToCartButton).eq(0).click({force:true});
    }
    proceedToCheckout() {
        // Click on proceed to checkout button
        return cy.get(selectors.checkOut.proceedToCheckoutButton).click();
    }
    goToCart() {
        // Click on go to cart button
        return cy.get(selectors.checkOut.cartButton).should('be.visible').click();
    }
    addToWishlist() {
        // Click on the add to wishlist button
        return cy.get(selectors.productPage.addToWishlistButton).click({force:true});
    }
    navigateToWishlist() {
        // Navigate to the wishlist page
        return cy.get(selectors.productPage.viewWishlistLink).click();
    }
    
}
