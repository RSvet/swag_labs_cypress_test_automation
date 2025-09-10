/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import productsData from "../fixtures/productsData"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"

const loginPage = new LoginPage()
const productsPage = new ProductsPage()

describe('Products page scenarios', () => {

  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
  })

  describe('Product cards display', () => {
    it('TC-013: Verify all product cards are visible', () => {
      productsPage.verifyPageLoaded(pageData.products)
      productsPage.verifyAllProductsPresent(productsData.products.length)
    })

    it('TC-014: Verify all product card details', () => {
      productsPage.verifyPageLoaded(pageData.products)
      productsPage.verifyProductsNames(productsData.products)
      productsPage.verifyProductsDescriptions(productsData.products)
      productsPage.verifyProductsPrices(productsData.products)
    })
  })
})