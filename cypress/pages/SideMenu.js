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
    this.clickElement(this.allItemsLink)
  }

  navigateToAbout() {
    this.clickElement(this.aboutLink)
  }

  logout() {
    this.clickElement(this.logoutLink)
  }

  resetAppState() {
    this.clickElement(this.resetAppStateLink)
  }


}

