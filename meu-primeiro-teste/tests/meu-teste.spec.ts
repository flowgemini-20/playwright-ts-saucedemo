import { test, expect } from '@playwright/test';
test('Meu primeiro teste no Google', async ({ page }) => {
    //1. Abre o site do Google
    await page.goto('https://www.google.com');
    
    //2. Verifica se o título da página tem a palavra "Google"
    await expect(page).toHaveTitle(/Google/);
});