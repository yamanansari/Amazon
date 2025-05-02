const selectors = {
    checkout: {
        addressForm: {
            addNewAddress: "#add-new-address-desktop-sasp-tango-link",
            fullName: "#address-ui-widgets-enterAddressFullName",
            phoneNumber: "#address-ui-widgets-enterAddressPhoneNumber",
            postalCode: "#address-ui-widgets-enterAddressPostalCode",
            addressLine1: "#address-ui-widgets-enterAddressLine1",
            addressLine2: "#address-ui-widgets-enterAddressLine2",
            landmark1: "[name *=landmark]",
            city: "#address-ui-widgets-enterAddressCity",
            useAddressButton: "#checkout-primary-continue-button-id-announce",
            useAddressButton2: '[data-csa-c-slot-id*="continue-address"]',
            shippingAddressChangebutton: '[data-frompage="payselect"]'
        },
        addressValidation: {
            addressChangebutton : '[aria-label="Change delivery address"]',
            changeAddressButton:'#addressChangeLinkId',
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
        
            if (cy.url({timeout:10000}).should('include','checkout')) {
                // If button is visible, click on it
                cy.get(selectors.checkout.addressValidation.addressChangebutton).click();
            }
        // Proceed with adding a new address
        cy.get(selectors.checkout.addressForm.addNewAddress).click();
        cy.get(selectors.checkout.addressForm.fullName).clear().type(address.fullName);
        cy.get(selectors.checkout.addressForm.phoneNumber).clear().type(address.phoneNumber);
        cy.get(selectors.checkout.addressForm.postalCode).clear().type(address.postalCode);
        cy.get(selectors.checkout.addressForm.addressLine1).clear().type(address.addressLine1);
        cy.get(selectors.checkout.addressForm.addressLine2).clear().type(address.addressLine2);
        cy.get(selectors.checkout.addressForm.landmark1).type(address.landmark);
        cy.get(selectors.checkout.addressForm.city).clear().type(address.city);
        return cy.get(selectors.checkout.addressForm.useAddressButton2).click({force:true});
    }
    validateAddress(address){
        cy.get(selectors.checkout.addressValidation.changeAddressButton,{timeout:10000}).should('exist');
        // cy.get("#checkout-paymentOptionPanel",{timeout:10000}).should("contain.text", "Payment method");
        // cy.get("#deliver-to-address-text").should("contain.text", address.addressLine1);
        // cy.get("#deliver-to-address-text").should("contain.text",address.addressLine2);
        // // cy.get("#deliver-to-address-text").should("contain.text",address.landmark);
        // cy.get("#deliver-to-address-text").should("contain.text",address.city);
        // cy.get("#deliver-to-address-text").should("contain.text",address.postalCode);
            cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressFullName)
        .should('have.text', address.fullName);

        cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressAddressLine1)
        .should('have.text', address.addressLine1);

        cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressAddressLine2)
        .should('have.text', address.addressLine2);

    return cy.get(selectors.checkout.addressValidation.addressCheck).find(selectors.checkout.addressValidation.displayAddressCityStateOrRegionPostalCode)
        .should('include.text', address.city)
        .and('include.text', address.postalCode);
     
    }
}
