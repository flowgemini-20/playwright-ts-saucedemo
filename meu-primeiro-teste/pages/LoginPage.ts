import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Definimos os seletores da página
  get usernameInput() { return this.page.locator('#user-name'); }
  get passwordInput() { return this.page.locator('#password'); }
  get loginButton() { return this.page.locator('#login-button'); }

  // Método de negócio reutilizável para o login
  async fazerLogin(usuario: string, senha: string) {
    // Garante que o campo de usuário está visível antes de preencher (com margem para WebKit/Firefox)
    await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.usernameInput.fill(usuario);
    
    // Garante que o campo de senha está visível antes de preencher
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.fill(senha);
    
    await this.loginButton.click();
  }
}