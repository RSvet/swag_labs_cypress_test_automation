/// <reference types="cypress" />

export default class BasePage {
  verifyPageLoaded(pageInfo) {
    cy.url().should('include', pageInfo.url);
    cy.get('[data-test="title"]').should('have.text', pageInfo.title);
  }
}