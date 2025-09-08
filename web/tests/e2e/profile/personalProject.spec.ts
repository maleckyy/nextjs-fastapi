import { login } from '@/tests/helpers/loginHelper';
import { test, expect, Page } from '@playwright/test';

const goToProfilePage = async (page: Page) => {
  await login(page)
  await expect(page.getByRole('link', { name: 'Profile page link' })).toBeVisible()
  await page.getByRole('link', { name: 'Profile page link' }).click()
  await expect(page).toHaveURL('/profile')
}

const fillProjectForm = async (page: Page, data: {
  name: string,
  description: string,
  githubRepositoryUrl: string,
  demoUrl: string,
  projectStack: string
}) => {
  await page.getByRole('textbox', { name: 'Project name' }).fill(data.name)
  await page.getByRole('textbox', { name: 'Project description' }).fill(data.description)
  await page.getByRole('textbox', { name: 'Github repository url' }).fill(data.githubRepositoryUrl)
  await page.getByRole('textbox', { name: 'Live demo url' }).fill(data.demoUrl)
  await page.getByRole('textbox', { name: 'Project stack' }).fill(data.projectStack)
}

test.describe('Profile - Personal projects', () => {
  test('is personal projects table displays correctly', async ({ page }) => {
    await goToProfilePage(page)
    await expect(page.getByTestId('personal-projects-section')).toBeVisible()
    await expect(page.getByTestId('add-project-button')).toBeVisible()
    await expect(page.getByTestId('personal-project-table')).toBeVisible()
  });


  test('is form in dialog displays correctly', async ({ page }) => {
    await goToProfilePage(page)
    await expect(page.getByTestId('add-project-button')).toBeVisible()
    await page.getByTestId('add-project-button').click()
    await expect(page.getByRole('dialog', { name: 'Add personal project' })).toBeVisible()

    await expect(page.getByRole('textbox', { name: 'Project name' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Project description' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Github repository url' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Live demo url' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Project stack' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible()
  })

  test('is form is validated correctly', async ({ page }) => {
    await goToProfilePage(page)
    await expect(page.getByTestId('add-project-button')).toBeVisible()
    await page.getByTestId('add-project-button').click()
    await expect(page.getByRole('dialog', { name: 'Add personal project' })).toBeVisible()

    const badData = {
      name: "ab",
      description: "cd",
      githubRepositoryUrl: "my-page",
      demoUrl: "my-page",
      projectStack: "yx"
    }

    await fillProjectForm(page, badData)
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('The title is too short')).toBeVisible()
    await expect(page.locator('div').filter({ hasText: /^Github repository urlInvalid url$/ }).locator('div')).toBeVisible()
    await expect(page.locator('div').filter({ hasText: /^Live demo urlInvalid url$/ }).locator('div')).toBeVisible()
  })

  test('personal projects - crud check', async ({ page }) => {
    await goToProfilePage(page)

    const addProjectButton = page.getByTestId('add-project-button')
    await expect(addProjectButton).toBeVisible()

    // ADD NEW PROJECT
    await addProjectButton.click()
    await expect(page.getByRole('dialog', { name: 'Add personal project' })).toBeVisible()

    const newProjectData = {
      name: "Test Project",
      description: "Project description",
      githubRepositoryUrl: "https://example.com/",
      demoUrl: "https://example.com/",
      projectStack: "html, css, javascript"
    }

    await fillProjectForm(page, newProjectData)
    const dialogSubmitButton = page.getByRole('button', { name: 'Add' })
    await expect(dialogSubmitButton).toBeVisible()
    await dialogSubmitButton.click()
    await expect(page.getByText('Project created')).toBeVisible()

    // READ NEW PROJECT
    const newElement = page.locator('[data-testid^="project-row"]').last();
    const newElementDataTestId = await newElement.getAttribute('data-testid');

    const newRow = page.getByTestId(newElementDataTestId!)
    await expect(newRow).toBeVisible()
    await expect(newRow.getByRole('cell', { name: newProjectData.name })).toHaveText(newProjectData.name)
    await expect(newRow.getByRole('cell', { name: newProjectData.description })).toHaveText(newProjectData.description)
    const rowActionButton = newRow.getByTestId("row-action-menu")
    await expect(rowActionButton).toBeVisible()

    // EDIT
    await rowActionButton.click()
    const actionMenuContent = page.getByTestId('row-menu-content')
    const editOptionButton = actionMenuContent.getByRole('menuitem', { name: 'Edit' })
    await expect(editOptionButton).toBeVisible()
    await editOptionButton.click()

    const updateProjectData = {
      name: newProjectData.name + " updated",
      description: newProjectData.description + " updated",
      githubRepositoryUrl: newProjectData.githubRepositoryUrl + "/updated",
      demoUrl: newProjectData.demoUrl + "/updated",
      projectStack: newProjectData.projectStack + ", updated"
    }

    await fillProjectForm(page, updateProjectData)
    await expect(page.getByRole('button', { name: 'Update' })).toBeVisible()
    await page.getByRole('button', { name: 'Update' }).click()
    await expect(page.getByText('Project updated')).toBeVisible()

    // DELETE
    await rowActionButton.click()
    const deleteOptionButton = actionMenuContent.getByRole('menuitem', { name: 'Delete' })
    await expect(deleteOptionButton).toBeVisible()
    await deleteOptionButton.click()
    await expect(page.getByText('Project deleted')).toBeVisible()
    await expect(newRow).not.toBeVisible()
  });
});