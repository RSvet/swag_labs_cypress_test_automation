/// <reference types="cypress" />

import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import checkoutInfo from "../fixtures/checkoutInfo"
import LoginPage from "../pages/LoginPage"
import Header from "../pages/Header"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import OverviewPage from "../pages/OverviewPage"
const loginPage = new LoginPage()
const header = new Header()
const productsPage = new ProductsPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
const overviewPage = new OverviewPage()

describe('Overview page tests', () => {
  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
  })

  describe('Checkout overview page display', () => {
    it('TC-038: UI verification of "Checkout: Overview" page', () => {
      productsPage.addDifferentProducts(1).then(() => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
        checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        checkoutPage.clickContinueButton()
        overviewPage.verifyPageLoaded(pageData.overview)
        overviewPage.verifyNumberOfProductsOnOverviewPage(1)
        overviewPage.verifyPaymentLabelIsVisible()
        overviewPage.verifyShippingLabelIsVisible()
        overviewPage.verifyPriceLabelIsVisible()
        overviewPage.verifyCancelButtonIsVisible()
        overviewPage.verifyFinishButtonIsVisible()
      })
    })
  })

  describe('Validation of product information', () => {
    it('TC-039: Validate products and totals on Overview page', () => {
      productsPage.addDifferentProducts(3).then((addedProduct) => {
        header.openCart()
        cartPage.clickOnCheckoutButton()
        checkoutPage.verifyPageLoaded(pageData.checkout)
        checkoutPage.populateInfoForm(checkoutInfo.validFirstName, checkoutInfo.validLastName, checkoutInfo.validZipCode)
        checkoutPage.clickContinueButton()
        overviewPage.verifyPageLoaded(pageData.overview)
        overviewPage.verifyProductDetailsInOverviewList(addedProduct)
      })
      overviewPage.verifySubtotal();
      overviewPage.verifyTax();
      overviewPage.verifyTotal();
    })

  })
})