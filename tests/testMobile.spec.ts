import { test, expect } from '@playwright/test'

test('input fields', async ({ page }) => {
  await page.goto('/')
  await page.locator('.sidebar-toggle').click()

  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

  await page.locator('.sidebar-toggle').click()
  const emailInputField = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
  await emailInputField.fill('test@test.com')
  await emailInputField.clear()
  await emailInputField.pressSequentially('abcde@test.com')




})
