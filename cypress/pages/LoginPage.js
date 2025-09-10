/// <reference types="cypress" />


export default class LoginPage {

  //Locators
  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'

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

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
  }
}
