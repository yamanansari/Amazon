const selectors = {
    wishListModal: {
        addToWishlistButton: "#add-to-wishlist-button-submit", 
        viewWishlistLink: "[href*='wishlist'] span", 
    },
    wishlistPage: {
        searchItem: "#itemSearchTextInput",
        wishlistItem: "a[title*='iPhone']", 
        removeButton: "[name='submit.deleteItem']", 
        deletedItem: ".a-row.a-spacing-none .a-alert-content", //"#item_IUATPP4KJX91R > :nth-child(2) > div[aria-live='polite'] i+div",
        zeroItem: ".zero-items-image-section" 
    }
};

export class WishlistPage {
    addToWishlist() {
        // Click on the add to wishlist button
        return cy.get(selectors.wishListModal.addToWishlistButton).click();
    }

    navigateToWishlist() {
        // Navigate to the wishlist page
        return cy.get(selectors.wishListModal.viewWishlistLink)
        .contains('Your Wish List')
        .click({force:true});
    }

    verifyItemInWishlist(product) {
        // Verify if the item is present in the wishlist
        return cy.get(selectors.wishlistPage.wishlistItem)
        .contains(product)
        .should('be.visible');
    }
    searchItemInWishList(product){
        return cy.get(selectors.wishlistPage.searchItem)
        .click()
        .type(product)
        .type("{enter}");
    }
    removeItemFromWishlist() {
        // Remove the item from the wishlist
        return cy.get(selectors.wishlistPage.removeButton).click({ multiple: true });
    }
    verifyRemoveItemFromWishlist() {
        // Verify if the item is present in the wishlist
       return cy.get(selectors.wishlistPage.deletedItem).should('have.text','Deleted');
    }
    recheckItemRemovedFromWishList() {
        cy.get(selectors.wishlistPage.searchItem)
        .click()
        .type("{enter}");

      return cy.get(selectors.wishlistPage.zeroItem).should("exist");
        
    }

}
