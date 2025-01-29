const selectors = {
    cart: {
    proceedToCheckoutButton: "[name='proceedToRetailCheckout']",
    quantityCheck: ".sc-quantity-textfield",
    quantityStepper: ".sc-quantity-stepper", 
    decreaseQuantityButton : "[data-action='a-stepper-decrement']"
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
            cy.get(selectors.cart.quantityCheck).then(($input) => {
                const currentQuantity = parseInt($input.val(), 10);
                if (currentQuantity > 1) {
                  cy.get(selectors.cart.quantityStepper)
                    .find(selectors.cart.decreaseQuantityButton) // Find the decrement button
                    .click(); // Click it to reduce quantity by 1
                }
              });
              cy.get(selectors.cart.quantityCheck)
              .should('have.value', '1')
        });
    }
    proceedToCheckout() {
        return cy.get(selectors.cart.proceedToCheckoutButton).click();
    }
}