import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Cenários de Validação - Checkout e Carrinho', () => {

  test('Não deve avançar no checkout se o campo Nome estiver em branco', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Faz o login e chega até o checkout
    await page.goto('https://www.saucedemo.com/');
    await loginPage.fazerLogin('standard_user', 'secret_sauce');

    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Tenta continuar preenchendo apenas o Sobrenome e o CEP (deixando o Nome vazio)
    await page.fill('#last-name', 'Ramos');
    await page.fill('#postal-code', '01000-000');
    await page.click('#continue');

    // Valida que o sistema barrou e exibiu erro de campo obrigatório
    const mensagemErro = page.locator('[data-test="error"]');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Error: First Name is required');
  });

});