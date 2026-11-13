# 🚀 Automação de Testes E2E com Playwright e TypeScript

Este repositório contém uma suíte de testes automatizados End-to-End (E2E) desenvolvida para fins de estudo e portfólio profissional, utilizando **Playwright** com **TypeScript** e o padrão de projeto **Page Object Model (POM)**.

O sistema alvo dos testes é a aplicação de e-commerce fictícia [SauceDemo](https://www.saucedemo.com/).

---

## 🛠️ Tecnologias e Ferramentas Utilizadas
- **Playwright** (Framework de automação web moderno)
- **TypeScript** (Tipagem estática e robustez no código)
- **Page Object Model - POM** (Padrão de arquitetura para manutenibilidade)
- **Multi-Browser Execution** (Chromium, Firefox e WebKit)

---

## 🎯 Cenários Automatizados
1. **Fluxos de Login com Sucesso e Falha:**
   - Validação de login com credenciais válidas.
   - Tratativa de erros para usuários bloqueados (`locked_out_user`) e senhas incorretas.
2. **Fluxo de Compras (E2E) e Negócio:**
   - Seleção dinâmica de produtos na vitrine.
   - Captura e validação cruzada de dados (comparação dinâmica do nome e preço do produto selecionado versus o carrinho de compras).
   - Simulação de preenchimento de dados de checkout e conclusão de compra com sucesso (`Thank you for your order!`).

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/flowgemini-20/playwright-ts-saucedemo.git](https://github.com/flowgemini-20/playwright-ts-saucedemo.git)
   cd meu-primeiro-teste