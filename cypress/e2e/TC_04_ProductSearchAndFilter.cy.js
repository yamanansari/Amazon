
import { url,validEmail,validPassword} from "../support/constants";
import { LoginPage } from "../support/pageObjects/loginPage";
import { ProductSearchPage } from "../support/pageObjects/ProductSearchPage";

const productSearchPage = new ProductSearchPage();
const loginPage = new LoginPage();
describe('Amazon Product Search and Filter', () => {
    
    beforeEach(function () {  
        cy.readFile('cypress/fixtures/session.json').then((session) => {
            session.cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
            });
        });
       cy.visit(url,{
               headers:{"Accept-Encoding": "gzip , deflate"}
               });
           loginPage.validateLogInUrl(); 
           loginPage.validateLogInUser();

           cy.fixture('product').then((product) => {
            this.product = product;
        });
               });

    
     it('Should search for products and apply filters', function () {
      
        cy.visit('/')
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
