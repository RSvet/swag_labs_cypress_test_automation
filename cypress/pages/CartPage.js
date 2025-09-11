/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class CartPage extends BasePage {

  //Locators

  continueShoppingButton = '#continue-shopping'
  checkoutButton = '#checkout'
  cartListItem = '[data-test="inventory-item"]'
  cartListItemName = '[data-test="inventory-item-name"]'
  cartListItemPrice = '[data-test="inventory-item-price"]'
  cartListItemDescription = '[data-test="inventory-item-desc"]'
  quantityContainer = '[data-test="item-quantity"]'
  removeButton = (name) => `[data-test="remove-${name.toLowerCase().replace(/ /g, '-')}"]`


  verifyVisibilityOfContinueShoppingButton() {
    cy.get(this.continueShoppingButton).should('be.visible')
  }

  verifyVisibilityOfCheckoutButton() {
    cy.get(this.checkoutButton).should('be.visible')
  }

  verifyCartIsEmpty() {
    cy.get(this.cartListItem).should('not.exist')
  }

  verifyCartItemName(name) {
    cy.get(this.cartListItemName).should('have.text', name)
  }

  verifyCartItemPrice(price) {
    cy.get(this.cartListItemPrice).should('have.text', price)
  }

  verifyCartItemDescription(description) {
    cy.get(this.cartListItemDescription).should('have.text', description)
  }

  verifyNumberOfProductsInCart(numOfProducts) {
    cy.get(this.cartListItem).should('have.length', numOfProducts)
  }


  /**
   * Verifies details of added product in the cart
   * @param {array} addedProducts - array of added product objects
   */
  verifyProductDetailsInCartList(addedProducts) {
    addedProducts.forEach((product, i) => {
      cy.get(this.cartListItem).eq(i).within(() => {
        this.verifyCartItemName(product.name)
        this.verifyCartItemPrice(product.price)
        this.verifyCartItemDescription(product.description)
      })
    })

  }

  removeASingleProduct(productName) {
    cy.get(this.removeButton(productName)).click()
  }

  /**
   * Removes all products added to the cart
   * @param {array} addedProducts - array of products added to the cart
   */

  removeAllAddedProducts(addedProducts) {
    const productNames = addedProducts.map(p => p.name)
    productNames.forEach((name, i) => {
      cy.get(this.removeButton(name)).click()
    })
  }

  /**
   * Change quantity of a product in a cart
   * @param {number} change - update for quantity
   */
  changeQuantity(change) {
    cy.get(this.quantityContainer).first().invoke('text').then(quantity => {
      const currentQuantity = quantity * 1
      cy.get(this.quantityContainer).first().type(currentQuantity + change)
    })
  }



}