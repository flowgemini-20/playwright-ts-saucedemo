import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Cenários de Falha - Login', () => {

  // Define um timeout de 45 segundos especificamente para este bloco de testes (ótimo para o Modo UI e Firefox)
  test.setTimeout(45000);

  test('Deve exibir erro ao tentar logar com senha incorreta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    
    await loginPage.fazerLogin('standard_user', 'senha_errada_123');

    const mensagemErro = page.locator('[data-test="error"]');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Deve exibir erro ao tentar logar com usuário bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    
    await loginPage.fazerLogin('locked_out_user', 'secret_sauce');

    const mensagemErro = page.locator('[data-test="error"]');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

});