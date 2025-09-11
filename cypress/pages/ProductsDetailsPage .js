/// <reference types="cypress" />

import BasePage from "./BasePage"


export default class ProductsDetailsPage extends BasePage {

  //Locators
  productName = '.inventory_details_name'
  productPrice = '.inventory_details_price'
  productDescription = '.inventory_details_desc'
  addToCartButton = '[data-test="add-to-cart"]'
  removeButton = '[data-test="remove"]'
  backButton = '[data-test="back-to-products"]'

  /**
 * Verify the product details match expected values
 * @param {Object} expectedProduct - { name, description, price }
 */
  verifyProductDetails(expectedProduct) {
    cy.get(this.productName).should('have.text', expectedProduct.name)
    cy.get(this.productDescription).should('have.text', expectedProduct.description)
    cy.get(this.productPrice).should('have.text', expectedProduct.price)
  }

  goBackToProducts() {
    cy.get(this.backButton).click()
  }

  clickAddToCart() {
    cy.get(this.addToCartButton).click()
  }

  clickRemoveButton() {
    cy.get(this.removeButton).click()
  }

  verifyVisibilityOfRemoveButton() {
    cy.get(this.removeButton).should('be.visible')
  }



}