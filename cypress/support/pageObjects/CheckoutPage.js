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
            addressCheck: ".displayAddressUL"
        }
    }
};
export class CheckoutPage {
    
    fillAddressDetails(address) {
        cy.get(selectors.checkout.addressForm.addNewAddress).click()
        cy.get(selectors.checkout.addressForm.fullName).type(address.fullName);
        cy.get(selectors.checkout.addressForm.phoneNumber).type(address.phoneNumber);
        cy.get(selectors.checkout.addressForm.postalCode).type(address.postalCode);
        cy.get(selectors.checkout.addressForm.addressLine1).type(address.addressLine1);
        cy.get(selectors.checkout.addressForm.addressLine2).type(address.addressLine2);
        cy.get(selectors.checkout.addressForm.city).type(address.city);
       return cy.get(selectors.checkout.addressForm.useAddressButton).click();
    }
    validateAddress(){
       return cy.get(selectors.checkout.addressValidation.addressChangebutton).should('exist');
    }
}
