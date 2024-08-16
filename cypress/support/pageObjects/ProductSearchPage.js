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
        selectProduct: "h2 span", 
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
   return cy.get(selectors.results.selectProduct).contains(product)
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

    validateFilteredResults() {
        return cy.get(selectors.results.selectProduct).should('have.length.greaterThan', 0);
    }
    validateBrandFilter(brandName) {
       return cy.get(selectors.results.selectProduct).each(($el) => {
            cy.log($el.text());
            cy.wrap($el).should('contain.text', brandName);
        });
    }
}
