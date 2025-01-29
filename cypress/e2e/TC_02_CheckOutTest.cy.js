
import { url,validEmail,validPassword } from "../support/constants";
import { CartPage } from "../support/pageObjects/CartPage";
import { CheckoutPage } from "../support/pageObjects/CheckoutPage";
import { ProductPage } from "../support/pageObjects/ProductPage";
import { ProductSearchPage } from "../support/pageObjects/ProductSearchPage";
import { LoginPage } from "../support/pageObjects/loginPage";

const productSearchPage = new ProductSearchPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const loginPage = new LoginPage();

describe('Amazon.in Product Search, Add to Cart and Checkout Test', () => {
                  
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
              
        // Visit the Amazon login page before each test
        cy.fixture('product').then((product) => {
            this.product = product;
        });
        cy.fixture('address').then((address) => {
            this.address = address;
        });
        
    });
    it('Search for a product, add it to the cart, and proceed to checkout',function () {

        cy.visit('/')
         // Search for the product
         productSearchPage.typeInSearchBar(this.product.name);
         productSearchPage.clickSearchButton();
 
         // Select the specific product
         productSearchPage.selectProduct(this.product.name);
 
         // Add the product to the cart
         productPage.addToCart();
 
         // Go to the cart and verify the product is added
         productPage.goToCart();
         cartPage.verifyProductAdded(this.product.name);
         cartPage.verifyAndSetQuantityToOne(this.product.name)
 
         // Proceed to checkout
         cartPage.proceedToCheckout();
 
         // Fill in the necessary details (address, payment method)
         checkoutPage.fillAddressDetails(this.address);
         checkoutPage.validateAddress(this.address);
        });
    });