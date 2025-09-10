/// <reference types="cypress" />

import BasePage from "./BasePage";

export default class SideMenu extends BasePage {

  //Locators
  menuButton = '.bm-burger-button'
  allItemsLink = '#inventory_sidebar_link'
  aboutLink = '#about_sidebar_link'
  logoutLink = '#logout_sidebar_link'
  resetAppStateLink = '#reset_sidebar_link'

  //Actions
  openMenu() {
    cy.get(this.menuButton).click()
  }

  navigateToAllItems() {
    this.openMenu();
    cy.get(this.allItemsLink).click()
  }

  navigateToAbout() {
    this.openMenu();
    cy.get(this.aboutLink).click()
  }

  logout() {
    this.openMenu();
    cy.get(this.logoutLink).click()
  }

  resetAppState() {
    this.openMenu();
    cy.get(this.resetAppStateLink).click()
  }


}

