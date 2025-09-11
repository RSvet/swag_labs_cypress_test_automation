/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import LoginPage from "../pages/LoginPage"
import Header from "../pages/Header"
import CartPage from "../pages/CartPage"

const loginPage = new LoginPage()
const header = new Header()
const cartPage = new CartPage()

describe('Cart page scenarios', () => {

  describe('Cart page display', () => {
    it('Empty cart display', () => {
      loginPage.navigateToLoginPage()
      loginPage.login(credentials.validUsername, credentials.validPassword)
      header.openCart()
      cartPage.verifyPageLoaded(pageData.cart)
      cartPage.verifyVisibilityOfContinueShoppingButton()
      cartPage.verifyVisibilityOfCheckoutButton()
      cartPage.verifyCartIsEmpty()
    })
  })
})