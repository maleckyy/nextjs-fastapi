import { login } from '@/tests/helpers/loginHelper';
import { expect, test } from '@playwright/test';

test('should redirect to login when accessing dashboard without login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/login');
});

test('should display all dashboard sections after login', async ({ page }) => {
  await login(page)
  // loginHelper checks the correctness of the redirect to /dashboard
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByTestId('app-sidebar')).toBeVisible()
  await expect(page.getByTestId('user-expense-stats-card')).toBeVisible()
  await expect(page.getByRole('application')).toBeVisible()
  await expect(page.getByTestId('monthly-expenses-card')).toBeVisible()
  await expect(page.getByTestId('monthly-expenses-chart').locator('svg')).toBeVisible()
  await expect(page.getByTestId('last-todos-card')).toBeVisible()
  await expect(page.getByTestId('upcoming-events-card')).toBeVisible()
});

test('does monthly expenses card redirect to /finance', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('monthly-expenses-card')).toBeVisible()
  await expect(page.getByTestId('monthly-expenses-card').getByRole('link')).toBeVisible()
  await page.getByTestId('monthly-expenses-card').getByRole('link').click()
  await expect(page.getByRole('heading', { name: 'Finanse' })).toBeVisible()
  await expect(page).toHaveURL('/finance')
});

test('does last todos card redirect to /todo', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('last-todos-card')).toBeVisible()
  await expect(page.getByTestId('last-todos-card').getByRole('link')).toBeVisible()
  await page.getByTestId('last-todos-card').getByRole('link').click()
  await expect(page.getByRole('heading', { name: 'Todos' })).toBeVisible()
  await expect(page).toHaveURL('/todo')
});

test('does upcoming events card redirect to /events', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('upcoming-events-card')).toBeVisible()
  await expect(page.getByTestId('upcoming-events-card').getByRole('link')).toBeVisible()
  await page.getByTestId('upcoming-events-card').getByRole('link').click()
  await expect(page.getByRole('heading', { name: 'Wydarzenia', exact: true })).toBeVisible()
  await expect(page).toHaveURL('/events')
});
