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

  verifyCheckoutIsDisabled() {
    cy.get(this.checkoutButton).should('be.disabled')
  }


  /**
   * Verifies details of added product in the cart
   * @param {array} addedProducts - array of added product objects
   */
  verifyProductDetailsInCartList(addedProducts) {
    cy.wrap(addedProducts).each((product, i) => {
      cy.get(this.cartListItem).eq(i).within(() => {
        cy.get(this.cartListItemName).should('have.text', product.name)
        cy.get(this.cartListItemPrice).should('have.text', product.price)
        cy.get(this.cartListItemDescription).should('have.text', product.description)
      })
    })
  }

  removeASingleProduct(productName) {
    this.clickElement(this.removeButton(productName))
  }

  /**
   * Removes all products added to the cart
   * @param {array} addedProducts - array of products added to the cart
   */

  removeAllAddedProducts(addedProducts) {
    cy.wrap(addedProducts).each((product) => {
      this.clickElement(this.removeButton(product.name))
    })

  }

  clickOnContinueShoppingButton() {
    this.clickElement(this.continueShoppingButton)
  }

  clickOnCheckoutButton() {
    this.clickElement(this.checkoutButton)
  }

  reloadThePage() {
    cy.reload()
  }

}