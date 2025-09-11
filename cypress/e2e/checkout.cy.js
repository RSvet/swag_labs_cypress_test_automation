/// <reference types="cypress" />

import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"
import Header from "../pages/Header"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
const loginPage = new LoginPage()
const productsPage = new ProductsPage()
const header = new Header()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
describe('Checkout information page test scenarios', () => {
  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)

    productsPage.addDifferentProducts(1).then(() => {
      header.openCart()
      cartPage.clickOnCheckoutButton()
    })
  })

  describe('Checkout information page display', () => {
    it.only('TC-030: UI verification of "Checkout: Your Information" page', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.verifyInputFirstNameIsVisible()
      checkoutPage.verifyInputLastNameIsVisible()
      checkoutPage.verifyInputZipCodeIsVisible()
      checkoutPage.verifyCancelButtonIsVisible()
      checkoutPage.verifyContinueButtonIsVisible()

    })
  })
})