/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import LoginPage from "../pages/LoginPage"
import Header from "../pages/Header"
import CartPage from "../pages/CartPage"
import ProductsPage from "../pages/ProductsPage"

const loginPage = new LoginPage()
const header = new Header()
const cartPage = new CartPage()
const productPage = new ProductsPage()

describe('Cart page scenarios', () => {
  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
  })

  describe('Cart page display', () => {
    it('TC-021: Empty cart display', () => {
      header.openCart()
      cartPage.verifyPageLoaded(pageData.cart)
      cartPage.verifyVisibilityOfContinueShoppingButton()
      cartPage.verifyVisibilityOfCheckoutButton()
      cartPage.verifyCartIsEmpty()
    })
  })

  describe('Add/Remove products and verify display in cart', () => {
    it('TC-022: Single product added to cart', () => {
      productPage.addDifferentProducts(1).then(addedProduct => {
        header.openCart()
        cartPage.verifyProductDetailsInCartList(addedProduct)
        cartPage.removeAllAddedProducts(addedProduct)
      })
      cartPage.verifyCartIsEmpty()
    })

    it('TC-023: Multiple products added to cart', () => {
      productPage.addDifferentProducts(3).then(addedProducts => {
        header.openCart()
        cartPage.verifyProductDetailsInCartList(addedProducts)

        cartPage.removeASingleProduct(addedProducts[2].name)
        const remainingProducts = addedProducts.filter(p => p.name !== addedProducts[2].name)
        header.verifyAddedProductQuantity(remainingProducts.length)
        cartPage.verifyProductDetailsInCartList(remainingProducts)
        cartPage.verifyNumberOfProductsInCart(remainingProducts.length)
      })

    })

    it('TC-024: Update product quantity in the cart', () => {
      productPage.addDifferentProducts(1).then(addedProduct => {
        header.openCart()
        cartPage.changeQuantity(3)
      })

    })
  })
})