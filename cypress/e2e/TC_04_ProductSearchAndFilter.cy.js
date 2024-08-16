
import { url} from "../support/constants";
import { ProductSearchPage } from "../support/pageObjects/ProductSearchPage";

const productSearchPage = new ProductSearchPage();

describe('Amazon Product Search and Filter', () => {
    
    beforeEach(function () {
        cy.visit(url,{
            headers:{"Accept-Encoding": "gzip , deflate"}
        });

        cy.fixture('product').then((product) => {
            this.product = product;
        });
        
    });
    
     it('Should search for products and apply filters', function () {
      
        // Search for "smartphone"
        productSearchPage.typeInSearchBar(this.product.searchProduct);
        productSearchPage.clickSearchButton();

        // Apply filters
        productSearchPage.applyBrandFilter(this.product.brandName);
       
        // Verify filtered search results
        productSearchPage.validateFilteredResults();
        productSearchPage.validateBrandFilter(this.product.brandName);
    });
});
