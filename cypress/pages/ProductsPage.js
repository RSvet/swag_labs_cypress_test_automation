/// <reference types="cypress" />

import BasePage from "./BasePage";


export default class ProductsPage extends BasePage {

  //Locators
  cartIcon = '.shopping_cart_link'
  quantityIndicator = '[data-test="shopping-cart-badge"]'
  sortingFilter = '[data-test="product-sort-container"]'
  productCard = '[data-test="inventory-item"]'
  productName = '[data-test="inventory-item-name"]'
  productPrice = '[data-test="inventory-item-price"]'
  addToCartButton = (name) => `[data-test="add-to-cart-${name.toLowerCase().replace(/ /g, '-')}"]`
  removeButton = (name) => `[data-test="remove-${name.toLowerCase().replace(/ /g, '-')}"]`



  //Actions
  openCart() {
    cy.get(this.cartIcon).click();
  }

  addProducts(count) {
    const addedProducts = [];

    cy.get(this.productCard).then(($items) => {
      const itemsToAdd = [...$items].slice(0, count ?? $items.length)

      itemsToAdd.forEach((item) => {
        const name = item.querySelector(this.productName).innerText
        const price = item.querySelector(this.productPrice).innerText

        // Click add button for this product
        cy.get(this.addToCartButton(name)).click()

        addedProducts.push({ name, price })
      });
    });

    return cy.wrap(addedProducts)
  }

  verifyAddedProductQuantity(quantity) {
    cy.get(this.quantityIndicator).should('have.text', quantity)
  }

  sortProductsBy(option) {
    cy.get(this.sortingFilter).select(option)
  }

  verifyProductsSortedByName(order = 'asc') {
    cy.get(this.productName).then(($names) => {
      // Extract the text of each product name
      const nameArray = $names.map((i, el) => el.innerText).get()

      // Sort alphabetically
      const sortedArray = [...nameArray].sort((a, b) => a.localeCompare(b))

      // If descending, reverse the sorted array
      if (order === 'desc') sortedArray.reverse()

      expect(nameArray).to.deep.equal(sortedArray)
    });
  }

  verifyProductsSortedByPrice(order = 'asc') {
    cy.get(this.productPrice).then(($prices) => {
      const priceArray = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get()
      const sortedArray = order === 'asc' ? [...priceArray].sort((a, b) => a - b) : [...priceArray].sort((a, b) => b - a)
      expect(priceArray).to.deep.equal(sortedArray)
    });
  }


  verifyResetState(addedProducts) {
    // Cart badge disappears
    cy.get(this.quantityIndicator).should('not.exist')

    addedProducts.forEach(product => {
      // Remove buttons gone
      cy.get(this.removeButton(product.name)).should('not.exist')

      // Add to Cart buttons visible
      cy.get(this.addToCartButton(product.name)).should('exist')

    })
  }


}