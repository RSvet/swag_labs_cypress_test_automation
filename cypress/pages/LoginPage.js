/// <reference types="cypress" />

import BasePage from "./BasePage"


export default class LoginPage extends BasePage {

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
    this.typeText(this.usernameInput, username)
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password)
  }

  clickLoginButton() {
    this.clickElement(this.loginButton)
  }

  //Perform login
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
  }

  //Validate error message 
  verifyErrorMessage(message) {
    this.verifyPageUrl('/')
    cy.get(this.errorMessage).should('contain.text', message)
  }

  //Validate login button is present
  verifyLoginButtonIsDisplayed() {
    cy.get(this.loginButton).should('have.value', 'Login')
  }
}
