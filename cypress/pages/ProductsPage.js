/// <reference types="cypress" />

import BasePage from "./BasePage"


export default class ProductsPage extends BasePage {

  //Locators

  sortingFilter = '[data-test="product-sort-container"]'
  productCard = '[data-test="inventory-item"]'
  productName = '[data-test="inventory-item-name"]'
  productPrice = '[data-test="inventory-item-price"]'
  productDescription = '[data-test="inventory-item-desc"]'
  addToCartButton = (name) => `[data-test="add-to-cart-${name.toLowerCase().replace(/ /g, '-')}"]`
  removeButton = (name) => `[data-test="remove-${name.toLowerCase().replace(/ /g, '-')}"]`

  //Actions

  /**
   * Add N products to the cart
   * @param {number} count - number of products to add
   * @returns array of added product objects with name and price
   */
  addDifferentProducts(count) {
    const addedProducts = []
    cy.get(this.productCard).then(($items) => {
      const productsToAdd = []
      $items.each((index, el) => {
        const removeButton = el.querySelector('[data-test^="remove"]')
        if (!removeButton) {
          productsToAdd.push(el)
        }
      })
      const selectedProducts = productsToAdd.slice(0, count)

      selectedProducts.forEach((item) => {
        const name = item.querySelector(this.productName).innerText
        const price = item.querySelector(this.productPrice).innerText

        // Click add button for this product
        cy.get(this.addToCartButton(name)).click()

        addedProducts.push({ name, price })
      })
    })

    return cy.wrap(addedProducts)
  }

  removeASingleProduct(productName) {
    cy.get(this.removeButton(productName)).click()
  }

  /**
   * Removes all products added to the cart
   * @param {array} addedProducts - array of products added to the cart
   */

  removeAllAddedProducts(addedProducts) {
    const productNames = addedProducts.map(p => p.name)
    productNames.forEach((name, i) => {
      cy.get(this.removeButton(name)).click()
    })
  }

  /**
   * Opens individual product page
   * @param {string} productName 
   */
  clickProductByName(productName) {
    cy.get(this.productName)
      .contains(productName)
      .click()
  }

  /**
   * Returns the product data of clicked product
   * @param {string} productName 
   */
  getProductDataAndNavigate(productName) {
    // Find the product card first
    return cy.get(this.productCard)
      .contains(this.productName, productName)
      .closest(this.productCard)
      .then($card => {
        // Grab the name, description, and price from the card
        const name = $card.find(this.productName).text();
        const description = $card.find(this.productDescription).text();
        const price = $card.find(this.productPrice).text();

        const productData = { name, description, price };

        // Click the product name to navigate
        this.clickProductByName(productName)

        // Return wrapped data
        return cy.wrap(productData);
      });
  }

  //Verification
  /**
   * Verifies number of the products on the Products page
   * @param {number} numberOfExpectedProducts - expected number of products on the page
   */
  verifyAllProductsPresent(numberOfExpectedProducts) {
    cy.get(this.productCard).should('have.length', numberOfExpectedProducts)
  }

  /**
   * Verifies product name on the Products page
   * @param {array} expectedProducts - array of products expected on the page
   */
  verifyProductsNames(expectedProducts) {
    cy.get(this.productName).each((name, i) => {
      const nameText = name.text()
      expect(nameText).to.be.eq(expectedProducts[i].name)
    })
  }

  /**
   * Verifies product descriptions on the Product page
   * @param {array} expectedProducts - array of products expected on the page
   */
  verifyProductsDescriptions(expectedProducts) {
    cy.get(this.productDescription).each((desc, i) => {
      const descText = desc.text()
      expect(descText).to.be.eq(expectedProducts[i].description)
    })
  }

  /**
  * Verifies product prices on the Product page
  * @param {array} expectedProducts - array of products expected on the page
  */
  verifyProductsPrices(expectedProducts) {
    cy.get(this.productPrice).each((p, i) => {
      const price = p.text()
      expect(price).to.be.eq(expectedProducts[i].price)
    })
  }

  /**
   * Sort products by selected option
   * @param {string} option - sorting option
   */
  sortProductsBy(option) {
    cy.get(this.sortingFilter).select(option)
  }

  /**
   * Verifies if products are sorted alphabetically
   * @param {string} order - ascending or descending sorting order 
   */
  verifyProductsSortedByName(order = 'asc') {
    cy.get(this.productName).then(($names) => {
      // Extract the text of each product name
      const nameArray = $names.map((i, el) => el.innerText).get()

      // Sort alphabetically
      const sortedArray = [...nameArray].sort((a, b) => a.localeCompare(b))

      // If descending, reverse the sorted array
      if (order === 'desc') sortedArray.reverse()

      nameArray.forEach((name, index) => {
        expect(name, `Name at index ${index}`).to.equal(sortedArray[index])
      })
    })
  }

  /**
   * Verifies if products are sorted by price
   * @param {string} order - ascending or descending sorting order 
   */
  verifyProductsSortedByPrice(order = 'asc') {
    cy.get(this.productPrice).then(($prices) => {
      const priceArray = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get()
      const sortedArray = order === 'asc' ? [...priceArray].sort((a, b) => a - b) : [...priceArray].sort((a, b) => b - a)

      priceArray.forEach((price, index) => {
        expect(price, `Price at index ${index}`).to.equal(sortedArray[index])
      })
    })
  }


  /**
   * Verifies if app state resets
   * @param {array} addedProducts - array of product objects added to the cart
   */
  verifyResetStateProducts(addedProducts) {
    addedProducts.forEach(product => {
      // Remove buttons gone
      cy.get(this.removeButton(product.name)).should('not.exist')

      // Add to Cart buttons visible
      cy.get(this.addToCartButton(product.name)).should('exist')

    })
  }


}