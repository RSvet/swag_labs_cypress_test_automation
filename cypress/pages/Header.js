/// <reference types="cypress" />

import BasePage from "./BasePage"

export default class Header extends BasePage {
  menuButton = '.bm-burger-button'
  cartIcon = '.shopping_cart_link'
  quantityIndicator = '[data-test="shopping-cart-badge"]'

  openMenu() {
    this.clickElement(this.menuButton)
  }

  openCart() {
    this.clickElement(this.cartIcon)
  }

  /**
 * Verifies number in the bagde on the cart icon
 * @param {number} quantity - number of added products
 */
  verifyAddedProductQuantity(quantity) {
    cy.get(this.quantityIndicator).should('have.text', quantity)
  }

  /**
 * Verifies there are no added products - no indicator on the cart icon
 */
  verifyThereIsNoQuantity() {
    cy.get(this.quantityIndicator).should('not.exist')
  }

}