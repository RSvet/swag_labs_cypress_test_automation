/// <reference types="cypress" />
import pageData from "../fixtures/pageData"
import credentials from "../fixtures/credentials"
import checkoutInfo from "../fixtures/checkoutInfo"
import productsData from "../fixtures/productsData"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"
import Header from "../pages/Header"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import OverviewPage from "../pages/OverviewPage"
import CompletionPage from "../pages/CompletionPage"
const loginPage = new LoginPage()
const header = new Header()
const productsPage = new ProductsPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
const overviewPage = new OverviewPage()
const completionPage = new CompletionPage()

describe('Completion page tests', () => {
  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
  })
  describe('Checkout Complete page display', () => {
    it('TC-042: UI verification of "Checkout: Complete" page', () => {

      productsPage.addDifferentProducts(2).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        checkoutPage.clickContinueButton()
        overviewPage.clickFinishButton()
        completionPage.verifyPageLoaded(pageData.completion)
        completionPage.verifyOrderCompletionMessages()
      })
    })
  })

  describe('Navigation from Complete page', () => {
    it('TC-043: Validate navigation from the page', () => {
      productsPage.addDifferentProducts(1).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        checkoutPage.clickContinueButton()
        overviewPage.clickFinishButton()
        completionPage.verifyBackHomeButtonVisible()
        completionPage.clickBackHomeButton()
        productsPage.verifyAllProductsPresent(productsData.products.length)
      })
    })
  })
})