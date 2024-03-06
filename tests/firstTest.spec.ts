import { test,expect } from '@playwright/test'


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locators syntax rules', async ({ page }) => {
//tag name
  await page.locator('input').first().click()

  //id
  await page.locator('#inputEmail1')

  //class value
  await page.locator('.shape-rectangle')

  //attribute
  await page.locator('[placeholder="Email"]')

  //class full value
  await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combinatiom of the above
  await page.locator('input[placeholder="Email"]')

  //xpath
  await page.locator('//*[@id="inputEmail1"]')

  //partial text
  await page.locator(':text("Using")')

  //exact text
  page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button',{name:'Sign in'}).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTitle('IoT Dashboard').click()

  await page.getByTestId('')
})

test('locating child elements', async ({ page }) => {
await page.locator('nb-card nb-radio :text-is("Option 1")').click()
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()

await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({ page }) => {

await page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('textbox', { name: 'Email' }).click()
await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox', { name: 'Email' }).click()

await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', { name: 'Email' }).click()
await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox', { name: 'Password' }).click()

await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).getByRole('textbox', { name: 'Email' }).click()

await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click()

})

test('Reusing the locators', async ({ page }) => {
  const card = page.locator('nb-card').filter({hasText: 'Basic form'})
  const email = card.getByRole('textbox', { name: 'Email' })

  await card.getByRole('textbox', { name: 'Email' }).fill('test@test.com')
  await card.getByRole('textbox', { name: 'Password' }).fill('Qwerty123')
  await card.locator('nb-checkbox').click()
  await card.getByRole('button').click()

  await expect(email).toHaveValue('test@test.com')
})

test('extracting values', async ({ page }) => {
  const card = page.locator('nb-card').filter({hasText: 'Basic form'})
  const btnText = await card.locator('button').textContent()

  expect(btnText).toEqual('Submit')

const radioBtns = await page.locator('nb-radio').allTextContents()

expect(radioBtns).toContain('Option 1')

const emailField = card.getByRole('textbox', {name:'Email'})
await emailField.fill('test@test.com')
expect(emailField).toHaveValue('test@test.com')
const val = await emailField.inputValue()

expect(val).toEqual('test@test.com')

const placeHolder = await emailField.getAttribute('placeholder')
expect(placeHolder).toEqual('Email')
})
test('assertions', async ({ page }) => {
  //General
  const cardBtn = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')
  const text = await cardBtn.textContent()
  expect(text).toEqual('Submit')

  //Locator assertions
  await expect(cardBtn).toHaveText('Submit')

  //soft assertions
  await expect.soft(cardBtn).toHaveText('Submit')

})




