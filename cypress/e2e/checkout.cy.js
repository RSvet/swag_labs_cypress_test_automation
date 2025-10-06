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
  })

  describe('Checkout information page display', () => {
    it('TC-030: UI verification of "Checkout: Your Information" page', () => {
      productsPage.addDifferentProducts(1).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
        checkoutPage.verifyInputFirstNameIsVisible()
        checkoutPage.verifyInputLastNameIsVisible()
        checkoutPage.verifyInputZipCodeIsVisible()
        checkoutPage.verifyCancelButtonIsVisible()
        checkoutPage.verifyContinueButtonIsVisible()
      })
    })
  })

  describe('Successfull checkout', () => {
    it('TC-031: Submit valid information', () => {
      productsPage.addDifferentProducts(1).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
        checkoutPage.submitForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        overviewPage.verifyPageLoaded(pageData.overview)
      })
    })
  })

  describe('User provides incomplete/incorrect information', () => {
    beforeEach(() => {
      productsPage.addDifferentProducts(1).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
      })
    })
    it('TC-032: Checkout with all empty fields', () => {
      checkoutPage.submitForm(null, null, null)
      checkoutPage.verifyErrorMessage(errorMsgs.missingFirstNameMsg)
    })

    it('TC-033: Checkout without first name', () => {
      checkoutPage.submitForm(null, checkoutInfo.validLastName, checkoutInfo.validZipCode)
      checkoutPage.verifyErrorMessage(errorMsgs.missingFirstNameMsg)
    })

    it('TC-034: Checkout without last name', () => {
      checkoutPage.submitForm(checkoutInfo.validFirstName, null, checkoutInfo.validZipCode)
      checkoutPage.verifyErrorMessage(errorMsgs.missingLastNameMsg)
    })

    it('TC-035: Checkout without zip code', () => {
      checkoutPage.submitForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, null)
      checkoutPage.verifyErrorMessage(errorMsgs.missingZipCodeMsg)
    })

    it('TC-036: Checkout with invalid zip code', () => {
      checkoutPage.submitForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.invalidZipCode)
      checkoutPage.verifyErrorMessage(errorMsgs.invalidZipCodeMsg)
    })
  })

  describe('Navigation from Checkout: Your Information page', () => {
    it('TC-037 Validate navigation from the page', () => {
      productsPage.addDifferentProducts(1).then((addedProduct) => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
        checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        checkoutPage.clickCancelButton()
        cartPage.verifyPageLoaded(pageData.cart)
        cartPage.verifyProductDetailsInCartList(addedProduct)
      })
    })
  })

})