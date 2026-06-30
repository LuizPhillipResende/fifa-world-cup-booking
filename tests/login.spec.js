const { test, expect } = require('@playwright/test');

test.describe('Autenticação e Login (RF001)', () => {
  test('[TA001] Deve autorizar login com credenciais válidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'joao@example.com');
    await page.fill('input[type="password"]', 'senha123');
    await page.click('button[type="submit"]');

    // Deve redirecionar para a página principal (ou manter sem erro na tela de painel)
    await expect(page).toHaveURL('/');
  });

  test('[TA001] Deve bloquear o login com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'joao@example.com');
    await page.fill('input[type="password"]', 'senha_errada');
    await page.click('button[type="submit"]');

    // Deve exibir o Toast de erro com a mensagem "Senha inválida"
    const errorMessage = page.locator('text=Senha inválida.');
    await expect(errorMessage).toBeVisible();
    
    // A URL deve continuar sendo /login
    await expect(page).toHaveURL(/\/login/);
  });
});
