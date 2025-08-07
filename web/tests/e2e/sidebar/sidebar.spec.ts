import { navOptions } from '@/components/app-sidebar';
import { login } from '@/tests/helpers/loginHelper';
import { expect, test } from '@playwright/test';

test('sidebar is visible', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('app-sidebar')).toBeVisible()
});

test('navigation links are visible and redirect to correct path', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('app-sidebar')).toBeVisible()

  for (const link of navOptions) {
    const navLink = page.getByRole('link', { name: link.title })
    await expect(navLink).toBeVisible()
    await navLink.click()
    await expect(page).toHaveURL(link.path)
  }
});

test('options dropdown is visible', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('sidebar-options-dropdown')).toBeVisible()
});

const dropdownOptions = [
  {
    testidTitle: "profile-button",
    path: "/profile"
  },
  {
    testidTitle: "options-button",
    path: "/settings"
  },
  {
    testidTitle: "logout-button",
    path: '/login'
  }
]

test('should option dropdown menu item redirects correctly', async ({ page }) => {
  await login(page)
  const dropdownBtn = page.getByTestId('sidebar-options-dropdown')
  await expect(dropdownBtn).toBeVisible()

  for (const menuItem of dropdownOptions) {
    await dropdownBtn.click()
    const menuItemLink = page.getByTestId(menuItem.testidTitle)
    await expect(menuItemLink).toBeVisible()
    await menuItemLink.click()
    await expect(page).toHaveURL(menuItem.path)
    if (menuItem.testidTitle === "logout-button") {
      await expect(page.getByText('Wylogowano')).toBeVisible()
    }
  }
});

test('should the sidebar collapse and expand', async ({ page }) => {
  await login(page)
  const appSidebar = page.getByTestId('app-sidebar')
  await expect(appSidebar).toBeVisible()
  await expect(appSidebar).toHaveAttribute("data-state", "expanded")
  const sidebarToggleButton = page.locator('[data-test-id="sidebar-toggle-button"]')
  await expect(sidebarToggleButton).toBeVisible()
  await sidebarToggleButton.click()
  await expect(appSidebar).toHaveAttribute("data-state", "collapsed")
  await sidebarToggleButton.click()
  await expect(appSidebar).toHaveAttribute("data-state", "expanded")
});
