/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class CartPage extends BasePage {

  //Locators

  continueShoppingButton = '#continue-shopping'
  checkoutButton = '#checkout'
  productListItem = '[data-test="inventory-item"]'


  verifyVisibilityOfContinueShoppingButton() {
    cy.get(this.continueShoppingButton).should('be.visible')
  }

  verifyVisibilityOfCheckoutButton() {
    cy.get(this.checkoutButton).should('be.visible')
  }

  verifyCartIsEmpty() {
    cy.get(this.productListItem).should('not.exist')
  }

}