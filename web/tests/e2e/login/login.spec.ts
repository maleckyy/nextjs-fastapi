import { WEB_BASE_URL } from '@/env/API_URL';
import { login } from '@/tests/helpers/loginHelper';
import { expect, test } from '@playwright/test';

test('does login form loads correctly', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await expect(page.getByRole('heading', { name: 'LOGO' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Zaloguj' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Nie masz konta? Zarejestruj' })).toBeVisible()
});

test('logs in successfully with correct credentials', async ({ page }) => {
  await login(page);
});

test('show error message when logging in with incorrect credentials', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademail@gmail.com")
  await page.getByRole('textbox', { name: 'Hasło' }).fill("password123")
  await page.getByRole('button', { name: 'Zaloguj' }).click()
  await expect(page.getByText('Błąd')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('shows error when fields are empty', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveValue('');

  const passwordInput = page.getByRole('textbox', { name: 'Hasło' });
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveValue('');

  await page.getByRole('button', { name: 'Zaloguj' }).click()
  await expect(page.locator('div').filter({ hasText: /^EmailPole jest wymagane$/ }).locator('div')).toBeVisible()
  await expect(page.locator('div').filter({ hasText: /^HasłoPole jest wymagane$/ }).locator('div')).toBeVisible()
  await expect(page).toHaveURL('/login')
})

test('show error when email field is not an email', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademailgmail.com")
  await page.getByRole('textbox', { name: 'Hasło' }).fill("password123")
  await page.getByRole('button', { name: 'Zaloguj' }).click()
  await expect(page.getByText('Email jest niepoprawny')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('show error when password field is too short', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademail@gmail.com")
  await page.getByRole('textbox', { name: 'Hasło' }).fill("pas")
  await page.getByRole('button', { name: 'Zaloguj' }).click()
  await expect(page.getByText('Hasło jest zbyt krótkie')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('should redirect to register page when user clicks register link', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('link', { name: 'Nie masz konta? Zarejestruj' }).click();
  await expect(page).toHaveURL('/register')
});