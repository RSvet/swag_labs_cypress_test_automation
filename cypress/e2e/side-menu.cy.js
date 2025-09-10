/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import page_data from "../fixtures/pageData"
import SideMenu from "../pages/SideMenu"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"

const sideMenu = new SideMenu()
const loginPage = new LoginPage()
const productsPage = new ProductsPage()

describe('Side menu navigation', () => {

  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
    productsPage.verifyPageLoaded(page_data.products)
  })

  it('TC-008: Navigate to About page', () => {
    sideMenu.navigateToAbout()
    cy.origin('https://saucelabs.com', { args: { page_data } }, ({ page_data }) => {
      // Ignore expected uncaught exceptions
      cy.on('uncaught:exception', (err) => {
        if (err.message.includes('Things went bad')) {
          return false;
        }
      });
      // Verify if user is on about page on different domain
      cy.url().should('include', page_data.about.url);
      cy.title().should('include', page_data.about.title)

    });
  })

  it('TC-009: Logout via side menu', () => {
    sideMenu.logout()
    loginPage.verifyPageUrl(page_data.login.url)
    loginPage.verifyLoginButtonIsDisplayed()
  })

  it('TC-010: Navigate to Products page', () => {
    productsPage.openCart()
    sideMenu.navigateToAllItems()
    productsPage.verifyPageLoaded(page_data.products)
  })

  it('TC-011: Reset app state clears cart', () => {
    productsPage.addProducts(1).then(addedProduct => {
      productsPage.verifyAddedProductQuantity(1)
      sideMenu.resetAppState()
      productsPage.verifyResetState(addedProduct)
    })
  })

  it('TC-012: Reset app state sorts products to default', () => {
    productsPage.sortProductsBy('Name (Z to A)')
    productsPage.verifyProductsSortedByName('desc')
    sideMenu.resetAppState()
    productsPage.verifyProductsSortedByName('asc')
  })


})