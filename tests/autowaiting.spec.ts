import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX Request').click()

})

test('Autowaiting', async ({ page }) => {
  const successButton = page.locator('.bg-success')

  //await successButton.click()
  //const text = await successButton.textContent()

  //await successButton.waitFor({ state: 'visible' })
  //const text = await successButton.allTextContents()


  //expect(text).toContain('Data loaded with AJAX get request.')

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })

})

test('Alternative waits', async ({ page }) => {
  const successButton = page.locator('.bg-success')

//waitFor element
  //await page.waitForSelector('.bg-success')

  //wait for particular responce
 // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  //wait for network calls to be completed (not recommended)
  await page.waitForLoadState('networkidle')

  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})
test('timeouts', async ({ page }) => {
  const successButton = page.locator('.bg-success')
  await successButton.click()

})
