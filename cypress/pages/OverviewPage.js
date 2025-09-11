/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class OverviewPage extends BasePage {

  //Locators
  cartItem = '[data-test="inventory-item"]'
  paymentInfoLabel = '[data-test="payment-info-label"]'
  paymentInfo = 'Payment Information:'
  shippingInfoLabel = '[data-test="shipping-info-label"]'
  shippingInfo = 'Shipping Information:'
  priceTotalLabel = '[data-test="total-info-label"]'
  priceTotal = 'Price Total'
  subtotalAmount = '[data-test="subtotal-label"]'
  taxAmount = '[data-test="tax-label"]'
  totalAmount = '[data-test="total-label"]'
  cancelButton = '[data-test="cancel"]'
  finishButton = '[data-test="finish"]'
  cartItemName = '[data-test="inventory-item-name"]'
  cartItemPrice = '[data-test="inventory-item-price"]'
  cartItemDescription = '[data-test="inventory-item-desc"]'

  verifyNumberOfProductsOnOverviewPage(numOfProducts) {
    cy.get(this.cartItem).should('have.length', numOfProducts)
  }

  verifyPaymentLabelIsVisible() {
    cy.get(this.paymentInfoLabel).should('be.visible').and('have.text', this.paymentInfo)
  }

  verifyShippingLabelIsVisible() {
    cy.get(this.shippingInfoLabel).should('be.visible').and('have.text', this.shippingInfo)
  }

  verifyPriceLabelIsVisible() {
    cy.get(this.priceTotalLabel).should('be.visible').and('have.text', this.priceTotal)
  }

  verifyCancelButtonIsVisible() {
    cy.get(this.cancelButton).should('be.visible').and('contain.text', 'Cancel')
  }

  verifyFinishButtonIsVisible() {
    cy.get(this.finishButton).should('be.visible').and('contain.text', 'Finish')
  }

  verifyCartItemName(name) {
    cy.get(this.cartItemName).should('have.text', name)
  }

  verifyCartItemPrice(price) {
    cy.get(this.cartItemPrice).should('have.text', price)
  }

  verifyCartItemDescription(description) {
    cy.get(this.cartItemDescription).should('have.text', description)
  }

  /**
 * Verifies details of added product in the cart
 * @param {array} addedProducts - array of added product objects
 */
  verifyProductDetailsInOverviewList(addedProducts) {
    addedProducts.forEach((product, i) => {
      cy.get(this.cartItem).eq(i).within(() => {
        this.verifyCartItemName(product.name)
        this.verifyCartItemPrice(product.price)
        this.verifyCartItemDescription(product.description)
      })
    })
  }

  /**
  * Calculate expected subtotal from product prices on the page
  * @returns subtotal amount
  */

  getExpectedSubtotal() {
    return cy.get(this.cartItemPrice).then($prices => {
      const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      return priceArray.reduce((sum, price) => sum + price, 0);
    });
  }

  /**
   * Calculate expected tax (8%) based on subtotal
   * @returns tax amount
   */
  getExpectedTax() {
    return this.getExpectedSubtotal().then(subtotal => {
      const tax = Math.round(subtotal * 0.08 * 100) / 100;
      return tax;
    });
  }

  /**
 * Calculate expected total (subtotal + tax)
 * @returns total amount
 */
  getExpectedTotal() {
    return this.getExpectedSubtotal().then(subtotal => {
      const tax = Math.round(subtotal * 0.08 * 100) / 100;
      const total = Math.round((subtotal + tax) * 100) / 100;
      return total;
    });
  }

  /**
   * Verify displayed subtotal amount
   */
  verifySubtotal() {
    this.getExpectedSubtotal().then(expectedSubtotal => {
      cy.get(this.subtotalAmount).invoke('text').then(text => {
        const displayedSubtotal = parseFloat(text.replace('Item total: $', ''));
        expect(displayedSubtotal).to.eq(expectedSubtotal);
      });
    });
  }

  /**
   * Verify displayed tax amount
   */
  verifyTax() {
    this.getExpectedTax().then(expectedTax => {
      cy.get(this.taxAmount).invoke('text').then(text => {
        const displayedTax = parseFloat(text.replace('Tax: $', ''));
        expect(displayedTax).to.eq(expectedTax);
      });
    });
  }

  /**
   * Verify displayed total amount
   */
  verifyTotal() {
    this.getExpectedTotal().then(expectedTotal => {
      cy.get(this.totalAmount).invoke('text').then(text => {
        const displayedTotal = parseFloat(text.replace('Total: $', ''));
        expect(displayedTotal).to.eq(expectedTotal);
      });
    });
  }

  clickFinishButton() {
    cy.get(this.finishButton).click()
  }

  clickCancelButton() {
    cy.get(this.cancelButton).click()
  }


}