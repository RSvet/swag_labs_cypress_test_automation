/// <reference types="cypress" />

export default class Header {
  menuButton = '.bm-burger-button'
  cartIcon = '.shopping_cart_link'
  quantityIndicator = '[data-test="shopping-cart-badge"]'

  openMenu() {
    cy.get(this.menuButton).click()
  }

  openCart() {
    cy.get(this.cartIcon).click()
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