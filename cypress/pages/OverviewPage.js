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
  cancelButton = '[data-test="cancel"]'
  finishButton = '[data-test="finish"]'

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

}