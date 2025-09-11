/// <reference types="cypress" />
import credentials from "../fixtures/credentials"
import pageData from "../fixtures/pageData"
import productsData from "../fixtures/productsData"
import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"
import ProductsDetailsPage from "../pages/ProductsDetailsPage "

const loginPage = new LoginPage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductsDetailsPage()

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

  describe('Sorting products', () => {
    it('TC-017: Sort products by name', () => {
      productsPage.sortProductsBy('Name (Z to A)')
      productsPage.verifyProductsSortedByName('desc')

      productsPage.sortProductsBy('Name (A to Z)')
      productsPage.verifyProductsSortedByName('asc')

    })

    it('TC-018: Sort products by price', () => {
      productsPage.sortProductsBy('Price (low to high)')
      productsPage.verifyProductsSortedByPrice('asc')

      productsPage.sortProductsBy('Price (high to low)')
      productsPage.verifyProductsSortedByPrice('desc')

    })
  })

  describe('Navigate to individual product page', () => {
    it('TC-019: Verify product details on individual page', () => {
      const productName = 'Sauce Labs Fleece Jacket'
      productsPage.getProductDataAndNavigate(productName)
        .then(productData => {
          productDetailsPage.verifyPageUrl(pageData.productsDetails.url)
          productDetailsPage.verifyProductDetails(productData)
          productDetailsPage.goBackToProducts()
        })
    })

    it('TC-020 Add/Remove product to cart from product details page', () => {
      const productName = 'Sauce Labs Fleece Jacket'
      productsPage.clickProductByName(productName)
      productDetailsPage.verifyPageUrl(pageData.productsDetails.url)
      productDetailsPage.clickAddToCart()
      productsPage.verifyAddedProductQuantity(1)
      productDetailsPage.clickRemoveButton()
      productsPage.verifyThereIsNoQuantity()
    })
  })




})