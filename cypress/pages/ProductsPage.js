/// <reference types="cypress" />

import BasePage from "./BasePage";


export default class ProductsPage extends BasePage {

  //Locators
  cartIcon = '.shopping_cart_link'


  //Actions
  openCart() {
    cy.get(this.cartIcon).click();
  }


}