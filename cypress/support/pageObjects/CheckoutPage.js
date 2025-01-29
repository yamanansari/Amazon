const selectors = {
    checkout: {
        addressForm: {
            addNewAddress: "#add-new-address-popover-link",
            fullName: "#address-ui-widgets-enterAddressFullName",
            phoneNumber: "#address-ui-widgets-enterAddressPhoneNumber",
            postalCode: "#address-ui-widgets-enterAddressPostalCode",
            addressLine1: "#address-ui-widgets-enterAddressLine1",
            addressLine2: "#address-ui-widgets-enterAddressLine2",
            city: "#address-ui-widgets-enterAddressCity",
            useAddressButton: "#address-ui-widgets-form-submit-button",
        },
        addressValidation: {
            addressChangebutton : "#addressChangeLinkId",
            addressCheck: "ul.displayAddressUL",
            displayAddressFullName: "li.displayAddressFullName",
            displayAddressAddressLine1: "li.displayAddressAddressLine1",
            displayAddressAddressLine2: "li.displayAddressAddressLine2",
            displayAddressCityStateOrRegionPostalCode: "li.displayAddressCityStateOrRegionPostalCode"

        }
    }
};
export class CheckoutPage {
    
    fillAddressDetails(address) {
        // Check if the "Change delivery address" button exists and is visible
        // cy.contains(selectors.checkout.addressValidation.addressChangebutton).then($changeAddress => {
        //     if ($changeAddress.is(':visible')) {
        //         // If button is visible, click on it
        //         cy.contains(selectors.checkout.addressValidation.addressChangebutton).click();
        //     }
        // });
        // Proceed with adding a new address
        cy.get(selectors.checkout.addressForm.addNewAddress).click();
        cy.get(selectors.checkout.addressForm.fullName).type(address.fullName);
        cy.get(selectors.checkout.addressForm.phoneNumber).type(address.phoneNumber);
        cy.get(selectors.checkout.addressForm.postalCode).type(address.postalCode);
        cy.get(selectors.checkout.addressForm.addressLine1).type(address.addressLine1);
        cy.get(selectors.checkout.addressForm.addressLine2).type(address.addressLine2);
        cy.get(selectors.checkout.addressForm.city).type(address.city);
        return cy.get(selectors.checkout.addressForm.useAddressButton).click();
    }
    validateAddress(address){
        cy.get(selectors.checkout.addressValidation.addressChangebutton).should('exist');
        cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressFullName)
        .should('have.text', address.fullName);

        cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressAddressLine1)
        .should('have.text', address.addressLine1);

        cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressAddressLine2)
        .should('have.text', address.addressLine2);

    return  cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressCityStateOrRegionPostalCode)
        .should('include.text', address.city)
        .and('include.text', address.postalCode);


      
    }
}
