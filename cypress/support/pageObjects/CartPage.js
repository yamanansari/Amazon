const selectors = {
    cart: {
    proceedToCheckoutButton: "[name='proceedToRetailCheckout']",
    quantityDropdownButton: ".a-dropdown-prompt",
    quantityDropdown: "#quantity", 
    },
    verifyProductAdded:{
        productTitle: "span.sc-product-title"
    }
}

export class CartPage {

    verifyProductAdded(productName) {
        return cy.get(selectors.verifyProductAdded.productTitle).should('contain', productName);
    }
    verifyAndSetQuantityToOne(productName) {

        return cy.get(selectors.verifyProductAdded.productTitle)
        .contains(productName)
        .closest('div.sc-list-item')
        .within(() => {
            cy.get(selectors.cart.quantityDropdownButton).click();

            cy.get(selectors.cart.quantityDropdown).select("1",{force:true});
        });
    }
    proceedToCheckout() {
        return cy.get(selectors.cart.proceedToCheckoutButton).click();
    }
}