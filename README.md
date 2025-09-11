## Cypress Test Automation Project<br>SauceDemo online shop
This repository contains automated tests for a demo online shop [SauceDemo](https://www.saucedemo.com/), written in Cypress using the Page Object Model (POM) pattern.

The tests are categorized into the following sections:
- [Login tests](test_cases/login_test_cases.md)
- [Side menu tests](test_cases/side_menu_test_cases.md)
- [Products tests](test_cases/products_test_cases.md)
- [Cart tests](test_cases/cart_test_cases.md)
- [Checkout tests](test_cases/checkout_test_cases.md)
- [Overview tests](test_cases/overview_test_cases.md)
- [Completion tests](test_cases/completion_test_cases.md)

### 🔑 Key Features
✅ Page Object Model (POM) — clear separation of test logic and UI interactions  
✅ Fixtures — centralized test data (credentials, page titles, error messages)  
✅ Reusable Methods — navigation, verification, and actions encapsulated in classes  
✅ Chained Assertions — verifying subtotal, tax, and total dynamically  
✅ Cross-domain Handling — cy.origin() used for external links

### Prerequisites
- Node.js
- Cypress

Run tests from command line with `npx cypress open` or `npm run start`
