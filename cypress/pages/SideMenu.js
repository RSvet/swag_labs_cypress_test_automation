/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class SideMenu extends BasePage {

  //Locators

  allItemsLink = '#inventory_sidebar_link'
  aboutLink = '#about_sidebar_link'
  logoutLink = '#logout_sidebar_link'
  resetAppStateLink = '#reset_sidebar_link'

  //Actions 

  navigateToAllItems() {
    cy.get(this.allItemsLink).click()
  }

  navigateToAbout() {
    cy.get(this.aboutLink).click()
  }

  logout() {
    cy.get(this.logoutLink).click()
  }

  resetAppState() {
    cy.get(this.resetAppStateLink).click()
  }


}

