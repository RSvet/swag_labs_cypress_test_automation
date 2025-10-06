/// <reference types="cypress" />
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import test_credentials from '../fixtures/credentials'
import page_data from '../fixtures/pageData'
import errorMsgs from '../fixtures/errorMsgs'

const loginPage = new LoginPage()
const productsPage = new ProductsPage()

describe('Login page scenarios', () => {

  beforeEach(() => {
    loginPage.navigateToLoginPage()
  })

  describe('Successful login', () => {
    it('TC-001: Login in with correct credentials', () => {
      loginPage.login(test_credentials.validUsername, test_credentials.validPassword)
      productsPage.verifyLoginSuccessful(page_data.products)
    })
  })

  describe('Missing credentials', () => {
    it('TC-002: Login with correct password and blank username', () => {
      loginPage.enterPassword(test_credentials.validPassword)
      loginPage.clickLoginButton()
      loginPage.verifyErrorMessage(errorMsgs.missingUsernameMsg)
    })

    it('TC-003: Login with correct username and blank password', () => {
      loginPage.enterUsername(test_credentials.validUsername)
      loginPage.clickLoginButton()
      loginPage.verifyErrorMessage(errorMsgs.missingPasswordMsg)
    })

    it('TC-004: Login without credentials', () => {
      loginPage.clickLoginButton()
      loginPage.verifyErrorMessage(errorMsgs.missingUsernameMsg)
    })
  })

  describe('Invalid credentials', () => {
    it('TC-005: Login with invalid username and valid password', () => {
      loginPage.login(test_credentials.invalidUsername, test_credentials.validPassword)
      loginPage.verifyErrorMessage(errorMsgs.invalidCredentialsMsg)
    })

    it('TC-006: Login with valid username and invalid password', () => {
      loginPage.login(test_credentials.validUsername, test_credentials.invalidPassword)
      loginPage.verifyErrorMessage(errorMsgs.invalidCredentialsMsg)
    })

    it('TC-007: Login with invalid username and password', () => {
      loginPage.login(test_credentials.invalidUsername, test_credentials.invalidPassword)
      loginPage.verifyErrorMessage(errorMsgs.invalidCredentialsMsg)
    })
  })

})