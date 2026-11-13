import { test, expect } from '@playwright/test'; 
test('Fluxo de compra de ponta a ponta no SauceDemo', async ({ page }) => { 
    // 1. Acessar o site de e-commerce de testes 
    await page.goto('https://www.saucedemo.com/'); 
     
    // 2. Fazer o Login com usuário padrão de teste 
    await page.fill('#user-name', 'standard_user'); 
    await page.fill('#password', 'secret_sauce'); 
    await page.click('#login-button'); 
    
    // Garantir que entramos na página de produtos 
    await expect(page).toHaveURL(/.*inventory.html/); 
    
    // 3. Adicionar um produto ao carrinho (ex: a mochila) 
    await page.click('#add-to-cart-sauce-labs-backpack'); 
    
    // Validar que o carrinho agora tem 1 item 
    const badge = page.locator('.shopping_cart_badge'); 
    await expect(badge).toHaveText('1'); 
    
    // 4. Ir para o carrinho e avançar para o checkout 
    await page.click('.shopping_cart_link'); 
    await page.click('#checkout'); 
    
    // 5. Preencher os dados de entrega 
    await page.fill('#first-name', 'Jonas'); 
    await page.fill('#last-name', 'Ramos'); 
    await page.fill('#postal-code', '00-001'); 
    await page.click('#continue'); 
    
    // 6. Finalizar a compra 
    await page.click('#finish'); 
     
    // 7. Validar a mensagem de sucesso do pedido 
    const mensagemSucesso = page.locator('.complete-header'); 
    await expect(mensagemSucesso).toHaveText('Thank you for your order!'); });