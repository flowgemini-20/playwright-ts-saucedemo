# 🚀 End-to-End Test Automation with Playwright & TypeScript

This repository contains a comprehensive End-to-End (E2E) automated testing suite built for portfolio and QA engineering showcase purposes. The project leverages **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern to ensure scalability, readability, and maintainability.

The target application under test is the [SauceDemo](https://www.saucedemo.com/) e-commerce platform.

---

## 🛠️ Tech Stack & Architecture
- **Playwright:** Modern cross-browser end-to-end testing framework.
- **TypeScript:** Static typing for robust, self-documenting, and error-resistant test code.
- **Page Object Model (POM):** Architectural pattern isolating UI locators and page interactions (`pages/`) from test assertions (`tests/`).
- **Cross-Browser Execution:** Validated across **Chromium**, **Firefox**, and **WebKit**.
- **CI/CD Ready:** Configured with GitHub Actions workflow support (`.github/workflows/playwright.yml`).

---

## 📂 Project Structure & Test Suites

```text
├── .github/workflows/       # CI/CD pipeline configuration
├── pages/                   # Page Object Model classes (locators & actions)
│   └── LoginPage.ts
├── tests/                   # Automated E2E and functional test specs
│   ├── login.spec.ts
│   ├── compra.spec.ts
│   ├── checkout.spec.ts
│   ├── carrinho-checkout.spec.ts
│   ├── fluxo-complexo.spec.ts
│   └── meu-teste.spec.ts
└── playwright.config.ts     # Global Playwright configuration

### 🎯 Covered Test Scenarios

1. **`login.spec.ts`** — **Authentication & Access Control**
   - Validates successful authentication with standard user credentials (`standard_user`).
   - Verifies error handling and UI feedback for locked-out accounts (`locked_out_user`) and invalid credentials.

2. **`compra.spec.ts`** — **Standard End-to-End Purchase Flow**
   - Simulates a complete user journey from login and product selection to checkout completion (`Thank you for your order!`).

3. **`checkout.spec.ts`** — **Checkout Form & Field Validations**
   - Tests negative paths and form validation rules during checkout (e.g., blocking progression and displaying validation errors when required fields like First Name are left blank).

4. **`carrinho-checkout.spec.ts`** — **Dynamic Data Integrity & Business Rules**
   - Dynamically extracts product titles and prices directly from the inventory storefront.
   - Performs cross-page assertions verifying that the product title in the shopping cart and the financial subtotal at checkout strictly match the selected storefront item.

5. **`fluxo-complexo.spec.ts`** — **Multi-Step Complex User Journeys**
   - Executes extended user workflows involving multiple cart interactions, navigation steps, and state verifications across the application.

6. **`meu-teste.spec.ts`** — **Core Smoke & Navigation Checks**
   - Initial smoke test suite verifying application availability, page titles, and basic rendering.

*(Note: `example.spec.ts` is the default Playwright boilerplate file kept as a baseline reference).*

---

## ⚙️ How to Run the Project

1. **Clone the repository:**
   
   git clone [https://github.com/flowgemini-20/playwright-ts-saucedemo.git](https://github.com/flowgemini-20/playwright-ts-saucedemo.git)
   cd playwright-ts-saucedemo

2. **Install dependencies:**

npm install

3. **Install Playwright browsers:**

npx playwright install

4. **Run the full test suite (single worker recommended for external network stability):**

npx playwright test --workers=1

5. **Run a specific test file:**

npx playwright test tests/carrinho-checkout.spec.ts

6. **Run tests on a specific browser engine:**

npx playwright test --project=firefox

7. **Launch Interactive UI Mode for visual debugging:**

npx playwright test --ui --project=chromium

8. **View the HTML Test Report:**

npx playwright show-report