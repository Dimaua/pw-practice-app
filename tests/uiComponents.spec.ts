import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')

})

test.describe('Form layout page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async ({ page }) => {
    const emailInputField = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
    await emailInputField.fill('test@test.com')
    await emailInputField.clear()
    await emailInputField.pressSequentially('abcde@test.com', { delay: 100 })

    const emailFieldVal = await emailInputField.inputValue()
    expect(emailFieldVal).toEqual('abcde@test.com')

    await expect(emailInputField).toHaveValue('abcde@test.com')
  })

  test.only('radio buttons', async ({ page }) => {
    const usingGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })

    //await usingGridForm.getByLabel('Option 1').check({ force: true })
    await usingGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })

    const radioStatus1 = await usingGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()

    await expect(usingGridForm).toHaveScreenshot()

    /*  expect(radioStatus1).toBeTruthy()
     await expect(usingGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked() */



    /* await usingGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
    const radioStatus2 = await usingGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()
    expect(await usingGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()

    expect(radioStatus2).toBeTruthy()
 */
  })

})

test('checkboxes', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

  const allBoxes = page.getByRole('checkbox')

  for (const checkbox of await allBoxes.all()) {
    await checkbox.uncheck({ force: true })
    expect(await checkbox.isChecked()).toBeFalsy()
  }
})

test('lists and dropdowns', async ({ page }) => {
  const dropdownMenu = page.locator('ngx-header nb-select')
  await dropdownMenu.click()

  // const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator('nb-option')

  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

  await optionList.filter({ hasText: "Cosmic" }).click()

  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  }

  await dropdownMenu.click()
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click()
    await expect(header).toHaveCSS('background-color', colors[color])
    if (color != "Corporate")
      await dropdownMenu.click()
  }
})

test('tooltip', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()

  const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
  await tooltipCard.getByRole('button', { name: 'Top' }).hover()

  //const tooltip = page.getByRole('tooltip').textContent()
  const tooltip = page.locator('nbtooltip').textContent()
  expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  page.on('dialog', dialog => {
    expect(dialog).toEqual('Are you sure you want to delete?')
    dialog.accept()
  })
  await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})
test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  const tergetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
  await tergetRow.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('Age').clear()
  await page.locator('input-editor').getByPlaceholder('Age').fill('99')
  await page.locator('.nb-checkmark').click()

  await page.locator('.ng2-smart-pagination').getByText('2').click()
  const targetRowId = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
  await targetRowId.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('E-mail').clear()
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
  await page.locator('.nb-checkmark').click()
  await expect(targetRowId.locator('td').nth(5)).toHaveText('test@test.com')


})

test('date picker', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()

  const caledarInput = page.getByPlaceholder('Form Picker')
  await caledarInput.click()

  await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click()
  await expect(caledarInput).toHaveValue('Mar 1, 2024')
})
