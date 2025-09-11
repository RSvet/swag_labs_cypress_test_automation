/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import productsData from "../fixtures/productsData"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"

const loginPage = new LoginPage()
const productsPage = new ProductsPage()

describe('Products page scenarios', () => {

  beforeEach(() => {
    loginPage.navigateToLoginPage()
    loginPage.login(credentials.validUsername, credentials.validPassword)
  })

  describe('Product cards display', () => {
    it('TC-013: Verify all product cards are visible', () => {
      productsPage.verifyPageLoaded(pageData.products)
      productsPage.verifyAllProductsPresent(productsData.products.length)
    })

    it('TC-014: Verify all product card details', () => {
      productsPage.verifyPageLoaded(pageData.products)
      productsPage.verifyProductsNames(productsData.products)
      productsPage.verifyProductsDescriptions(productsData.products)
      productsPage.verifyProductsPrices(productsData.products)
    })
  })

  describe('Add/Remove products to cart', () => {
    it('TC-015: Add a product to cart', () => {
      let allAddedProducts = []

      //add one product to the cart and check quantity
      productsPage.addDifferentProducts(1).then(addedFirst => {
        allAddedProducts = [...addedFirst]
        productsPage.verifyAddedProductQuantity(1)
      })


      //add more products to the cart and check quantity
      productsPage.addDifferentProducts(2).then(addedSecond => {
        allAddedProducts = [...allAddedProducts, ...addedSecond]
        productsPage.verifyAddedProductQuantity(allAddedProducts.length)
      })
    })

    it('TC-016: Remove products from cart', () => {
      productsPage.addDifferentProducts(3).then(addedProducts => {
        productsPage.verifyAddedProductQuantity(3)
        productsPage.removeASingleProduct(addedProducts[0].name)

        const remainingProducts = addedProducts.filter(p => p.name !== addedProducts[0].name)
        productsPage.verifyAddedProductQuantity(remainingProducts.length)

        productsPage.removeAllAddedProducts(remainingProducts)
        productsPage.verifyThereIsNoQuantity()

      })
    })
  })




})