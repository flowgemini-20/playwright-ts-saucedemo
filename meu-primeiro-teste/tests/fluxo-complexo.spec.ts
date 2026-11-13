import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Cenário complexo: Ordenar por preço, comprar o mais caro e finalizar', async ({ page }) => {
  // Instancia a Page Object de Login
  const loginPage = new LoginPage(page);

  // 1. Acessar a página de login
  await page.goto('https://www.saucedemo.com/');

  // 2. Realizar login usando o método encapsulado da Page Object
  await loginPage.fazerLogin('standard_user', 'secret_sauce');

  // Aguarda a URL mudar de forma robusta com um timeout generoso para o Firefox
  await page.waitForURL(/.*inventory.html/, { timeout: 15000 });

  // Validar entrada na loja com segurança
  await expect(page).toHaveURL(/.*inventory.html/);

  // 3. Interagir com o filtro da página: ordenar de "Preço (alto a baixo)"
  const selectFiltro = page.locator('.product_sort_container');
  await selectFiltro.waitFor({ state: 'visible', timeout: 10000 });
  await selectFiltro.selectOption('hilo');

  // 4. Validar que o primeiro item da lista agora é o mais caro (Fleece Jacket - $49.99)
  const primeiroProdutoNome = page.locator('.inventory_item_name ').first();
  await expect(primeiroProdutoNome).toHaveText('Sauce Labs Fleece Jacket');

  // 5. Adicionar esse produto mais caro diretamente ao carrinho
  await page.click('#add-to-cart-sauce-labs-fleece-jacket');

  // Validar badge do carrinho com 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 6. Ir para o carrinho e prosseguir para o checkout
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);
  await page.click('#checkout');

  // 7. Preencher o formulário de identificação e entrega
  await page.fill('#first-name', 'Jonas');
  await page.fill('#last-name', 'Ramos');
  await page.fill('#postal-code', '01000-000');
  await page.click('#continue');

  // 8. Validar os detalhes finais do resumo da compra e concluir
  await expect(page.locator('.summary_total_label')).toBeVisible();
  await page.click('#finish');

  // 9. Garantir o sucesso absoluto do pedido
  const mensagemSucesso = page.locator('.complete-header');
  await expect(mensagemSucesso).toHaveText('Thank you for your order!');
});