/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class CompletionPage extends BasePage {

  //Locators

  checkoutCompleteContainer = '#checkout_complete_container'
  backHomeButton = '[data-test="back-to-products"]'
  thankYouMsg = 'Thank you for your order!'
  completeMsg = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'

  verifyOrderCompletionMessages() {
    cy.get(this.checkoutCompleteContainer).should('contain', this.thankYouMsg)
    cy.get(this.checkoutCompleteContainer).should('contain', this.completeMsg)
  }

  verifyBackHomeButtonVisible() {
    cy.get(this.backHomeButton)
      .should('be.visible')
      .and('contain.text', 'Back Home')
  }

  clickBackHomeButton() {
    this.clickElement(this.backHomeButton)
  }

}
