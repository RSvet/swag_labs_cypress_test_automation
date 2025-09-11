/// <reference types="cypress" />

import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import checkoutInfo from "../fixtures/checkoutInfo"
import errorMsgs from "../fixtures/errorMsgs"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"
import Header from "../pages/Header"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import OverviewPage from "../pages/OverviewPage"
const loginPage = new LoginPage()
const productsPage = new ProductsPage()
const header = new Header()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
const overviewPage = new OverviewPage()
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
    it('TC-030: UI verification of "Checkout: Your Information" page', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.verifyInputFirstNameIsVisible()
      checkoutPage.verifyInputLastNameIsVisible()
      checkoutPage.verifyInputZipCodeIsVisible()
      checkoutPage.verifyCancelButtonIsVisible()
      checkoutPage.verifyContinueButtonIsVisible()

    })
  })

  describe('Successfull checkout', () => {
    it('TC-031: Submit valid information', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
      checkoutPage.clickContinueButton()
      overviewPage.verifyPageLoaded(pageData.overview)
    })
  })

  describe('User provides incomplete/incorrect information', () => {
    it('TC-032: Checkout with all empty fields', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.clickContinueButton()
      checkoutPage.verifyErrorMessage(errorMsgs.missingFirstNameMsg)
    })

    it('TC-033: Checkout without first name', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.enterLastName(checkoutInfo.validLastName)
      checkoutPage.enterZipCode(checkoutInfo.validZipCode)
      checkoutPage.clickContinueButton()
      checkoutPage.verifyErrorMessage(errorMsgs.missingFirstNameMsg)
    })

    it('TC-034: Checkout without last name', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.enterFirstName(checkoutInfo.validFirstName)
      checkoutPage.enterZipCode(checkoutInfo.validZipCode)
      checkoutPage.clickContinueButton()
      checkoutPage.verifyErrorMessage(errorMsgs.missingLastNameMsg)
    })

    it('TC-035: Checkout without zip code', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.enterFirstName(checkoutInfo.validFirstName)
      checkoutPage.enterLastName(checkoutInfo.validLastName)
      checkoutPage.clickContinueButton()
      checkoutPage.verifyErrorMessage(errorMsgs.missingZipCodeMsg)
    })

    it('TC-036: Checkout with invalid zip code', () => {
      checkoutPage.verifyPageLoaded(pageData.checkout)
      checkoutPage.enterFirstName(checkoutInfo.validFirstName)
      checkoutPage.enterLastName(checkoutInfo.validLastName)
      checkoutPage.enterZipCode(checkoutInfo.invalidZipCode)
      checkoutPage.clickContinueButton()
      checkoutPage.verifyErrorMessage(errorMsgs.invalidZipCode)
    })
  })
})