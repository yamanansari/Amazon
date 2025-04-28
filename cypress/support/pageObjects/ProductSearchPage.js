const selectors = {
    search:{
    searchBar: "#twotabsearchtextbox", 
    searchButton: "#nav-search-submit-button", 
    },
    filters: {
        brand: "span.a-list-item", 
    },
    results: {
        productTitles: "div[data-cy='title-recipe']", 
        selectProduct: " div[data-cy='title-recipe'] h2 span", 
        productList: ".s-main-slot .s-result-item", 
        productTitle: "span.a-text-normal"
    
    }
};

export class ProductSearchPage {

    typeInSearchBar(searchItem) {
        return cy.get(selectors.search.searchBar).type(searchItem);
    }

    clickSearchButton() {
        return cy.get(selectors.search.searchButton).click();
    }

    getProductTitles() {
        return cy.get(selectors.results.productTitles);
    }

   selectProduct(product) {
   return cy.get(selectors.results.productTitles).contains(product)
    .should('be.visible')
    .closest('a')
    .invoke('attr', 'href')
    .then((href) => {
        cy.visit(`https://www.amazon.in${href}`);
        });
    }

    applyBrandFilter(brandName) {
        return cy.get(selectors.filters.brand).contains(brandName).click();
    }

    validateFilteredResults() { // is not empty 
        return cy.get(selectors.results.selectProduct).should('have.length.greaterThan', 0);
    }
    validateBrandFilter(model) {
        cy.get(selectors.results.selectProduct).should('contain', model).and('be.visible');
    //    return cy.get(selectors.results.selectProduct).each(($el) => {
    //     const regex = new RegExp(model, 'i');
                        
    //         cy.wrap($el).invoke('text') // Fetch the text of the element
    //         .then((text) => {
    //             expect(text).to.match(regex); // Perform a case-insensitive match
    //         });
    //     });
     }
}
