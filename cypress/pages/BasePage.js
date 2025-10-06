/// <reference types="cypress" />

export default class BasePage {

  verifyPageUrl(expectedUrl) {
    cy.url().should('include', expectedUrl)
  }

  verifyPageLoaded(pageInfo) {
    this.verifyPageUrl(pageInfo.url)
    cy.get('[data-test="title"]').should('have.text', pageInfo.title);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    this.getElement(selector).click();
  }

  typeText(selector, text) {
    this.getElement(selector).should('be.visible').type(text);
  }
}