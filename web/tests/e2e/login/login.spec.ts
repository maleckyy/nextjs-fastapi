import { WEB_BASE_URL } from '@/env/API_URL';
import { login } from '@/tests/helpers/loginHelper';
import { expect, test } from '@playwright/test';

test('should redirect unauthenticated user from / to /login', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}`)
  await expect(page).toHaveURL('/login')
});

test('does login form loads correctly', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await expect(page.getByTestId('login-app-title')).toBeVisible()
  await expect(page.getByTestId('login-app-description')).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  await expect(page.getByTestId('register-link')).toBeVisible()
});

test('logs in successfully with correct credentials', async ({ page }) => {
  await login(page);
});

test('show error message when logging in with incorrect credentials', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademail@gmail.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("password123")
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('User not found')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('shows error when fields are empty', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)

  const emailInput = page.getByRole('textbox', { name: 'Email' })
  await expect(emailInput).toBeVisible()
  await expect(emailInput).toHaveValue('')

  const passwordInput = page.getByRole('textbox', { name: 'Password' })
  await expect(passwordInput).toBeVisible()
  await expect(passwordInput).toHaveValue('')

  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('EmailThis field is required')).toBeVisible()
  await expect(page.getByText('PasswordThis field is required')).toBeVisible()
  await expect(page).toHaveURL('/login')
})

test('show error when email field is not an email', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademailgmail.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("password123")
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('EmailEmail address is')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('show error when password field is too short', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await page.getByRole('textbox', { name: 'Email' }).fill("bademail@gmail.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("pas")
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('PasswordPassword is too short.')).toBeVisible()
  await expect(page).toHaveURL('/login')
});

test('should redirect to register page when user clicks register link', async ({ page }) => {
  await page.goto(`${WEB_BASE_URL}/login`)
  await expect(page.getByTestId('register-link')).toBeVisible()
  await page.getByTestId('register-link').click()
  await expect(page).toHaveURL('/register')
});