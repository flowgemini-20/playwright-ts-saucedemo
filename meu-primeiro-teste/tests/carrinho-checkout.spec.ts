import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Validações de Negócio - Carrinho e Checkout', () => {

  test('Deve validar se o nome do produto no carrinho é o mesmo da vitrine e conferir o valor', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Faz o login
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    await loginPage.fazerLogin('standard_user', 'secret_sauce');

    // 2. Captura o nome do primeiro produto na vitrine e o seu preço
    const nomeProdutoVitrine = await page.locator('.inventory_item_name').first().textContent();
    const precoProdutoVitrine = await page.locator('.inventory_item_price').first().textContent();
    
    console.log(`Produto selecionado: ${nomeProdutoVitrine} por ${precoProdutoVitrine}`);

    // Clica no botão de adicionar ao carrinho desse item específico
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // 3. Vai para o carrinho
    await page.click('.shopping_cart_link');

    // VALIDAÇÃO 1: Adicionado o .first() para pegar unicamente o item dentro do carrinho
    const nomeProdutoCarrinho = await page.locator('.inventory_item_name').first().textContent();
    expect(nomeProdutoCarrinho).toBe(nomeProdutoVitrine);

    // 4. Avança para o Checkout
    await page.click('#checkout');
    await page.fill('#first-name', 'Jonas');
    await page.fill('#last-name', 'Ramos');
    await page.fill('#postal-code', '01000-000');
    await page.click('#continue');

    // VALIDAÇÃO 2: Valida se o preço total do checkout bate com o preço do produto selecionado
    const subtotalCheckout = await page.locator('.summary_subtotal_label').textContent();
    
    expect(subtotalCheckout).toContain(precoProdutoVitrine);

    // Finaliza a compra para fechar o ciclo com chave de ouro
    await page.click('#finish');
    const mensagemSucesso = page.locator('.complete-header');
    await expect(mensagemSucesso).toHaveText('Thank you for your order!');
  });

});