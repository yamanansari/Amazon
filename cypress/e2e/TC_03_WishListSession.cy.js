
import { url, validEmail, validPassword } from "../support/constants";
import { ProductPage } from "../support/pageObjects/ProductPage";
import { ProductSearchPage } from "../support/pageObjects/ProductSearchPage";
import { WishlistPage } from "../support/pageObjects/WishListPage";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();
const wishlistPage = new WishlistPage();
const productSearchPage = new ProductSearchPage();
const productPage = new ProductPage();

describe('Amazon.in Wishlist Test', () => {
    
    // const login = ()=> {
    //     cy.session('login', () => {
    //       // create session of visiting the Amazon login page before each test
    //         cy.visit(url,{
    //             headers:{"Accept-Encoding": "gzip , deflate"}
    //         });
    //         loginPage.visitSignInPage();
    //         // Login
    //         cy.amazonLogin(validEmail, validPassword);
    //         loginPage.validateLogInUrl(); 
    //         loginPage.validateLogInUser();
       
    //     });
    // }
    before(function () {  
        Cypress.config('testIsolation', false);
        cy.clearAllCookies();
        cy.visit(url,{
                headers:{"Accept-Encoding": "gzip , deflate"}
                });
            loginPage.visitSignInPage();
                    // Login
            cy.amazonLogin(validEmail, validPassword);
            loginPage.validateLogInUrl(); 
            loginPage.validateLogInUser();
               
                });
        // login();
       
    
    beforeEach(function(){
        cy.fixture('product').then((product) => {
            this.product = product;
        });
    })


    it('Should add a product to the wishlist and verify it', function () { 
        
        // Search for the product
        //cy.visit(url);
        productSearchPage.typeInSearchBar(this.product.name);
        productSearchPage.clickSearchButton();

        // Select the specific product
        productSearchPage.selectProduct(this.product.name);

        // Add the product to the wishlist
        productPage.addToWishlist();

        // Navigate to the wishlist
        productPage.navigateToWishlist();

        // Verify the product is added to the wishlist
        wishlistPage.verifyItemInWishlist(this.product.name);
    });

    it('Should remove a product from the wishlist and verify it', function () {  
        //cy.visit(url);
        // Navigate to the wishlist
        wishlistPage.navigateToWishlist();
        wishlistPage.searchItemInWishList(this.product.name);

        // Remove the product from the wishlist
        wishlistPage.removeItemFromWishlist(this.product.name);

        // Verify the product is removed from the wishlist
        wishlistPage.verifyRemoveItemFromWishlist();
        wishlistPage.recheckItemRemovedFromWishList(this.product.name);
    });
});

