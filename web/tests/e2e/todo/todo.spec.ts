import { login } from '@/tests/helpers/loginHelper';
import { expect, test } from '@playwright/test';

test('should redirect to login when accessing /todo without login', async ({ page }) => {
  await page.goto('/todo')
  await expect(page).toHaveURL("/login")
});

test('elements visibility on todo page', async ({ page }) => {
  await login(page)
  await page.getByRole('link', { name: 'Todo' }).click()
  await expect(page).toHaveURL('/todo')
  await expect(page.getByTestId('todo-header')).toBeVisible()
  await expect(page.getByTestId('todo-data-table')).toBeVisible()
  await expect(page.getByTestId('create-todo-button')).toBeVisible()
});

test('todo crud check', async ({ page }) => {
  await login(page)
  await page.getByRole('link', { name: 'Todo' }).click()
  await expect(page).toHaveURL('/todo')

  // add new todo
  const createTodoButton = page.getByTestId('create-todo-button')
  await expect(createTodoButton).toBeVisible()
  await createTodoButton.click()
  const createTodoDialog = page.getByTestId('create-todo-button')
  await expect(createTodoDialog).toBeVisible()

  // new todo data
  const todoItem = {
    title: "Todo Title",
    description: "Todo Description"
  }

  const titleInput = page.locator('#title')
  const descriptionInput = page.locator('#description')
  const createTodoSubmitButton = page.getByTestId('create-todo-submit-button')

  await expect(titleInput).toBeVisible()
  await expect(descriptionInput).toBeVisible()
  await expect(createTodoSubmitButton).toBeVisible()

  await titleInput.fill(todoItem.title)
  await descriptionInput.fill(todoItem.description)
  await createTodoSubmitButton.click()
  await expect(page.getByText('Utworzono nowe zadanie')).toBeVisible()
  await expect(page.getByRole('listitem').filter({ hasText: 'Utworzono nowe zadanie' })).toBeVisible()

  // new element data-testid
  const newElement = page.locator('[data-testid^="todo-row"]').first();
  const newElementDataTestId = await newElement.getAttribute('data-testid');

  // read new todo
  const newTodoRow = page.getByTestId(newElementDataTestId!)
  await expect(newTodoRow).toBeVisible()
  await expect(newTodoRow.getByRole('checkbox')).not.toBeChecked()
  await expect(newTodoRow.getByRole('cell', { name: 'Todo Title' })).toHaveText(todoItem.title)
  await expect(newTodoRow.getByRole('cell', { name: 'Todo Description' })).toHaveText(todoItem.description)

  // edit todo
  const editTodoButton = newTodoRow.getByTestId('edit-todo-dialog-button')
  await expect(editTodoButton).toBeVisible()
  await editTodoButton.click()

  const editTodoDialog = page.getByTestId('edit-todo-dialog-content')
  await expect(editTodoDialog).toBeVisible()

  const editSubmitButton = page.getByTestId('edit-todo-submit-button')
  await expect(editSubmitButton).toBeDisabled()

  // todo data to update
  const editedTodoItem = {
    title: "Todo Title Edit",
    description: "Todo Description Edit"
  }

  await expect(editTodoDialog.locator('#title')).toBeVisible()
  await editTodoDialog.locator('#title').fill(editedTodoItem.title)
  await expect(editTodoDialog.locator('#description')).toBeVisible()
  await editTodoDialog.locator('#description').fill(editedTodoItem.description)
  await expect(editSubmitButton).not.toBeDisabled()
  await editSubmitButton.click()
  await expect(editTodoDialog).not.toBeVisible()
  await expect(page.getByRole('listitem').filter({ hasText: 'Zadanie edytowano' })).toBeVisible()

  // check if data is updated
  await expect(newTodoRow.getByRole('cell', { name: 'Todo Title' })).toHaveText(editedTodoItem.title)
  await expect(newTodoRow.getByRole('cell', { name: 'Todo Description' })).toHaveText(editedTodoItem.description)

  // delete todo
  const deleteTodoButton = newTodoRow.getByTestId('delete-todo-popover-button')
  await expect(deleteTodoButton).toBeVisible()
  await deleteTodoButton.click()
  const deleteTodoPopover = page.getByTestId('delete-todo-popover-content')
  await expect(deleteTodoPopover).toBeVisible()
  const deleteTodoSubmitButton = deleteTodoPopover.getByTestId('delete-todo-button')
  await expect(deleteTodoSubmitButton).toBeVisible()
  await deleteTodoSubmitButton.click()
  await expect(page.getByRole('listitem').filter({ hasText: 'Usunięto zadanie' })).toBeVisible()
  await expect(deleteTodoPopover).not.toBeVisible()
  await expect(newTodoRow).not.toBeVisible()
});