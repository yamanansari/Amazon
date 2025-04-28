/// <reference types='cypress' />

// import { url, validEmail, validPassword } from "../support/constants";
import { ProductPage } from "../support/pageObjects/ProductPage";
import { ProductSearchPage } from "../support/pageObjects/ProductSearchPage";
import { WishlistPage } from "../support/pageObjects/WishListPage";
import { LoginPage } from "../support/pageObjects/loginPage";

const loginPage = new LoginPage();
const wishlistPage = new WishlistPage();
const productSearchPage = new ProductSearchPage();
const productPage = new ProductPage();

describe('Amazon.in Wishlist Test', () => {
    
      beforeEach(function () {  
        cy.readFile('cypress/fixtures/session.json').then((session) => {
            session.cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
            });
        });
        // cy.visit(url,{
        //         headers:{"Accept-Encoding": "gzip , deflate"}
        //         });
        //     loginPage.validateLogInUrl(); 
        //     loginPage.validateLogInUser();

            cy.fixture('product').then((product) => {
                this.product = product;
            });
                });


    it('Should add a product to the wishlist and verify it', function () { 
        
        cy.visit('/')
        // Search for the product
        productSearchPage.typeInSearchBar(this.product.productName);
        productSearchPage.clickSearchButton();

        // Select the specific product
        productSearchPage.selectProduct(this.product.productName);

        // Add the product to the wishlist
        productPage.addToWishlist();

        // Navigate to the wishlist
        productPage.navigateToWishlist();

        // Verify the product is added to the wishlist
        wishlistPage.verifyItemInWishlist(this.product.productName);
   
        wishlistPage.navigateToWishlist();
        wishlistPage.searchItemInWishList(this.product.name);

        // Remove the product from the wishlist
        wishlistPage.removeItemFromWishlist(this.product.name);

        // Verify the product is removed from the wishlist
        wishlistPage.verifyRemoveItemFromWishlist();
        wishlistPage.recheckItemRemovedFromWishList(this.product.name);
    });
});

