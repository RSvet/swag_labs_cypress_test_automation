/// <reference types="cypress" />
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import test_credentials from '../fixtures/credentials'
import page_data from '../fixtures/pageData'

const loginPage = new LoginPage()
const productsPage = new ProductsPage()

describe('Successful login', () => {

  it('TC-001: Login in with correct credentials', () => {
    loginPage.navigateToLoginPage()
    loginPage.login(test_credentials.validUsername, test_credentials.validPassword)
    productsPage.verifyPageLoaded(page_data.products)
  })
})