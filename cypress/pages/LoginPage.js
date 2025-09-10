/// <reference types="cypress" />


export default class LoginPage {

  //Locators
  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'
  errorMessage = '[data-test="error"]'

  //Actions
  navigateToLoginPage() {
    cy.visit('/')
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username)
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password)
  }

  clickLoginButton() {
    cy.get(this.loginButton).click()
  }

  //Perform login
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
  }

  //Validate error message 
  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('have.text', message)
  }
}
