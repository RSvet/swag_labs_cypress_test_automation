/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class CheckoutPage extends BasePage {

  //Locators
  inputFirstName = '[data-test="firstName"]'
  firstNamePlaceholder = 'First Name'
  inputLastName = '[data-test="lastName"]'
  lastNamePlaceholder = 'Last Name'
  inputZipCode = '[data-test="postalCode"]'
  zipCodePlaceholder = 'Zip/Postal Code'
  cancelButton = '#cancel'
  continueButton = '#continue'
  errMsgContainer = '[data-test="error"]'


  //Actions
  verifyInputFirstNameIsVisible() {
    cy.get(this.inputFirstName).should('be.visible')
      .and('have.attr', 'placeholder', this.firstNamePlaceholder)

  }

  verifyInputLastNameIsVisible() {
    cy.get(this.inputLastName).should('be.visible')
      .and('have.attr', 'placeholder', this.lastNamePlaceholder)
  }

  verifyInputZipCodeIsVisible() {
    cy.get(this.inputZipCode).should('be.visible')
      .and('have.attr', 'placeholder', this.zipCodePlaceholder)
  }

  verifyCancelButtonIsVisible() {
    cy.get(this.cancelButton).should('be.visible').and('contain.text', 'Cancel')
  }

  verifyContinueButtonIsVisible() {
    cy.get(this.continueButton).should('be.visible').and('have.value', 'Continue')
  }

  verifyErrorMessage(message) {
    cy.get(this.errMsgContainer).invoke('text').then(text => {
      expect(text.trim()).to.eq(message)
    })
  }

  enterFirstName(name) {
    this.typeText(this.inputFirstName, name)
  }

  enterLastName(lastName) {
    this.typeText(this.inputLastName, lastName)
  }

  enterZipCode(zip) {
    this.typeText(this.inputZipCode, zip)
  }

  populateInfoForm(name, lastName, zip) {
    this.enterFirstName(name)
    this.enterLastName(lastName)
    this.enterZipCode(zip)
  }

  clickContinueButton() {
    this.clickElement(this.continueButton)
  }

  submitForm(firstName, lastName, zip) {
    if (firstName) this.enterFirstName(firstName)
    if (lastName) this.enterLastName(lastName)
    if (zip) this.enterZipCode(zip)
    this.clickContinueButton()
  }

  clickCancelButton() {
    this.clickElement(this.cancelButton)
  }

}