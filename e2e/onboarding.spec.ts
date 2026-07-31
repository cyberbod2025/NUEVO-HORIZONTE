import { expect, test } from '@playwright/test';

test('guides a new student through the app navigation', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '¡Hola, Profe Hugo!' })).toBeVisible();
  await page.getByRole('button', { name: 'Conocer la aplicación' }).click();

  await expect(page.getByText('Recorrido 1 de 4')).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  await expect(page.getByText('Recorrido 2 de 4')).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  await expect(page.getByText('Recorrido 3 de 4')).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  await expect(page.getByText('Recorrido 4 de 4')).toBeVisible();
  await page.getByRole('button', { name: 'Terminar' }).click();

  await expect(page.getByText('Progreso a la Meta')).toBeVisible();
  await expect(page.getByRole('button', { name: /Módulo Interactivo/ })).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem('codebrain_onboarding_complete'))).resolves.toBe('true');
});

test('runs the first exercise outside the application thread', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('codebrain_progress_version', '3');
    localStorage.setItem('codebrain_xp', '0');
    localStorage.setItem('codebrain_streak', '0');
    localStorage.setItem('codebrain_completed', '[]');
    localStorage.setItem('codebrain_onboarding_complete', 'true');
  });
  await page.goto('/');

  await page.getByRole('button', { name: /Módulo Interactivo/ }).click();
  await page.getByRole('button', { name: '3. Autónomo (70/30)' }).click();
  await expect(page.getByText('Editor de Código JS / Sandbox')).toBeVisible();
  await page.getByRole('button', { name: 'Ejecutar Código' }).click();

  await expect(page.getByText(/Hugo \(25 años\): Mayor de edad/)).toBeVisible();
  await expect(page.getByText('¡Módulo Superado! Has ganado +100 XP.')).toBeVisible();
});
