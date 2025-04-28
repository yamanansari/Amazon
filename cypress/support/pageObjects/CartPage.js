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
            function decreaseUntilOne() {
                cy.get(selectors.cart.quantityCheck).then(($input) => {
                    const currentQuantity = parseInt($input.val(), 10);
                    if (currentQuantity > 1) {
                        cy.get(selectors.cart.quantityStepper)
                            .find(selectors.cart.decreaseQuantityButton)
                            .click({ force: true });
                        // After clicking, recursively call again
                        decreaseUntilOne();
                    } else {
                        // Quantity is now 1, nothing more to do
                        cy.log('Quantity is now 1');
                    }
                });
            }

            decreaseUntilOne();

            // Final check after ensuring quantity is 1
            cy.get(selectors.cart.quantityCheck)
              .should('have.value', '1');
        });
    }
    proceedToCheckout() {
        return cy.get(selectors.cart.proceedToCheckoutButton).click();
    }
}